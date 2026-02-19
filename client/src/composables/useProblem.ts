import { ref } from 'vue'
import { keccak256, toHex, type Address } from 'viem'
import { useWeb3 } from './useWeb3'
import { PROBLEM_MANAGER_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

export interface ProblemInfo {
  id: number
  questionText: string
  category: string
  difficulty: string
  questionHash: string
  deadline?: number
}

export function useProblem() {
  const { getPublicClient, getWalletClient, account } = useWeb3()
  const currentProblem = ref<ProblemInfo | null>(null)
  const isSubmitting = ref(false)
  const submitError = ref<string | null>(null)

  async function fetchCurrentProblem(tokenId?: number): Promise<void> {
    try {
      const url = tokenId
        ? `/api/problems/current?tokenId=${tokenId}`
        : '/api/problems/current'
      const res = await fetch(url)
      if (!res.ok) {
        currentProblem.value = null
        return
      }
      currentProblem.value = await res.json()
    } catch {
      currentProblem.value = null
    }
  }

  async function submitAnswer(problemId: number, tokenId: number, answer: string): Promise<boolean> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) {
      submitError.value = 'Wallet not connected'
      return false
    }

    isSubmitting.value = true
    submitError.value = null

    try {
      const address = getContractAddress('ProblemManager')
      const client = getPublicClient()

      const answerHash = keccak256(toHex(answer))

      const hash = await wallet.writeContract({
        address,
        abi: PROBLEM_MANAGER_ABI,
        functionName: 'submitAnswer',
        args: [BigInt(problemId), BigInt(tokenId), answerHash],
      })

      await client.waitForTransactionReceipt({ hash })

      // Reveal answer to server
      await fetch(`/api/problems/${problemId}/reveal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId, answer }),
      })

      return true
    } catch (err: any) {
      submitError.value = err.message
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    currentProblem,
    isSubmitting,
    submitError,
    fetchCurrentProblem,
    submitAnswer,
  }
}
