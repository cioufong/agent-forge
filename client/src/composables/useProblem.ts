import { ref } from 'vue'
import { API_BASE } from '@/config/api'

export type Phase = 'submit' | 'reveal' | 'verify' | 'resolving' | 'resolved'

export interface ProblemInfo {
  id: number
  questionText: string
  category: string
  difficulty: string
  questionHash: string
  phase: Phase
  submitDeadline?: number
  revealDeadline?: number
  verifyDeadline?: number
}

export function useProblem() {
  const currentProblem = ref<ProblemInfo | null>(null)

  async function fetchCurrentProblem(): Promise<void> {
    try {
      const res = await fetch(`${API_BASE}/api/problems/current`)
      if (!res.ok) {
        currentProblem.value = null
        return
      }
      currentProblem.value = await res.json()
    } catch {
      currentProblem.value = null
    }
  }

  return {
    currentProblem,
    fetchCurrentProblem,
  }
}
