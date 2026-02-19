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

    const [supply, mined, reward] = await Promise.all([
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'totalSupply' }),
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'totalMined' }),
      client.readContract({ address, abi: AFG_TOKEN_ABI, functionName: 'currentRewardPerRound' }),
    ])

    totalSupply.value = formatEther(supply as bigint)
    totalMined.value = formatEther(mined as bigint)
    rewardPerRound.value = formatEther(reward as bigint)
  }

  return {
    balance,
    totalSupply,
    totalMined,
    rewardPerRound,
    fetchBalance,
    fetchTokenInfo,
  }
}
