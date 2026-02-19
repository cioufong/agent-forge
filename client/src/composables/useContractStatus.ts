import { ref, computed } from 'vue'
import { useWeb3 } from './useWeb3'
import { AFG_TOKEN_ABI, AGENT_NFA_ABI, PROBLEM_MANAGER_ABI, REWARD_DISTRIBUTOR_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

// Singleton state shared across all components
const afgTokenPaused = ref<boolean | null>(null)
const agentNFAPaused = ref<boolean | null>(null)
const problemManagerPaused = ref<boolean | null>(null)
const rewardDistributorPaused = ref<boolean | null>(null)
const loaded = ref(false)

const allPaused = computed(() =>
  afgTokenPaused.value === true &&
  agentNFAPaused.value === true &&
  problemManagerPaused.value === true &&
  rewardDistributorPaused.value === true
)

const anyPaused = computed(() =>
  afgTokenPaused.value === true ||
  agentNFAPaused.value === true ||
  problemManagerPaused.value === true ||
  rewardDistributorPaused.value === true
)

export function useContractStatus() {
  const { getPublicClient } = useWeb3()

  async function fetchStatus(): Promise<void> {
    const client = getPublicClient()

    const results = await Promise.allSettled([
      client.readContract({ address: getContractAddress('AFGToken'), abi: AFG_TOKEN_ABI, functionName: 'paused' }),
      client.readContract({ address: getContractAddress('AgentNFA'), abi: AGENT_NFA_ABI, functionName: 'paused' }),
      client.readContract({ address: getContractAddress('ProblemManager'), abi: PROBLEM_MANAGER_ABI, functionName: 'paused' }),
      client.readContract({ address: getContractAddress('RewardDistributor'), abi: REWARD_DISTRIBUTOR_ABI, functionName: 'paused' }),
    ])

    afgTokenPaused.value = results[0].status === 'fulfilled' ? (results[0].value as boolean) : null
    agentNFAPaused.value = results[1].status === 'fulfilled' ? (results[1].value as boolean) : null
    problemManagerPaused.value = results[2].status === 'fulfilled' ? (results[2].value as boolean) : null
    rewardDistributorPaused.value = results[3].status === 'fulfilled' ? (results[3].value as boolean) : null
    loaded.value = true
  }

  return {
    afgTokenPaused,
    agentNFAPaused,
    problemManagerPaused,
    rewardDistributorPaused,
    allPaused,
    anyPaused,
    loaded,
    fetchStatus,
  }
}
