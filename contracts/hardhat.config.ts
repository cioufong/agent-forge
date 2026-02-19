import 'dotenv/config';
import type {HardhatUserConfig} from 'hardhat/config';

import HardhatNodeTestRunner from '@nomicfoundation/hardhat-node-test-runner';
import HardhatViem from '@nomicfoundation/hardhat-viem';
import HardhatNetworkHelpers from '@nomicfoundation/hardhat-network-helpers';
import HardhatKeystore from '@nomicfoundation/hardhat-keystore';

import HardhatDeploy from 'hardhat-deploy';

const config: HardhatUserConfig = {
  plugins: [
    HardhatNodeTestRunner,
    HardhatViem,
    HardhatNetworkHelpers,
    HardhatKeystore,
    HardhatDeploy,
  ],
  solidity: {
    profiles: {
      default: {
        version: '0.8.33',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
          viaIR: true,
        },
      },
    },
  },
  networks: {
    default: {
      type: 'edr-simulated',
      chainType: 'l1',
      chainId: 1337,
    },
    localhost: {
      type: 'http',
      url: 'http://127.0.0.1:8545',
    },
    bscTestnet: {
      type: 'http',
      url: process.env.BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 97,
    },
    bsc: {
      type: 'http',
      url: process.env.BSC_RPC_URL || 'https://bsc-dataseed1.binance.org',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 56,
    },
  },
  paths: {
    sources: ['contracts'],
  },
  generateTypedArtifacts: {
    destinations: [
      {
        folder: './generated',
        mode: 'typescript',
      },
    ],
  },
};

export default config;
