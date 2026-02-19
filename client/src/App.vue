<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavBar from './components/NavBar.vue'
import { useContractStatus } from '@/composables/useContractStatus'

const { t } = useI18n()
const { anyPaused, loaded, fetchStatus } = useContractStatus()

onMounted(() => { fetchStatus().catch(() => {}) })
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)]">
    <NavBar />
    <!-- Global pause banner -->
    <div v-if="loaded && anyPaused" class="max-w-5xl mx-auto px-4 mt-2">
      <div class="rpg-box !py-2 !px-4 !border-[var(--color-gold)] flex items-center gap-3 text-[9px]">
        <span class="text-[var(--color-gold)]">&#9888;</span>
        <div>
          <span class="text-[var(--color-gold)]">{{ t('common.systemPaused') }}</span>
          <span class="text-[var(--color-text-secondary)] ml-2">{{ t('common.systemPausedDesc') }}</span>
        </div>
      </div>
    </div>
    <main class="max-w-5xl mx-auto px-4 py-8">
      <RouterView />
    </main>
    <footer class="text-center py-6 text-[8px] text-[var(--color-border)] border-t-[3px] border-[var(--color-border)] mt-12">
      <div class="pixel-divider mb-4" />
      {{ t('footer.text') }}
    </footer>
  </div>
</template>
