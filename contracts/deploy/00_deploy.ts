import 'dotenv/config';
import {deployScript, artifacts} from '../rocketh/deploy.js';
import {parseEther} from 'viem';

export default deployScript(
  async (env) => {
    const {deployer} = env.namedAccounts;
    const chainId = await env.viem.publicClient.getChainId();

    console.log('Deploying AgentForge contracts...');
    console.log('Deployer:', deployer);
    console.log('Network:', chainId);

    // Config
    const treasury = process.env.TREASURY_ADDRESS || deployer;
    const oracleAddress = process.env.ORACLE_ADDRESS || deployer;
    const devWallet = process.env.DEV_WALLET || deployer;
    const mintPrice = process.env.MINT_PRICE || parseEther('0.01').toString();

    // ====================================================
    // 1. AFGToken
    // ====================================================
    const afgToken = await env.deploy('AFGToken', {
      account: deployer,
      artifact: artifacts.AFGToken,
      args: [treasury],
    });
    console.log('✅ AFGToken deployed:', afgToken.address);

    // ====================================================
    // 2. AgentNFA + Renderer
    // ====================================================
    const agentNFA = await env.deploy('AgentNFA', {
      account: deployer,
      artifact: artifacts.AgentNFA,
      args: [BigInt(mintPrice)],
    });
    console.log('✅ AgentNFA deployed:', agentNFA.address);

    const renderer = await env.deploy('AgentNFARenderer', {
      account: deployer,
      artifact: artifacts.AgentNFARenderer,
      args: [agentNFA.address],
    });
    console.log('✅ AgentNFARenderer deployed:', renderer.address);

    // Link renderer to AgentNFA
    try {
      const currentRenderer = await env.read(agentNFA, {
        functionName: 'metadataRenderer',
      });
      if ((currentRenderer as string).toLowerCase() !== renderer.address.toLowerCase()) {
        console.log('🔗 Linking Renderer to AgentNFA...');
        await env.execute(agentNFA, {
          account: deployer,
          functionName: 'setMetadataRenderer',
          args: [renderer.address],
        });
      } else {
        console.log('✅ Renderer already linked');
      }
    } catch {
      console.log('🔗 Linking Renderer to AgentNFA (Initial)...');
      await env.execute(agentNFA, {
        account: deployer,
        functionName: 'setMetadataRenderer',
        args: [renderer.address],
      });
    }

    // ====================================================
    // 3. ProblemManager
    // ====================================================
    const problemManager = await env.deploy('ProblemManager', {
      account: deployer,
      artifact: artifacts.ProblemManager,
      args: [agentNFA.address, oracleAddress],
    });
    console.log('✅ ProblemManager deployed:', problemManager.address);

    // ====================================================
    // 4. RewardDistributor
    // ====================================================
    const rewardDistributor = await env.deploy('RewardDistributor', {
      account: deployer,
      artifact: artifacts.RewardDistributor,
      args: [afgToken.address, agentNFA.address, problemManager.address, devWallet],
    });
    console.log('✅ RewardDistributor deployed:', rewardDistributor.address);

    // ====================================================
    // 5. VerifierElection
    // ====================================================
    const verifierElection = await env.deploy('VerifierElection', {
      account: deployer,
      artifact: artifacts.VerifierElection,
      args: [afgToken.address, agentNFA.address, problemManager.address],
    });
    console.log('✅ VerifierElection deployed:', verifierElection.address);

    // ====================================================
    // 6. Wire contracts together
    // ====================================================

    // Set RewardDistributor as minter on AFGToken
    try {
      const currentMinter = await env.read(afgToken, {
        functionName: 'minter',
      });
      if ((currentMinter as string).toLowerCase() !== rewardDistributor.address.toLowerCase()) {
        console.log('🔗 Setting RewardDistributor as AFGToken minter...');
        await env.execute(afgToken, {
          account: deployer,
          functionName: 'setMinter',
          args: [rewardDistributor.address],
        });
      }
    } catch {
      console.log('🔗 Setting RewardDistributor as AFGToken minter (Initial)...');
      await env.execute(afgToken, {
        account: deployer,
        functionName: 'setMinter',
        args: [rewardDistributor.address],
      });
    }

    // Set RewardDistributor as game master on AgentNFA (for XP grants)
    try {
      const isGM = await env.read(agentNFA, {
        functionName: 'isGameMaster',
        args: [rewardDistributor.address],
      });
      if (!isGM) {
        console.log('🔗 Setting RewardDistributor as AgentNFA game master...');
        await env.execute(agentNFA, {
          account: deployer,
          functionName: 'setGameMaster',
          args: [rewardDistributor.address, true],
        });
      }
    } catch {
      console.log('🔗 Setting RewardDistributor as AgentNFA game master (Initial)...');
      await env.execute(agentNFA, {
        account: deployer,
        functionName: 'setGameMaster',
        args: [rewardDistributor.address, true],
      });
    }

    // Set VerifierElection as resolver on ProblemManager
    try {
      const currentResolver = await env.read(problemManager, {
        functionName: 'resolver',
      });
      if ((currentResolver as string).toLowerCase() !== verifierElection.address.toLowerCase()) {
        console.log('🔗 Setting VerifierElection as ProblemManager resolver...');
        await env.execute(problemManager, {
          account: deployer,
          functionName: 'setResolver',
          args: [verifierElection.address],
        });
      }
    } catch {
      console.log('🔗 Setting VerifierElection as ProblemManager resolver (Initial)...');
      await env.execute(problemManager, {
        account: deployer,
        functionName: 'setResolver',
        args: [verifierElection.address],
      });
    }

    // Set VerifierElection on RewardDistributor
    try {
      console.log('🔗 Setting VerifierElection on RewardDistributor...');
      await env.execute(rewardDistributor, {
        account: deployer,
        functionName: 'setVerifierElection',
        args: [verifierElection.address],
      });
    } catch {
      // May already be set
    }

    // Set tax-exempt for protocol contracts
    const exemptAddresses = [
      { name: 'RewardDistributor', address: rewardDistributor.address },
      { name: 'VerifierElection', address: verifierElection.address },
    ];

    for (const entry of exemptAddresses) {
      try {
        const isExempt = await env.read(afgToken, {
          functionName: 'isTaxExempt',
          args: [entry.address],
        });
        if (!isExempt) {
          console.log(`🔗 Setting ${entry.name} as tax-exempt...`);
          await env.execute(afgToken, {
            account: deployer,
            functionName: 'setTaxExempt',
            args: [entry.address, true],
          });
        }
      } catch {
        console.log(`🔗 Setting ${entry.name} as tax-exempt (Initial)...`);
        await env.execute(afgToken, {
          account: deployer,
          functionName: 'setTaxExempt',
          args: [entry.address, true],
        });
      }
    }

    console.log('\n🎉 All contracts deployed and wired!');
    console.log('⚠️  Contracts are PAUSED. Run 01_unpause_contracts.ts to activate.');
    console.log({
      AFGToken: afgToken.address,
      AgentNFA: agentNFA.address,
      AgentNFARenderer: renderer.address,
      ProblemManager: problemManager.address,
      RewardDistributor: rewardDistributor.address,
      VerifierElection: verifierElection.address,
    });
  },
  {tags: ['all']},
);
