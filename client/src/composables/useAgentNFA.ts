import { ref } from 'vue'
import { parseEther, isAddressEqual, type Address } from 'viem'
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

      await client.waitForTransactionReceipt({ hash })

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

    if (totalSupply === 0) return []

    // Batch ownerOf calls via multicall instead of sequential RPC
    // Keep batch small to stay within public RPC calldata/gas limits (BSC: 10K req/5min)
    const BATCH_SIZE = 50
    const ownedTokens: number[] = []

    for (let start = 1; start <= totalSupply; start += BATCH_SIZE) {
      const end = Math.min(start + BATCH_SIZE - 1, totalSupply)
      const calls = []
      for (let i = start; i <= end; i++) {
        calls.push({
          address,
          abi: AGENT_NFA_ABI,
          functionName: 'ownerOf',
          args: [BigInt(i)],
        } as const)
      }

      try {
        const results = await client.multicall({
          contracts: calls,
          batchSize: 2048, // limit calldata per multicall to 2KB
        })

        for (let j = 0; j < results.length; j++) {
          const result = results[j]
          if (result.status === 'success' && isAddressEqual(result.result as Address, owner)) {
            ownedTokens.push(start + j)
          }
        }
      } catch {
        // Fallback: sequential calls for this batch on RPC error
        for (let i = start; i <= end; i++) {
          try {
            const tokenOwner = await client.readContract({
              address,
              abi: AGENT_NFA_ABI,
              functionName: 'ownerOf',
              args: [BigInt(i)],
            }) as Address
            if (isAddressEqual(tokenOwner, owner)) {
              ownedTokens.push(i)
            }
          } catch { /* burned or non-existent */ }
        }
      }
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
