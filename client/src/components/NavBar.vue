<script setup lang="ts">
import { useWeb3 } from '@/composables/useWeb3'
import { RouterLink } from 'vue-router'

const { account, isConnected, isConnecting, isWrongChain, connect, switchChain, disconnect } = useWeb3()

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}
</script>

<template>
  <nav class="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-3">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-6">
        <RouterLink to="/" class="text-xl font-bold text-[var(--color-primary)]">
          AgentForge
        </RouterLink>
        <div class="hidden md:flex items-center gap-4">
          <RouterLink to="/" class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Dashboard
          </RouterLink>
          <RouterLink to="/mint" class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Mint Agent
          </RouterLink>
          <RouterLink to="/leaderboard" class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Leaderboard
          </RouterLink>
          <RouterLink to="/rewards" class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Rewards
          </RouterLink>
        </div>
      </div>

      <div>
        <button
          v-if="!isConnected"
          @click="connect"
          :disabled="isConnecting"
          class="bg-[var(--color-primary)] text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {{ isConnecting ? 'Connecting...' : 'Connect Wallet' }}
        </button>
        <div v-else class="flex items-center gap-2">
          <button
            v-if="isWrongChain"
            @click="switchChain"
            class="bg-red-500 text-white px-3 py-2 rounded-lg text-xs"
          >
            Wrong Chain
          </button>
          <span class="text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg)] px-3 py-2 rounded-lg">
            {{ shortenAddress(account!) }}
          </span>
          <button
            @click="disconnect"
            class="text-xs text-[var(--color-text-secondary)] hover:text-red-400"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
