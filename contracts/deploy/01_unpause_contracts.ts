import 'dotenv/config';
import {deployScript, artifacts} from '../rocketh/deploy.js';

export default deployScript(
  async (env) => {
    const {deployer} = env.namedAccounts;

    console.log('Unpausing contracts...');

    // Unpause AFGToken
    const afgToken = await env.get('AFGToken');
    try {
      const paused = await env.read(afgToken, { functionName: 'paused' });
      if (paused) {
        await env.execute(afgToken, {
          account: deployer,
          functionName: 'unpause',
        });
        console.log('✅ AFGToken unpaused');
      } else {
        console.log('✅ AFGToken already unpaused');
      }
    } catch (e: any) {
      console.log('⚠️  AFGToken unpause failed:', e.message);
    }

    // Unpause AgentNFA
    const agentNFA = await env.get('AgentNFA');
    try {
      const paused = await env.read(agentNFA, { functionName: 'paused' });
      if (paused) {
        await env.execute(agentNFA, {
          account: deployer,
          functionName: 'unpause',
        });
        console.log('✅ AgentNFA unpaused');
      } else {
        console.log('✅ AgentNFA already unpaused');
      }
    } catch (e: any) {
      console.log('⚠️  AgentNFA unpause failed:', e.message);
    }

    // Unpause ProblemManager
    const problemManager = await env.get('ProblemManager');
    try {
      const paused = await env.read(problemManager, { functionName: 'paused' });
      if (paused) {
        await env.execute(problemManager, {
          account: deployer,
          functionName: 'unpause',
        });
        console.log('✅ ProblemManager unpaused');
      } else {
        console.log('✅ ProblemManager already unpaused');
      }
    } catch (e: any) {
      console.log('⚠️  ProblemManager unpause failed:', e.message);
    }

    // Unpause RewardDistributor
    const rewardDistributor = await env.get('RewardDistributor');
    try {
      const paused = await env.read(rewardDistributor, { functionName: 'paused' });
      if (paused) {
        await env.execute(rewardDistributor, {
          account: deployer,
          functionName: 'unpause',
        });
        console.log('✅ RewardDistributor unpaused');
      } else {
        console.log('✅ RewardDistributor already unpaused');
      }
    } catch (e: any) {
      console.log('⚠️  RewardDistributor unpause failed:', e.message);
    }

    console.log('\n🎉 All contracts unpaused!');
  },
  {tags: ['unpause'], dependencies: ['all']},
);
