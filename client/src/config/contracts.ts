import type { Address } from 'viem'
import { API_BASE } from '@/config/api'

interface ContractAddresses {
  AFGToken: Address
  AgentNFA: Address
  ProblemManager: Address
  RewardDistributor: Address
  VerifierElection: Address
}

let addresses: ContractAddresses | null = null

export async function initContractAddresses(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/api/config`)
    const data = await res.json()
    if (data.contracts) {
      addresses = {
        AFGToken: data.contracts.afgToken,
        AgentNFA: data.contracts.agentNFA,
        ProblemManager: data.contracts.problemManager,
        RewardDistributor: data.contracts.rewardDistributor,
        VerifierElection: data.contracts.verifierElection,
      }
    }
  } catch {
    console.warn('Failed to load contract addresses from server')
  }
}

export function getContractAddress(name: keyof ContractAddresses): Address {
  if (!addresses) throw new Error('Contract addresses not initialized')
  return addresses[name]
}

export function getContractAddresses(): ContractAddresses | null {
  return addresses
}
