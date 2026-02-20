<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWeb3 } from '@/composables/useWeb3'
import { useAdmin, type ContractStates } from '@/composables/useAdmin'
import { getContractAddresses } from '@/config/contracts'
import type { Address } from 'viem'

const { t } = useI18n()
const { isConnected, account, TARGET_CHAIN } = useWeb3()

const explorerUrl = computed(() => {
  const explorer = TARGET_CHAIN.blockExplorers?.default?.url
  return explorer || 'https://testnet.bscscan.com'
})

const contractAddresses = computed(() => {
  const addrs = getContractAddresses()
  if (!addrs) return []
  return [
    { name: 'AFGToken', address: addrs.AFGToken },
    { name: 'AgentNFA', address: addrs.AgentNFA },
    { name: 'ProblemManager', address: addrs.ProblemManager },
    { name: 'RewardDistributor', address: addrs.RewardDistributor },
    { name: 'VerifierElection', address: addrs.VerifierElection },
  ]
})

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}
const {
  isOwner,
  error,
  contractStates,
  currentMintPrice,
  contractBalance,
  currentTaxBps,
  currentDevWallet,
  currentSwapThreshold,
  currentSwapEnabled,
  currentRouterAddress,
  checkOwner,
  fetchContractStates,
  fetchAdminData,
  togglePause,
  setMintPrice,
  withdrawFees,
  setTaxBps,
  setDevWallet,
  setSwapThreshold,
  setSwapEnabled,
  setRouter,
  checkTaxExempt,
  setTaxExempt,
} = useAdmin()

const isInitializing = ref(true)
const processingAction = ref<string | null>(null)

// Form inputs
const mintPriceInput = ref('')
const taxBpsInput = ref('')
const devWalletInput = ref('')
const exemptInput = ref('')
const exemptStatus = ref<boolean | null>(null)
const exemptChecked = ref(false)
const swapThresholdInput = ref('')
const routerInput = ref('')

const contractNames: (keyof ContractStates)[] = ['AFGToken', 'AgentNFA', 'ProblemManager', 'RewardDistributor']

async function init() {
  isInitializing.value = true
  const owner = await checkOwner()
  if (owner) {
    await Promise.all([fetchContractStates(), fetchAdminData()])
    mintPriceInput.value = currentMintPrice.value
    taxBpsInput.value = String(currentTaxBps.value)
    devWalletInput.value = currentDevWallet.value
    swapThresholdInput.value = currentSwapThreshold.value
  }
  isInitializing.value = false
}

onMounted(() => {
  if (isConnected.value) init()
})

watch(account, () => {
  if (account.value) init()
})

async function handleTogglePause(contract: keyof ContractStates) {
  const paused = contractStates.value[contract]
  if (paused === null) return
  processingAction.value = `pause-${contract}`
  await togglePause(contract, paused)
  processingAction.value = null
}

async function handleSetMintPrice() {
  if (!mintPriceInput.value) return
  processingAction.value = 'mintPrice'
  await setMintPrice(mintPriceInput.value)
  mintPriceInput.value = currentMintPrice.value
  processingAction.value = null
}

async function handleWithdraw() {
  processingAction.value = 'withdraw'
  await withdrawFees()
  processingAction.value = null
}

async function handleSetTaxBps() {
  const bps = parseInt(taxBpsInput.value)
  if (isNaN(bps) || bps < 0 || bps > 1000) return
  processingAction.value = 'taxBps'
  await setTaxBps(bps)
  taxBpsInput.value = String(currentTaxBps.value)
  processingAction.value = null
}

async function handleSetSwapThreshold() {
  if (!swapThresholdInput.value) return
  processingAction.value = 'swapThreshold'
  await setSwapThreshold(swapThresholdInput.value)
  swapThresholdInput.value = currentSwapThreshold.value
  processingAction.value = null
}

async function handleToggleSwapEnabled() {
  processingAction.value = 'swapEnabled'
  await setSwapEnabled(!currentSwapEnabled.value)
  processingAction.value = null
}

async function handleSetRouter() {
  if (!routerInput.value) return
  processingAction.value = 'router'
  await setRouter(routerInput.value as Address)
  routerInput.value = ''
  processingAction.value = null
}

async function handleSetDevWallet() {
  if (!devWalletInput.value) return
  processingAction.value = 'devWallet'
  await setDevWallet(devWalletInput.value as Address)
  devWalletInput.value = currentDevWallet.value
  processingAction.value = null
}

async function handleCheckExempt() {
  if (!exemptInput.value) return
  processingAction.value = 'checkExempt'
  exemptStatus.value = await checkTaxExempt(exemptInput.value as Address)
  exemptChecked.value = true
  processingAction.value = null
}

async function handleSetExempt(exempt: boolean) {
  if (!exemptInput.value) return
  processingAction.value = exempt ? 'addExempt' : 'removeExempt'
  const ok = await setTaxExempt(exemptInput.value as Address, exempt)
  if (ok) {
    exemptStatus.value = exempt
  }
  processingAction.value = null
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1>{{ t('admin.title') }}</h1>

    <!-- Not connected -->
    <div v-if="!isConnected" class="rpg-box text-center text-[var(--color-text-secondary)] text-[9px] py-8">
      {{ t('common.connectWallet') }}
    </div>

    <!-- Loading -->
    <div v-else-if="isInitializing" class="rpg-box text-center text-[var(--color-text-secondary)] text-[9px] py-8">
      {{ t('common.loading') }}...
    </div>

    <!-- Not owner -->
    <div v-else-if="!isOwner" class="rpg-box text-center text-[var(--color-hp)] text-[9px] py-8">
      {{ t('admin.notAuthorized') }}
    </div>

    <!-- Admin panel -->
    <template v-else>
      <!-- Error banner -->
      <div v-if="error" class="rpg-box !border-[var(--color-hp)] text-[var(--color-hp)] text-[9px] break-all">
        {{ error }}
      </div>

      <!-- Contract Addresses -->
      <div class="rpg-box relative space-y-3">
        <span class="rpg-box-title">{{ t('admin.contractAddresses') }}</span>
        <div class="space-y-2 mt-2">
          <div
            v-for="c in contractAddresses" :key="c.name"
            class="flex items-center justify-between py-1 border-b border-[var(--color-bg)] text-[9px]"
          >
            <span class="text-[var(--color-text-secondary)]">{{ c.name }}</span>
            <a
              :href="`${explorerUrl}/address/${c.address}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--color-primary)] hover:underline text-[8px] font-mono"
            >{{ shortenAddress(c.address) }} &nearr;</a>
          </div>
        </div>
      </div>

      <!-- Contract Status -->
      <div class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('admin.contractStatus') }}</span>

        <div class="space-y-2 mt-2">
          <div
            v-for="name in contractNames" :key="name"
            class="flex items-center justify-between py-2 border-b border-[var(--color-bg)] text-[9px]"
          >
            <span>{{ name }}</span>
            <div class="flex items-center gap-3">
              <span
                v-if="contractStates[name] === null"
                class="text-[var(--color-text-secondary)]"
              >{{ t('admin.unknown') }}</span>
              <span
                v-else-if="contractStates[name]"
                class="text-[var(--color-hp)]"
              >{{ t('admin.paused') }}</span>
              <span
                v-else
                class="text-[var(--color-xp)]"
              >{{ t('admin.active') }}</span>

              <button
                v-if="contractStates[name] !== null"
                @click="handleTogglePause(name)"
                :disabled="processingAction !== null"
                class="rpg-btn !text-[8px] !px-3 !py-1"
              >
                <template v-if="processingAction === `pause-${name}`">{{ t('admin.processing') }}</template>
                <template v-else>{{ contractStates[name] ? t('admin.unpause') : t('admin.pause') }}</template>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Agent NFA Settings -->
      <div class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('admin.agentNfaSettings') }}</span>

        <!-- Mint Price -->
        <div class="flex items-center justify-between gap-3 text-[9px] mt-2">
          <span class="text-[var(--color-text-secondary)] shrink-0">{{ t('admin.mintPrice') }}</span>
          <div class="flex items-center gap-2">
            <input
              v-model="mintPriceInput"
              type="text"
              :placeholder="t('admin.mintPricePlaceholder')"
              class="rpg-input w-24 text-right"
            />
            <span class="text-[var(--color-text-secondary)]">BNB</span>
            <button
              @click="handleSetMintPrice"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'mintPrice' ? t('admin.processing') : t('admin.set') }}
            </button>
          </div>
        </div>

        <hr class="pixel-divider" />

        <!-- Contract Balance + Withdraw -->
        <div class="flex items-center justify-between gap-3 text-[9px]">
          <span class="text-[var(--color-text-secondary)] shrink-0">{{ t('admin.contractBnb') }}</span>
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-primary)]">{{ contractBalance }} BNB</span>
            <button
              @click="handleWithdraw"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'withdraw' ? t('admin.processing') : t('admin.withdraw') }}
            </button>
          </div>
        </div>
      </div>

      <!-- AFG Token Settings -->
      <div class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('admin.afgTokenSettings') }}</span>

        <div class="flex items-center justify-between gap-3 text-[9px] mt-2">
          <span class="text-[var(--color-text-secondary)] shrink-0">{{ t('admin.taxRate') }}</span>
          <div class="flex items-center gap-2">
            <input
              v-model="taxBpsInput"
              type="number"
              min="0"
              max="1000"
              class="rpg-input w-20 text-right"
            />
            <span class="text-[var(--color-text-secondary)]">{{ t('admin.bps') }}</span>
            <button
              @click="handleSetTaxBps"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'taxBps' ? t('admin.processing') : t('admin.set') }}
            </button>
          </div>
        </div>

        <hr class="pixel-divider" />

        <!-- Auto-Swap Settings -->
        <div class="flex items-center justify-between gap-3 text-[9px]">
          <span class="text-[var(--color-text-secondary)] shrink-0">Auto-Swap</span>
          <div class="flex items-center gap-2">
            <span :class="currentSwapEnabled ? 'text-[var(--color-xp)]' : 'text-[var(--color-hp)]'">
              {{ currentSwapEnabled ? 'ON' : 'OFF' }}
            </span>
            <button
              @click="handleToggleSwapEnabled"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'swapEnabled' ? t('admin.processing') : (currentSwapEnabled ? t('admin.pause') : t('admin.unpause')) }}
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 text-[9px]">
          <span class="text-[var(--color-text-secondary)] shrink-0">Swap Threshold</span>
          <div class="flex items-center gap-2">
            <input
              v-model="swapThresholdInput"
              type="text"
              placeholder="10000"
              class="rpg-input w-24 text-right"
            />
            <span class="text-[var(--color-text-secondary)]">AFG</span>
            <button
              @click="handleSetSwapThreshold"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'swapThreshold' ? t('admin.processing') : t('admin.set') }}
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 text-[9px]">
          <span class="text-[var(--color-text-secondary)] shrink-0">Router</span>
          <div class="flex items-center gap-2">
            <a
              v-if="currentRouterAddress"
              :href="`${explorerUrl}/address/${currentRouterAddress}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[var(--color-primary)] hover:underline text-[8px] font-mono"
            >{{ shortenAddress(currentRouterAddress) }} &nearr;</a>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 text-[9px]">
          <span class="text-[var(--color-text-secondary)] shrink-0">Set Router</span>
          <div class="flex items-center gap-2">
            <input
              v-model="routerInput"
              type="text"
              placeholder="0x..."
              class="rpg-input w-48 text-[8px]"
            />
            <button
              @click="handleSetRouter"
              :disabled="processingAction !== null || !routerInput"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'router' ? t('admin.processing') : t('admin.set') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Tax Exempt Settings -->
      <div class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('admin.taxExemptSettings') }}</span>

        <div class="flex items-center gap-2 text-[9px] mt-2">
          <input
            v-model="exemptInput"
            type="text"
            :placeholder="t('admin.exemptPlaceholder')"
            class="rpg-input flex-1 text-[8px]"
            @input="exemptChecked = false"
          />
          <button
            @click="handleCheckExempt"
            :disabled="processingAction !== null || !exemptInput"
            class="rpg-btn !text-[8px] !px-3 !py-1"
          >
            {{ processingAction === 'checkExempt' ? t('admin.processing') : t('admin.check') }}
          </button>
        </div>

        <div v-if="exemptChecked" class="flex items-center justify-between text-[9px]">
          <div class="flex items-center gap-2">
            <span class="text-[var(--color-text-secondary)]">{{ t('admin.status') }}:</span>
            <span :class="exemptStatus ? 'text-[var(--color-xp)]' : 'text-[var(--color-text-secondary)]'">
              {{ exemptStatus ? t('admin.exempt') : t('admin.taxed') }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-if="!exemptStatus"
              @click="handleSetExempt(true)"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'addExempt' ? t('admin.processing') : t('admin.addExempt') }}
            </button>
            <button
              v-else
              @click="handleSetExempt(false)"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1 !border-[var(--color-hp)]"
            >
              {{ processingAction === 'removeExempt' ? t('admin.processing') : t('admin.removeExempt') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Reward Settings -->
      <div class="rpg-box relative space-y-4">
        <span class="rpg-box-title">{{ t('admin.rewardSettings') }}</span>

        <div class="flex items-center justify-between gap-3 text-[9px] mt-2">
          <span class="text-[var(--color-text-secondary)] shrink-0">{{ t('admin.devWallet') }}</span>
          <div class="flex items-center gap-2">
            <input
              v-model="devWalletInput"
              type="text"
              :placeholder="t('admin.devWalletPlaceholder')"
              class="rpg-input w-48 text-[8px]"
            />
            <button
              @click="handleSetDevWallet"
              :disabled="processingAction !== null"
              class="rpg-btn !text-[8px] !px-3 !py-1"
            >
              {{ processingAction === 'devWallet' ? t('admin.processing') : t('admin.set') }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.rpg-input {
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  font-family: inherit;
  font-size: 9px;
  padding: 4px 8px;
}
.rpg-input:focus {
  outline: none;
  border-color: var(--color-primary);
}
</style>
