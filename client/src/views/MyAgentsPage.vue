<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWeb3 } from '@/composables/useWeb3'
import { useAgentNFA } from '@/composables/useAgentNFA'
import { AGENT_NFA_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'

const { t } = useI18n()
const { isConnected, account, getPublicClient } = useWeb3()
const { getAgentsByOwner, getTraits, getStats, getTier } = useAgentNFA()

interface AgentInfo {
  tokenId: number
  tier: number
  level: number
  xp: number
  intelligence: number
  speed: number
  specialization: number
  talentRarity: number
  problemsSolved: number
  problemsAttempted: number
  eligible: boolean
}

const agents = ref<AgentInfo[]>([])
const loading = ref(false)

const specializations = ['Math', 'Code', 'Trivia']
const rarities = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic']
const tierNames = ['bronze', 'silver', 'gold'] as const
const tierColors = ['var(--color-bronze)', 'var(--color-silver)', 'var(--color-gold)']

async function loadAgents() {
  if (!account.value) return
  loading.value = true
  agents.value = []

  try {
    const tokenIds = await getAgentsByOwner(account.value)
    const client = getPublicClient()
    const address = getContractAddress('AgentNFA')

    const results = await Promise.all(
      tokenIds.map(async (id) => {
        const [traits, stats, tier, eligible] = await Promise.all([
          getTraits(id) as Promise<any>,
          getStats(id) as Promise<any>,
          getTier(id),
          client.readContract({
            address,
            abi: AGENT_NFA_ABI,
            functionName: 'isEligible',
            args: [BigInt(id)],
          }).catch(() => false) as Promise<boolean>,
        ])
        return {
          tokenId: id,
          tier,
          level: Number(stats.level),
          xp: Number(stats.xp),
          intelligence: Number(traits.intelligence),
          speed: Number(traits.speed),
          specialization: Number(traits.specialization),
          talentRarity: Number(traits.talentRarity),
          problemsSolved: Number(stats.problemsSolved),
          problemsAttempted: Number(stats.problemsAttempted),
          eligible: eligible as boolean,
        }
      })
    )
    agents.value = results
  } catch {}
  loading.value = false
}

onMounted(() => { if (isConnected.value) loadAgents() })
watch(account, () => { if (account.value) loadAgents() })
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <h1>{{ t('myAgents.title') }}</h1>

    <!-- Not connected -->
    <div v-if="!isConnected" class="rpg-box text-center text-[var(--color-text-secondary)] text-[9px] py-8">
      {{ t('myAgents.connectToView') }}
    </div>

    <!-- Loading -->
    <div v-else-if="loading" class="rpg-box text-center text-[var(--color-text-secondary)] text-[9px] py-8">
      {{ t('myAgents.loading') }}<span class="blink">_</span>
    </div>

    <!-- No agents -->
    <div v-else-if="agents.length === 0" class="rpg-box text-center py-8 space-y-4">
      <div class="text-[var(--color-text-secondary)] text-[9px]">{{ t('myAgents.noAgents') }}</div>
      <RouterLink to="/mint" class="rpg-btn no-underline hover:no-underline inline-block">
        {{ t('myAgents.summonFirst') }}
      </RouterLink>
    </div>

    <!-- Agent cards -->
    <div v-else class="space-y-4">
      <RouterLink
        v-for="agent in agents" :key="agent.tokenId"
        :to="`/agent/${agent.tokenId}`"
        class="rpg-box block no-underline hover:no-underline hover:!border-[var(--color-primary)] transition-colors"
      >
        <div class="flex items-center justify-between gap-4">
          <!-- Left: ID + Tier + Level -->
          <div class="flex items-center gap-4">
            <div class="text-center min-w-[48px]">
              <div class="text-[16px] text-[var(--color-primary)]">#{{ agent.tokenId }}</div>
              <div class="text-[8px] uppercase" :style="{ color: tierColors[agent.tier] }">
                {{ t(`common.tier.${tierNames[agent.tier]}`) }}
              </div>
            </div>
            <div>
              <div class="text-[12px]">LV.{{ agent.level }}</div>
              <div class="text-[8px] text-[var(--color-text-secondary)]">{{ agent.xp }} EXP</div>
            </div>
          </div>

          <!-- Center: Traits -->
          <div class="hidden md:flex items-center gap-4 text-[8px]">
            <div class="text-center">
              <div class="text-[var(--color-mp)]">INT</div>
              <div>{{ agent.intelligence }}</div>
            </div>
            <div class="text-center">
              <div class="text-[var(--color-xp)]">SPD</div>
              <div>{{ agent.speed }}</div>
            </div>
            <div class="text-center">
              <div class="text-[var(--color-text-secondary)]">SPEC</div>
              <div>{{ specializations[agent.specialization] }}</div>
            </div>
            <div class="text-center">
              <div class="text-[var(--color-text-secondary)]">RARE</div>
              <div>{{ rarities[agent.talentRarity] }}</div>
            </div>
          </div>

          <!-- Right: Stats + Eligibility -->
          <div class="text-right text-[8px] space-y-1">
            <div>
              <span
                :class="agent.eligible ? 'text-[var(--color-xp)]' : 'text-[var(--color-text-secondary)]'"
              >{{ agent.eligible ? t('myAgents.eligible') : t('myAgents.ineligible') }}</span>
            </div>
            <div class="text-[var(--color-text-secondary)]">
              {{ t('myAgents.solved') }} {{ agent.problemsSolved }} / {{ t('myAgents.attempted') }} {{ agent.problemsAttempted }}
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
