/**
 * Add Liquidity Script
 *
 * Adds AFG/BNB liquidity to PancakeSwap V2.
 *
 * Usage:
 *   npx hardhat run scripts/add-liquidity.ts --network bscTestnet
 *   npx hardhat run scripts/add-liquidity.ts --network bsc
 *
 * Environment variables:
 *   PRIVATE_KEY       — deployer/treasury private key
 *   LIQUIDITY_AFG     — amount of AFG to add (e.g. "1000000" for 1M AFG)
 *   LIQUIDITY_BNB     — amount of BNB to add (e.g. "10" for 10 BNB)
 *
 * Flow:
 *   1. Approve PancakeSwap Router to spend AFG
 *   2. Call addLiquidityETH() with AFG + BNB
 *   3. Get LP pair address from PancakeSwap Factory
 *
 * NOTE: The deployer/treasury is tax-exempt by default, so adding liquidity
 *       won't be taxed. All non-exempt transfers are taxed automatically.
 */

import 'dotenv/config'
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  formatEther,
  getAddress,
  type Address,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet, bsc } from 'viem/chains'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// PancakeSwap V2 Router addresses
const PANCAKE_ROUTER: Record<string, Address> = {
  bsc: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  bscTestnet: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
}

// Minimal ABIs
const ERC20_ABI = [
  { type: 'function', name: 'approve', inputs: [{ name: 'spender', type: 'address' }, { name: 'value', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
  { type: 'function', name: 'balanceOf', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'allowance', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
] as const

const ROUTER_ABI = [
  { type: 'function', name: 'factory', inputs: [], outputs: [{ type: 'address' }], stateMutability: 'view' },
  { type: 'function', name: 'WETH', inputs: [], outputs: [{ type: 'address' }], stateMutability: 'view' },
  {
    type: 'function', name: 'addLiquidityETH', stateMutability: 'payable',
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'amountTokenDesired', type: 'uint256' },
      { name: 'amountTokenMin', type: 'uint256' },
      { name: 'amountETHMin', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    outputs: [
      { name: 'amountToken', type: 'uint256' },
      { name: 'amountETH', type: 'uint256' },
      { name: 'liquidity', type: 'uint256' },
    ],
  },
] as const

const FACTORY_ABI = [
  { type: 'function', name: 'getPair', inputs: [{ name: 'tokenA', type: 'address' }, { name: 'tokenB', type: 'address' }], outputs: [{ type: 'address' }], stateMutability: 'view' },
] as const

async function main() {
  // Determine network
  const networkArg = process.argv.find(a => a.startsWith('--network='))?.split('=')[1]
    || (process.argv.includes('--network') ? process.argv[process.argv.indexOf('--network') + 1] : undefined)
  const network = networkArg || 'bscTestnet'

  const chain = network === 'bsc' ? bsc : bscTestnet
  const rpcUrl = network === 'bsc'
    ? (process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org')
    : (process.env.BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545')

  const routerAddress = PANCAKE_ROUTER[network]
  if (!routerAddress) {
    console.error(`ERROR: No PancakeSwap router configured for network "${network}"`)
    process.exit(1)
  }

  if (!process.env.PRIVATE_KEY) {
    console.error('ERROR: PRIVATE_KEY environment variable not set')
    process.exit(1)
  }
  if (!process.env.LIQUIDITY_AFG || !process.env.LIQUIDITY_BNB) {
    console.error('ERROR: LIQUIDITY_AFG and LIQUIDITY_BNB environment variables required')
    console.error('Example: LIQUIDITY_AFG=1000000 LIQUIDITY_BNB=10')
    process.exit(1)
  }

  const afgAmount = parseEther(process.env.LIQUIDITY_AFG)
  const bnbAmount = parseEther(process.env.LIQUIDITY_BNB)

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
  const publicClient = createPublicClient({ chain, transport: http(rpcUrl) })
  const walletClient = createWalletClient({ chain, transport: http(rpcUrl), account })

  // Load AFGToken address
  const deploymentsDir = path.resolve(__dirname, `../deployments/${network}`)
  const afgFile = path.join(deploymentsDir, 'AFGToken.json')
  if (!fs.existsSync(afgFile)) {
    console.error(`ERROR: AFGToken deployment not found at ${afgFile}`)
    process.exit(1)
  }
  const afgAddress = getAddress(JSON.parse(fs.readFileSync(afgFile, 'utf-8')).address)

  console.log('='.repeat(60))
  console.log('  AgentForge — Add Liquidity')
  console.log('='.repeat(60))
  console.log(`Network:     ${network} (chainId: ${chain.id})`)
  console.log(`Account:     ${account.address}`)
  console.log(`AFGToken:    ${afgAddress}`)
  console.log(`Router:      ${routerAddress}`)
  console.log(`AFG Amount:  ${formatEther(afgAmount)} AFG`)
  console.log(`BNB Amount:  ${formatEther(bnbAmount)} BNB`)
  console.log('='.repeat(60))
  console.log()

  // Check AFG balance
  const afgBalance = await publicClient.readContract({
    address: afgAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [account.address],
  })
  console.log(`AFG Balance: ${formatEther(afgBalance)} AFG`)
  if (afgBalance < afgAmount) {
    console.error(`ERROR: Insufficient AFG balance. Need ${formatEther(afgAmount)}, have ${formatEther(afgBalance)}`)
    process.exit(1)
  }

  // Check BNB balance
  const bnbBalance = await publicClient.getBalance({ address: account.address })
  console.log(`BNB Balance: ${formatEther(bnbBalance)} BNB`)
  if (bnbBalance < bnbAmount) {
    console.error(`ERROR: Insufficient BNB balance. Need ${formatEther(bnbAmount)}, have ${formatEther(bnbBalance)}`)
    process.exit(1)
  }
  console.log()

  // Step 1: Approve Router
  console.log('Step 1: Approving PancakeSwap Router...')
  const currentAllowance = await publicClient.readContract({
    address: afgAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [account.address, routerAddress],
  })

  if (currentAllowance < afgAmount) {
    const approveHash = await walletClient.writeContract({
      address: afgAddress,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [routerAddress, afgAmount],
    })
    const approveReceipt = await publicClient.waitForTransactionReceipt({ hash: approveHash })
    console.log(`  Approved TX: ${approveHash} (status: ${approveReceipt.status})`)
  } else {
    console.log('  Already approved.')
  }

  // Step 2: Add Liquidity
  console.log('\nStep 2: Adding liquidity...')
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 600) // 10 min deadline
  // Accept 5% slippage
  const minAfg = afgAmount * 95n / 100n
  const minBnb = bnbAmount * 95n / 100n

  const addLiqHash = await walletClient.writeContract({
    address: routerAddress,
    abi: ROUTER_ABI,
    functionName: 'addLiquidityETH',
    args: [afgAddress, afgAmount, minAfg, minBnb, account.address, deadline],
    value: bnbAmount,
  })
  const addLiqReceipt = await publicClient.waitForTransactionReceipt({ hash: addLiqHash })
  console.log(`  TX: ${addLiqHash} (status: ${addLiqReceipt.status})`)

  // Step 3: Get pair address
  console.log('\nStep 3: Fetching pair address...')
  const factoryAddress = await publicClient.readContract({
    address: routerAddress,
    abi: ROUTER_ABI,
    functionName: 'factory',
  }) as Address

  const weth = await publicClient.readContract({
    address: routerAddress,
    abi: ROUTER_ABI,
    functionName: 'WETH',
  }) as Address

  const pairAddress = await publicClient.readContract({
    address: factoryAddress,
    abi: FACTORY_ABI,
    functionName: 'getPair',
    args: [afgAddress, weth],
  }) as Address

  console.log(`  Factory: ${factoryAddress}`)
  console.log(`  WBNB:    ${weth}`)
  console.log(`  Pair:    ${pairAddress}`)

  if (pairAddress === '0x0000000000000000000000000000000000000000') {
    console.error('  ERROR: Pair not found — addLiquidity may have failed')
    process.exit(1)
  }

  console.log('\n' + '='.repeat(60))
  console.log('  Done! Liquidity added successfully.')
  console.log(`  LP Pair: ${pairAddress}`)
  console.log('  All non-exempt transfers are taxed automatically.')
  console.log('='.repeat(60))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
