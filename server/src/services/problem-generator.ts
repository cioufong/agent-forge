/**
 * Problem Generator Service
 * Generates problems on interval, posts on-chain, stores events for REST polling
 * Adapted for 4-phase lifecycle: Submit(5min) → Reveal(2min) → Verify(3min) → Resolve
 */

import { keccak256, toHex } from 'viem'
import { postProblemOnChain } from './blockchain.js'
import { insertProblem, insertEvent } from './database.js'
import { registerCorrectAnswer, scheduleOracleResolution, broadcastPhaseChange } from './answer-validator.js'

export interface Problem {
  id: number
  questionText: string
  category: 'math' | 'code' | 'trivia'
  difficulty: 'easy' | 'medium' | 'hard'
  answer: string
  questionHash: string
}

// Phase durations (seconds) — must match contract constants
const SUBMIT_DURATION = 300  // 5 minutes
const REVEAL_DURATION = 120  // 2 minutes
const VERIFY_DURATION = 180  // 3 minutes

// Total round = submit + reveal + verify + buffer = ~11 min
const PROBLEM_INTERVAL = parseInt(process.env.PROBLEM_INTERVAL || '660000', 10) // 11 min

let currentProblem: Problem | null = null
let problemCounter = 0
let intervalHandle: ReturnType<typeof setInterval> | null = null
let paused = false

// ============ Problem Templates ============

function generateMathProblem(difficulty: string, seed: number): { question: string; answer: string } {
  const rand = (min: number, max: number) => min + (seed % (max - min + 1))

  if (difficulty === 'easy') {
    const a = rand(10, 99)
    const b = rand(10, 99)
    const op = seed % 2 === 0 ? '+' : '*'
    const result = op === '+' ? a + b : a * b
    return { question: `What is ${a} ${op} ${b}?`, answer: result.toString() }
  } else if (difficulty === 'medium') {
    const a = rand(100, 999)
    const b = rand(10, 99)
    const result = a * b
    return { question: `What is ${a} * ${b}?`, answer: result.toString() }
  } else {
    const a = rand(1000, 9999)
    const b = rand(100, 999)
    const extra = rand(1, 100)
    const result = a * b + extra
    return { question: `What is ${a} * ${b} + ${extra}?`, answer: result.toString() }
  }
}

function generateCodeProblem(difficulty: string, seed: number): { question: string; answer: string } {
  if (difficulty === 'easy') {
    const n = 5 + (seed % 10)
    const fib = [0, 1]
    for (let i = 2; i <= n; i++) fib.push(fib[i - 1] + fib[i - 2])
    return { question: `What is the ${n}th Fibonacci number (0-indexed)?`, answer: fib[n].toString() }
  } else if (difficulty === 'medium') {
    const arr = Array.from({ length: 5 + (seed % 5) }, (_, i) => (seed * (i + 1)) % 100)
    const sorted = [...arr].sort((a, b) => a - b)
    return {
      question: `Sort this array and return the median: [${arr.join(', ')}]`,
      answer: sorted[Math.floor(sorted.length / 2)].toString(),
    }
  } else {
    const n = 20 + (seed % 30)
    let count = 0
    for (let i = 2; i <= n; i++) {
      let isPrime = true
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) { isPrime = false; break }
      }
      if (isPrime) count++
    }
    return { question: `How many prime numbers are there from 2 to ${n} (inclusive)?`, answer: count.toString() }
  }
}

function generateTriviaProblem(difficulty: string, seed: number): { question: string; answer: string } {
  if (difficulty === 'easy') {
    const base = 2 + (seed % 8)
    const exp = 2 + (seed % 4)
    return { question: `What is ${base}^${exp}?`, answer: Math.pow(base, exp).toString() }
  } else if (difficulty === 'medium') {
    const n = 5 + (seed % 10)
    let factorial = 1
    for (let i = 2; i <= n; i++) factorial *= i
    return { question: `What is ${n}!?`, answer: factorial.toString() }
  } else {
    const a = 10 + (seed % 90)
    const b = 10 + ((seed >> 4) % 90)
    let x = a, y = b
    while (y !== 0) { [x, y] = [y, x % y] }
    return { question: `What is the GCD of ${a} and ${b}?`, answer: x.toString() }
  }
}

function generateProblem(seed: number, difficulty: string): Problem {
  const categories: Array<'math' | 'code' | 'trivia'> = ['math', 'code', 'trivia']
  const category = categories[seed % 3]

  let generated: { question: string; answer: string }
  switch (category) {
    case 'math': generated = generateMathProblem(difficulty, seed); break
    case 'code': generated = generateCodeProblem(difficulty, seed); break
    case 'trivia': generated = generateTriviaProblem(difficulty, seed); break
  }

  const questionHash = keccak256(toHex(generated.question))

  return {
    id: problemCounter++,
    questionText: generated.question,
    category,
    difficulty: difficulty as any,
    answer: generated.answer,
    questionHash,
  }
}

export function getCurrentProblem(): Problem | null {
  return currentProblem
}

// ============ Main Loop ============

export async function startProblemGenerator(): Promise<void> {
  console.log(`[problem] Generator starting (interval: ${PROBLEM_INTERVAL}ms)`)

  if (paused) {
    console.log('[problem] Contract is paused, skipping initial generation')
    return
  }

  const generateAndPost = async () => {
    if (paused) return

    try {
      const seed = Date.now()
      const round = problemCounter
      let difficulty: string
      if (round % 3 === 0) difficulty = 'easy'
      else if (round % 3 === 1) difficulty = 'medium'
      else difficulty = 'hard'

      const problem = generateProblem(seed, difficulty)
      currentProblem = problem

      const now = Math.floor(Date.now() / 1000)
      const submitDeadline = now + SUBMIT_DURATION
      const revealDeadline = now + SUBMIT_DURATION + REVEAL_DURATION
      const verifyDeadline = now + SUBMIT_DURATION + REVEAL_DURATION + VERIFY_DURATION

      // Store in database with all 3 deadlines
      insertProblem(
        problem.id,
        problem.questionHash,
        problem.questionText,
        problem.difficulty,
        problem.category,
        now,
        submitDeadline,
        revealDeadline,
        verifyDeadline,
      )

      // Register correct answer for oracle fallback
      registerCorrectAnswer(problem.id, problem.answer)

      // Post on-chain
      try {
        await postProblemOnChain(problem.questionHash as `0x${string}`)
        console.log(`[problem] #${problem.id} posted on-chain`)
      } catch (err: any) {
        console.warn(`[problem] Failed to post on-chain: ${err.message}`)
      }

      // Store new problem event
      insertEvent('new-problem', {
        id: problem.id,
        category: problem.category,
        difficulty: problem.difficulty,
        questionHash: problem.questionHash,
        submitDeadline,
        revealDeadline,
        verifyDeadline,
      })

      // Schedule phase transition events
      const submitDelayMs = SUBMIT_DURATION * 1000
      const revealDelayMs = (SUBMIT_DURATION + REVEAL_DURATION) * 1000
      const verifyDelayMs = (SUBMIT_DURATION + REVEAL_DURATION + VERIFY_DURATION) * 1000

      setTimeout(() => broadcastPhaseChange(problem.id, 'reveal'), submitDelayMs)
      setTimeout(() => broadcastPhaseChange(problem.id, 'verify'), revealDelayMs)
      setTimeout(() => broadcastPhaseChange(problem.id, 'resolving'), verifyDelayMs)

      // Schedule oracle fallback resolution after verify deadline
      scheduleOracleResolution(problem.id, verifyDeadline)

      console.log(`[problem] #${problem.id} [${problem.category}/${problem.difficulty}]: ${problem.questionText}`)
      console.log(`  Submit until ${new Date(submitDeadline * 1000).toLocaleTimeString()}`)
      console.log(`  Reveal until ${new Date(revealDeadline * 1000).toLocaleTimeString()}`)
      console.log(`  Verify until ${new Date(verifyDeadline * 1000).toLocaleTimeString()}`)
    } catch (err) {
      console.error('[problem] Generation failed:', err)
    }
  }

  // Generate first problem immediately
  await generateAndPost()

  // Then every PROBLEM_INTERVAL
  intervalHandle = setInterval(generateAndPost, PROBLEM_INTERVAL)
}

export function pauseGenerator(): void {
  if (paused) return
  paused = true
  if (intervalHandle) {
    clearInterval(intervalHandle)
    intervalHandle = null
  }
  console.log('[problem] Generator paused (contract paused)')
}

export function resumeGenerator(): void {
  if (!paused) return
  paused = false
  console.log('[problem] Generator resumed (contract unpaused)')
  // Re-start: generate immediately then set interval
  startProblemGenerator()
}

export function stopProblemGenerator(): void {
  if (intervalHandle) {
    clearInterval(intervalHandle)
    intervalHandle = null
    console.log('[problem] Generator stopped')
  }
}
