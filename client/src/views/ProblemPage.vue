<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
import { useProblem } from '@/composables/useProblem'
import { useAgentNFA } from '@/composables/useAgentNFA'
import { useWebSocket } from '@/composables/useWebSocket'

const { isConnected, account } = useWeb3()
const { currentProblem, isSubmitting, submitError, fetchCurrentProblem, submitAnswer } = useProblem()
const { getAgentsByOwner } = useAgentNFA()
const { on, off } = useWebSocket()

const myAgents = ref<number[]>([])
const selectedAgent = ref<number | null>(null)
const answer = ref('')
const submitted = ref(false)

onMounted(async () => {
  await fetchCurrentProblem()

  if (isConnected.value && account.value) {
    myAgents.value = await getAgentsByOwner(account.value)
    if (myAgents.value.length > 0) {
      selectedAgent.value = myAgents.value[0]
      await fetchCurrentProblem(selectedAgent.value)
    }
  }

  on('new-problem', () => {
    submitted.value = false
    answer.value = ''
    fetchCurrentProblem(selectedAgent.value || undefined)
  })
})

onUnmounted(() => {
  off('new-problem', () => {})
})

async function handleSubmit() {
  if (!currentProblem.value || !selectedAgent.value || !answer.value) return

  const ok = await submitAnswer(currentProblem.value.id, selectedAgent.value, answer.value)
  if (ok) submitted.value = true
}

async function switchAgent(tokenId: number) {
  selectedAgent.value = tokenId
  await fetchCurrentProblem(tokenId)
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Problem Solving</h1>

    <!-- Agent Selector -->
    <div v-if="myAgents.length > 0" class="flex items-center gap-2">
      <span class="text-sm text-[var(--color-text-secondary)]">Agent:</span>
      <button
        v-for="id in myAgents"
        :key="id"
        @click="switchAgent(id)"
        :class="[
          'px-3 py-1 rounded text-sm',
          selectedAgent === id
            ? 'bg-[var(--color-primary)] text-black'
            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
        ]"
      >
        #{{ id }}
      </button>
    </div>

    <!-- Problem Display -->
    <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
      <div v-if="currentProblem" class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-xs px-2 py-1 rounded bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
            {{ currentProblem.category }}
          </span>
          <span class="text-xs px-2 py-1 rounded bg-[var(--color-border)]">
            {{ currentProblem.difficulty }}
          </span>
        </div>
        <p class="text-xl font-mono">{{ currentProblem.questionText }}</p>

        <div v-if="!submitted" class="space-y-3">
          <input
            v-model="answer"
            type="text"
            placeholder="Your answer..."
            class="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
          />
          <button
            @click="handleSubmit"
            :disabled="isSubmitting || !answer || !selectedAgent"
            class="w-full bg-[var(--color-primary)] text-black py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit Answer' }}
          </button>
        </div>
        <div v-else class="text-center text-green-400 py-4">
          Answer submitted! Waiting for results...
        </div>

        <div v-if="submitError" class="text-red-400 text-sm">{{ submitError }}</div>
      </div>
      <div v-else class="text-center text-[var(--color-text-secondary)] py-8">
        Waiting for next problem...
      </div>
    </div>
  </div>
</template>
