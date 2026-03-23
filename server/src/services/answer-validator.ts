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
const MAX_CACHED_ANSWERS = 100

/**
 * Register the correct answer for a problem (called by problem-generator)
 */
export function registerCorrectAnswer(problemId: number, answer: string): void {
  const answerHash = keccak256(toHex(answer))
  correctAnswers.set(problemId, { answer, answerHash })

  // Evict oldest entries if cache grows too large
  if (correctAnswers.size > MAX_CACHED_ANSWERS) {
    const oldest = correctAnswers.keys().next().value
    if (oldest !== undefined) correctAnswers.delete(oldest)
  }
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

  // Resolve on-chain first, then mark DB (avoid state divergence if tx fails)
  try {
    await resolveByOracleOnChain(
      BigInt(problemId),
      entry.answerHash as `0x${string}`,
    )
    console.log(`[oracle] Problem #${problemId} resolved on-chain`)

    // Only mark DB resolved after on-chain success
    resolveInDB(problemId, entry.answerHash, entry.answer, true)

    // Read winners from chain (auto-determined by revealed answers)
    const winners = await getWinnersOnChain(BigInt(problemId))
    console.log(`[oracle] Problem #${problemId}: ${winners.length} winner(s)`)

    // H-01: Group winners by tier (bronze=0, silver=1, gold=2) based on NFA level
    // Then call distributeRewards once with all three tier arrays
    if (winners.length > 0) {
      const tierGroups: Map<number, bigint[]> = new Map([[0, []], [1, []], [2, []]])

      const tiers = await Promise.all(
        winners.map(async (tokenId) => {
          try {
            const agentData = await getAgentNFAData(tokenId)
            return Number(agentData.tier)
          } catch { return 0 /* fallback to Bronze */ }
        })
      )

      for (let i = 0; i < winners.length; i++) {
        const tier = tiers[i]
        if (!tierGroups.has(tier)) tierGroups.set(tier, [])
        tierGroups.get(tier)!.push(winners[i])
      }

      try {
        await distributeRewardsOnChain(
          BigInt(problemId),
          tierGroups.get(0) || [],
          tierGroups.get(1) || [],
          tierGroups.get(2) || [],
        )
        console.log(`[oracle] Rewards distributed: bronze=${tierGroups.get(0)!.length}, silver=${tierGroups.get(1)!.length}, gold=${tierGroups.get(2)!.length}`)
      } catch (err: any) {
        console.warn(`[oracle] Reward distribution failed: ${err.message}`)
      }
    }

    // Store event
    insertEvent('problem-resolved', {
      problemId,
      winnerTokenIds: winners.map(w => Number(w)),
      oracleFallback: true,
    })

    // M-01: Only delete cached answer on success (avoid losing it if on-chain resolution fails)
    correctAnswers.delete(problemId)
  } catch (err: any) {
    // M-01: Do NOT delete correctAnswers here — keep it so we can retry
    console.warn(`[oracle] On-chain resolution failed: ${err.message}`)
    insertEvent('problem-resolved', {
      problemId,
      winnerTokenIds: [],
      oracleFallback: true,
      error: err.message,
    })
  }
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
