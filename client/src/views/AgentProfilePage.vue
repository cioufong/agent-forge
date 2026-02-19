<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAgentNFA } from '@/composables/useAgentNFA'

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
const tiers = ['Bronze', 'Silver', 'Gold']
const tierColors = ['text-amber-600', 'text-gray-300', 'text-yellow-400']

// Agent profile from server
const agentProfile = ref<any>(null)

onMounted(async () => {
  try {
    // Try server API first
    const res = await fetch(`/api/agents/${tokenId.value}`)
    if (res.ok) {
      agentProfile.value = await res.json()
    }

    // Also try on-chain
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
    <h1 class="text-2xl font-bold">Agent #{{ tokenId }}</h1>

    <div v-if="loading" class="text-center text-[var(--color-text-secondary)] py-12">
      Loading agent data...
    </div>

    <div v-else-if="error" class="text-center text-red-400 py-12">
      {{ error }}
    </div>

    <template v-else>
      <!-- Tier & Level -->
      <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
        <div class="flex items-center justify-between">
          <div>
            <span :class="tierColors[tier]" class="text-2xl font-bold">{{ tiers[tier] }}</span>
            <span class="text-[var(--color-text-secondary)] ml-2">Tier</span>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold">Lv.{{ stats?.level || 1 }}</div>
            <div class="text-sm text-[var(--color-text-secondary)]">{{ stats?.xp || 0 }} XP</div>
          </div>
        </div>
      </div>

      <!-- Traits -->
      <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
        <h2 class="text-lg font-semibold mb-4">Traits</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-[var(--color-text-secondary)]">Intelligence</div>
            <div class="text-xl font-mono">{{ traits?.intelligence || 0 }}</div>
            <div class="w-full bg-[var(--color-bg)] rounded-full h-2 mt-1">
              <div class="bg-blue-500 h-2 rounded-full" :style="{ width: `${((traits?.intelligence || 8) - 8) * 10}%` }"></div>
            </div>
          </div>
          <div>
            <div class="text-sm text-[var(--color-text-secondary)]">Speed</div>
            <div class="text-xl font-mono">{{ traits?.speed || 0 }}</div>
            <div class="w-full bg-[var(--color-bg)] rounded-full h-2 mt-1">
              <div class="bg-green-500 h-2 rounded-full" :style="{ width: `${((traits?.speed || 8) - 8) * 10}%` }"></div>
            </div>
          </div>
          <div>
            <div class="text-sm text-[var(--color-text-secondary)]">Specialization</div>
            <div class="text-xl">{{ specializations[traits?.specialization || 0] }}</div>
          </div>
          <div>
            <div class="text-sm text-[var(--color-text-secondary)]">Talent Rarity</div>
            <div class="text-xl">{{ rarities[traits?.talentRarity || 0] }}</div>
          </div>
        </div>
      </div>

      <!-- Performance -->
      <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
        <h2 class="text-lg font-semibold mb-4">Performance</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-[var(--color-text-secondary)]">Problems Solved</div>
            <div class="text-2xl font-bold">{{ stats?.problemsSolved || 0 }}</div>
          </div>
          <div>
            <div class="text-sm text-[var(--color-text-secondary)]">Problems Attempted</div>
            <div class="text-2xl font-bold">{{ stats?.problemsAttempted || 0 }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
