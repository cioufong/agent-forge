/**
 * Renounce Ownership Script
 *
 * Permanently renounce ownership of AgentForge contracts.
 * Once renounced, admin functions (pause, setMintPrice, etc.) are permanently disabled.
 *
 * Usage:
 *   npx hardhat run scripts/renounce.ts --network bscTestnet
 *
 * Environment variables:
 *   RENOUNCE_CONTRACTS — comma-separated list of contracts to renounce
 *     e.g. "AFGToken,AgentNFA,ProblemManager,RewardDistributor,VerifierElection"
 *     or "all" to renounce all contracts
 *
 * WARNING: This action is IRREVERSIBLE. The following functions will stop working:
 *   - AFGToken: pause/unpause, setDexTaxBps, setMinter
 *   - AgentNFA: pause/unpause, setMintPrice, withdraw, setGameMaster, setMetadataRenderer
 *   - ProblemManager: pause/unpause, setOracle, setResolver
 *   - RewardDistributor: pause/unpause, setDevWallet, setVerifierElection
 *   - VerifierElection: all admin functions
 */

import 'dotenv/config'
import { createPublicClient, createWalletClient, http, getAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet, bsc } from 'viem/chains'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OWNABLE_ABI = [
  { type: 'function', name: 'owner', inputs: [], outputs: [{ type: 'address' }], stateMutability: 'view' },
  { type: 'function', name: 'renounceOwnership', inputs: [], outputs: [], stateMutability: 'nonpayable' },
] as const

const ALL_CONTRACTS = ['AFGToken', 'AgentNFA', 'ProblemManager', 'RewardDistributor', 'VerifierElection'] as const

async function main() {
  // Determine network
  const networkArg = process.argv.find(a => a.startsWith('--network='))?.split('=')[1]
    || (process.argv.includes('--network') ? process.argv[process.argv.indexOf('--network') + 1] : undefined)
  const network = networkArg || 'bscTestnet'

  const chain = network === 'bsc' ? bsc : bscTestnet
  const rpcUrl = network === 'bsc'
    ? (process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org')
    : (process.env.BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545')

  if (!process.env.PRIVATE_KEY) {
    console.error('ERROR: PRIVATE_KEY environment variable not set')
    process.exit(1)
  }

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
  const publicClient = createPublicClient({ chain, transport: http(rpcUrl) })
  const walletClient = createWalletClient({ chain, transport: http(rpcUrl), account })

  // Load deployed addresses
  const deploymentsDir = path.resolve(__dirname, `../deployments/${network}`)
  if (!fs.existsSync(deploymentsDir)) {
    console.error(`ERROR: No deployments found at ${deploymentsDir}`)
    console.error('Make sure contracts are deployed to this network first.')
    process.exit(1)
  }

  function loadAddress(contractName: string): string | null {
    const file = path.join(deploymentsDir, `${contractName}.json`)
    if (!fs.existsSync(file)) return null
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    return data.address
  }

  // Parse which contracts to renounce
  const renounceEnv = process.env.RENOUNCE_CONTRACTS || ''
  if (!renounceEnv) {
    console.error('ERROR: RENOUNCE_CONTRACTS environment variable not set')
    console.error('Set it to a comma-separated list of contract names, or "all"')
    console.error(`Available: ${ALL_CONTRACTS.join(', ')}`)
    process.exit(1)
  }

  const toRenounce = renounceEnv.toLowerCase() === 'all'
    ? [...ALL_CONTRACTS]
    : renounceEnv.split(',').map(s => s.trim())

  // Validate contract names
  for (const name of toRenounce) {
    if (!ALL_CONTRACTS.includes(name as any)) {
      console.error(`ERROR: Unknown contract "${name}"`)
      console.error(`Available: ${ALL_CONTRACTS.join(', ')}`)
      process.exit(1)
    }
  }

  console.log('='.repeat(60))
  console.log('  AgentForge — Renounce Ownership')
  console.log('='.repeat(60))
  console.log(`Network:  ${network} (chainId: ${chain.id})`)
  console.log(`Account:  ${account.address}`)
  console.log(`Contracts: ${toRenounce.join(', ')}`)
  console.log('='.repeat(60))
  console.log()
  console.log('WARNING: This action is IRREVERSIBLE!')
  console.log('After renouncing, admin functions will be permanently disabled.')
  console.log()

  // Process each contract
  for (const contractName of toRenounce) {
    const address = loadAddress(contractName)
    if (!address) {
      console.log(`SKIP ${contractName}: no deployment found`)
      continue
    }

    const contractAddr = getAddress(address)

    // Check current owner
    const currentOwner = await publicClient.readContract({
      address: contractAddr,
      abi: OWNABLE_ABI,
      functionName: 'owner',
    })

    if (currentOwner.toLowerCase() === '0x0000000000000000000000000000000000000000') {
      console.log(`SKIP ${contractName} (${contractAddr}): already renounced`)
      continue
    }

    if (currentOwner.toLowerCase() !== account.address.toLowerCase()) {
      console.log(`SKIP ${contractName} (${contractAddr}): not owner (owner=${currentOwner})`)
      continue
    }

    console.log(`Renouncing ${contractName} (${contractAddr})...`)

    const hash = await walletClient.writeContract({
      address: contractAddr,
      abi: OWNABLE_ABI,
      functionName: 'renounceOwnership',
    })

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`  TX: ${hash} (status: ${receipt.status})`)

    // Verify
    const newOwner = await publicClient.readContract({
      address: contractAddr,
      abi: OWNABLE_ABI,
      functionName: 'owner',
    })
    const isRenounced = newOwner.toLowerCase() === '0x0000000000000000000000000000000000000000'
    console.log(`  ${isRenounced ? 'OK' : 'FAILED'} — owner is now ${newOwner}`)
    console.log()
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
