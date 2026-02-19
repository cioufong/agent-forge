<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProblem, type Phase } from '@/composables/useProblem'
import { useWebSocket } from '@/composables/useWebSocket'
import { useContractStatus } from '@/composables/useContractStatus'

const { t } = useI18n()
const { currentProblem, fetchCurrentProblem } = useProblem()
const { on, off } = useWebSocket()
const { problemManagerPaused } = useContractStatus()

const countdown = ref(0)
let countdownInterval: ReturnType<typeof setInterval> | null = null

interface EventEntry {
  id: number
  type: string
  message: string
  timestamp: number
}

const events = ref<EventEntry[]>([])
let eventCounter = 0

const recentResults = ref<Array<{
  problemId: number
  winnerTokenIds: number[]
  correctCount: number
}>>([])

const phase = computed<Phase>(() => currentProblem.value?.phase || 'submit')

const phaseLabel = computed(() => {
  const labels: Record<string, string> = {
    submit: t('common.phase.submit'),
    reveal: t('common.phase.reveal'),
    verify: t('common.phase.verify'),
    resolving: t('common.phase.resolving'),
    resolved: t('common.phase.resolved'),
  }
  return labels[phase.value] || ''
})

const phaseStatusText = computed(() => {
  const msgs: Record<string, string> = {
    submit: t('battle.status.submit'),
    reveal: t('battle.status.reveal'),
    verify: t('battle.status.verify'),
    resolving: t('battle.status.resolving'),
    resolved: t('battle.status.resolved'),
  }
  return msgs[phase.value] || ''
})

const phases: Phase[] = ['submit', 'reveal', 'verify', 'resolving', 'resolved']

const currentDeadline = computed(() => {
  const p = currentProblem.value
  if (!p) return 0
  if (phase.value === 'submit') return p.submitDeadline || 0
  if (phase.value === 'reveal') return p.revealDeadline || 0
  if (phase.value === 'verify') return p.verifyDeadline || 0
  return 0
})

const countdownFormatted = computed(() => {
  const m = Math.floor(countdown.value / 60)
  const s = countdown.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval)
  countdownInterval = setInterval(() => {
    const dl = currentDeadline.value
    countdown.value = dl > 0 ? Math.max(0, dl - Math.floor(Date.now() / 1000)) : 0
  }, 1000)
}

function pushEvent(type: string, message: string) {
  events.value.unshift({ id: ++eventCounter, type, message, timestamp: Date.now() })
  if (events.value.length > 20) events.value.pop()
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function eventPrefix(type: string): string {
  const map: Record<string, string> = {
    'new-problem': t('battle.prefix.quest'),
    'phase-change': t('battle.prefix.phase'),
    'resolved': t('battle.prefix.clear'),
    'submit': t('battle.prefix.hash'),
    'reveal': t('battle.prefix.show'),
    'xp': t('battle.prefix.exp'),
    'rewards': t('battle.prefix.loot'),
  }
  return map[type] || t('battle.prefix.sys')
}

function onNewProblem(data: any) {
  fetchCurrentProblem(); startCountdown()
  pushEvent('new-problem', t('battle.event.newQuest', { id: data?.problemId ?? '?' }))
}

function onPhaseChange(data: any) {
  fetchCurrentProblem()
  pushEvent('phase-change', t('battle.event.phaseChange', { phase: data?.phase ?? '?' }))
}

function onProblemResolved(data: any) {
  const d = data || {}
  recentResults.value.unshift({
    problemId: d.problemId ?? 0,
    winnerTokenIds: d.winnerTokenIds ?? [],
    correctCount: d.correctCount ?? 0,
  })
  if (recentResults.value.length > 10) recentResults.value.pop()
  fetchCurrentProblem()
  pushEvent('resolved', t('battle.event.resolved', { id: d.problemId ?? '?', count: d.correctCount ?? 0 }))
}

function onAnswerSubmitted(data: any) {
  pushEvent('submit', t('battle.event.submit', { id: data?.tokenId ?? '?' }))
}
function onAnswerRevealed(data: any) {
  pushEvent('reveal', t('battle.event.reveal', { id: data?.tokenId ?? '?' }))
}
function onXpGranted(data: any) {
  pushEvent('xp', t('battle.event.xp', { id: data?.tokenId ?? '?', xp: data?.xp ?? '?' }))
}
function onRewardsDistributed(data: any) {
  pushEvent('rewards', t('battle.event.rewards', { id: data?.problemId ?? '?' }))
}

onMounted(async () => {
  on('new-problem', onNewProblem)
  on('phase-change', onPhaseChange)
  on('problem-resolved', onProblemResolved)
  on('problem-resolved-chain', onProblemResolved)
  on('answer-submitted', onAnswerSubmitted)
  on('answer-revealed', onAnswerRevealed)
  on('xp-granted', onXpGranted)
  on('rewards-distributed', onRewardsDistributed)
  await fetchCurrentProblem()
  startCountdown()
})

onUnmounted(() => {
  off('new-problem', onNewProblem)
  off('phase-change', onPhaseChange)
  off('problem-resolved', onProblemResolved)
  off('problem-resolved-chain', onProblemResolved)
  off('answer-submitted', onAnswerSubmitted)
  off('answer-revealed', onAnswerRevealed)
  off('xp-granted', onXpGranted)
  off('rewards-distributed', onRewardsDistributed)
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <h1>{{ t('battle.title') }}</h1>

    <!-- Current Quest Card -->
    <div class="rpg-box relative">
      <span class="rpg-box-title">{{ t('battle.currentQuest') }}</span>
      <div v-if="currentProblem" class="space-y-4 mt-2">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-3">
            <span class="text-[8px] px-2 py-1 bg-[var(--color-bg)] border-2 border-[var(--color-primary)] text-[var(--color-primary)]">
              {{ currentProblem.category }}
            </span>
            <span class="text-[8px] px-2 py-1 bg-[var(--color-bg)] border-2 border-[var(--color-border)]">
              {{ currentProblem.difficulty }}
            </span>
            <span class="text-[8px] text-[var(--color-text-secondary)]">#{{ currentProblem.id }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[9px] text-[var(--color-xp)]">{{ phaseLabel }}</span>
            <span v-if="countdown > 0" class="text-[var(--color-primary)] text-[14px]">
              {{ countdownFormatted }}
            </span>
          </div>
        </div>

        <p class="text-[12px] py-2">{{ currentProblem.questionText }}</p>

        <!-- Phase Status -->
        <div class="text-[9px] text-[var(--color-text-secondary)]">
          <span v-if="phase !== 'resolved'" class="text-[var(--color-xp)] blink">&block;</span>
          {{ phaseStatusText }}
        </div>

        <!-- Phase Progress Bar -->
        <div class="pixel-bar">
          <div
            v-for="p in phases" :key="p"
            :class="[
              'pixel-bar-segment flex-1',
              phases.indexOf(p) <= phases.indexOf(phase) ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
            ]"
          />
        </div>

        <!-- Resolved -->
        <div v-if="phase === 'resolved'" class="bg-[var(--color-bg)] border-2 border-[var(--color-xp)] p-4 text-center">
          <span class="text-[var(--color-xp)] text-[12px]">{{ t('battle.questClear') }}</span>
        </div>
      </div>
      <div v-else-if="problemManagerPaused" class="text-center py-8">
        <span class="text-[var(--color-gold)]">&#9888;</span>
        <span class="text-[var(--color-text-secondary)] text-[9px] ml-2">{{ t('common.contractPaused') }}</span>
      </div>
      <div v-else class="text-center text-[var(--color-text-secondary)] py-8">
        {{ t('common.waitingForQuest') }}<span class="blink">_</span>
      </div>
    </div>

    <!-- Event Feed -->
    <div class="rpg-box relative">
      <span class="rpg-box-title">{{ t('battle.eventLog') }}</span>
      <div v-if="events.length > 0" class="space-y-1 max-h-72 overflow-y-auto mt-2">
        <div
          v-for="event in events" :key="event.id"
          class="flex items-start gap-2 text-[9px] py-1 border-b border-[var(--color-bg)] last:border-0"
        >
          <span class="text-[8px] text-[var(--color-border-light)] shrink-0 mt-0.5">
            {{ formatTime(event.timestamp) }}
          </span>
          <span :class="{
            'text-[var(--color-xp)]': event.type === 'submit' || event.type === 'xp',
            'text-[var(--color-mp)]': event.type === 'reveal',
            'text-[var(--color-primary)]': event.type === 'new-problem' || event.type === 'rewards',
            'text-[var(--color-text)]': event.type === 'resolved' || event.type === 'phase-change',
          }">
            <span class="text-[var(--color-border-light)]">{{ eventPrefix(event.type) }}</span> {{ event.message }}
          </span>
        </div>
      </div>
      <div v-else class="text-center text-[var(--color-text-secondary)] py-4 text-[9px] mt-2">
        {{ t('battle.noEvents') }}<span class="blink">_</span>
      </div>
    </div>

    <!-- Recent Results -->
    <div class="rpg-box relative">
      <span class="rpg-box-title">{{ t('battle.questHistory') }}</span>
      <div v-if="recentResults.length > 0" class="space-y-2 mt-2">
        <div
          v-for="result in recentResults" :key="result.problemId"
          class="flex items-center justify-between text-[9px] py-2 border-b border-[var(--color-bg)] last:border-0"
        >
          <span>Quest #{{ result.problemId }}</span>
          <div class="flex items-center gap-4">
            <span class="text-[var(--color-xp)]">{{ result.correctCount }} {{ t('battle.correct') }}</span>
            <span v-if="result.winnerTokenIds.length > 0" class="text-[var(--color-text-secondary)]">
              {{ t('battle.winners') }}
              <template v-for="(w, i) in result.winnerTokenIds" :key="w">
                <RouterLink :to="`/agent/${w}`" class="text-[var(--color-primary)]">#{{ w }}</RouterLink>
                <span v-if="i < result.winnerTokenIds.length - 1">, </span>
              </template>
            </span>
            <span v-else class="text-[var(--color-text-secondary)]">{{ t('battle.noWinners') }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-[var(--color-text-secondary)] py-4 text-[9px] mt-2">
        {{ t('common.noResults') }}
      </div>
    </div>
  </div>
</template>
