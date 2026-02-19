import { ref, computed } from 'vue'
import { createPublicClient, createWalletClient, custom, http, type PublicClient, type WalletClient, type Address, type Chain } from 'viem'
import { bscTestnet, bsc } from 'viem/chains'

const account = ref<Address | null>(null)
const chainId = ref<number | null>(null)
const isConnecting = ref(false)
const error = ref<string | null>(null)

let publicClient: PublicClient | null = null
let walletClient: WalletClient | null = null

const TARGET_CHAIN: Chain = bscTestnet

const isConnected = computed(() => !!account.value)
const isWrongChain = computed(() => chainId.value !== null && chainId.value !== TARGET_CHAIN.id)

function getPublicClient(): PublicClient {
  if (!publicClient) {
    publicClient = createPublicClient({
      chain: TARGET_CHAIN,
      transport: http(),
    })
  }
  return publicClient
}

function getWalletClient(): WalletClient | null {
  return walletClient
}

async function connect(): Promise<void> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    error.value = 'MetaMask not found'
    return
  }

  isConnecting.value = true
  error.value = null

  try {
    const ethereum = (window as any).ethereum
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const chain = await ethereum.request({ method: 'eth_chainId' })

    account.value = accounts[0] as Address
    chainId.value = parseInt(chain, 16)

    walletClient = createWalletClient({
      account: account.value,
      chain: TARGET_CHAIN,
      transport: custom(ethereum),
    })

    publicClient = createPublicClient({
      chain: TARGET_CHAIN,
      transport: custom(ethereum),
    })

    // Listen for account/chain changes
    ethereum.on('accountsChanged', (accs: string[]) => {
      account.value = accs.length > 0 ? accs[0] as Address : null
      if (account.value) {
        walletClient = createWalletClient({
          account: account.value,
          chain: TARGET_CHAIN,
          transport: custom(ethereum),
        })
      }
    })

    ethereum.on('chainChanged', (chain: string) => {
      chainId.value = parseInt(chain, 16)
    })
  } catch (err: any) {
    error.value = err.message
  } finally {
    isConnecting.value = false
  }
}

async function switchChain(): Promise<void> {
  const ethereum = (window as any).ethereum
  if (!ethereum) return

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${TARGET_CHAIN.id.toString(16)}` }],
    })
  } catch (err: any) {
    // Chain not added, try adding it
    if (err.code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${TARGET_CHAIN.id.toString(16)}`,
          chainName: TARGET_CHAIN.name,
          nativeCurrency: TARGET_CHAIN.nativeCurrency,
          rpcUrls: [TARGET_CHAIN.rpcUrls.default.http[0]],
          blockExplorerUrls: TARGET_CHAIN.blockExplorers ? [TARGET_CHAIN.blockExplorers.default.url] : [],
        }],
      })
    }
  }
}

function disconnect(): void {
  account.value = null
  chainId.value = null
  walletClient = null
}

export function useWeb3() {
  return {
    account,
    chainId,
    isConnecting,
    isConnected,
    isWrongChain,
    error,
    connect,
    disconnect,
    switchChain,
    getPublicClient,
    getWalletClient,
    TARGET_CHAIN,
  }
}
