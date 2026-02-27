export interface AgentData {
  tokenId: number
  owner: string
  intelligence: number
  speed: number
  specialization: number
  talentRarity: number
  level: number
  xp: number
  problemsSolved: number
  problemsAttempted: number
}

export interface ProblemData {
  id: number
  questionHash: string
  questionText?: string
  category: 'math' | 'code' | 'trivia' | 'pattern' | 'code_output' | 'crypto' | 'logic' | 'blockchain' | 'wordplay'
  difficulty: 'easy' | 'medium' | 'hard'
  createdAt: number
  submitDeadline: number
  revealDeadline: number
  verifyDeadline: number
  resolved: boolean
  oracleFallback: boolean
}

export type Phase = 'submit' | 'reveal' | 'verify' | 'resolved'

export interface SubmissionData {
  problemId: number
  tokenId: number
  answerHash: string
  answerText?: string
  isCorrect: boolean
  revealed: boolean
  submittedAt: number
}

export interface LeaderboardEntry {
  tokenId: number
  owner: string
  totalRewards: number
  problemsSolved: number
  level: number
  xp: number
}
