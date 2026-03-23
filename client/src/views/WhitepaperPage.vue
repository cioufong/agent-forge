<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeSection = ref('introduction')

const sections = [
  { id: 'introduction', title: 'codex.toc.introduction' },
  { id: 'architecture', title: 'codex.toc.architecture' },
  { id: 'agent-nfa', title: 'codex.toc.agentNfa' },
  { id: 'problem-lifecycle', title: 'codex.toc.lifecycle' },
  { id: 'rewards', title: 'codex.toc.rewards' },
  { id: 'verifier', title: 'codex.toc.verifier' },
  { id: 'tokenomics', title: 'codex.toc.tokenomics' },
]

function scrollToSection(id: string) {
  activeSection.value = id
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      }
    },
    { rootMargin: '-20% 0px -60% 0px' }
  )
  nextTick(() => {
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
  })
})
</script>

<template>
  <div class="max-w-5xl mx-auto flex gap-8">
    <!-- Sidebar TOC -->
    <aside class="hidden lg:block w-52 shrink-0 sticky top-24 self-start">
      <div class="rpg-box !p-3">
        <div class="text-[8px] text-[var(--color-primary)] uppercase tracking-wider mb-3">{{ t('codex.index') }}</div>
        <nav class="space-y-1">
          <button
            v-for="s in sections" :key="s.id"
            @click="scrollToSection(s.id)"
            :class="[
              'block w-full text-left text-[8px] px-2 py-1.5 transition-colors cursor-pointer bg-transparent border-none font-[inherit]',
              activeSection === s.id
                ? 'text-[var(--color-primary)] bg-[var(--color-bg)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            ]"
          >
            <span v-if="activeSection === s.id" class="text-[var(--color-primary)]">&triangleright; </span>{{ t(s.title) }}
          </button>
        </nav>
      </div>
    </aside>

    <!-- Content -->
    <main class="flex-1 min-w-0 space-y-10 pb-24">
      <h1>{{ t('codex.title') }}</h1>
      <p class="text-[var(--color-text-secondary)] text-[9px]">{{ t('codex.subtitle') }}</p>

      <!-- I. Introduction -->
      <section id="introduction" class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('codex.ch1') }}</span>
        <h2 class="mt-2">{{ t('codex.intro.title') }}</h2>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.intro.p1') }}
        </p>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.intro.p2') }}
        </p>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.intro.p3') }}
        </p>
      </section>

      <!-- II. Architecture -->
      <section id="architecture" class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('codex.ch2') }}</span>
        <h2 class="mt-2">{{ t('codex.arch.title') }}</h2>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.arch.desc') }}
        </p>
        <div class="space-y-2 text-[9px] mt-4">
          <div class="flex items-start gap-2 py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)] shrink-0 w-36">AgentNFA</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.arch.agentNfa') }}</span>
          </div>
          <div class="flex items-start gap-2 py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)] shrink-0 w-36">AFGToken</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.arch.afgToken') }}</span>
          </div>
          <div class="flex items-start gap-2 py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)] shrink-0 w-36">ProblemManager</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.arch.problemManager') }}</span>
          </div>
          <div class="flex items-start gap-2 py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)] shrink-0 w-36">RewardDistributor</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.arch.rewardDistributor') }}</span>
          </div>
          <div class="flex items-start gap-2 py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)] shrink-0 w-36">VerifierElection</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.arch.verifierElection') }}</span>
          </div>
          <div class="flex items-start gap-2 py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)] shrink-0 w-36">OracleResolver</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.arch.oracleResolver') }}</span>
          </div>
          <div class="flex items-start gap-2 py-1">
            <span class="text-[var(--color-primary)] shrink-0 w-36">XPManager</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.arch.xpManager') }}</span>
          </div>
        </div>
      </section>

      <!-- III. Agent NFA -->
      <section id="agent-nfa" class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('codex.ch3') }}</span>
        <h2 class="mt-2">{{ t('codex.nfa.title') }}</h2>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.nfa.desc') }}
        </p>

        <h3 class="text-[var(--color-primary)] mt-4">{{ t('codex.nfa.traits') }}</h3>
        <div class="space-y-2 text-[9px]">
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-mp)] w-24">INT (0-255)</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.nfa.intDesc') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-xp)] w-24">SPD (0-255)</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.nfa.spdDesc') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-primary)] w-24">SPEC (0-255)</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.nfa.specDesc') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-hp)] w-24">RARE (0-255)</span>
            <span class="text-[var(--color-text-secondary)]">{{ t('codex.nfa.rareDesc') }}</span>
          </div>
        </div>

        <h3 class="text-[var(--color-primary)] mt-4">{{ t('codex.nfa.tiers') }}</h3>
        <div class="flex items-center gap-6 text-[9px] mt-2">
          <span><span class="text-[var(--color-bronze)]">&block;&block;</span> Bronze (T0)</span>
          <span><span class="text-[var(--color-silver)]">&block;&block;</span> Silver (T1)</span>
          <span><span class="text-[var(--color-gold)]">&block;&block;</span> Gold (T2)</span>
        </div>
      </section>

      <!-- IV. Quest Lifecycle -->
      <section id="problem-lifecycle" class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('codex.ch4') }}</span>
        <h2 class="mt-2">{{ t('codex.lifecycle.title') }}</h2>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.lifecycle.desc') }}
        </p>

        <div class="space-y-3 mt-4">
          <div class="bg-[var(--color-bg)] border-2 border-[var(--color-xp)] p-3">
            <div class="text-[9px]"><span class="text-[var(--color-xp)]">{{ t('codex.lifecycle.submit') }}</span> <span class="text-[var(--color-text-secondary)]">({{ t('codex.lifecycle.submitTime') }})</span></div>
            <p class="text-[9px] text-[var(--color-text-secondary)] mt-1">{{ t('codex.lifecycle.submitDesc') }}</p>
          </div>
          <div class="bg-[var(--color-bg)] border-2 border-[var(--color-mp)] p-3">
            <div class="text-[9px]"><span class="text-[var(--color-mp)]">{{ t('codex.lifecycle.reveal') }}</span> <span class="text-[var(--color-text-secondary)]">({{ t('codex.lifecycle.revealTime') }})</span></div>
            <p class="text-[9px] text-[var(--color-text-secondary)] mt-1">{{ t('codex.lifecycle.revealDesc') }}</p>
          </div>
          <div class="bg-[var(--color-bg)] border-2 border-purple-400 p-3">
            <div class="text-[9px]"><span class="text-purple-400">{{ t('codex.lifecycle.verify') }}</span> <span class="text-[var(--color-text-secondary)]">({{ t('codex.lifecycle.verifyTime') }})</span></div>
            <p class="text-[9px] text-[var(--color-text-secondary)] mt-1">{{ t('codex.lifecycle.verifyDesc') }}</p>
          </div>
          <div class="bg-[var(--color-bg)] border-2 border-[var(--color-primary)] p-3">
            <div class="text-[9px]"><span class="text-[var(--color-primary)]">{{ t('codex.lifecycle.resolve') }}</span></div>
            <p class="text-[9px] text-[var(--color-text-secondary)] mt-1">{{ t('codex.lifecycle.resolveDesc') }}</p>
          </div>
        </div>
      </section>

      <!-- V. Reward System -->
      <section id="rewards" class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('codex.ch5') }}</span>
        <h2 class="mt-2">{{ t('codex.rewards.title') }}</h2>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.rewards.desc') }}
        </p>

        <div class="space-y-3 mt-4">
          <div class="flex items-center gap-3 text-[9px]">
            <span class="text-[var(--color-gold)] w-20">Gold 50%</span>
            <div class="pixel-bar flex-1">
              <div v-for="i in 10" :key="i" :class="['pixel-bar-segment flex-1', i <= 5 ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]']" />
            </div>
          </div>
          <div class="flex items-center gap-3 text-[9px]">
            <span class="text-[var(--color-silver)] w-20">Silver 30%</span>
            <div class="pixel-bar flex-1">
              <div v-for="i in 10" :key="i" :class="['pixel-bar-segment flex-1', i <= 3 ? 'bg-[var(--color-silver)]' : 'bg-[var(--color-border)]']" />
            </div>
          </div>
          <div class="flex items-center gap-3 text-[9px]">
            <span class="text-[var(--color-bronze)] w-20">Bronze 20%</span>
            <div class="pixel-bar flex-1">
              <div v-for="i in 10" :key="i" :class="['pixel-bar-segment flex-1', i <= 2 ? 'bg-[var(--color-bronze)]' : 'bg-[var(--color-border)]']" />
            </div>
          </div>
        </div>

        <p class="text-[var(--color-text-secondary)] mt-4">
          {{ t('codex.rewards.rollUp') }}
        </p>
      </section>

      <!-- VI. Verifiers -->
      <section id="verifier" class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('codex.ch6') }}</span>
        <h2 class="mt-2">{{ t('codex.verifier.title') }}</h2>
        <p class="text-[var(--color-text-secondary)]">
          {{ t('codex.verifier.desc') }}
        </p>
        <div class="space-y-2 text-[9px] mt-4">
          <div class="py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)]">Staking:</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.verifier.staking') }}</span>
          </div>
          <div class="py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-primary)]">Voting:</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.verifier.voting') }}</span>
          </div>
          <div class="py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-hp)]">Slashing:</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.verifier.slashing') }}</span>
          </div>
          <div class="py-1">
            <span class="text-[var(--color-mp)]">Oracle:</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.verifier.oracle') }}</span>
          </div>
        </div>
      </section>

      <!-- VII. Tokenomics -->
      <section id="tokenomics" class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('codex.ch7') }}</span>
        <h2 class="mt-2">{{ t('codex.tokenomics.title') }}</h2>

        <div class="grid grid-cols-2 gap-3 text-[9px] mt-4">
          <div><span class="text-[var(--color-text-secondary)]">{{ t('codex.tokenomics.tokenName') }}</span> <span class="text-[var(--color-primary)]">{{ t('codex.tokenomics.afgValue') }}</span></div>
          <div><span class="text-[var(--color-text-secondary)]">{{ t('codex.tokenomics.supply') }}</span> <span>{{ t('codex.tokenomics.supplyValue') }}</span></div>
          <div><span class="text-[var(--color-text-secondary)]">{{ t('codex.tokenomics.chain') }}</span> <span>{{ t('codex.tokenomics.chainValue') }}</span></div>
          <div><span class="text-[var(--color-text-secondary)]">{{ t('codex.tokenomics.dexTax') }}</span> <span>{{ t('codex.tokenomics.dexTaxValue') }}</span></div>
        </div>

        <!-- Distribution -->
        <h3 class="text-[var(--color-primary)] mt-4">{{ t('codex.tokenomics.distribution') }}</h3>
        <div class="space-y-3 mt-2">
          <!-- Mining 99% -->
          <div>
            <div class="flex items-center justify-between text-[9px] mb-1">
              <span class="text-[var(--color-xp)]">{{ t('codex.tokenomics.mining') }}</span>
              <span class="text-[var(--color-xp)]">20,790,000</span>
            </div>
            <div class="pixel-bar">
              <div v-for="i in 10" :key="i" :class="['pixel-bar-segment flex-1', 'bg-[var(--color-xp)]']" />
            </div>
            <p class="text-[8px] text-[var(--color-text-secondary)] mt-1">{{ t('codex.tokenomics.miningDesc') }}</p>
          </div>
          <!-- Treasury 1% -->
          <div>
            <div class="flex items-center justify-between text-[9px] mb-1">
              <span class="text-[var(--color-mp)]">{{ t('codex.tokenomics.treasury') }}</span>
              <span class="text-[var(--color-mp)]">210,000</span>
            </div>
            <div class="pixel-bar">
              <div v-for="i in 20" :key="i" :class="['pixel-bar-segment flex-1', i <= 1 ? 'bg-[var(--color-mp)]' : 'bg-[var(--color-border)]']" />
            </div>
            <p class="text-[8px] text-[var(--color-text-secondary)] mt-1">{{ t('codex.tokenomics.treasuryDesc') }}</p>
          </div>
        </div>

        <!-- Token Flow -->
        <h3 class="text-[var(--color-primary)] mt-4">{{ t('codex.tokenomics.tokenFlow') }}</h3>
        <div class="space-y-2 text-[9px] mt-2">
          <div class="py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-xp)]">&triangleright;</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.tokenomics.flowMining') }}</span>
          </div>
          <div class="py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-mp)]">&triangleright;</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.tokenomics.flowStaking') }}</span>
          </div>
          <div class="py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-hp)]">&triangleright;</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.tokenomics.flowSlashing') }}</span>
          </div>
          <div class="py-1 border-b border-[var(--color-bg)]">
            <span class="text-[var(--color-gold)]">&triangleright;</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.tokenomics.flowTax') }}</span>
          </div>
          <div class="py-1">
            <span class="text-[var(--color-primary)]">&triangleright;</span>
            <span class="text-[var(--color-text-secondary)]"> {{ t('codex.tokenomics.flowHalving') }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
