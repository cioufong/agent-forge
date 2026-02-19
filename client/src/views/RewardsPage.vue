<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
import { useRewards } from '@/composables/useRewards'
import { useAFGToken } from '@/composables/useAFGToken'

const { isConnected } = useWeb3()
const { pendingRewards, isClaiming, claimError, fetchPendingRewards, claimRewards } = useRewards()
const { balance, fetchBalance } = useAFGToken()

const rewardHistory = ref<any[]>([])

onMounted(async () => {
  if (isConnected.value) {
    try {
      await Promise.all([fetchPendingRewards(), fetchBalance()])
    } catch {}
  }
})

async function handleClaim() {
  const ok = await claimRewards()
  if (ok) {
    await fetchBalance()
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Rewards</h1>

    <div v-if="!isConnected" class="text-center text-[var(--color-text-secondary)] py-12">
      Connect your wallet to view rewards.
    </div>

    <template v-else>
      <!-- Balance -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
          <div class="text-sm text-[var(--color-text-secondary)]">AFG Balance</div>
          <div class="text-2xl font-bold mt-1 font-mono">{{ balance }}</div>
        </div>
        <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
          <div class="text-sm text-[var(--color-text-secondary)]">Pending Rewards</div>
          <div class="text-2xl font-bold mt-1 font-mono text-[var(--color-primary)]">{{ pendingRewards }}</div>
        </div>
      </div>

      <!-- Claim Button -->
      <button
        @click="handleClaim"
        :disabled="isClaiming || pendingRewards === '0'"
        class="w-full bg-[var(--color-primary)] text-black py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {{ isClaiming ? 'Claiming...' : 'Claim Rewards' }}
      </button>

      <div v-if="claimError" class="text-red-400 text-sm text-center">{{ claimError }}</div>

      <!-- Tier Info -->
      <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
        <h2 class="text-lg font-semibold mb-4">Reward Tiers</h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
            <div>
              <span class="text-amber-600 font-semibold">Bronze</span>
              <span class="text-xs text-[var(--color-text-secondary)] ml-2">Level 1-7</span>
            </div>
            <span class="font-mono">20% pool</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-[var(--color-border)]">
            <div>
              <span class="text-gray-300 font-semibold">Silver</span>
              <span class="text-xs text-[var(--color-text-secondary)] ml-2">Level 8-14</span>
            </div>
            <span class="font-mono">30% pool</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <div>
              <span class="text-yellow-400 font-semibold">Gold</span>
              <span class="text-xs text-[var(--color-text-secondary)] ml-2">Level 15-20</span>
            </div>
            <span class="font-mono">50% pool</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
