import { ref } from 'vue'
import { formatEther, type Address } from 'viem'
import { useWeb3 } from './useWeb3'
import { AFG_TOKEN_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

export function useAFGToken() {
  const { getPublicClient, account } = useWeb3()
  const balance = ref<string>('0')
  const totalSupply = ref<string>('0')
  const totalMined = ref<string>('0')
  const rewardPerRound = ref<string>('0')
  const halvingRound = ref<number>(0)
  const currentRound = ref<number>(0)
  const roundsUntilHalving = ref<number>(0)

  async function fetchBalance(): Promise<void> {
    if (!account.value) return
    const client = getPublicClient()
    const address = getContractAddress('AFGToken')

    const bal = await client.readContract({
      address,
      abi: AFG_TOKEN_ABI,
      functionName: 'balanceOf',
      args: [account.value],
    }) as bigint

    balance.value = formatEther(bal)
  }

  async function fetchTokenInfo(): Promise<void> {
    const client = getPublicClient()
    const address = getContractAddress('AFGToken')

    const [supply, mined, reward, deployedAt, roundsPerHalving, roundDuration] = await Promise.all([
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'totalSupply' }),
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'totalMined' }),
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'currentRewardPerRound' }),
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'deployedAt' }),
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'ROUNDS_PER_HALVING' }),
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'ROUND_DURATION' }),
    ])

    totalSupply.value = formatEther(supply as bigint)
    totalMined.value = formatEther(mined as bigint)
    rewardPerRound.value = formatEther(reward as bigint)

    // Calculate halving progress
    const deployed = Number(deployedAt as bigint)
    const perHalving = Number(roundsPerHalving as bigint)
    const duration = Number(roundDuration as bigint)
    const now = Math.floor(Date.now() / 1000)
    const elapsed = now - deployed
    const totalRounds = Math.floor(elapsed / duration)
    const halvingCount = Math.floor(totalRounds / perHalving)
    const nextHalvingRound = (halvingCount + 1) * perHalving

    currentRound.value = totalRounds
    halvingRound.value = nextHalvingRound
    roundsUntilHalving.value = nextHalvingRound - totalRounds
  }

  return {
    balance,
    totalSupply,
    totalMined,
    rewardPerRound,
    halvingRound,
    currentRound,
    roundsUntilHalving,
    fetchBalance,
    fetchTokenInfo,
  }
}
