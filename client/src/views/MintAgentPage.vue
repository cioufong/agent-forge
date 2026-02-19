<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWeb3 } from '@/composables/useWeb3'
import { useAgentNFA } from '@/composables/useAgentNFA'
import { formatEther } from 'viem'
import { AGENT_NFA_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

const router = useRouter()
const { isConnected, account, getPublicClient } = useWeb3()
const { mint, isMinting, mintError } = useAgentNFA()

const mintPrice = ref<string>('0')
const totalAgents = ref<number>(0)

onMounted(async () => {
  try {
    const client = getPublicClient()
    const address = getContractAddress('AgentNFA')

    const [price, supply] = await Promise.all([
      client.readContract({ address, abi: AGENT_NFA_ABI, functionName: 'mintPrice' }),
      client.readContract({ address, abi: AGENT_NFA_ABI, functionName: 'totalSupply' }),
    ])

    mintPrice.value = formatEther(price as bigint)
    totalAgents.value = Number(supply)
  } catch {}
})

async function handleMint() {
  const tokenId = await mint()
  if (tokenId) {
    router.push(`/agent/${tokenId}`)
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Mint Agent NFA</h1>

    <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)] space-y-6">
      <div class="text-center">
        <div class="text-6xl mb-4">🤖</div>
        <h2 class="text-xl font-bold">Create Your AI Agent</h2>
        <p class="text-[var(--color-text-secondary)] mt-2">
          Mint an NFA to register your AI Agent. Each agent gets unique traits that affect problem-solving performance.
        </p>
      </div>

      <div class="space-y-3 text-sm">
        <div class="flex justify-between py-2 border-b border-[var(--color-border)]">
          <span class="text-[var(--color-text-secondary)]">Mint Price</span>
          <span class="font-mono">{{ mintPrice }} BNB</span>
        </div>
        <div class="flex justify-between py-2 border-b border-[var(--color-border)]">
          <span class="text-[var(--color-text-secondary)]">Total Agents</span>
          <span class="font-mono">{{ totalAgents }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-[var(--color-text-secondary)]">Traits</span>
          <span>Intelligence, Speed, Specialization, Talent Rarity</span>
        </div>
      </div>

      <div class="bg-[var(--color-bg)] rounded-lg p-4 text-sm space-y-2">
        <div class="font-semibold text-[var(--color-primary)]">Trait Generation</div>
        <ul class="text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
          <li>Intelligence (8-18): Affects weighted score</li>
          <li>Speed (8-18): Tiebreaker priority</li>
          <li>Specialization: Math / Code / Trivia bonus</li>
          <li>Talent Rarity: Common / Rare / Epic / Legendary / Mythic</li>
        </ul>
      </div>

      <button
        v-if="isConnected"
        @click="handleMint"
        :disabled="isMinting"
        class="w-full bg-[var(--color-primary)] text-black py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {{ isMinting ? 'Minting...' : 'Mint Agent' }}
      </button>
      <div v-else class="text-center text-[var(--color-text-secondary)]">
        Connect your wallet to mint
      </div>

      <div v-if="mintError" class="text-red-400 text-sm text-center">
        {{ mintError }}
      </div>
    </div>
  </div>
</template>
