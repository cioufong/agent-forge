/**
 * Event Listener Service
 * Watches on-chain events for the 4-phase problem lifecycle
 * Indexes data into SQLite and broadcasts via Socket.IO
 */

import { type Log } from 'viem'
import { getPublicClient, getContracts, getABI } from './blockchain.js'
import { upsertAgent, insertSubmission, markSubmissionRevealed } from './database.js'
import type { Server as SocketServer } from 'socket.io'

let unwatchFns: Array<() => void> = []

export async function startEventListener(io: SocketServer): Promise<void> {
  console.log('[events] Starting on-chain event listener...')

  const client = getPublicClient()
  const addrs = getContracts()

  // ────── AgentNFA: AgentMinted ──────
  try {
    const agentABI = getABI('AgentNFA')
    const unwatch = client.watchContractEvent({
      address: addrs.agentNFA,
      abi: agentABI,
      eventName: 'AgentMinted',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] AgentMinted #${args.tokenId}`)
          upsertAgent({
            tokenId: Number(args.tokenId),
            owner: args.to,
            intelligence: Number(args.intelligence),
            speed: Number(args.speed),
            specialization: Number(args.specialization),
            talentRarity: Number(args.talentRarity),
            level: 1,
            xp: 0,
            problemsSolved: 0,
            problemsAttempted: 0,
            createdAt: Math.floor(Date.now() / 1000),
          })

          io.emit('agent-minted', {
            tokenId: Number(args.tokenId),
            owner: args.to,
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] AgentMinted watcher failed: ${err.message}`)
  }

  // ────── ProblemManager: AnswerSubmitted ──────
  try {
    const pmABI = getABI('ProblemManager')
    const unwatch = client.watchContractEvent({
      address: addrs.problemManager,
      abi: pmABI,
      eventName: 'AnswerSubmitted',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] AnswerSubmitted: problem #${args.problemId} by agent #${args.tokenId}`)
          insertSubmission(
            Number(args.problemId),
            Number(args.tokenId),
            args.answerHash,
            '',
            Math.floor(Date.now() / 1000),
          )

          io.emit('answer-submitted', {
            problemId: Number(args.problemId),
            tokenId: Number(args.tokenId),
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] AnswerSubmitted watcher failed: ${err.message}`)
  }

  // ────── ProblemManager: AnswerRevealed ──────
  try {
    const pmABI = getABI('ProblemManager')
    const unwatch = client.watchContractEvent({
      address: addrs.problemManager,
      abi: pmABI,
      eventName: 'AnswerRevealed',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] AnswerRevealed: problem #${args.problemId} by agent #${args.tokenId}`)
          markSubmissionRevealed(
            Number(args.problemId),
            Number(args.tokenId),
            args.answerHash,
          )

          io.emit('answer-revealed', {
            problemId: Number(args.problemId),
            tokenId: Number(args.tokenId),
            answerHash: args.answerHash,
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] AnswerRevealed watcher failed: ${err.message}`)
  }

  // ────── ProblemManager: ProblemResolved ──────
  try {
    const pmABI = getABI('ProblemManager')
    const unwatch = client.watchContractEvent({
      address: addrs.problemManager,
      abi: pmABI,
      eventName: 'ProblemResolved',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] ProblemResolved: #${args.problemId} (oracle=${args.oracleFallback})`)
          io.emit('problem-resolved-chain', {
            problemId: Number(args.problemId),
            correctAnswerHash: args.correctAnswerHash,
            winnerTokenIds: args.winnerTokenIds?.map((id: bigint) => Number(id)) || [],
            oracleFallback: args.oracleFallback,
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] ProblemResolved watcher failed: ${err.message}`)
  }

  // ────── AgentNFA: XPGranted ──────
  try {
    const agentABI = getABI('AgentNFA')
    const unwatch = client.watchContractEvent({
      address: addrs.agentNFA,
      abi: agentABI,
      eventName: 'XPGranted',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] XPGranted: agent #${args.tokenId} +${args.amount} XP (level ${args.newLevel})`)
          io.emit('xp-granted', {
            tokenId: Number(args.tokenId),
            amount: Number(args.amount),
            newLevel: Number(args.newLevel),
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] XPGranted watcher failed: ${err.message}`)
  }

  // ────── RewardDistributor: RewardsDistributed ──────
  try {
    const rdABI = getABI('RewardDistributor')
    const unwatch = client.watchContractEvent({
      address: addrs.rewardDistributor,
      abi: rdABI,
      eventName: 'RewardsDistributed',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] RewardsDistributed: problem #${args.problemId}, tier ${args.tier}`)
          io.emit('rewards-distributed', {
            problemId: Number(args.problemId),
            tier: Number(args.tier),
            totalAmount: args.totalAmount?.toString(),
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] RewardsDistributed watcher failed: ${err.message}`)
  }

  // ────── VerifierElection: VerifiersElected ──────
  try {
    const veABI = getABI('VerifierElection')
    const unwatch = client.watchContractEvent({
      address: addrs.verifierElection,
      abi: veABI,
      eventName: 'VerifiersElected',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] VerifiersElected: problem #${args.problemId}`)
          io.emit('verifiers-elected', {
            problemId: Number(args.problemId),
            tokenIds: args.tokenIds?.map((id: bigint) => Number(id)) || [],
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] VerifiersElected watcher failed: ${err.message}`)
  }

  // ────── VerifierElection: ConsensusReached ──────
  try {
    const veABI = getABI('VerifierElection')
    const unwatch = client.watchContractEvent({
      address: addrs.verifierElection,
      abi: veABI,
      eventName: 'ConsensusReached',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] ConsensusReached: problem #${args.problemId} (${args.agreeCount}/5)`)
          io.emit('consensus-reached', {
            problemId: Number(args.problemId),
            correctAnswer: args.correctAnswer,
            agreeCount: Number(args.agreeCount),
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] ConsensusReached watcher failed: ${err.message}`)
  }

  // ────── VerifierElection: OracleFallbackTriggered ──────
  try {
    const veABI = getABI('VerifierElection')
    const unwatch = client.watchContractEvent({
      address: addrs.verifierElection,
      abi: veABI,
      eventName: 'OracleFallbackTriggered',
      onLogs: (logs: Log[]) => {
        for (const log of logs) {
          const args = (log as any).args
          if (!args) continue

          console.log(`[event] OracleFallbackTriggered: problem #${args.problemId}`)
          io.emit('oracle-fallback', {
            problemId: Number(args.problemId),
          })
        }
      },
    })
    unwatchFns.push(unwatch)
  } catch (err: any) {
    console.warn(`[events] OracleFallbackTriggered watcher failed: ${err.message}`)
  }

  console.log('[events] All event listeners started')
}

export function stopEventListener(): void {
  for (const unwatch of unwatchFns) {
    try { unwatch() } catch { /* ignore */ }
  }
  unwatchFns = []
  console.log('[events] Event listeners stopped')
}
