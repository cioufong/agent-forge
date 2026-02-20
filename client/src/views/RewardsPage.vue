<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWeb3 } from '@/composables/useWeb3'
import { useRewards } from '@/composables/useRewards'
import { useAFGToken } from '@/composables/useAFGToken'
import { useContractStatus } from '@/composables/useContractStatus'

const { t } = useI18n()
const { isConnected } = useWeb3()
const { pendingRewards, isClaiming, claimError, fetchPendingRewards, claimRewards } = useRewards()
const { rewardDistributorPaused } = useContractStatus()
const { balance, fetchBalance } = useAFGToken()

onMounted(async () => {
  if (isConnected.value) {
    try { await Promise.all([fetchPendingRewards(), fetchBalance()]) } catch {}
  }
})

async function handleClaim() {
  const ok = await claimRewards()
  if (ok) await fetchBalance()
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1>{{ t('loot.title') }}</h1>

    <div v-if="!isConnected" class="rpg-box text-center text-[var(--color-text-secondary)] py-12">
      {{ t('loot.connectToView') }}
    </div>

    <template v-else>
      <!-- Balance -->
      <div class="grid grid-cols-2 gap-4">
        <div class="rpg-box relative text-center">
          <span class="rpg-box-title">{{ t('loot.inventory') }}</span>
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider mt-2">{{ t('loot.afgBalance') }}</div>
          <div class="text-[16px] text-[var(--color-primary)] mt-2 flex items-center justify-center gap-1"><img src="/afg-token.svg" class="w-4 h-4" alt="AFG" />{{ balance }}</div>
        </div>
        <div class="rpg-box relative text-center">
          <span class="rpg-box-title">{{ t('loot.pending') }}</span>
          <div class="text-[8px] text-[var(--color-text-secondary)] uppercase tracking-wider mt-2">{{ t('loot.unclaimed') }}</div>
          <div class="text-[16px] text-[var(--color-gold)] mt-2 flex items-center justify-center gap-1"><img src="/afg-token.svg" class="w-4 h-4" alt="AFG" />{{ pendingRewards }}</div>
        </div>
      </div>

      <!-- Claim Button -->
      <div v-if="rewardDistributorPaused" class="text-center py-2">
        <span class="text-[var(--color-gold)]">&#9888;</span>
        <span class="text-[var(--color-text-secondary)] text-[9px] ml-2">{{ t('common.contractPaused') }}</span>
      </div>
      <button
        v-else
        @click="handleClaim"
        :disabled="isClaiming || pendingRewards === '0'"
        class="rpg-btn w-full text-center"
      >
        {{ isClaiming ? t('loot.claiming') : t('loot.claimBtn') }}
      </button>

      <div v-if="claimError" class="text-[var(--color-hp)] text-[9px] text-center">{{ claimError }}</div>

      <!-- Tier Info -->
      <div class="rpg-box relative">
        <span class="rpg-box-title">{{ t('loot.lootTable') }}</span>
        <div class="space-y-3 mt-2">
          <div class="flex items-center justify-between py-2 border-b border-[var(--color-bg)] text-[9px]">
            <div>
              <span class="text-[var(--color-gold)]">&block;&block; {{ t('common.tier.gold') }}</span>
              <span class="text-[8px] text-[var(--color-text-secondary)] ml-2">LV 15-20</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="pixel-bar w-24">
                <div v-for="i in 10" :key="i" :class="['pixel-bar-segment flex-1', i <= 5 ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]']" />
              </div>
              <span class="text-[var(--color-gold)]">50%</span>
            </div>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-[var(--color-bg)] text-[9px]">
            <div>
              <span class="text-[var(--color-silver)]">&block;&block; {{ t('common.tier.silver') }}</span>
              <span class="text-[8px] text-[var(--color-text-secondary)] ml-2">LV 8-14</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="pixel-bar w-24">
                <div v-for="i in 10" :key="i" :class="['pixel-bar-segment flex-1', i <= 3 ? 'bg-[var(--color-silver)]' : 'bg-[var(--color-border)]']" />
              </div>
              <span class="text-[var(--color-silver)]">30%</span>
            </div>
          </div>
          <div class="flex items-center justify-between py-2 text-[9px]">
            <div>
              <span class="text-[var(--color-bronze)]">&block;&block; {{ t('common.tier.bronze') }}</span>
              <span class="text-[8px] text-[var(--color-text-secondary)] ml-2">LV 1-7</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="pixel-bar w-24">
                <div v-for="i in 10" :key="i" :class="['pixel-bar-segment flex-1', i <= 2 ? 'bg-[var(--color-bronze)]' : 'bg-[var(--color-border)]']" />
              </div>
              <span class="text-[var(--color-bronze)]">20%</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
