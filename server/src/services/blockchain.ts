/**
 * Blockchain Service
 * viem client + contract interaction for 4-phase problem lifecycle
 */

import { createPublicClient, createWalletClient, http, type PublicClient, type WalletClient, type Address, type Chain } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet, bsc } from 'viem/chains'
import * as fs from 'fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DEPLOYMENTS_DIR = process.env.DEPLOYMENTS_DIR || path.resolve(__dirname, '../../../contracts/deployments')

function getChain(): Chain {
  const chainId = parseInt(process.env.CHAIN_ID || '97', 10)
  return chainId === 56 ? bsc : bscTestnet
}

function getNetworkName(): string {
  const chainId = parseInt(process.env.CHAIN_ID || '97', 10)
  return chainId === 56 ? 'bsc' : 'bscTestnet'
}

function readDeployment(contractName: string): { address: Address; abi: any[] } | null {
  try {
    const filePath = path.join(DEPLOYMENTS_DIR, getNetworkName(), `${contractName}.json`)
    if (!fs.existsSync(filePath)) return null
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    return { address: data.address, abi: data.abi }
  } catch {
    return null
  }
}

export interface ContractAddresses {
  afgToken: Address
  agentNFA: Address
  problemManager: Address
  rewardDistributor: Address
  verifierElection: Address
}

let publicClient: PublicClient
let walletClient: WalletClient
let contracts: ContractAddresses
let abis: Record<string, any[]> = {}

export function getPublicClient(): PublicClient {
  if (!publicClient) {
    const chain = getChain()
    const rpcUrl = process.env.RPC_URL || chain.rpcUrls.default.http[0]
    publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl),
    })
  }
  return publicClient
}

export function getWalletClient(): WalletClient {
  if (!walletClient) {
    const oracleKey = process.env.ORACLE_PRIVATE_KEY
    if (!oracleKey) throw new Error('ORACLE_PRIVATE_KEY not set')

    const chain = getChain()
    const rpcUrl = process.env.RPC_URL || chain.rpcUrls.default.http[0]
    const account = privateKeyToAccount(oracleKey as `0x${string}`)

    walletClient = createWalletClient({
      account,
      chain,
      transport: http(rpcUrl),
    })
  }
  return walletClient
}

export function initContracts(): ContractAddresses {
  const afgDeploy = readDeployment('AFGToken')
  const nfaDeploy = readDeployment('AgentNFA')
  const pmDeploy = readDeployment('ProblemManager')
  const rdDeploy = readDeployment('RewardDistributor')
  const veDeploy = readDeployment('VerifierElection')

  contracts = {
    afgToken: (afgDeploy?.address || process.env.AFG_TOKEN_ADDRESS || '0x') as Address,
    agentNFA: (nfaDeploy?.address || process.env.AGENT_NFA_ADDRESS || '0x') as Address,
    problemManager: (pmDeploy?.address || process.env.PROBLEM_MANAGER_ADDRESS || '0x') as Address,
    rewardDistributor: (rdDeploy?.address || process.env.REWARD_DISTRIBUTOR_ADDRESS || '0x') as Address,
    verifierElection: (veDeploy?.address || process.env.VERIFIER_ELECTION_ADDRESS || '0x') as Address,
  }

  if (afgDeploy?.abi) abis.AFGToken = afgDeploy.abi
  if (nfaDeploy?.abi) abis.AgentNFA = nfaDeploy.abi
  if (pmDeploy?.abi) abis.ProblemManager = pmDeploy.abi
  if (rdDeploy?.abi) abis.RewardDistributor = rdDeploy.abi
  if (veDeploy?.abi) abis.VerifierElection = veDeploy.abi

  console.log('✅ Contract addresses loaded:', contracts)
  return contracts
}

export function getContracts(): ContractAddresses {
  if (!contracts) return initContracts()
  return contracts
}

export function getABI(name: string): any[] {
  if (abis[name]) return abis[name]

  try {
    const abiPath = path.resolve(__dirname, `../contracts/${name}.json`)
    if (fs.existsSync(abiPath)) {
      abis[name] = JSON.parse(fs.readFileSync(abiPath, 'utf-8'))
      return abis[name]
    }
  } catch { /* ignore */ }

  throw new Error(`ABI not found for ${name}`)
}

// ============ Contract Read Helpers ============

export async function getAgentNFAData(tokenId: bigint) {
  const client = getPublicClient()
  const addr = getContracts()
  const abi = getABI('AgentNFA')

  const [traits, stats, experience, tier] = await Promise.all([
    client.readContract({ address: addr.agentNFA, abi, functionName: 'getTraits', args: [tokenId] }),
    client.readContract({ address: addr.agentNFA, abi, functionName: 'getStats', args: [tokenId] }),
    client.readContract({ address: addr.agentNFA, abi, functionName: 'experience', args: [tokenId] }),
    client.readContract({ address: addr.agentNFA, abi, functionName: 'getTier', args: [tokenId] }),
  ])

  return { traits, stats, experience, tier }
}

export async function getCurrentProblemOnChain() {
  const client = getPublicClient()
  const addr = getContracts()
  const abi = getABI('ProblemManager')

  const problemCount = await client.readContract({
    address: addr.problemManager, abi, functionName: 'problemCount',
  }) as bigint

  if (problemCount === 0n) return null

  const latestId = problemCount - 1n
  const problem = await client.readContract({
    address: addr.problemManager, abi, functionName: 'getProblem', args: [latestId],
  })

  return { id: latestId, ...problem as any }
}

export async function getPhaseOnChain(problemId: bigint): Promise<number> {
  const client = getPublicClient()
  const addr = getContracts()
  const abi = getABI('ProblemManager')

  return await client.readContract({
    address: addr.problemManager, abi, functionName: 'getPhase', args: [problemId],
  }) as number
}

export async function isProblemResolvedOnChain(problemId: bigint): Promise<boolean> {
  const client = getPublicClient()
  const addr = getContracts()
  const abi = getABI('ProblemManager')

  const problem = await client.readContract({
    address: addr.problemManager, abi, functionName: 'getProblem', args: [problemId],
  }) as any

  return problem.resolved
}

export async function isVerificationResolvedOnChain(problemId: bigint): Promise<boolean> {
  const client = getPublicClient()
  const addr = getContracts()
  const abi = getABI('VerifierElection')

  return await client.readContract({
    address: addr.verifierElection, abi, functionName: 'isVerificationResolved', args: [problemId],
  }) as boolean
}

// ============ Contract Write Helpers ============

export async function postProblemOnChain(questionHash: `0x${string}`) {
  const wallet = getWalletClient()
  const addr = getContracts()
  const abi = getABI('ProblemManager')

  const hash = await wallet.writeContract({
    address: addr.problemManager,
    abi,
    functionName: 'postProblem',
    args: [questionHash],
  })

  const client = getPublicClient()
  return client.waitForTransactionReceipt({ hash })
}

export async function resolveByOracleOnChain(
  problemId: bigint,
  correctAnswerHash: `0x${string}`,
) {
  const wallet = getWalletClient()
  const addr = getContracts()
  const abi = getABI('ProblemManager')

  const hash = await wallet.writeContract({
    address: addr.problemManager,
    abi,
    functionName: 'resolveByOracle',
    args: [problemId, correctAnswerHash],
  })

  const client = getPublicClient()
  return client.waitForTransactionReceipt({ hash })
}

export async function distributeRewardsOnChain(
  problemId: bigint,
  tier: number,
  winnerTokenIds: bigint[],
) {
  const wallet = getWalletClient()
  const addr = getContracts()
  const abi = getABI('RewardDistributor')

  const hash = await wallet.writeContract({
    address: addr.rewardDistributor,
    abi,
    functionName: 'distributeRewards',
    args: [problemId, tier, winnerTokenIds],
  })

  const client = getPublicClient()
  return client.waitForTransactionReceipt({ hash })
}

export async function getWinnersOnChain(problemId: bigint): Promise<bigint[]> {
  const client = getPublicClient()
  const addr = getContracts()
  const abi = getABI('ProblemManager')

  return await client.readContract({
    address: addr.problemManager, abi, functionName: 'getWinners', args: [problemId],
  }) as bigint[]
}
