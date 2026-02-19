<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useWeb3 } from '@/composables/useWeb3'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLocale, getLocale } from '@/i18n'
import { AGENT_NFA_ABI } from '@/services/contracts/abis'
import { getContractAddress } from '@/config/contracts'
import type { Address } from 'viem'

const route = useRoute()
const { t } = useI18n()
const { account, isConnected, isConnecting, isWrongChain, connect, switchChain, disconnect, getPublicClient } = useWeb3()

const isOwner = ref(false)

async function checkOwner() {
  if (!account.value) { isOwner.value = false; return }
  try {
    const client = getPublicClient()
    const owner = await client.readContract({
      address: getContractAddress('AgentNFA'),
      abi: AGENT_NFA_ABI,
      functionName: 'owner',
    }) as Address
    isOwner.value = owner.toLowerCase() === account.value.toLowerCase()
  } catch {
    isOwner.value = false
  }
}

onMounted(() => { if (isConnected.value) checkOwner() })
watch(account, () => checkOwner())

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

const currentLocale = computed(() => getLocale())

function toggleLocale() {
  setLocale(currentLocale.value === 'en' ? 'zh' : 'en')
}

const navLinks = computed(() => [
  { to: '/', label: t('nav.home'), name: 'home' },
  { to: '/whitepaper', label: t('nav.codex'), name: 'whitepaper' },
  { to: '/activity', label: t('nav.battle'), name: 'activity' },
  { to: '/leaderboard', label: t('nav.rankings'), name: 'leaderboard' },
  { to: '/mint', label: t('nav.summon'), name: 'mint' },
  { to: '/my-agents', label: t('nav.myAgents'), name: 'my-agents' },
  { to: '/rewards', label: t('nav.loot'), name: 'rewards' },
])
</script>

<template>
  <nav class="rpg-box !p-0 mx-4 mt-4 mb-2">
    <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-6">
        <RouterLink to="/" class="text-[var(--color-primary)] text-[14px] no-underline hover:no-underline">
          <span class="text-[var(--color-text)]">&diams;</span> AGENTFORGE <span class="text-[var(--color-text)]">&diams;</span>
        </RouterLink>
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks" :key="link.name"
            :to="link.to"
            :class="[
              'px-3 py-2 text-[9px] uppercase tracking-wider no-underline transition-colors hover:no-underline',
              route.name === link.name
                ? 'text-[var(--color-primary)] bg-[var(--color-bg)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            ]"
          >
            <span v-if="route.name === link.name" class="text-[var(--color-primary)]">&triangleright; </span>{{ link.label }}
          </RouterLink>
          <RouterLink
            v-if="isOwner"
            to="/admin"
            :class="[
              'px-3 py-2 text-[9px] uppercase tracking-wider no-underline transition-colors hover:no-underline',
              route.name === 'admin'
                ? 'text-[var(--color-primary)] bg-[var(--color-bg)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            ]"
          >
            <span v-if="route.name === 'admin'" class="text-[var(--color-primary)]">&triangleright; </span>{{ t('nav.admin') }}
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Language Toggle -->
        <button
          @click="toggleLocale"
          class="text-[8px] px-2 py-1 bg-[var(--color-bg)] border-2 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] cursor-pointer font-[inherit] transition-colors"
        >
          {{ currentLocale === 'en' ? '中文' : 'EN' }}
        </button>

        <button
          v-if="!isConnected"
          @click="connect"
          :disabled="isConnecting"
          class="rpg-btn !text-[8px] !px-3 !py-2"
        >
          {{ isConnecting ? t('nav.linking') : t('nav.connect') }}
        </button>
        <div v-else class="flex items-center gap-2">
          <button
            v-if="isWrongChain"
            @click="switchChain"
            class="rpg-btn !text-[8px] !px-3 !py-2 !bg-[var(--color-hp)]"
          >
            {{ t('nav.wrongChain') }}
          </button>
          <span class="text-[8px] text-[var(--color-text-secondary)] bg-[var(--color-bg)] px-2 py-1 border-2 border-[var(--color-border)]">
            {{ shortenAddress(account!) }}
          </span>
          <button
            @click="disconnect"
            class="text-[8px] text-[var(--color-text-secondary)] hover:text-[var(--color-hp)] cursor-pointer bg-transparent border-none font-[inherit]"
          >
            {{ t('nav.disconnect') }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
