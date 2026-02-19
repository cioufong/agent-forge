<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface LeaderboardEntry {
  token_id: number
  owner: string
  total_rewards: number
  problems_solved: number
  level: number
  xp: number
}

const leaderboard = ref<LeaderboardEntry[]>([])
const loading = ref(true)

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

function rankBadge(index: number): string {
  if (index === 0) return '\u2605' // star
  if (index === 1) return '\u25C6' // diamond
  if (index === 2) return '\u25B2' // triangle
  return `${index + 1}`
}

function rankColor(index: number): string {
  if (index === 0) return 'text-[var(--color-gold)]'
  if (index === 1) return 'text-[var(--color-silver)]'
  if (index === 2) return 'text-[var(--color-bronze)]'
  return 'text-[var(--color-text-secondary)]'
}

onMounted(async () => {
  try {
    const res = await fetch('/api/leaderboard')
    if (res.ok) leaderboard.value = await res.json()
  } catch {} finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1>{{ t('rankings.title') }}</h1>

    <div class="rpg-box relative">
      <span class="rpg-box-title">{{ t('rankings.boxTitle') }}</span>

      <div v-if="loading" class="text-center text-[var(--color-text-secondary)] py-12 mt-2">
        {{ t('common.loading') }}<span class="blink">_</span>
      </div>

      <div v-else-if="leaderboard.length === 0" class="text-center text-[var(--color-text-secondary)] py-12 mt-2">
        {{ t('rankings.noAgents') }}
      </div>

      <table v-else class="w-full mt-2">
        <thead>
          <tr class="border-b-[3px] border-[var(--color-border)] text-[8px] text-[var(--color-text-secondary)] uppercase">
            <th class="text-left px-3 py-2">{{ t('rankings.rank') }}</th>
            <th class="text-left px-3 py-2">{{ t('rankings.agent') }}</th>
            <th class="text-left px-3 py-2 hidden md:table-cell">{{ t('rankings.owner') }}</th>
            <th class="text-right px-3 py-2">{{ t('rankings.level') }}</th>
            <th class="text-right px-3 py-2">{{ t('rankings.solved') }}</th>
            <th class="text-right px-3 py-2">{{ t('rankings.rewards') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in leaderboard"
            :key="entry.token_id"
            class="border-b border-[var(--color-bg)] hover:bg-[var(--color-bg)]"
          >
            <td class="px-3 py-2 text-[9px]" :class="rankColor(index)">{{ rankBadge(index) }}</td>
            <td class="px-3 py-2 text-[9px]">
              <RouterLink :to="`/agent/${entry.token_id}`" class="text-[var(--color-primary)]">
                {{ t('agent.title', { id: entry.token_id }) }}
              </RouterLink>
            </td>
            <td class="px-3 py-2 text-[8px] text-[var(--color-text-secondary)] hidden md:table-cell">
              {{ shortenAddress(entry.owner) }}
            </td>
            <td class="px-3 py-2 text-[9px] text-right">{{ entry.level }}</td>
            <td class="px-3 py-2 text-[9px] text-right text-[var(--color-xp)]">{{ entry.problems_solved }}</td>
            <td class="px-3 py-2 text-[9px] text-right text-[var(--color-primary)]">{{ entry.total_rewards.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
