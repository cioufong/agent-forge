/**
 * Answer Validator / Oracle Resolution Service
 * 4-phase lifecycle: Submit → Reveal → Verify → Resolve
 *
 * After the verify deadline, if verifiers haven't reached consensus,
 * the oracle fallback resolves the problem and distributes rewards.
 */

import { keccak256, toHex } from 'viem'
import { resolveByOracleOnChain, distributeRewardsOnChain, isProblemResolvedOnChain, getWinnersOnChain } from './blockchain.js'
import { resolveProblem as resolveInDB } from './database.js'
import type { Server as SocketServer } from 'socket.io'

// Track correct answers per problem (from problem-generator)
const correctAnswers: Map<number, { answer: string; answerHash: string }> = new Map()

/**
 * Register the correct answer for a problem (called by problem-generator)
 */
export function registerCorrectAnswer(problemId: number, answer: string): void {
  const answerHash = keccak256(toHex(answer))
  correctAnswers.set(problemId, { answer, answerHash })
}

/**
 * Oracle fallback: resolve a problem after verify deadline if not already resolved
 */
export async function oracleResolve(problemId: number, io: SocketServer): Promise<void> {
  const entry = correctAnswers.get(problemId)
  if (!entry) {
    console.warn(`[oracle] Problem #${problemId}: no correct answer registered`)
    return
  }

  // Check if already resolved on-chain (by verifiers or previous oracle call)
  try {
    const resolved = await isProblemResolvedOnChain(BigInt(problemId))
    if (resolved) {
      console.log(`[oracle] Problem #${problemId} already resolved on-chain`)
      broadcastResolution(problemId, io)
      correctAnswers.delete(problemId)
      return
    }
  } catch (err: any) {
    console.warn(`[oracle] Could not check on-chain state: ${err.message}`)
  }

  console.log(`[oracle] Resolving problem #${problemId} via oracle fallback`)

  // Resolve in database
  resolveInDB(problemId, entry.answerHash, entry.answer, true)

  // Resolve on-chain
  try {
    await resolveByOracleOnChain(
      BigInt(problemId),
      entry.answerHash as `0x${string}`,
    )
    console.log(`[oracle] Problem #${problemId} resolved on-chain`)

    // Read winners from chain (auto-determined by revealed answers)
    const winners = await getWinnersOnChain(BigInt(problemId))
    console.log(`[oracle] Problem #${problemId}: ${winners.length} winner(s)`)

    // Distribute rewards (MVP: all Bronze tier)
    if (winners.length > 0) {
      await distributeRewardsOnChain(BigInt(problemId), 0, winners)
      console.log(`[oracle] Rewards distributed for problem #${problemId}`)
    }

    // Broadcast results
    io.emit('problem-resolved', {
      problemId,
      winnerTokenIds: winners.map(w => Number(w)),
      oracleFallback: true,
    })
  } catch (err: any) {
    console.warn(`[oracle] On-chain resolution failed: ${err.message}`)
    // Still broadcast for UI update
    io.emit('problem-resolved', {
      problemId,
      winnerTokenIds: [],
      oracleFallback: true,
      error: err.message,
    })
  }

  correctAnswers.delete(problemId)
}

/**
 * Broadcast resolution status from on-chain data
 */
async function broadcastResolution(problemId: number, io: SocketServer): Promise<void> {
  try {
    const winners = await getWinnersOnChain(BigInt(problemId))
    io.emit('problem-resolved', {
      problemId,
      winnerTokenIds: winners.map(w => Number(w)),
      oracleFallback: false,
    })
  } catch { /* ignore */ }
}

/**
 * Schedule oracle resolution after verify deadline
 * Called by problem-generator when a new problem is posted.
 *
 * Timeline:
 *   0:00  Submit phase starts
 *   5:00  Submit deadline → Reveal phase
 *   7:00  Reveal deadline → Verify phase
 *  10:00  Verify deadline → Oracle checks and resolves if needed
 */
export function scheduleOracleResolution(
  problemId: number,
  verifyDeadline: number,
  io: SocketServer,
): void {
  const bufferMs = 10_000 // 10s buffer after verify deadline
  const delayMs = (verifyDeadline * 1000) - Date.now() + bufferMs

  if (delayMs <= 0) {
    oracleResolve(problemId, io)
    return
  }

  setTimeout(() => oracleResolve(problemId, io), delayMs)
  console.log(`[oracle] Resolution scheduled for problem #${problemId} in ${Math.round(delayMs / 1000)}s`)
}

/**
 * Notify clients when phases change (called by problem-generator timers)
 */
export function broadcastPhaseChange(problemId: number, phase: string, io: SocketServer): void {
  io.emit('phase-change', { problemId, phase })
  console.log(`[phase] Problem #${problemId} → ${phase}`)
}
