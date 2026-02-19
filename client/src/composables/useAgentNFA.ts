import { ref } from 'vue'
import { parseEther, type Address } from 'viem'
import { useWeb3 } from './useWeb3'
import { AGENT_NFA_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

export function useAgentNFA() {
  const { getPublicClient, getWalletClient, account, TARGET_CHAIN } = useWeb3()
  const isMinting = ref(false)
  const mintError = ref<string | null>(null)

  async function mint(): Promise<number | null> {
    const wallet = getWalletClient()
    if (!wallet || !account.value) {
      mintError.value = 'Wallet not connected'
      return null
    }

    isMinting.value = true
    mintError.value = null

    try {
      const address = getContractAddress('AgentNFA')
      const client = getPublicClient()

      // Read mint price
      const mintPrice = await client.readContract({
        address,
        abi: AGENT_NFA_ABI,
        functionName: 'mintPrice',
      }) as bigint

      const hash = await wallet.writeContract({
        address,
        abi: AGENT_NFA_ABI,
        functionName: 'mint',
        value: mintPrice,
        chain: TARGET_CHAIN,
        account: account.value!,
      })

      const receipt = await client.waitForTransactionReceipt({ hash })

      // Parse AgentMinted event to get tokenId
      const mintEvent = receipt.logs.find(log => {
        try {
          return log.topics[0] === '0x' // Will be the event topic
        } catch { return false }
      })

      // Get tokenId from the event or total supply
      const totalSupply = await client.readContract({
        address,
        abi: AGENT_NFA_ABI,
        functionName: 'totalSupply',
      }) as bigint

      return Number(totalSupply)
    } catch (err: any) {
      mintError.value = err.message
      return null
    } finally {
      isMinting.value = false
    }
  }

  async function getTraits(tokenId: number) {
    const client = getPublicClient()
    const address = getContractAddress('AgentNFA')

    return client.readContract({
      address,
      abi: AGENT_NFA_ABI,
      functionName: 'getTraits',
      args: [BigInt(tokenId)],
    })
  }

  async function getStats(tokenId: number) {
    const client = getPublicClient()
    const address = getContractAddress('AgentNFA')

    return client.readContract({
      address,
      abi: AGENT_NFA_ABI,
      functionName: 'getStats',
      args: [BigInt(tokenId)],
    })
  }

  async function getTier(tokenId: number): Promise<number> {
    const client = getPublicClient()
    const address = getContractAddress('AgentNFA')

    return Number(await client.readContract({
      address,
      abi: AGENT_NFA_ABI,
      functionName: 'getTier',
      args: [BigInt(tokenId)],
    }))
  }

  async function getAgentsByOwner(owner: Address): Promise<number[]> {
    const client = getPublicClient()
    const address = getContractAddress('AgentNFA')

    const totalSupply = Number(await client.readContract({
      address,
      abi: AGENT_NFA_ABI,
      functionName: 'totalSupply',
    }))

    const ownedTokens: number[] = []
    for (let i = 1; i <= totalSupply; i++) {
      try {
        const tokenOwner = await client.readContract({
          address,
          abi: AGENT_NFA_ABI,
          functionName: 'ownerOf',
          args: [BigInt(i)],
        }) as Address

        if (tokenOwner.toLowerCase() === owner.toLowerCase()) {
          ownedTokens.push(i)
        }
      } catch { /* burned or non-existent */ }
    }

    return ownedTokens
  }

  return {
    mint,
    isMinting,
    mintError,
    getTraits,
    getStats,
    getTier,
    getAgentsByOwner,
  }
}
