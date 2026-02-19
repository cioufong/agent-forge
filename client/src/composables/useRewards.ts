import { ref } from 'vue'
import { formatEther } from 'viem'
import { useWeb3 } from './useWeb3'
import { REWARD_DISTRIBUTOR_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

export function useRewards() {
  const { getPublicClient, getWalletClient, account, TARGET_CHAIN } = useWeb3()
  const pendingRewards = ref<string>('0')
  const isClaiming = ref(false)
  const claimError = ref<string | null>(null)

  async function fetchPendingRewards(): Promise<void> {
    if (!account.value) return
    const client = getPublicClient()
    const address = getContractAddress('RewardDistributor')

    const pending = await client.readContract({
      address,
      abi: REWARD_DISTRIBUTOR_ABI,
      functionName: 'pendingRewards',
      args: [account.value],
    }) as bigint

    pendingRewards.value = formatEther(pending)
  }

  async function claimRewards(): Promise<boolean> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) {
      claimError.value = 'Wallet not connected'
      return false
    }

    isClaiming.value = true
    claimError.value = null

    try {
      const address = getContractAddress('RewardDistributor')
      const client = getPublicClient()

      const hash = await wallet.writeContract({
        address,
        abi: REWARD_DISTRIBUTOR_ABI,
        functionName: 'claimRewards',
        chain: TARGET_CHAIN,
        account: account.value!,
      })

      await client.waitForTransactionReceipt({ hash })
      await fetchPendingRewards()
      return true
    } catch (err: any) {
      claimError.value = err.message
      return false
    } finally {
      isClaiming.value = false
    }
  }

  return {
    pendingRewards,
    isClaiming,
    claimError,
    fetchPendingRewards,
    claimRewards,
  }
}
