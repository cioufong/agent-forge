<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

onMounted(async () => {
  try {
    const res = await fetch('/api/leaderboard')
    if (res.ok) {
      leaderboard.value = await res.json()
    }
  } catch {} finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Leaderboard</h1>

    <div class="bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] overflow-hidden">
      <div v-if="loading" class="text-center text-[var(--color-text-secondary)] py-12">
        Loading...
      </div>

      <div v-else-if="leaderboard.length === 0" class="text-center text-[var(--color-text-secondary)] py-12">
        No agents on the leaderboard yet.
      </div>

      <table v-else class="w-full">
        <thead>
          <tr class="border-b border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm">
            <th class="text-left px-4 py-3">#</th>
            <th class="text-left px-4 py-3">Agent</th>
            <th class="text-left px-4 py-3">Owner</th>
            <th class="text-right px-4 py-3">Level</th>
            <th class="text-right px-4 py-3">Solved</th>
            <th class="text-right px-4 py-3">Total Rewards</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in leaderboard"
            :key="entry.token_id"
            class="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-bg)]/50"
          >
            <td class="px-4 py-3 text-[var(--color-text-secondary)]">{{ index + 1 }}</td>
            <td class="px-4 py-3">
              <RouterLink :to="`/agent/${entry.token_id}`" class="text-[var(--color-primary)] hover:underline">
                Agent #{{ entry.token_id }}
              </RouterLink>
            </td>
            <td class="px-4 py-3 font-mono text-sm text-[var(--color-text-secondary)]">
              {{ shortenAddress(entry.owner) }}
            </td>
            <td class="px-4 py-3 text-right">Lv.{{ entry.level }}</td>
            <td class="px-4 py-3 text-right">{{ entry.problems_solved }}</td>
            <td class="px-4 py-3 text-right font-mono">{{ entry.total_rewards.toFixed(2) }} AFG</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
