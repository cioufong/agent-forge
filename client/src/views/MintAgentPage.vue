<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useWeb3 } from '@/composables/useWeb3'
import { useAgentNFA } from '@/composables/useAgentNFA'
import { useContractStatus } from '@/composables/useContractStatus'
import { formatEther } from 'viem'
import { AGENT_NFA_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

const { t } = useI18n()
const router = useRouter()
const { isConnected, account, getPublicClient } = useWeb3()
const { mint, isMinting, mintError } = useAgentNFA()
const { agentNFAPaused } = useContractStatus()

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
  if (tokenId) router.push(`/agent/${tokenId}`)
}
</script>

<template>
  <div class="max-w-lg mx-auto space-y-6">
    <h1>{{ t('summon.title') }}</h1>

    <div class="rpg-box relative space-y-6">
      <span class="rpg-box-title">{{ t('summon.boxTitle') }}</span>

      <div class="text-center mt-2">
        <div class="text-[32px] leading-none mb-4">
          <span class="text-[var(--color-primary)]">&loz;</span>
          <span class="text-[var(--color-mp)]">&loz;</span>
          <span class="text-[var(--color-xp)]">&loz;</span>
        </div>
        <h2 class="text-[var(--color-primary)]">{{ t('summon.heading') }}</h2>
        <p class="text-[var(--color-text-secondary)] mt-3 text-[9px]">
          {{ t('summon.desc') }}
        </p>
      </div>

      <hr class="pixel-divider" />

      <div class="space-y-3 text-[9px]">
        <div class="flex justify-between py-2 border-b border-[var(--color-bg)]">
          <span class="text-[var(--color-text-secondary)]">{{ t('summon.mintPrice') }}</span>
          <span class="text-[var(--color-primary)]">{{ mintPrice }} BNB</span>
        </div>
        <div class="flex justify-between py-2 border-b border-[var(--color-bg)]">
          <span class="text-[var(--color-text-secondary)]">{{ t('summon.totalAgents') }}</span>
          <span>{{ totalAgents }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-[var(--color-text-secondary)]">{{ t('summon.traits') }}</span>
          <span>INT, SPD, SPEC, RARE</span>
        </div>
      </div>

      <div class="bg-[var(--color-bg)] border-2 border-[var(--color-border)] p-3 text-[9px] space-y-1">
        <div class="text-[var(--color-primary)] text-[8px] uppercase tracking-wider mb-2">{{ t('summon.traitRolls') }}</div>
        <div class="text-[var(--color-text-secondary)]">&triangleright; {{ t('summon.intRoll') }}</div>
        <div class="text-[var(--color-text-secondary)]">&triangleright; {{ t('summon.spdRoll') }}</div>
        <div class="text-[var(--color-text-secondary)]">&triangleright; {{ t('summon.specRoll') }}</div>
        <div class="text-[var(--color-text-secondary)]">&triangleright; {{ t('summon.rareRoll') }}</div>
      </div>

      <div v-if="agentNFAPaused" class="text-center py-2">
        <span class="text-[var(--color-gold)]">&#9888;</span>
        <span class="text-[var(--color-text-secondary)] text-[9px] ml-2">{{ t('common.contractPaused') }}</span>
      </div>
      <button
        v-else-if="isConnected"
        @click="handleMint"
        :disabled="isMinting"
        class="rpg-btn w-full text-center"
      >
        {{ isMinting ? t('summon.summoning') : t('summon.summonBtn') }}
      </button>
      <div v-else class="text-center text-[var(--color-text-secondary)] text-[9px]">
        {{ t('summon.connectToSummon') }}
      </div>

      <div v-if="mintError" class="text-[var(--color-hp)] text-[9px] text-center">
        {{ mintError }}
      </div>
    </div>
  </div>
</template>
