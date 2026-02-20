/**
 * Answer Validator / Oracle Resolution Service
 * 4-phase lifecycle: Submit → Reveal → Verify → Resolve
 *
 * After the verify deadline, if verifiers haven't reached consensus,
 * the oracle fallback resolves the problem and distributes rewards.
 */

import { keccak256, toHex } from 'viem'
import { resolveByOracleOnChain, distributeRewardsOnChain, isProblemResolvedOnChain, getWinnersOnChain, getAgentNFAData } from './blockchain.js'
import { resolveProblem as resolveInDB, insertEvent } from './database.js'

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
export async function oracleResolve(problemId: number): Promise<void> {
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
      await emitResolution(problemId)
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

    // Group winners by tier based on NFA level
    if (winners.length > 0) {
      const tierGroups: Map<number, bigint[]> = new Map()

      for (const tokenId of winners) {
        let tier = 0 // default Bronze
        try {
          const agentData = await getAgentNFAData(tokenId)
          tier = Number(agentData.tier)
        } catch { /* fallback to Bronze */ }

        if (!tierGroups.has(tier)) tierGroups.set(tier, [])
        tierGroups.get(tier)!.push(tokenId)
      }

      // Distribute rewards per tier
      for (const [tier, tierWinners] of tierGroups) {
        try {
          await distributeRewardsOnChain(BigInt(problemId), tier, tierWinners)
          console.log(`[oracle] Tier ${tier} rewards distributed for ${tierWinners.length} winner(s)`)
        } catch (err: any) {
          console.warn(`[oracle] Tier ${tier} distribution failed: ${err.message}`)
        }
      }
    }

    // Store event
    insertEvent('problem-resolved', {
      problemId,
      winnerTokenIds: winners.map(w => Number(w)),
      oracleFallback: true,
    })
  } catch (err: any) {
    console.warn(`[oracle] On-chain resolution failed: ${err.message}`)
    insertEvent('problem-resolved', {
      problemId,
      winnerTokenIds: [],
      oracleFallback: true,
      error: err.message,
    })
  }

  correctAnswers.delete(problemId)
}

/**
 * Store resolution event from on-chain data
 */
async function emitResolution(problemId: number): Promise<void> {
  try {
    const winners = await getWinnersOnChain(BigInt(problemId))
    insertEvent('problem-resolved', {
      problemId,
      winnerTokenIds: winners.map(w => Number(w)),
      oracleFallback: false,
    })
  } catch { /* ignore */ }
}

/**
 * Schedule oracle resolution after verify deadline
 * Called by problem-generator when a new problem is posted.
 */
export function scheduleOracleResolution(
  problemId: number,
  verifyDeadline: number,
): void {
  const bufferMs = 10_000 // 10s buffer after verify deadline
  const delayMs = (verifyDeadline * 1000) - Date.now() + bufferMs

  if (delayMs <= 0) {
    oracleResolve(problemId)
    return
  }

  setTimeout(() => oracleResolve(problemId), delayMs)
  console.log(`[oracle] Resolution scheduled for problem #${problemId} in ${Math.round(delayMs / 1000)}s`)
}

/**
 * Store phase change event (called by problem-generator timers)
 */
export function broadcastPhaseChange(problemId: number, phase: string): void {
  insertEvent('phase-change', { problemId, phase })
  console.log(`[phase] Problem #${problemId} → ${phase}`)
}
