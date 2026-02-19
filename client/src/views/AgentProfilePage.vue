<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAgentNFA } from '@/composables/useAgentNFA'

const { t } = useI18n()
const route = useRoute()
const { getTraits, getStats, getTier } = useAgentNFA()

const tokenId = computed(() => Number(route.params.tokenId))
const traits = ref<any>(null)
const stats = ref<any>(null)
const tier = ref<number>(0)
const loading = ref(true)
const error = ref<string | null>(null)

const specializations = ['Math', 'Code', 'Trivia']
const rarities = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic']
const tiers = computed(() => [t('common.tier.bronze'), t('common.tier.silver'), t('common.tier.gold')])
const tierColors = ['text-[var(--color-bronze)]', 'text-[var(--color-silver)]', 'text-[var(--color-gold)]']

const agentProfile = ref<any>(null)

function traitPercent(val: number): number {
  return Math.round(((val - 8) / 10) * 100)
}

function traitSegments(val: number): number {
  return Math.round(((val - 8) / 10) * 10)
}

onMounted(async () => {
  try {
    const res = await fetch(`/api/agents/${tokenId.value}`)
    if (res.ok) agentProfile.value = await res.json()
    traits.value = await getTraits(tokenId.value)
    stats.value = await getStats(tokenId.value)
    tier.value = await getTier(tokenId.value)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1>{{ t('agent.title', { id: tokenId }) }}</h1>

    <div v-if="loading" class="rpg-box text-center text-[var(--color-text-secondary)] py-12">
      {{ t('common.loading') }}<span class="blink">_</span>
    </div>

    <div v-else-if="error" class="rpg-box text-center text-[var(--color-hp)] py-12">
      {{ error }}
    </div>

    <template v-else>
      <!-- Tier & Level -->
      <div class="rpg-box relative">
        <span class="rpg-box-title">{{ t('agent.status') }}</span>
        <div class="flex items-center justify-between mt-2">
          <div>
            <span :class="tierColors[tier]" class="text-[20px]">{{ tiers[tier] }}</span>
            <span class="text-[8px] text-[var(--color-text-secondary)] ml-2 uppercase">{{ t('agent.tier') }}</span>
          </div>
          <div class="text-right">
            <div class="text-[24px] text-[var(--color-primary)]">LV.{{ stats?.level || 1 }}</div>
            <div class="text-[8px] text-[var(--color-text-secondary)]">{{ stats?.xp || 0 }} EXP</div>
          </div>
        </div>

        <!-- EXP Bar -->
        <div class="mt-4">
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase mb-1">{{ t('agent.exp') }}</div>
          <div class="pixel-bar">
            <div
              v-for="i in 20" :key="i"
              :class="['pixel-bar-segment flex-1', i <= Math.min(20, (stats?.xp || 0) % 20 || 20) ? 'bg-[var(--color-xp)]' : 'bg-[var(--color-border)]']"
            />
          </div>
        </div>
      </div>

      <!-- Traits -->
      <div class="rpg-box relative">
        <span class="rpg-box-title">{{ t('agent.traits') }}</span>
        <div class="space-y-4 mt-2">
          <div>
            <div class="flex justify-between text-[9px] mb-1">
              <span class="text-[var(--color-mp)]">INT</span>
              <span>{{ traits?.intelligence || 0 }}</span>
            </div>
            <div class="pixel-bar">
              <div
                v-for="i in 10" :key="i"
                :class="['pixel-bar-segment flex-1', i <= traitSegments(traits?.intelligence || 8) ? 'bg-[var(--color-mp)]' : 'bg-[var(--color-border)]']"
              />
            </div>
          </div>
          <div>
            <div class="flex justify-between text-[9px] mb-1">
              <span class="text-[var(--color-xp)]">SPD</span>
              <span>{{ traits?.speed || 0 }}</span>
            </div>
            <div class="pixel-bar">
              <div
                v-for="i in 10" :key="i"
                :class="['pixel-bar-segment flex-1', i <= traitSegments(traits?.speed || 8) ? 'bg-[var(--color-xp)]' : 'bg-[var(--color-border)]']"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-[9px]">
            <div>
              <span class="text-[var(--color-text-secondary)]">SPEC:</span>
              <span class="text-[var(--color-primary)] ml-2">{{ specializations[traits?.specialization || 0] }}</span>
            </div>
            <div>
              <span class="text-[var(--color-text-secondary)]">RARE:</span>
              <span class="text-[var(--color-primary)] ml-2">{{ rarities[traits?.talentRarity || 0] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance -->
      <div class="rpg-box relative">
        <span class="rpg-box-title">{{ t('agent.battleRecord') }}</span>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div class="text-center">
            <div class="text-[8px] text-[var(--color-text-secondary)] uppercase">{{ t('agent.questsCleared') }}</div>
            <div class="text-[20px] text-[var(--color-xp)] mt-2">{{ stats?.problemsSolved || 0 }}</div>
          </div>
          <div class="text-center">
            <div class="text-[8px] text-[var(--color-text-secondary)] uppercase">{{ t('agent.questsAttempted') }}</div>
            <div class="text-[20px] mt-2">{{ stats?.problemsAttempted || 0 }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
