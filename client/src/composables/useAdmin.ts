import { ref, type Ref } from 'vue'
import { parseEther, formatEther, type Address } from 'viem'
import { useWeb3 } from './useWeb3'
import { AFG_TOKEN_ABI, AGENT_NFA_ABI, PROBLEM_MANAGER_ABI, REWARD_DISTRIBUTOR_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

type ContractName = 'AFGToken' | 'AgentNFA' | 'ProblemManager' | 'RewardDistributor'

const ABI_MAP = {
  AFGToken: AFG_TOKEN_ABI,
  AgentNFA: AGENT_NFA_ABI,
  ProblemManager: PROBLEM_MANAGER_ABI,
  RewardDistributor: REWARD_DISTRIBUTOR_ABI,
} as const

export interface ContractStates {
  AFGToken: boolean | null
  AgentNFA: boolean | null
  ProblemManager: boolean | null
  RewardDistributor: boolean | null
}

export function useAdmin() {
  const { getPublicClient, getWalletClient, account, TARGET_CHAIN } = useWeb3()

  const isOwner: Ref<boolean> = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const contractStates = ref<ContractStates>({
    AFGToken: null,
    AgentNFA: null,
    ProblemManager: null,
    RewardDistributor: null,
  })

  // Extra read-only state
  const currentMintPrice = ref<string>('0')
  const contractBalance = ref<string>('0')
  const currentDexTaxBps = ref<number>(0)
  const currentDevWallet = ref<string>('')

  async function checkOwner(): Promise<boolean> {
    if (!account.value) {
      isOwner.value = false
      return false
    }
    try {
      const client = getPublicClient()
      const address = getContractAddress('AgentNFA')
      const owner = await client.readContract({
        address,
        abi: AGENT_NFA_ABI,
        functionName: 'owner',
      }) as Address
      isOwner.value = owner.toLowerCase() === account.value.toLowerCase()
      return isOwner.value
    } catch {
      isOwner.value = false
      return false
    }
  }

  async function fetchContractStates(): Promise<void> {
    const client = getPublicClient()
    const names: ContractName[] = ['AFGToken', 'AgentNFA', 'ProblemManager', 'RewardDistributor']

    const results = await Promise.allSettled(
      names.map(name =>
        client.readContract({
          address: getContractAddress(name),
          abi: ABI_MAP[name],
          functionName: 'paused',
        })
      )
    )

    names.forEach((name, i) => {
      const r = results[i]
      contractStates.value[name] = r.status === 'fulfilled' ? (r.value as boolean) : null
    })
  }

  async function fetchAdminData(): Promise<void> {
    const client = getPublicClient()

    const results = await Promise.allSettled([
      client.readContract({
        address: getContractAddress('AgentNFA'),
        abi: AGENT_NFA_ABI,
        functionName: 'mintPrice',
      }),
      client.getBalance({ address: getContractAddress('AgentNFA') }),
      client.readContract({
        address: getContractAddress('AFGToken'),
        abi: AFG_TOKEN_ABI,
        functionName: 'dexTaxBps',
      }),
      client.readContract({
        address: getContractAddress('RewardDistributor'),
        abi: REWARD_DISTRIBUTOR_ABI,
        functionName: 'devWallet',
      }),
    ])

    if (results[0].status === 'fulfilled') currentMintPrice.value = formatEther(results[0].value as bigint)
    if (results[1].status === 'fulfilled') contractBalance.value = formatEther(results[1].value as bigint)
    if (results[2].status === 'fulfilled') currentDexTaxBps.value = Number(results[2].value)
    if (results[3].status === 'fulfilled') currentDevWallet.value = results[3].value as string
  }

  async function togglePause(contract: ContractName, currentPaused: boolean): Promise<boolean> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) return false

    error.value = null
    try {
      const client = getPublicClient()
      const hash = await wallet.writeContract({
        address: getContractAddress(contract),
        abi: ABI_MAP[contract],
        functionName: currentPaused ? 'unpause' : 'pause',
        chain: TARGET_CHAIN,
        account: account.value,
      })
      await client.waitForTransactionReceipt({ hash })
      await fetchContractStates()
      return true
    } catch (err: any) {
      error.value = err.message
      return false
    }
  }

  async function setMintPrice(priceInEther: string): Promise<boolean> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) return false

    error.value = null
    try {
      const client = getPublicClient()
      const hash = await wallet.writeContract({
        address: getContractAddress('AgentNFA'),
        abi: AGENT_NFA_ABI,
        functionName: 'setMintPrice',
        args: [parseEther(priceInEther)],
        chain: TARGET_CHAIN,
        account: account.value,
      })
      await client.waitForTransactionReceipt({ hash })
      await fetchAdminData()
      return true
    } catch (err: any) {
      error.value = err.message
      return false
    }
  }

  async function withdrawFees(): Promise<boolean> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) return false

    error.value = null
    try {
      const client = getPublicClient()
      const hash = await wallet.writeContract({
        address: getContractAddress('AgentNFA'),
        abi: AGENT_NFA_ABI,
        functionName: 'withdraw',
        chain: TARGET_CHAIN,
        account: account.value,
      })
      await client.waitForTransactionReceipt({ hash })
      await fetchAdminData()
      return true
    } catch (err: any) {
      error.value = err.message
      return false
    }
  }

  async function setDexTaxBps(bps: number): Promise<boolean> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) return false

    error.value = null
    try {
      const client = getPublicClient()
      const hash = await wallet.writeContract({
        address: getContractAddress('AFGToken'),
        abi: AFG_TOKEN_ABI,
        functionName: 'setDexTaxBps',
        args: [BigInt(bps)],
        chain: TARGET_CHAIN,
        account: account.value,
      })
      await client.waitForTransactionReceipt({ hash })
      await fetchAdminData()
      return true
    } catch (err: any) {
      error.value = err.message
      return false
    }
  }

  async function setDevWallet(addr: Address): Promise<boolean> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) return false

    error.value = null
    try {
      const client = getPublicClient()
      const hash = await wallet.writeContract({
        address: getContractAddress('RewardDistributor'),
        abi: REWARD_DISTRIBUTOR_ABI,
        functionName: 'setDevWallet',
        args: [addr],
        chain: TARGET_CHAIN,
        account: account.value,
      })
      await client.waitForTransactionReceipt({ hash })
      await fetchAdminData()
      return true
    } catch (err: any) {
      error.value = err.message
      return false
    }
  }

  return {
    isOwner,
    isLoading,
    error,
    contractStates,
    currentMintPrice,
    contractBalance,
    currentDexTaxBps,
    currentDevWallet,
    checkOwner,
    fetchContractStates,
    fetchAdminData,
    togglePause,
    setMintPrice,
    withdrawFees,
    setDexTaxBps,
    setDevWallet,
  }
}
