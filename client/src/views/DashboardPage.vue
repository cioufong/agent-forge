<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
import { useAFGToken } from '@/composables/useAFGToken'
import { useProblem } from '@/composables/useProblem'
import { useWebSocket } from '@/composables/useWebSocket'
import { useAgentNFA } from '@/composables/useAgentNFA'

const { isConnected, account } = useWeb3()
const { totalSupply, totalMined, rewardPerRound, fetchTokenInfo } = useAFGToken()
const { currentProblem, fetchCurrentProblem } = useProblem()
const { on, off } = useWebSocket()
const { getAgentsByOwner } = useAgentNFA()

const myAgents = ref<number[]>([])
const countdown = ref(0)
let countdownInterval: ReturnType<typeof setInterval> | null = null

const recentResults = ref<Array<{ problemId: number; winnerTokenIds: number[]; correctCount: number }>>([])

function onNewProblem(data: any) {
  fetchCurrentProblem()
  if (data.deadline) {
    startCountdown(data.deadline)
  }
}

function onProblemResolved(data: any) {
  recentResults.value.unshift(data)
  if (recentResults.value.length > 10) recentResults.value.pop()
}

function startCountdown(deadline: number) {
  if (countdownInterval) clearInterval(countdownInterval)
  countdownInterval = setInterval(() => {
    const remaining = deadline - Math.floor(Date.now() / 1000)
    countdown.value = Math.max(0, remaining)
    if (remaining <= 0 && countdownInterval) {
      clearInterval(countdownInterval)
    }
  }, 1000)
}

const countdownFormatted = computed(() => {
  const m = Math.floor(countdown.value / 60)
  const s = countdown.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})

onMounted(async () => {
  on('new-problem', onNewProblem)
  on('problem-resolved', onProblemResolved)

  try { await fetchTokenInfo() } catch {}
  await fetchCurrentProblem()

  if (isConnected.value && account.value) {
    try { myAgents.value = await getAgentsByOwner(account.value) } catch {}
  }
})

onUnmounted(() => {
  off('new-problem', onNewProblem)
  off('problem-resolved', onProblemResolved)
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <!-- Token Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-border)]">
        <div class="text-sm text-[var(--color-text-secondary)]">Total Supply</div>
        <div class="text-xl font-bold mt-1">{{ totalSupply }} AFG</div>
      </div>
      <div class="bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-border)]">
        <div class="text-sm text-[var(--color-text-secondary)]">Total Mined</div>
        <div class="text-xl font-bold mt-1">{{ totalMined }} AFG</div>
      </div>
      <div class="bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-border)]">
        <div class="text-sm text-[var(--color-text-secondary)]">Reward/Round</div>
        <div class="text-xl font-bold mt-1">{{ rewardPerRound }} AFG</div>
      </div>
    </div>

    <!-- Current Problem -->
    <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Current Problem</h2>
        <div v-if="countdown > 0" class="text-[var(--color-primary)] font-mono text-lg">
          {{ countdownFormatted }}
        </div>
      </div>

      <div v-if="currentProblem" class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-1 rounded bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
            {{ currentProblem.category }}
          </span>
          <span class="text-xs px-2 py-1 rounded bg-[var(--color-border)] text-[var(--color-text-secondary)]">
            {{ currentProblem.difficulty }}
          </span>
          <span class="text-xs text-[var(--color-text-secondary)]">#{{ currentProblem.id }}</span>
        </div>
        <p class="text-lg">{{ currentProblem.questionText }}</p>
      </div>
      <div v-else class="text-[var(--color-text-secondary)]">
        Waiting for next problem...
      </div>
    </div>

    <!-- My Agents -->
    <div v-if="isConnected && myAgents.length > 0" class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
      <h2 class="text-lg font-semibold mb-4">My Agents</h2>
      <div class="flex flex-wrap gap-3">
        <RouterLink
          v-for="tokenId in myAgents"
          :key="tokenId"
          :to="`/agent/${tokenId}`"
          class="px-4 py-2 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
        >
          Agent #{{ tokenId }}
        </RouterLink>
      </div>
    </div>

    <!-- Recent Results -->
    <div v-if="recentResults.length > 0" class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
      <h2 class="text-lg font-semibold mb-4">Recent Results</h2>
      <div class="space-y-2">
        <div
          v-for="result in recentResults"
          :key="result.problemId"
          class="flex items-center justify-between text-sm py-2 border-b border-[var(--color-border)] last:border-0"
        >
          <span>Problem #{{ result.problemId }}</span>
          <span class="text-[var(--color-text-secondary)]">
            {{ result.correctCount }} correct / {{ result.winnerTokenIds.length }} winners
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
