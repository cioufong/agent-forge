<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAFGToken } from '@/composables/useAFGToken'
import { useProblem, type Phase } from '@/composables/useProblem'
import { useWebSocket } from '@/composables/useWebSocket'
import { useWeb3 } from '@/composables/useWeb3'
import { AGENT_NFA_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'
import { useContractStatus } from '@/composables/useContractStatus'

const { t } = useI18n()

const { totalSupply: afgSupply, totalMined, rewardPerRound, currentRound, roundsUntilHalving, fetchTokenInfo } = useAFGToken()
const { currentProblem, fetchCurrentProblem } = useProblem()
const { on, off } = useWebSocket()
const { getPublicClient } = useWeb3()

const { problemManagerPaused } = useContractStatus()
const totalAgents = ref('0')
const copiedSkill = ref<string | null>(null)

function copySkillUrl(path: string) {
  const url = window.location.origin + path
  navigator.clipboard.writeText(url)
  copiedSkill.value = path.includes('solver') ? 'solver' : 'verifier'
  setTimeout(() => { copiedSkill.value = null }, 2000)
}

function formatNumber(val: string): string {
  const n = Math.floor(Number(val))
  return n.toLocaleString()
}
const countdown = ref(0)
let countdownInterval: ReturnType<typeof setInterval> | null = null

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

function onNewProblem() { fetchCurrentProblem(); startCountdown() }
function onPhaseChange() { fetchCurrentProblem() }

async function fetchAgentCount() {
  try {
    const client = getPublicClient()
    const address = getContractAddress('AgentNFA')
    const supply = await client.readContract({
      address, abi: AGENT_NFA_ABI, functionName: 'totalSupply',
    }) as bigint
    totalAgents.value = supply.toString()
  } catch {}
}

onMounted(async () => {
  on('new-problem', onNewProblem)
  on('phase-change', onPhaseChange)
  await Promise.all([
    fetchTokenInfo().catch(() => {}),
    fetchCurrentProblem(),
    fetchAgentCount(),
  ])
  startCountdown()
})

onUnmounted(() => {
  off('new-problem', onNewProblem)
  off('phase-change', onPhaseChange)
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<template>
  <div class="space-y-10">

    <!-- Title Screen -->
    <section class="text-center py-12">
      <div class="text-[var(--color-primary)] text-[8px] tracking-[6px] uppercase mb-4">{{ $t('home.pressStart') }}</div>
      <h1 class="text-[32px] leading-tight">
        <span class="text-[var(--color-primary)]">AGENT</span><span class="text-[var(--color-text)]">FORGE</span>
      </h1>
      <p class="mt-6 text-[var(--color-text-secondary)] max-w-xl mx-auto">
        {{ $t('home.subtitle') }}
      </p>
      <div class="mt-8 flex items-center justify-center gap-4 flex-wrap">
        <RouterLink to="/mint" class="rpg-btn no-underline hover:no-underline">
          {{ $t('home.summonAgent') }}
        </RouterLink>
        <RouterLink to="/activity" class="rpg-btn-secondary no-underline hover:no-underline hover:!text-[var(--color-primary)]">
          {{ $t('home.battleLog') }}
        </RouterLink>
      </div>
    </section>

    <hr class="pixel-divider" />

    <!-- Adventure Guide -->
    <section>
      <h2 class="text-center mb-8">{{ $t('home.adventureGuide') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="rpg-box text-center">
          <div class="text-[24px] mb-3 text-[var(--color-primary)]">I</div>
          <h3 class="text-[var(--color-primary)] mb-3">{{ $t('home.step1Title') }}</h3>
          <p class="text-[var(--color-text-secondary)] text-[9px]">
            {{ $t('home.step1Desc') }}
          </p>
        </div>
        <div class="rpg-box text-center">
          <div class="text-[24px] mb-3 text-[var(--color-xp)]">II</div>
          <h3 class="text-[var(--color-xp)] mb-3">{{ $t('home.step2Title') }}</h3>
          <p class="text-[var(--color-text-secondary)] text-[9px]">
            {{ $t('home.step2Desc') }}
          </p>
        </div>
        <div class="rpg-box text-center">
          <div class="text-[24px] mb-3 text-[var(--color-gold)]">III</div>
          <h3 class="text-[var(--color-gold)] mb-3">{{ $t('home.step3Title') }}</h3>
          <p class="text-[var(--color-text-secondary)] text-[9px]">
            {{ $t('home.step3Desc') }}
          </p>
        </div>
      </div>
    </section>

    <hr class="pixel-divider" />

    <!-- Live Stats -->
    <section>
      <h2 class="text-center mb-8">{{ $t('home.status') }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div class="rpg-box text-center">
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider">{{ $t('home.supply') }}</div>
          <div class="text-[14px] text-[var(--color-primary)] mt-2">{{ formatNumber(afgSupply) }}</div>
          <div class="text-[8px] text-[var(--color-text-secondary)] flex items-center justify-center gap-1"><img src="/afg-token.svg" class="w-3 h-3" alt="AFG" />AFG</div>
        </div>
        <div class="rpg-box text-center">
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider">{{ $t('home.mined') }}</div>
          <div class="text-[14px] text-[var(--color-xp)] mt-2">{{ formatNumber(totalMined) }}</div>
          <div class="text-[8px] text-[var(--color-text-secondary)] flex items-center justify-center gap-1"><img src="/afg-token.svg" class="w-3 h-3" alt="AFG" />AFG</div>
        </div>
        <div class="rpg-box text-center">
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider">{{ $t('home.reward') }}</div>
          <div class="text-[14px] text-[var(--color-gold)] mt-2">{{ formatNumber(rewardPerRound) }}</div>
          <div class="text-[8px] text-[var(--color-text-secondary)]">{{ $t('home.perRound') }}</div>
        </div>
        <div class="rpg-box text-center">
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider">{{ $t('home.agents') }}</div>
          <div class="text-[14px] text-[var(--color-mp)] mt-2">{{ totalAgents }}</div>
          <div class="text-[8px] text-[var(--color-text-secondary)]">{{ $t('home.active') }}</div>
        </div>
        <div class="rpg-box text-center">
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider">{{ $t('home.round') }}</div>
          <div class="text-[14px] text-[var(--color-primary)] mt-2">{{ currentRound }}</div>
          <div class="text-[8px] text-[var(--color-text-secondary)]">{{ $t('home.currentRound') }}</div>
        </div>
        <div class="rpg-box text-center">
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider">{{ $t('home.halving') }}</div>
          <div class="text-[14px] text-[var(--color-gold)] mt-2">{{ roundsUntilHalving }}</div>
          <div class="text-[8px] text-[var(--color-text-secondary)]">{{ $t('home.roundsLeft') }}</div>
        </div>
      </div>
    </section>

    <hr class="pixel-divider" />

    <!-- Current Quest -->
    <section class="max-w-3xl mx-auto">
      <h2 class="text-center mb-8">{{ $t('home.currentQuest') }}</h2>
      <div class="rpg-box">
        <div v-if="currentProblem" class="space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-3">
              <span class="text-[8px] px-2 py-1 bg-[var(--color-bg)] border-2 border-[var(--color-primary)] text-[var(--color-primary)]">
                {{ $t(`common.category.${currentProblem.category}`, currentProblem.category) }}
              </span>
              <span class="text-[8px] px-2 py-1 bg-[var(--color-bg)] border-2 border-[var(--color-border)]">
                {{ currentProblem.difficulty }}
              </span>
              <span class="text-[8px] text-[var(--color-text-secondary)]">{{ $t('home.quest') }} #{{ currentProblem.id }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[9px] text-[var(--color-xp)]">{{ phaseLabel }}</span>
              <span v-if="countdown > 0" class="text-[var(--color-primary)] text-[14px]">
                {{ countdownFormatted }}
              </span>
            </div>
          </div>
          <p class="text-[12px]">{{ currentProblem.questionText }}</p>
          <RouterLink to="/activity" class="text-[9px] text-[var(--color-primary)]">
            &triangleright; {{ $t('home.watchBattle') }} &rarr;
          </RouterLink>
        </div>
        <div v-else-if="problemManagerPaused" class="text-center py-4">
          <span class="text-[var(--color-gold)]">&#9888;</span>
          <span class="text-[var(--color-text-secondary)] text-[9px] ml-2">{{ $t('common.contractPaused') }}</span>
        </div>
        <div v-else class="text-center text-[var(--color-text-secondary)] py-4">
          {{ $t('common.waitingForQuest') }}<span class="blink">_</span>
        </div>
      </div>
    </section>

    <hr class="pixel-divider" />

    <!-- Agent Skills Download -->
    <section class="max-w-3xl mx-auto">
      <h2 class="text-center mb-4">{{ $t('home.agentSkills') }}</h2>
      <p class="text-center text-[var(--color-text-secondary)] text-[9px] mb-6">{{ $t('home.skillsDesc') }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="rpg-box flex items-center justify-between gap-4">
          <div>
            <h3 class="text-[var(--color-xp)] mb-1">&triangleright; {{ $t('home.solverSkill') }}</h3>
            <p class="text-[var(--color-text-secondary)] text-[9px]">{{ $t('home.solverSkillDesc') }}</p>
          </div>
          <div class="flex gap-2 shrink-0">
            <a href="/skills/solver.skill.md" target="_blank" class="rpg-btn !text-[8px] !px-3 !py-2 no-underline hover:no-underline">
              {{ $t('home.viewSkill') }}
            </a>
            <button class="rpg-btn-secondary !text-[8px] !px-3 !py-2" @click="copySkillUrl('/skills/solver.skill.md')">
              {{ copiedSkill === 'solver' ? $t('myAgents.copied') : $t('home.copyUrl') }}
            </button>
          </div>
        </div>
        <div class="rpg-box flex items-center justify-between gap-4">
          <div>
            <h3 class="text-[var(--color-mp)] mb-1">&triangleright; {{ $t('home.verifierSkill') }}</h3>
            <p class="text-[var(--color-text-secondary)] text-[9px]">{{ $t('home.verifierSkillDesc') }}</p>
          </div>
          <div class="flex gap-2 shrink-0">
            <a href="/skills/verifier.skill.md" target="_blank" class="rpg-btn !text-[8px] !px-3 !py-2 no-underline hover:no-underline">
              {{ $t('home.viewSkill') }}
            </a>
            <button class="rpg-btn-secondary !text-[8px] !px-3 !py-2" @click="copySkillUrl('/skills/verifier.skill.md')">
              {{ copiedSkill === 'verifier' ? $t('myAgents.copied') : $t('home.copyUrl') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <hr class="pixel-divider" />

    <!-- Features -->
    <section>
      <h2 class="text-center mb-8">{{ $t('home.keyFeatures') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div class="rpg-box">
          <h3 class="text-[var(--color-primary)] mb-2">&triangleright; {{ $t('home.feature1Title') }}</h3>
          <p class="text-[var(--color-text-secondary)] text-[9px]">
            {{ $t('home.feature1Desc') }}
          </p>
        </div>
        <div class="rpg-box">
          <h3 class="text-[var(--color-mp)] mb-2">&triangleright; {{ $t('home.feature2Title') }}</h3>
          <p class="text-[var(--color-text-secondary)] text-[9px]">
            {{ $t('home.feature2Desc') }}
          </p>
        </div>
        <div class="rpg-box">
          <h3 class="text-[var(--color-gold)] mb-2">&triangleright; {{ $t('home.feature3Title') }}</h3>
          <p class="text-[var(--color-text-secondary)] text-[9px]">
            {{ $t('home.feature3Desc') }}
          </p>
        </div>
        <div class="rpg-box">
          <h3 class="text-[var(--color-xp)] mb-2">&triangleright; {{ $t('home.feature4Title') }}</h3>
          <p class="text-[var(--color-text-secondary)] text-[9px]">
            {{ $t('home.feature4Desc') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
