/**
 * AI Problem Generator Service
 * Spawns OpenAI Codex CLI to generate diverse problems with deterministic answers.
 * Falls back to template generators when CLI is unavailable/timeout/malformed.
 */

import { execFile } from 'child_process'
import { tmpdir } from 'os'
import { join } from 'path'
import { readFile, unlink } from 'fs/promises'
import { randomBytes } from 'crypto'

// Extended categories mapped to on-chain specialization groups
export type ExtendedCategory =
  | 'math' | 'pattern'                  // Math group
  | 'code' | 'code_output' | 'crypto'   // Code group
  | 'logic' | 'blockchain' | 'wordplay' | 'trivia'  // Trivia group

export type SpecializationGroup = 'math' | 'code' | 'trivia'

export const CATEGORY_TO_SPECIALIZATION: Record<ExtendedCategory, SpecializationGroup> = {
  math: 'math',
  pattern: 'math',
  code: 'code',
  code_output: 'code',
  crypto: 'code',
  logic: 'trivia',
  blockchain: 'trivia',
  wordplay: 'trivia',
  trivia: 'trivia',
}

export const ALL_CATEGORIES: ExtendedCategory[] = [
  'math', 'pattern', 'code_output', 'crypto',
  'logic', 'blockchain', 'wordplay', 'trivia',
]

const CODEX_TIMEOUT_MS = 30_000

export interface AIProblemResult {
  question: string
  answer: string
  category: ExtendedCategory
}

function buildPrompt(difficulty: string, category: ExtendedCategory): string {
  const categoryDescriptions: Record<ExtendedCategory, string> = {
    math: 'a math calculation problem (arithmetic, algebra, or number theory)',
    pattern: 'a pattern recognition problem (number sequences, geometric patterns)',
    code: 'a coding problem (algorithms, data structures, or programming concepts)',
    code_output: 'a "what does this code output?" problem with a short code snippet',
    crypto: 'a simple cryptography/encoding problem (Caesar cipher, base64, XOR, hex)',
    logic: 'a logic reasoning puzzle with a definitive answer',
    blockchain: 'a blockchain/web3 knowledge question with a factual answer',
    wordplay: 'a wordplay or word puzzle problem (anagrams, letter counting, string manipulation)',
    trivia: 'a general knowledge trivia question with a factual answer',
  }

  const difficultyGuide: Record<string, string> = {
    easy: 'The problem should be straightforward, solvable in under 10 seconds by a competent person.',
    medium: 'The problem should require some thought, but be solvable in under 30 seconds.',
    hard: 'The problem should be challenging, requiring careful reasoning or calculation.',
  }

  return `Generate ${categoryDescriptions[category]}.
Difficulty: ${difficulty}. ${difficultyGuide[difficulty] || difficultyGuide['medium']}

CRITICAL REQUIREMENTS:
- The answer MUST be a single, unambiguous value (a number, a single word, or a very short phrase)
- There must be exactly ONE correct answer, no room for interpretation
- Do NOT include the answer in the question text
- The question should be self-contained with all information needed to solve it

Respond with ONLY a JSON object in this exact format, no other text:
{"question": "your question here", "answer": "the exact answer"}`
}

function tryParseJSON(text: string): { question: string; answer: string } | null {
  // Try to extract JSON from the output (Codex may include extra text)
  const jsonMatch = text.match(/\{[\s\S]*?"question"[\s\S]*?"answer"[\s\S]*?\}/)
  if (!jsonMatch) return null

  try {
    const parsed = JSON.parse(jsonMatch[0])
    if (typeof parsed.question === 'string' && typeof parsed.answer === 'string'
      && parsed.question.length > 0 && parsed.question.length <= 1000
      && parsed.answer.length > 0 && parsed.answer.length <= 200) {
      return { question: parsed.question.trim(), answer: parsed.answer.trim() }
    }
  } catch {}
  return null
}

function execCodex(prompt: string): Promise<string> {
  const outFile = join(tmpdir(), `codex-problem-${randomBytes(4).toString('hex')}.txt`)

  return new Promise((resolve, reject) => {
    execFile(
      'codex',
      [
        'exec',
        '--sandbox', 'read-only',
        '--full-auto',
        '--ephemeral',
        '--skip-git-repo-check',
        '-o', outFile,
        prompt,
      ],
      {
        timeout: CODEX_TIMEOUT_MS,
        env: {
          PATH: process.env.PATH,
          HOME: process.env.HOME,
          OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        },
      },
      async (error: any, stdout: string, _stderr: string) => {
        try {
          if (error) {
            reject(error)
            return
          }
          // Read the last message from the output file
          let output: string
          try {
            output = await readFile(outFile, 'utf-8')
          } catch {
            // If output file doesn't exist, fall back to stdout
            output = stdout
          }
          resolve(output.trim())
        } finally {
          // Clean up temp file
          unlink(outFile).catch(() => {})
        }
      },
    )
  })
}

/**
 * Generate a problem using Codex CLI.
 * Returns null if CLI is unavailable, times out, or produces bad output.
 */
export async function generateAIProblem(
  difficulty: string,
  seed: number,
): Promise<AIProblemResult | null> {
  try {
    const category = ALL_CATEGORIES[seed % ALL_CATEGORIES.length]
    const prompt = buildPrompt(difficulty, category)
    const output = await execCodex(prompt)
    const parsed = tryParseJSON(output)

    if (!parsed) {
      console.warn('[ai-problem] Failed to parse Codex output:', output.slice(0, 200))
      return null
    }

    console.log(`[ai-problem] Generated ${category}/${difficulty} problem via Codex CLI`)
    return {
      question: parsed.question,
      answer: parsed.answer,
      category,
    }
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.warn('[ai-problem] Codex CLI not found (codex not installed)')
    } else if (err.killed) {
      console.warn('[ai-problem] Codex CLI timed out')
    } else {
      console.warn(`[ai-problem] Codex CLI error: ${err.message}`)
    }
    return null
  }
}
