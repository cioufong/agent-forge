export const Artifact_AFGToken: {
  "contractName": "AFGToken",
  "sourceName": "contracts/AFGToken.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_router",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EnforcedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExceedsMiningPool",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExpectedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlyMinter",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlySelf",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SwapThresholdTooHigh",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SwapThresholdTooLow",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TaxTooHigh",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroAddress",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "minter",
          "type": "address"
        }
      ],
      "name": "MinterSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "newRouter",
          "type": "address"
        }
      ],
      "name": "RouterUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "enabled",
          "type": "bool"
        }
      ],
      "name": "SwapEnabledUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newThreshold",
          "type": "uint256"
        }
      ],
      "name": "SwapThresholdUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newBps",
          "type": "uint256"
        }
      ],
      "name": "TaxBpsUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "exempt",
          "type": "bool"
        }
      ],
      "name": "TaxExemptSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "afgAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bnbAmount",
          "type": "uint256"
        }
      ],
      "name": "TaxSwapped",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "INITIAL_REWARD_PER_ROUND",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_SUPPLY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_SWAP_THRESHOLD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_TAX_BPS",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MINING_POOL",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MIN_SWAP_THRESHOLD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ROUNDS_PER_HALVING",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ROUND_DURATION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TREASURY_PREMINT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentRewardPerRound",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deployedAt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "executeSwap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isTaxExempt",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minter",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "router",
      "outputs": [
        {
          "internalType": "contract IUniswapV2Router02",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_minter",
          "type": "address"
        }
      ],
      "name": "setMinter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_router",
          "type": "address"
        }
      ],
      "name": "setRouter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_enabled",
          "type": "bool"
        }
      ],
      "name": "setSwapEnabled",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_threshold",
          "type": "uint256"
        }
      ],
      "name": "setSwapThreshold",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_bps",
          "type": "uint256"
        }
      ],
      "name": "setTaxBps",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "exempt",
          "type": "bool"
        }
      ],
      "name": "setTaxExempt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "swapEnabled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "swapThreshold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "taxBps",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalMined",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x60c080604052346105af57604081611ebd803803809161001f82856105b3565b8339810103126105af5761003e6020610037836105d6565b92016105d6565b6040519161004d6040846105b3565b600a8352694167656e74466f72676560b01b6020840152604051916100736040846105b3565b600383526241464760e81b602084015283516001600160401b0381116104b557600354600181811c911680156105a5575b602082101461049757601f8111610537575b50602094601f82116001146104d4579481929394955f926104c9575b50508160011b915f199060031b1c1916176003555b82516001600160401b0381116104b557600454600181811c911680156104ab575b602082101461049757601f8111610429575b506020601f82116001146103c657819293945f926103bb575b50508160011b915f199060031b1c1916176004555b33156103a85760058054336001600160a01b0319821681179092556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a361012c600a5569021e19e0c9bab2400000600b55600c805460ff191660011790556001600160a01b038216908115610399576001600160a01b03169182156103995760a052600680546001600160a01b03191683179055426080526a084595161401484a0000005f600254918083018093116103855760207fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef918594600255846103705780600254036002555b604051908152a35f52600960205260405f20600160ff19825416179055335f52600960205260405f20600160ff19825416179055305f52600960205260405f20600160ff19825416179055301561035d57305f52600160205260405f20815f5260205260405f205f1990556040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a360055460ff8160a01c1661034e5760ff60a01b1916600160a01b176005556040513381527f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25890602090a16040516118d290816105eb823960805181818161037f0152611456015260a0518181816106a20152610c580152f35b63d93c066560e01b5f5260045ffd5b63e602df0560e01b5f525f60045260245ffd5b845f525f825260405f2081815401905561023d565b634e487b7160e01b5f52601160045260245ffd5b63d92e233d60e01b5f5260045ffd5b631e4fbdf760e01b5f525f60045260245ffd5b015190505f80610133565b601f1982169060045f52805f20915f5b818110610411575095836001959697106103f9575b505050811b01600455610148565b01515f1960f88460031b161c191690555f80806103eb565b9192602060018192868b0151815501940192016103d6565b8181111561011a5760045f52601f820160051c7f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b6020841061048f575b81601f9101920160051c03905f5b82811061048257505061011a565b5f82820155600101610474565b5f9150610466565b634e487b7160e01b5f52602260045260245ffd5b90607f1690610108565b634e487b7160e01b5f52604160045260245ffd5b015190505f806100d2565b601f1982169560035f52805f20915f5b88811061051f57508360019596979810610507575b505050811b016003556100e7565b01515f1960f88460031b161c191690555f80806104f9565b919260206001819286850151815501940192016104e4565b818111156100b65760035f52601f820160051c7fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b6020841061059d575b81601f9101920160051c03905f5b8281106105905750506100b6565b5f82820155600101610582565b5f9150610574565b90607f16906100a4565b5f80fd5b601f909101601f19168101906001600160401b038211908210176104b557604052565b51906001600160a01b03821682036105af5756fe608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
  "deployedBytecode": "0x608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
  "linkReferences": {},
  "deployedLinkReferences": {},
  "immutableReferences": {
    "7413": [
      {
        "length": 32,
        "start": 895
      },
      {
        "length": 32,
        "start": 5206
      }
    ],
    "7415": [
      {
        "length": 32,
        "start": 1698
      },
      {
        "length": 32,
        "start": 3160
      }
    ]
  },
  "inputSourceName": "project/contracts/AFGToken.sol",
  "devdoc": {
    "errors": {
      "ERC20InsufficientAllowance(address,uint256,uint256)": [
        {
          "details": "Indicates a failure with the `spender`’s `allowance`. Used in transfers.",
          "params": {
            "allowance": "Amount of tokens a `spender` is allowed to operate with.",
            "needed": "Minimum amount required to perform a transfer.",
            "spender": "Address that may be allowed to operate on tokens without being their owner."
          }
        }
      ],
      "ERC20InsufficientBalance(address,uint256,uint256)": [
        {
          "details": "Indicates an error related to the current `balance` of a `sender`. Used in transfers.",
          "params": {
            "balance": "Current balance for the interacting account.",
            "needed": "Minimum amount required to perform a transfer.",
            "sender": "Address whose tokens are being transferred."
          }
        }
      ],
      "ERC20InvalidApprover(address)": [
        {
          "details": "Indicates a failure with the `approver` of a token to be approved. Used in approvals.",
          "params": {
            "approver": "Address initiating an approval operation."
          }
        }
      ],
      "ERC20InvalidReceiver(address)": [
        {
          "details": "Indicates a failure with the token `receiver`. Used in transfers.",
          "params": {
            "receiver": "Address to which tokens are being transferred."
          }
        }
      ],
      "ERC20InvalidSender(address)": [
        {
          "details": "Indicates a failure with the token `sender`. Used in transfers.",
          "params": {
            "sender": "Address whose tokens are being transferred."
          }
        }
      ],
      "ERC20InvalidSpender(address)": [
        {
          "details": "Indicates a failure with the `spender` to be approved. Used in approvals.",
          "params": {
            "spender": "Address that may be allowed to operate on tokens without being their owner."
          }
        }
      ],
      "EnforcedPause()": [
        {
          "details": "The operation failed because the contract is paused."
        }
      ],
      "ExpectedPause()": [
        {
          "details": "The operation failed because the contract is not paused."
        }
      ],
      "OwnableInvalidOwner(address)": [
        {
          "details": "The owner is not a valid owner account. (eg. `address(0)`)"
        }
      ],
      "OwnableUnauthorizedAccount(address)": [
        {
          "details": "The caller account is not authorized to perform an operation."
        }
      ]
    },
    "events": {
      "Approval(address,address,uint256)": {
        "details": "Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance."
      },
      "Paused(address)": {
        "details": "Emitted when the pause is triggered by `account`."
      },
      "Transfer(address,address,uint256)": {
        "details": "Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero."
      },
      "Unpaused(address)": {
        "details": "Emitted when the pause is lifted by `account`."
      }
    },
    "kind": "dev",
    "methods": {
      "allowance(address,address)": {
        "details": "Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called."
      },
      "approve(address,uint256)": {
        "details": "See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address."
      },
      "balanceOf(address)": {
        "details": "Returns the value of tokens owned by `account`."
      },
      "currentRewardPerRound()": {
        "details": "Uses bit-shift for halving: reward >> halvingCount"
      },
      "decimals()": {
        "details": "Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}."
      },
      "executeSwap(uint256)": {
        "details": "External so it can be wrapped in try-catch within _update [C-01 fix]"
      },
      "name()": {
        "details": "Returns the name of the token."
      },
      "owner()": {
        "details": "Returns the address of the current owner."
      },
      "paused()": {
        "details": "Returns true if the contract is paused, and false otherwise."
      },
      "renounceOwnership()": {
        "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner."
      },
      "symbol()": {
        "details": "Returns the symbol of the token, usually a shorter version of the name."
      },
      "totalSupply()": {
        "details": "Returns the value of tokens in existence."
      },
      "transfer(address,uint256)": {
        "details": "See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`."
      },
      "transferFrom(address,address,uint256)": {
        "details": "See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`."
      },
      "transferOwnership(address)": {
        "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
      }
    },
    "stateVariables": {
      "_swapping": {
        "details": "Reentrancy lock for swap operations"
      }
    },
    "title": "AFGToken",
    "version": 1
  },
  "evm": {
    "bytecode": {
      "functionDebugData": {
        "abi_decode_address_fromMemory": {
          "entryPoint": 1494,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "finalize_allocation": {
          "entryPoint": 1459,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 0
        }
      },
      "generatedSources": [],
      "linkReferences": {},
      "object": "60c080604052346105af57604081611ebd803803809161001f82856105b3565b8339810103126105af5761003e6020610037836105d6565b92016105d6565b6040519161004d6040846105b3565b600a8352694167656e74466f72676560b01b6020840152604051916100736040846105b3565b600383526241464760e81b602084015283516001600160401b0381116104b557600354600181811c911680156105a5575b602082101461049757601f8111610537575b50602094601f82116001146104d4579481929394955f926104c9575b50508160011b915f199060031b1c1916176003555b82516001600160401b0381116104b557600454600181811c911680156104ab575b602082101461049757601f8111610429575b506020601f82116001146103c657819293945f926103bb575b50508160011b915f199060031b1c1916176004555b33156103a85760058054336001600160a01b0319821681179092556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a361012c600a5569021e19e0c9bab2400000600b55600c805460ff191660011790556001600160a01b038216908115610399576001600160a01b03169182156103995760a052600680546001600160a01b03191683179055426080526a084595161401484a0000005f600254918083018093116103855760207fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef918594600255846103705780600254036002555b604051908152a35f52600960205260405f20600160ff19825416179055335f52600960205260405f20600160ff19825416179055305f52600960205260405f20600160ff19825416179055301561035d57305f52600160205260405f20815f5260205260405f205f1990556040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a360055460ff8160a01c1661034e5760ff60a01b1916600160a01b176005556040513381527f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25890602090a16040516118d290816105eb823960805181818161037f0152611456015260a0518181816106a20152610c580152f35b63d93c066560e01b5f5260045ffd5b63e602df0560e01b5f525f60045260245ffd5b845f525f825260405f2081815401905561023d565b634e487b7160e01b5f52601160045260245ffd5b63d92e233d60e01b5f5260045ffd5b631e4fbdf760e01b5f525f60045260245ffd5b015190505f80610133565b601f1982169060045f52805f20915f5b818110610411575095836001959697106103f9575b505050811b01600455610148565b01515f1960f88460031b161c191690555f80806103eb565b9192602060018192868b0151815501940192016103d6565b8181111561011a5760045f52601f820160051c7f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b6020841061048f575b81601f9101920160051c03905f5b82811061048257505061011a565b5f82820155600101610474565b5f9150610466565b634e487b7160e01b5f52602260045260245ffd5b90607f1690610108565b634e487b7160e01b5f52604160045260245ffd5b015190505f806100d2565b601f1982169560035f52805f20915f5b88811061051f57508360019596979810610507575b505050811b016003556100e7565b01515f1960f88460031b161c191690555f80806104f9565b919260206001819286850151815501940192016104e4565b818111156100b65760035f52601f820160051c7fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b6020841061059d575b81601f9101920160051c03905f5b8281106105905750506100b6565b5f82820155600101610582565b5f9150610574565b90607f16906100a4565b5f80fd5b601f909101601f19168101906001600160401b038211908210176104b557604052565b51906001600160a01b03821682036105af5756fe608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
      "opcodes": "PUSH1 0xC0 DUP1 PUSH1 0x40 MSTORE CALLVALUE PUSH2 0x5AF JUMPI PUSH1 0x40 DUP2 PUSH2 0x1EBD DUP1 CODESIZE SUB DUP1 SWAP2 PUSH2 0x1F DUP3 DUP6 PUSH2 0x5B3 JUMP JUMPDEST DUP4 CODECOPY DUP2 ADD SUB SLT PUSH2 0x5AF JUMPI PUSH2 0x3E PUSH1 0x20 PUSH2 0x37 DUP4 PUSH2 0x5D6 JUMP JUMPDEST SWAP3 ADD PUSH2 0x5D6 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP2 PUSH2 0x4D PUSH1 0x40 DUP5 PUSH2 0x5B3 JUMP JUMPDEST PUSH1 0xA DUP4 MSTORE PUSH10 0x4167656E74466F726765 PUSH1 0xB0 SHL PUSH1 0x20 DUP5 ADD MSTORE PUSH1 0x40 MLOAD SWAP2 PUSH2 0x73 PUSH1 0x40 DUP5 PUSH2 0x5B3 JUMP JUMPDEST PUSH1 0x3 DUP4 MSTORE PUSH3 0x414647 PUSH1 0xE8 SHL PUSH1 0x20 DUP5 ADD MSTORE DUP4 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP2 GT PUSH2 0x4B5 JUMPI PUSH1 0x3 SLOAD PUSH1 0x1 DUP2 DUP2 SHR SWAP2 AND DUP1 ISZERO PUSH2 0x5A5 JUMPI JUMPDEST PUSH1 0x20 DUP3 LT EQ PUSH2 0x497 JUMPI PUSH1 0x1F DUP2 GT PUSH2 0x537 JUMPI JUMPDEST POP PUSH1 0x20 SWAP5 PUSH1 0x1F DUP3 GT PUSH1 0x1 EQ PUSH2 0x4D4 JUMPI SWAP5 DUP2 SWAP3 SWAP4 SWAP5 SWAP6 PUSH0 SWAP3 PUSH2 0x4C9 JUMPI JUMPDEST POP POP DUP2 PUSH1 0x1 SHL SWAP2 PUSH0 NOT SWAP1 PUSH1 0x3 SHL SHR NOT AND OR PUSH1 0x3 SSTORE JUMPDEST DUP3 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP2 GT PUSH2 0x4B5 JUMPI PUSH1 0x4 SLOAD PUSH1 0x1 DUP2 DUP2 SHR SWAP2 AND DUP1 ISZERO PUSH2 0x4AB JUMPI JUMPDEST PUSH1 0x20 DUP3 LT EQ PUSH2 0x497 JUMPI PUSH1 0x1F DUP2 GT PUSH2 0x429 JUMPI JUMPDEST POP PUSH1 0x20 PUSH1 0x1F DUP3 GT PUSH1 0x1 EQ PUSH2 0x3C6 JUMPI DUP2 SWAP3 SWAP4 SWAP5 PUSH0 SWAP3 PUSH2 0x3BB JUMPI JUMPDEST POP POP DUP2 PUSH1 0x1 SHL SWAP2 PUSH0 NOT SWAP1 PUSH1 0x3 SHL SHR NOT AND OR PUSH1 0x4 SSTORE JUMPDEST CALLER ISZERO PUSH2 0x3A8 JUMPI PUSH1 0x5 DUP1 SLOAD CALLER PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP3 AND DUP2 OR SWAP1 SWAP3 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH0 DUP1 LOG3 PUSH2 0x12C PUSH1 0xA SSTORE PUSH10 0x21E19E0C9BAB2400000 PUSH1 0xB SSTORE PUSH1 0xC DUP1 SLOAD PUSH1 0xFF NOT AND PUSH1 0x1 OR SWAP1 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND SWAP1 DUP2 ISZERO PUSH2 0x399 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP2 DUP3 ISZERO PUSH2 0x399 JUMPI PUSH1 0xA0 MSTORE PUSH1 0x6 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND DUP4 OR SWAP1 SSTORE TIMESTAMP PUSH1 0x80 MSTORE PUSH11 0x84595161401484A000000 PUSH0 PUSH1 0x2 SLOAD SWAP2 DUP1 DUP4 ADD DUP1 SWAP4 GT PUSH2 0x385 JUMPI PUSH1 0x20 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP2 DUP6 SWAP5 PUSH1 0x2 SSTORE DUP5 PUSH2 0x370 JUMPI DUP1 PUSH1 0x2 SLOAD SUB PUSH1 0x2 SSTORE JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG3 PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0xFF NOT DUP3 SLOAD AND OR SWAP1 SSTORE CALLER PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0xFF NOT DUP3 SLOAD AND OR SWAP1 SSTORE ADDRESS PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0xFF NOT DUP3 SLOAD AND OR SWAP1 SSTORE ADDRESS ISZERO PUSH2 0x35D JUMPI ADDRESS PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH0 NOT SWAP1 SSTORE PUSH1 0x40 MLOAD PUSH0 NOT DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 PUSH1 0x5 SLOAD PUSH1 0xFF DUP2 PUSH1 0xA0 SHR AND PUSH2 0x34E JUMPI PUSH1 0xFF PUSH1 0xA0 SHL NOT AND PUSH1 0x1 PUSH1 0xA0 SHL OR PUSH1 0x5 SSTORE PUSH1 0x40 MLOAD CALLER DUP2 MSTORE PUSH32 0x62E78CEA01BEE320CD4E420270B5EA74000D11B0C9F74754EBDBFC544B05A258 SWAP1 PUSH1 0x20 SWAP1 LOG1 PUSH1 0x40 MLOAD PUSH2 0x18D2 SWAP1 DUP2 PUSH2 0x5EB DUP3 CODECOPY PUSH1 0x80 MLOAD DUP2 DUP2 DUP2 PUSH2 0x37F ADD MSTORE PUSH2 0x1456 ADD MSTORE PUSH1 0xA0 MLOAD DUP2 DUP2 DUP2 PUSH2 0x6A2 ADD MSTORE PUSH2 0xC58 ADD MSTORE RETURN JUMPDEST PUSH4 0xD93C0665 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH4 0xE602DF05 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST DUP5 PUSH0 MSTORE PUSH0 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 DUP2 SLOAD ADD SWAP1 SSTORE PUSH2 0x23D JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH4 0xD92E233D PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST ADD MLOAD SWAP1 POP PUSH0 DUP1 PUSH2 0x133 JUMP JUMPDEST PUSH1 0x1F NOT DUP3 AND SWAP1 PUSH1 0x4 PUSH0 MSTORE DUP1 PUSH0 KECCAK256 SWAP2 PUSH0 JUMPDEST DUP2 DUP2 LT PUSH2 0x411 JUMPI POP SWAP6 DUP4 PUSH1 0x1 SWAP6 SWAP7 SWAP8 LT PUSH2 0x3F9 JUMPI JUMPDEST POP POP POP DUP2 SHL ADD PUSH1 0x4 SSTORE PUSH2 0x148 JUMP JUMPDEST ADD MLOAD PUSH0 NOT PUSH1 0xF8 DUP5 PUSH1 0x3 SHL AND SHR NOT AND SWAP1 SSTORE PUSH0 DUP1 DUP1 PUSH2 0x3EB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x20 PUSH1 0x1 DUP2 SWAP3 DUP7 DUP12 ADD MLOAD DUP2 SSTORE ADD SWAP5 ADD SWAP3 ADD PUSH2 0x3D6 JUMP JUMPDEST DUP2 DUP2 GT ISZERO PUSH2 0x11A JUMPI PUSH1 0x4 PUSH0 MSTORE PUSH1 0x1F DUP3 ADD PUSH1 0x5 SHR PUSH32 0x8A35ACFBC15FF81A39AE7D344FD709F28E8600B4AA8C65C6B64BFE7FE36BD19B PUSH1 0x20 DUP5 LT PUSH2 0x48F JUMPI JUMPDEST DUP2 PUSH1 0x1F SWAP2 ADD SWAP3 ADD PUSH1 0x5 SHR SUB SWAP1 PUSH0 JUMPDEST DUP3 DUP2 LT PUSH2 0x482 JUMPI POP POP PUSH2 0x11A JUMP JUMPDEST PUSH0 DUP3 DUP3 ADD SSTORE PUSH1 0x1 ADD PUSH2 0x474 JUMP JUMPDEST PUSH0 SWAP2 POP PUSH2 0x466 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP1 PUSH1 0x7F AND SWAP1 PUSH2 0x108 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST ADD MLOAD SWAP1 POP PUSH0 DUP1 PUSH2 0xD2 JUMP JUMPDEST PUSH1 0x1F NOT DUP3 AND SWAP6 PUSH1 0x3 PUSH0 MSTORE DUP1 PUSH0 KECCAK256 SWAP2 PUSH0 JUMPDEST DUP9 DUP2 LT PUSH2 0x51F JUMPI POP DUP4 PUSH1 0x1 SWAP6 SWAP7 SWAP8 SWAP9 LT PUSH2 0x507 JUMPI JUMPDEST POP POP POP DUP2 SHL ADD PUSH1 0x3 SSTORE PUSH2 0xE7 JUMP JUMPDEST ADD MLOAD PUSH0 NOT PUSH1 0xF8 DUP5 PUSH1 0x3 SHL AND SHR NOT AND SWAP1 SSTORE PUSH0 DUP1 DUP1 PUSH2 0x4F9 JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x20 PUSH1 0x1 DUP2 SWAP3 DUP7 DUP6 ADD MLOAD DUP2 SSTORE ADD SWAP5 ADD SWAP3 ADD PUSH2 0x4E4 JUMP JUMPDEST DUP2 DUP2 GT ISZERO PUSH2 0xB6 JUMPI PUSH1 0x3 PUSH0 MSTORE PUSH1 0x1F DUP3 ADD PUSH1 0x5 SHR PUSH32 0xC2575A0E9E593C00F959F8C92F12DB2869C3395A3B0502D05E2516446F71F85B PUSH1 0x20 DUP5 LT PUSH2 0x59D JUMPI JUMPDEST DUP2 PUSH1 0x1F SWAP2 ADD SWAP3 ADD PUSH1 0x5 SHR SUB SWAP1 PUSH0 JUMPDEST DUP3 DUP2 LT PUSH2 0x590 JUMPI POP POP PUSH2 0xB6 JUMP JUMPDEST PUSH0 DUP3 DUP3 ADD SSTORE PUSH1 0x1 ADD PUSH2 0x582 JUMP JUMPDEST PUSH0 SWAP2 POP PUSH2 0x574 JUMP JUMPDEST SWAP1 PUSH1 0x7F AND SWAP1 PUSH2 0xA4 JUMP JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH1 0x1F SWAP1 SWAP2 ADD PUSH1 0x1F NOT AND DUP2 ADD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP3 GT SWAP1 DUP3 LT OR PUSH2 0x4B5 JUMPI PUSH1 0x40 MSTORE JUMP JUMPDEST MLOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x5AF JUMPI JUMP INVALID PUSH1 0x80 DUP1 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT ISZERO PUSH2 0x1C JUMPI JUMPDEST POP CALLDATASIZE ISZERO PUSH2 0x1A JUMPI PUSH0 DUP1 REVERT JUMPDEST STOP JUMPDEST PUSH0 SWAP1 PUSH0 CALLDATALOAD PUSH1 0xE0 SHR SWAP1 DUP2 PUSH4 0x445B667 EQ PUSH2 0x1376 JUMPI POP DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x12BB JUMPI DUP1 PUSH4 0x7546172 EQ PUSH2 0x1295 JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x1213 JUMPI DUP1 PUSH4 0x16C2BE6B EQ PUSH2 0x11D6 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x11B9 JUMPI DUP1 PUSH4 0x1BB9B0A3 EQ PUSH2 0x1194 JUMPI DUP1 PUSH4 0x1DC61040 EQ PUSH2 0x10E7 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0xFB7 JUMPI DUP1 PUSH4 0x2C597DE9 EQ PUSH2 0xF9B JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0xF80 JUMPI DUP1 PUSH4 0x32CB6B0C EQ PUSH2 0xF5B JUMPI DUP1 PUSH4 0x3352EB8C EQ PUSH2 0xF38 JUMPI DUP1 PUSH4 0x3C96B08F EQ PUSH2 0xF13 JUMPI DUP1 PUSH4 0x3EACD2F8 EQ PUSH2 0xEF6 JUMPI DUP1 PUSH4 0x3F4BA83A EQ PUSH2 0xE56 JUMPI DUP1 PUSH4 0x40C10F19 EQ PUSH2 0xD61 JUMPI DUP1 PUSH4 0x5556DB65 EQ PUSH2 0xD44 JUMPI DUP1 PUSH4 0x598D7D0F EQ PUSH2 0xD1F JUMPI DUP1 PUSH4 0x5C975ABB EQ PUSH2 0xCFA JUMPI DUP1 PUSH4 0x60F71A0E EQ PUSH2 0xC7C JUMPI DUP1 PUSH4 0x61D027B3 EQ PUSH2 0xC39 JUMPI DUP1 PUSH4 0x6641EA08 EQ PUSH2 0xC1D JUMPI DUP1 PUSH4 0x6DDD1713 EQ PUSH2 0xBFB JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0xBC4 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0xB5E JUMPI DUP1 PUSH4 0x8456CB59 EQ PUSH2 0xAD3 JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0xAAD JUMPI DUP1 PUSH4 0x8E4FAB80 EQ PUSH2 0xA8B JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x987 JUMPI DUP1 PUSH4 0x9D0014B1 EQ PUSH2 0x8C9 JUMPI DUP1 PUSH4 0xA51F0C32 EQ PUSH2 0x8AD JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x87C JUMPI DUP1 PUSH4 0xA9AB232B EQ PUSH2 0x5F9 JUMPI DUP1 PUSH4 0xC0D78655 EQ PUSH2 0x47D JUMPI DUP1 PUSH4 0xDBDFCA6C EQ PUSH2 0x458 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x40A JUMPI DUP1 PUSH4 0xE01AF92C EQ PUSH2 0x3A2 JUMPI DUP1 PUSH4 0xEAE4C19F EQ PUSH2 0x367 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2BA JUMPI DUP1 PUSH4 0xF887EA40 EQ PUSH2 0x293 JUMPI PUSH4 0xFCA3B5AA SUB PUSH2 0xF JUMPI CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x213 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x21B PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x8 SLOAD AND OR PUSH1 0x8 SSTORE PUSH32 0x726B590EF91A8C76AD05BBE91A57EF84605276528F49CD47D787F558A4E755B6 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x4 DUP3 PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 DUP2 MSTORE REVERT JUMPDEST DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x2DC PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x2E4 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x33B JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP3 AND OR PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP4 DUP1 LOG3 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP3 PUSH32 0x1E4FBDF700000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH32 0x0 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x4 CALLDATALOAD DUP1 ISZERO ISZERO DUP1 SWAP2 SUB PUSH2 0x406 JUMPI PUSH1 0x20 PUSH32 0x436B6CF978C7B6998FCCE43DFE4D37E3A0DC2BB780144A2EB55D7138201E8A12 SWAP2 PUSH2 0x3ED PUSH2 0x149A JUMP JUMPDEST PUSH1 0xFF NOT PUSH1 0xC SLOAD AND PUSH1 0xFF DUP3 AND OR PUSH1 0xC SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 DUP1 RETURN JUMPDEST POP DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 PUSH2 0x42E PUSH2 0x13BA JUMP JUMPDEST SWAP3 DUP3 PUSH2 0x438 PUSH2 0x13D0 JUMP JUMPDEST SWAP5 AND DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE KECCAK256 SWAP2 AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH10 0xD3C21BCECCEDA1000000 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x49F PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x4A7 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND ADDRESS ISZERO PUSH2 0x5CD JUMPI DUP1 ISZERO PUSH2 0x5A1 JUMPI ADDRESS DUP4 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP4 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP3 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD DUP4 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x6 SLOAD AND OR PUSH1 0x6 SSTORE ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP3 KECCAK256 DUP2 PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH0 NOT SWAP1 SSTORE DUP1 PUSH1 0x40 MLOAD PUSH0 NOT DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 PUSH32 0x7AED1D3E8155A07CCF395E44EA3109A0E2D6C9B29BBBE9F142D9790596F4DC80 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP4 PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST PUSH1 0x24 DUP4 PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD ADDRESS CALLER SUB PUSH2 0x854 JUMPI PUSH1 0x40 MLOAD PUSH2 0x623 PUSH1 0x60 DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x2 DUP2 MSTORE PUSH1 0x20 DUP2 ADD SWAP1 PUSH1 0x40 CALLDATASIZE DUP4 CALLDATACOPY DUP1 MLOAD ISZERO PUSH2 0x7FE JUMPI ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND SWAP1 PUSH1 0x40 MLOAD PUSH32 0xAD5C464800000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 DUP2 PUSH1 0x4 DUP2 DUP7 GAS STATICCALL SWAP1 DUP2 ISZERO PUSH2 0x7CD JUMPI PUSH0 SWAP2 PUSH2 0x812 JUMPI JUMPDEST POP DUP2 MLOAD PUSH1 0x1 LT ISZERO PUSH2 0x7FE JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 DUP4 ADD SWAP2 AND SWAP1 MSTORE PUSH32 0x0 SWAP2 DUP3 BALANCE SWAP4 DUP2 EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI SWAP2 PUSH1 0x40 MLOAD SWAP3 DUP4 SWAP2 PUSH32 0x791AC94700000000000000000000000000000000000000000000000000000000 DUP4 MSTORE PUSH1 0xA4 DUP4 ADD SWAP1 DUP9 PUSH1 0x4 DUP6 ADD MSTORE PUSH0 PUSH1 0x24 DUP6 ADD MSTORE PUSH1 0xA0 PUSH1 0x44 DUP6 ADD MSTORE MLOAD DUP1 SWAP2 MSTORE PUSH1 0xC4 DUP4 ADD SWAP2 SWAP1 PUSH0 JUMPDEST DUP2 DUP2 LT PUSH2 0x7D8 JUMPI POP POP POP SWAP2 DUP2 PUSH0 DUP2 DUP2 SWAP6 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP10 AND PUSH1 0x64 DUP4 ADD MSTORE TIMESTAMP PUSH1 0x84 DUP4 ADD MSTORE SUB SWAP3 GAS CALL DUP1 ISZERO PUSH2 0x7CD JUMPI PUSH2 0x78C JUMPI JUMPDEST POP SWAP2 PUSH2 0x77E PUSH1 0x40 SWAP3 PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP5 BALANCE PUSH2 0x143E JUMP JUMPDEST DUP3 MLOAD SWAP2 DUP3 MSTORE PUSH1 0x20 DUP3 ADD MSTORE LOG1 DUP1 RETURN JUMPDEST PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP4 SWAP2 SWAP5 POP PUSH1 0x40 SWAP3 PUSH2 0x7C1 PUSH0 PUSH2 0x77E SWAP4 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 SWAP6 SWAP3 SWAP5 POP SWAP3 POP PUSH2 0x74E JUMP JUMPDEST PUSH1 0x40 MLOAD RETURNDATASIZE PUSH0 DUP3 RETURNDATACOPY RETURNDATASIZE SWAP1 REVERT JUMPDEST DUP3 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 MSTORE DUP7 SWAP5 POP PUSH1 0x20 SWAP4 DUP5 ADD SWAP4 SWAP1 SWAP3 ADD SWAP2 PUSH1 0x1 ADD PUSH2 0x71A JUMP JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 RETURNDATASIZE PUSH1 0x20 GT PUSH2 0x84C JUMPI JUMPDEST DUP2 PUSH2 0x82D PUSH1 0x20 SWAP4 DUP4 PUSH2 0x13E6 JUMP JUMPDEST DUP2 ADD SUB SLT PUSH2 0x7FA JUMPI MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 SUB PUSH2 0x7FA JUMPI PUSH0 PUSH2 0x685 JUMP JUMPDEST RETURNDATASIZE SWAP2 POP PUSH2 0x820 JUMP JUMPDEST PUSH32 0x14D4A4E800000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x8A2 PUSH2 0x898 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER PUSH2 0x14DA JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x7E0 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0x8E5 PUSH2 0x149A JUMP JUMPDEST PUSH10 0xD3C21BCECCEDA1000000 DUP2 GT PUSH2 0x95F JUMPI PUSH9 0x56BC75E2D63100000 DUP2 LT PUSH2 0x937 JUMPI PUSH1 0x20 DUP2 PUSH32 0x18FF2FC8464635E4F668567019152095047E34D7A2AB4B97661BA4DC7FD06476 SWAP3 PUSH1 0xB SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x6255FD8D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x18DCC43E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x4 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0xA81 JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x9EB JUMPI JUMPDEST PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP2 DUP3 SWAP2 DUP3 PUSH2 0x1390 JUMP JUMPDEST SUB SWAP1 RETURN JUMPDEST SWAP2 SWAP1 POP PUSH1 0x4 PUSH0 MSTORE PUSH32 0x8A35ACFBC15FF81A39AE7D344FD709F28E8600B4AA8C65C6B64BFE7FE36BD19B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0xA2F JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0xA17 JUMP JUMPDEST PUSH1 0xFF NOT AND PUSH1 0x20 DUP1 DUP7 ADD SWAP2 SWAP1 SWAP2 MSTORE SWAP2 ISZERO ISZERO PUSH1 0x5 SHL DUP5 ADD SWAP1 SWAP2 ADD SWAP2 POP PUSH2 0x9DB SWAP1 POP PUSH2 0x9CB JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x9AE JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH2 0xAA5 PUSH2 0x144B JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xAEB PUSH2 0x149A JUMP JUMPDEST PUSH2 0xAF3 PUSH2 0x1531 JUMP JUMPDEST PUSH21 0x10000000000000000000000000000000000000000 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x5 SLOAD AND OR PUSH1 0x5 SSTORE PUSH32 0x62E78CEA01BEE320CD4E420270B5EA74000D11B0C9F74754EBDBFC544B05A258 PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xB76 PUSH2 0x149A JUMP JUMPDEST PUSH0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP2 AND PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP3 DUP1 LOG3 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0xBE5 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0xC SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x12C DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0x0 AND DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0xC98 PUSH2 0x149A JUMP JUMPDEST PUSH2 0x3E8 DUP2 GT PUSH2 0xCD2 JUMPI PUSH1 0x20 DUP2 PUSH32 0x4ADFA0B8D8D98F0BC07D5FB9EB0CA7AE9C93EEDAABB7A8FA8AF77E270AB70812 SWAP3 PUSH1 0xA SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0xAF1EE13400000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x4A723DC6B40B8A9A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x7 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xD7A PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND CALLER SUB PUSH2 0xE2E JUMPI PUSH2 0xD97 PUSH2 0x1531 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH11 0x4A723DC6B40B8A9A000000 PUSH2 0xDB0 DUP4 DUP4 PUSH2 0x141D JUMP JUMPDEST GT PUSH2 0xE06 JUMPI DUP2 PUSH2 0xDBF SWAP2 PUSH2 0x141D JUMP JUMPDEST PUSH1 0x7 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1A SWAP2 PUSH2 0x1568 JUMP JUMPDEST PUSH32 0xEC442F0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xF532908700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x9CDC2ED500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xE6E PUSH2 0x149A JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH1 0xFF DUP2 PUSH1 0xA0 SHR AND ISZERO PUSH2 0xECE JUMPI PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x5 SSTORE PUSH32 0x5DB9EE0A495BF2E6FF9C91A7834C1BA4FDD244A5E8AA4E537BD38AEAE4B073AA PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x8DFC202B00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xA SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x84595161401484A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH9 0x56BC75E2D63100000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x52B7D2DCC80CD2E4000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x12 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x3E8 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x60 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xFD0 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0xFD8 PUSH2 0x13D0 JUMP JUMPDEST PUSH1 0x44 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP3 DUP4 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH0 NOT DUP2 LT PUSH2 0x101B JUMPI JUMPDEST POP PUSH2 0x8A2 SWAP4 POP PUSH2 0x14DA JUMP JUMPDEST DUP4 DUP2 LT PUSH2 0x10B3 JUMPI DUP5 ISZERO PUSH2 0x1087 JUMPI CALLER ISZERO PUSH2 0x105B JUMPI PUSH2 0x8A2 SWAP5 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP4 PUSH1 0x40 PUSH0 KECCAK256 SWAP2 SUB SWAP1 SSTORE DUP5 PUSH2 0x1010 JUMP JUMPDEST PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST DUP4 SWAP1 PUSH32 0xFB8F41B200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x1100 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 DUP2 ISZERO ISZERO DUP1 SWAP3 SUB PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 PUSH2 0x111F PUSH2 0x149A JUMP JUMPDEST AND SWAP1 DUP2 ISZERO PUSH2 0x116C JUMPI PUSH1 0x20 PUSH32 0x8AF52CA6865DD040A1247F4D247E92DB436B658ABB69ED82E9EFA8A7DE0602E9 SWAP2 DUP4 PUSH0 MSTORE PUSH1 0x9 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0xFF NOT DUP2 SLOAD AND PUSH1 0xFF DUP4 AND OR SWAP1 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG2 STOP JUMPDEST PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH10 0x97418193B6F2E0B6DB6 PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x2 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x11F7 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x122C PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER ISZERO PUSH2 0x1087 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 ISZERO PUSH2 0x105B JUMPI CALLER PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP3 PUSH0 MSTORE PUSH1 0x20 MSTORE DUP1 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 CALLER SWAP3 LOG3 PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x3 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0x136C JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x130E JUMPI PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH1 0x3 PUSH0 MSTORE PUSH32 0xC2575A0E9E593C00F959F8C92F12DB2869C3395A3B0502D05E2516446F71F85B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0x1352 JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0x133A JUMP JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x12E2 JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 SWAP1 PUSH1 0xB SLOAD DUP2 MSTORE RETURN JUMPDEST PUSH1 0x1F NOT PUSH1 0x1F PUSH1 0x20 PUSH1 0x40 SWAP5 DUP2 DUP6 MSTORE DUP1 MLOAD SWAP2 DUP3 SWAP2 DUP3 DUP3 DUP9 ADD MSTORE ADD DUP7 DUP7 ADD MCOPY PUSH0 DUP6 DUP3 DUP7 ADD ADD MSTORE ADD AND ADD ADD SWAP1 JUMP JUMPDEST PUSH1 0x4 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST SWAP1 PUSH1 0x1F PUSH1 0x1F NOT SWAP2 ADD AND DUP2 ADD SWAP1 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR PUSH2 0x1409 JUMPI PUSH1 0x40 MSTORE JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 ADD DUP1 SWAP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 SUB SWAP2 DUP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH2 0x7E0 PUSH2 0x12C PUSH2 0x147B PUSH32 0x0 TIMESTAMP PUSH2 0x143E JUMP JUMPDEST DIV DIV PUSH1 0x14 DUP2 GT PUSH2 0x1495 JUMPI PUSH10 0x97418193B6F2E0B6DB6 SWAP1 SHR SWAP1 JUMP JUMPDEST POP PUSH0 SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND CALLER SUB PUSH2 0x14AE JUMPI JUMP JUMPDEST PUSH32 0x118CDAA700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND ISZERO PUSH2 0x1505 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1503 SWAP3 PUSH2 0x16DF JUMP JUMPDEST JUMP JUMPDEST PUSH32 0x96C6FD1E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH2 0x1540 JUMPI JUMP JUMPDEST PUSH32 0xD93C066500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST DUP2 ISZERO SWAP2 SWAP1 PUSH0 DUP4 ISZERO DUP1 PUSH2 0x16D8 JUMPI JUMPDEST DUP1 PUSH2 0x16C6 JUMPI JUMPDEST PUSH2 0x158A JUMPI JUMPDEST PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH0 DUP1 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH32 0xEC8156718A8372B1DB44BB411437D0870F3E3790D4A08526D024CE1B0B668F6B SLOAD PUSH1 0xFF AND ISZERO DUP1 PUSH2 0x16A6 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI POP PUSH1 0xA SLOAD SWAP3 DUP4 DUP4 MUL SWAP4 DUP4 DUP6 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x15F3 PUSH2 0x15EB PUSH2 0x2710 PUSH2 0x15F9 SWAP6 DIV DUP1 SWAP5 PUSH2 0x143E JUMP JUMPDEST SWAP3 ADDRESS PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0xFF DUP2 AND DUP1 PUSH2 0x1698 JUMPI JUMPDEST DUP1 PUSH2 0x1681 JUMPI JUMPDEST PUSH2 0x1613 JUMPI POP JUMP JUMPDEST PUSH2 0xFF00 NOT AND PUSH2 0x100 OR PUSH1 0xC SSTORE PUSH1 0xB SLOAD ADDRESS EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD SWAP1 PUSH32 0xA9AB232B00000000000000000000000000000000000000000000000000000000 DUP3 MSTORE PUSH1 0x4 DUP3 ADD MSTORE PUSH0 DUP2 PUSH1 0x24 DUP2 DUP4 ADDRESS GAS CALL PUSH2 0x1671 JUMPI JUMPDEST POP PUSH2 0xFF00 NOT PUSH1 0xC SLOAD AND PUSH1 0xC SSTORE JUMP JUMPDEST PUSH0 PUSH2 0x167B SWAP2 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 PUSH2 0x1663 JUMP JUMPDEST POP ADDRESS PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0xB SLOAD GT ISZERO PUSH2 0x160C JUMP JUMPDEST POP PUSH1 0xFF DUP2 PUSH1 0x8 SHR AND ISZERO PUSH2 0x1606 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x15BE JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x157B JUMP JUMPDEST POP PUSH0 PUSH2 0x1575 JUMP JUMPDEST SWAP2 SWAP1 DUP2 ISZERO SWAP3 DUP4 ISZERO DUP1 PUSH2 0x178B JUMPI JUMPDEST DUP1 PUSH2 0x1779 JUMPI JUMPDEST PUSH2 0x1700 JUMPI PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO DUP1 PUSH2 0x1759 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI PUSH1 0xA SLOAD SWAP4 DUP5 DUP5 MUL SWAP5 DUP5 DUP7 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x1754 PUSH2 0x174C PUSH2 0x2710 PUSH2 0x15F9 SWAP7 DIV DUP1 SWAP6 PUSH2 0x143E JUMP JUMPDEST SWAP4 ADDRESS DUP4 PUSH2 0x179D JUMP JUMPDEST PUSH2 0x179D JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x1720 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x16F2 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO ISZERO PUSH2 0x16EC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 PUSH2 0x1816 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 PUSH2 0x17E4 DUP7 PUSH1 0x2 SLOAD PUSH2 0x141D JUMP JUMPDEST PUSH1 0x2 SSTORE JUMPDEST AND SWAP4 DUP5 PUSH2 0x1801 JUMPI DUP1 PUSH1 0x2 SLOAD SUB PUSH1 0x2 SSTORE JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG3 JUMP JUMPDEST DUP5 PUSH0 MSTORE PUSH0 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 DUP2 SLOAD ADD SWAP1 SSTORE PUSH2 0x17F8 JUMP JUMPDEST DUP2 PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD DUP4 DUP2 LT PUSH2 0x1868 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 DUP6 PUSH1 0x20 SWAP4 DUP7 PUSH0 MSTORE PUSH0 DUP6 MSTORE SUB PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH2 0x17E8 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH32 0xE450D38C00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 SWAP13 PUSH11 0x86FB6287BE5FEAA975A12A PUSH26 0xEFA4E04B8A2AA7809ADCDACD04DC6A3328D164736F6C63430008 0x21 STOP CALLER ",
      "sourceMap": "985:7949:21:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;985:7949:21;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;985:7949:21;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;1671:17:2;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;1671:17:2;985:7949:21;;3529:10;1273:26:0;1269:95;;3004:6;985:7949:21;;3529:10;-1:-1:-1;;;;;;985:7949:21;;;;;;;-1:-1:-1;;;;;985:7949:21;3052:40:0;-1:-1:-1;;3052:40:0;2171:3:21;985:7949;;2369:12;;985:7949;2681:4;985:7949;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;;3555:23;;3551:49;;-1:-1:-1;;;;;985:7949:21;;3614:21;;3610:47;;3667:20;;3697:36;985:7949;;-1:-1:-1;;;;;;985:7949:21;;;;;3756:15;3743:28;;1140:16;-1:-1:-1;6137:21:2;985:7949:21;;;;;;;;;;;6987:25:2;985:7949:21;;;6137:21:2;985:7949:21;6551:16:2;985:7949:21;;;6714:21:2;985:7949:21;;6714:21:2;985:7949:21;6547:425:2;985:7949:21;;;;;6987:25:2;-1:-1:-1;1140:16:21;3938:11;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;3529:10;-1:-1:-1;1140:16:21;3938:11;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;4037:4;-1:-1:-1;1140:16:21;3938:11;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;4037:4;9717:19:2;9713:89;;4037:4:21;-1:-1:-1;1140:16:21;985:7949;;1140:16;985:7949;-1:-1:-1;1140:16:21;;-1:-1:-1;1140:16:21;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;;9989:31:2;985:7949:21;4037:4;9989:31:2;;3004:6:0;985:7949:21;;;3667:20;985:7949;;1939:61:13;;-1:-1:-1;;;;985:7949:21;-1:-1:-1;;;985:7949:21;3004:6:0;985:7949:21;;;3529:10;985:7949;;2427:20:13;;985:7949:21;;2427:20:13;985:7949:21;;;;;;;;3743:28;985:7949;;;;;;;;;;3667:20;985:7949;;;;;;;;;;;1939:61:13;1974:15;;;-1:-1:-1;1974:15:13;1671:17:2;-1:-1:-1;1974:15:13;9713:89:2;9759:32;;;-1:-1:-1;9759:32:2;-1:-1:-1;1671:17:2;985:7949:21;;-1:-1:-1;9759:32:2;6547:425;1140:16:21;-1:-1:-1;1140:16:21;-1:-1:-1;1140:16:21;;;-1:-1:-1;1140:16:21;985:7949;;;;;;6547:425:2;;985:7949:21;;;;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;3610:47;3587:13;;;-1:-1:-1;3644:13:21;1671:17:2;-1:-1:-1;3644:13:21;1269:95:0;1322:31;;;-1:-1:-1;1322:31:0;-1:-1:-1;1671:17:2;985:7949:21;;-1:-1:-1;1322:31:0;985:7949:21;;;;-1:-1:-1;985:7949:21;;;;;;;;;;1671:17:2;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;1671:17:2;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1671:17:2;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;-1:-1:-1;;;985:7949:21;;;;;;-1:-1:-1;985:7949:21;;1671:17:2;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;-1:-1:-1;985:7949:21;;1671:17:2;985:7949:21;;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;-1:-1:-1;;;985:7949:21;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;-1:-1:-1;;985:7949:21;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;985:7949:21;;;;;;:::o"
    },
    "deployedBytecode": {
      "functionDebugData": {
        "abi_decode_address": {
          "entryPoint": 5050,
          "id": null,
          "parameterSlots": 0,
          "returnSlots": 1
        },
        "abi_decode_t_address": {
          "entryPoint": 5072,
          "id": null,
          "parameterSlots": 0,
          "returnSlots": 1
        },
        "abi_encode_string": {
          "entryPoint": 5008,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "checked_add_uint256": {
          "entryPoint": 5149,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "checked_sub_uint256": {
          "entryPoint": 5182,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "finalize_allocation": {
          "entryPoint": 5094,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "fun__update": {
          "entryPoint": 5855,
          "id": 7989,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "fun_checkOwner": {
          "entryPoint": 5274,
          "id": 84,
          "parameterSlots": 0,
          "returnSlots": 0
        },
        "fun_currentRewardPerRound": {
          "entryPoint": 5195,
          "id": 7872,
          "parameterSlots": 0,
          "returnSlots": 1
        },
        "fun_requireNotPaused": {
          "entryPoint": 5425,
          "id": 2273,
          "parameterSlots": 0,
          "returnSlots": 0
        },
        "fun_transfer": {
          "entryPoint": 5338,
          "id": 529,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "fun_update": {
          "entryPoint": 6045,
          "id": 606,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "fun_update_10781": {
          "entryPoint": 5480,
          "id": 7989,
          "parameterSlots": 2,
          "returnSlots": 0
        }
      },
      "generatedSources": [],
      "immutableReferences": {
        "7413": [
          {
            "length": 32,
            "start": 895
          },
          {
            "length": 32,
            "start": 5206
          }
        ],
        "7415": [
          {
            "length": 32,
            "start": 1698
          },
          {
            "length": 32,
            "start": 3160
          }
        ]
      },
      "linkReferences": {},
      "object": "608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
      "opcodes": "PUSH1 0x80 DUP1 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT ISZERO PUSH2 0x1C JUMPI JUMPDEST POP CALLDATASIZE ISZERO PUSH2 0x1A JUMPI PUSH0 DUP1 REVERT JUMPDEST STOP JUMPDEST PUSH0 SWAP1 PUSH0 CALLDATALOAD PUSH1 0xE0 SHR SWAP1 DUP2 PUSH4 0x445B667 EQ PUSH2 0x1376 JUMPI POP DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x12BB JUMPI DUP1 PUSH4 0x7546172 EQ PUSH2 0x1295 JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x1213 JUMPI DUP1 PUSH4 0x16C2BE6B EQ PUSH2 0x11D6 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x11B9 JUMPI DUP1 PUSH4 0x1BB9B0A3 EQ PUSH2 0x1194 JUMPI DUP1 PUSH4 0x1DC61040 EQ PUSH2 0x10E7 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0xFB7 JUMPI DUP1 PUSH4 0x2C597DE9 EQ PUSH2 0xF9B JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0xF80 JUMPI DUP1 PUSH4 0x32CB6B0C EQ PUSH2 0xF5B JUMPI DUP1 PUSH4 0x3352EB8C EQ PUSH2 0xF38 JUMPI DUP1 PUSH4 0x3C96B08F EQ PUSH2 0xF13 JUMPI DUP1 PUSH4 0x3EACD2F8 EQ PUSH2 0xEF6 JUMPI DUP1 PUSH4 0x3F4BA83A EQ PUSH2 0xE56 JUMPI DUP1 PUSH4 0x40C10F19 EQ PUSH2 0xD61 JUMPI DUP1 PUSH4 0x5556DB65 EQ PUSH2 0xD44 JUMPI DUP1 PUSH4 0x598D7D0F EQ PUSH2 0xD1F JUMPI DUP1 PUSH4 0x5C975ABB EQ PUSH2 0xCFA JUMPI DUP1 PUSH4 0x60F71A0E EQ PUSH2 0xC7C JUMPI DUP1 PUSH4 0x61D027B3 EQ PUSH2 0xC39 JUMPI DUP1 PUSH4 0x6641EA08 EQ PUSH2 0xC1D JUMPI DUP1 PUSH4 0x6DDD1713 EQ PUSH2 0xBFB JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0xBC4 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0xB5E JUMPI DUP1 PUSH4 0x8456CB59 EQ PUSH2 0xAD3 JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0xAAD JUMPI DUP1 PUSH4 0x8E4FAB80 EQ PUSH2 0xA8B JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x987 JUMPI DUP1 PUSH4 0x9D0014B1 EQ PUSH2 0x8C9 JUMPI DUP1 PUSH4 0xA51F0C32 EQ PUSH2 0x8AD JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x87C JUMPI DUP1 PUSH4 0xA9AB232B EQ PUSH2 0x5F9 JUMPI DUP1 PUSH4 0xC0D78655 EQ PUSH2 0x47D JUMPI DUP1 PUSH4 0xDBDFCA6C EQ PUSH2 0x458 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x40A JUMPI DUP1 PUSH4 0xE01AF92C EQ PUSH2 0x3A2 JUMPI DUP1 PUSH4 0xEAE4C19F EQ PUSH2 0x367 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2BA JUMPI DUP1 PUSH4 0xF887EA40 EQ PUSH2 0x293 JUMPI PUSH4 0xFCA3B5AA SUB PUSH2 0xF JUMPI CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x213 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x21B PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x8 SLOAD AND OR PUSH1 0x8 SSTORE PUSH32 0x726B590EF91A8C76AD05BBE91A57EF84605276528F49CD47D787F558A4E755B6 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x4 DUP3 PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 DUP2 MSTORE REVERT JUMPDEST DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x2DC PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x2E4 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x33B JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP3 AND OR PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP4 DUP1 LOG3 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP3 PUSH32 0x1E4FBDF700000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH32 0x0 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x4 CALLDATALOAD DUP1 ISZERO ISZERO DUP1 SWAP2 SUB PUSH2 0x406 JUMPI PUSH1 0x20 PUSH32 0x436B6CF978C7B6998FCCE43DFE4D37E3A0DC2BB780144A2EB55D7138201E8A12 SWAP2 PUSH2 0x3ED PUSH2 0x149A JUMP JUMPDEST PUSH1 0xFF NOT PUSH1 0xC SLOAD AND PUSH1 0xFF DUP3 AND OR PUSH1 0xC SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 DUP1 RETURN JUMPDEST POP DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 PUSH2 0x42E PUSH2 0x13BA JUMP JUMPDEST SWAP3 DUP3 PUSH2 0x438 PUSH2 0x13D0 JUMP JUMPDEST SWAP5 AND DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE KECCAK256 SWAP2 AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH10 0xD3C21BCECCEDA1000000 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x49F PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x4A7 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND ADDRESS ISZERO PUSH2 0x5CD JUMPI DUP1 ISZERO PUSH2 0x5A1 JUMPI ADDRESS DUP4 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP4 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP3 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD DUP4 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x6 SLOAD AND OR PUSH1 0x6 SSTORE ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP3 KECCAK256 DUP2 PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH0 NOT SWAP1 SSTORE DUP1 PUSH1 0x40 MLOAD PUSH0 NOT DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 PUSH32 0x7AED1D3E8155A07CCF395E44EA3109A0E2D6C9B29BBBE9F142D9790596F4DC80 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP4 PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST PUSH1 0x24 DUP4 PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD ADDRESS CALLER SUB PUSH2 0x854 JUMPI PUSH1 0x40 MLOAD PUSH2 0x623 PUSH1 0x60 DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x2 DUP2 MSTORE PUSH1 0x20 DUP2 ADD SWAP1 PUSH1 0x40 CALLDATASIZE DUP4 CALLDATACOPY DUP1 MLOAD ISZERO PUSH2 0x7FE JUMPI ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND SWAP1 PUSH1 0x40 MLOAD PUSH32 0xAD5C464800000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 DUP2 PUSH1 0x4 DUP2 DUP7 GAS STATICCALL SWAP1 DUP2 ISZERO PUSH2 0x7CD JUMPI PUSH0 SWAP2 PUSH2 0x812 JUMPI JUMPDEST POP DUP2 MLOAD PUSH1 0x1 LT ISZERO PUSH2 0x7FE JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 DUP4 ADD SWAP2 AND SWAP1 MSTORE PUSH32 0x0 SWAP2 DUP3 BALANCE SWAP4 DUP2 EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI SWAP2 PUSH1 0x40 MLOAD SWAP3 DUP4 SWAP2 PUSH32 0x791AC94700000000000000000000000000000000000000000000000000000000 DUP4 MSTORE PUSH1 0xA4 DUP4 ADD SWAP1 DUP9 PUSH1 0x4 DUP6 ADD MSTORE PUSH0 PUSH1 0x24 DUP6 ADD MSTORE PUSH1 0xA0 PUSH1 0x44 DUP6 ADD MSTORE MLOAD DUP1 SWAP2 MSTORE PUSH1 0xC4 DUP4 ADD SWAP2 SWAP1 PUSH0 JUMPDEST DUP2 DUP2 LT PUSH2 0x7D8 JUMPI POP POP POP SWAP2 DUP2 PUSH0 DUP2 DUP2 SWAP6 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP10 AND PUSH1 0x64 DUP4 ADD MSTORE TIMESTAMP PUSH1 0x84 DUP4 ADD MSTORE SUB SWAP3 GAS CALL DUP1 ISZERO PUSH2 0x7CD JUMPI PUSH2 0x78C JUMPI JUMPDEST POP SWAP2 PUSH2 0x77E PUSH1 0x40 SWAP3 PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP5 BALANCE PUSH2 0x143E JUMP JUMPDEST DUP3 MLOAD SWAP2 DUP3 MSTORE PUSH1 0x20 DUP3 ADD MSTORE LOG1 DUP1 RETURN JUMPDEST PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP4 SWAP2 SWAP5 POP PUSH1 0x40 SWAP3 PUSH2 0x7C1 PUSH0 PUSH2 0x77E SWAP4 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 SWAP6 SWAP3 SWAP5 POP SWAP3 POP PUSH2 0x74E JUMP JUMPDEST PUSH1 0x40 MLOAD RETURNDATASIZE PUSH0 DUP3 RETURNDATACOPY RETURNDATASIZE SWAP1 REVERT JUMPDEST DUP3 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 MSTORE DUP7 SWAP5 POP PUSH1 0x20 SWAP4 DUP5 ADD SWAP4 SWAP1 SWAP3 ADD SWAP2 PUSH1 0x1 ADD PUSH2 0x71A JUMP JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 RETURNDATASIZE PUSH1 0x20 GT PUSH2 0x84C JUMPI JUMPDEST DUP2 PUSH2 0x82D PUSH1 0x20 SWAP4 DUP4 PUSH2 0x13E6 JUMP JUMPDEST DUP2 ADD SUB SLT PUSH2 0x7FA JUMPI MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 SUB PUSH2 0x7FA JUMPI PUSH0 PUSH2 0x685 JUMP JUMPDEST RETURNDATASIZE SWAP2 POP PUSH2 0x820 JUMP JUMPDEST PUSH32 0x14D4A4E800000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x8A2 PUSH2 0x898 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER PUSH2 0x14DA JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x7E0 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0x8E5 PUSH2 0x149A JUMP JUMPDEST PUSH10 0xD3C21BCECCEDA1000000 DUP2 GT PUSH2 0x95F JUMPI PUSH9 0x56BC75E2D63100000 DUP2 LT PUSH2 0x937 JUMPI PUSH1 0x20 DUP2 PUSH32 0x18FF2FC8464635E4F668567019152095047E34D7A2AB4B97661BA4DC7FD06476 SWAP3 PUSH1 0xB SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x6255FD8D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x18DCC43E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x4 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0xA81 JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x9EB JUMPI JUMPDEST PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP2 DUP3 SWAP2 DUP3 PUSH2 0x1390 JUMP JUMPDEST SUB SWAP1 RETURN JUMPDEST SWAP2 SWAP1 POP PUSH1 0x4 PUSH0 MSTORE PUSH32 0x8A35ACFBC15FF81A39AE7D344FD709F28E8600B4AA8C65C6B64BFE7FE36BD19B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0xA2F JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0xA17 JUMP JUMPDEST PUSH1 0xFF NOT AND PUSH1 0x20 DUP1 DUP7 ADD SWAP2 SWAP1 SWAP2 MSTORE SWAP2 ISZERO ISZERO PUSH1 0x5 SHL DUP5 ADD SWAP1 SWAP2 ADD SWAP2 POP PUSH2 0x9DB SWAP1 POP PUSH2 0x9CB JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x9AE JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH2 0xAA5 PUSH2 0x144B JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xAEB PUSH2 0x149A JUMP JUMPDEST PUSH2 0xAF3 PUSH2 0x1531 JUMP JUMPDEST PUSH21 0x10000000000000000000000000000000000000000 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x5 SLOAD AND OR PUSH1 0x5 SSTORE PUSH32 0x62E78CEA01BEE320CD4E420270B5EA74000D11B0C9F74754EBDBFC544B05A258 PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xB76 PUSH2 0x149A JUMP JUMPDEST PUSH0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP2 AND PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP3 DUP1 LOG3 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0xBE5 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0xC SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x12C DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0x0 AND DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0xC98 PUSH2 0x149A JUMP JUMPDEST PUSH2 0x3E8 DUP2 GT PUSH2 0xCD2 JUMPI PUSH1 0x20 DUP2 PUSH32 0x4ADFA0B8D8D98F0BC07D5FB9EB0CA7AE9C93EEDAABB7A8FA8AF77E270AB70812 SWAP3 PUSH1 0xA SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0xAF1EE13400000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x4A723DC6B40B8A9A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x7 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xD7A PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND CALLER SUB PUSH2 0xE2E JUMPI PUSH2 0xD97 PUSH2 0x1531 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH11 0x4A723DC6B40B8A9A000000 PUSH2 0xDB0 DUP4 DUP4 PUSH2 0x141D JUMP JUMPDEST GT PUSH2 0xE06 JUMPI DUP2 PUSH2 0xDBF SWAP2 PUSH2 0x141D JUMP JUMPDEST PUSH1 0x7 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1A SWAP2 PUSH2 0x1568 JUMP JUMPDEST PUSH32 0xEC442F0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xF532908700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x9CDC2ED500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xE6E PUSH2 0x149A JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH1 0xFF DUP2 PUSH1 0xA0 SHR AND ISZERO PUSH2 0xECE JUMPI PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x5 SSTORE PUSH32 0x5DB9EE0A495BF2E6FF9C91A7834C1BA4FDD244A5E8AA4E537BD38AEAE4B073AA PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x8DFC202B00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xA SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x84595161401484A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH9 0x56BC75E2D63100000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x52B7D2DCC80CD2E4000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x12 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x3E8 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x60 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xFD0 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0xFD8 PUSH2 0x13D0 JUMP JUMPDEST PUSH1 0x44 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP3 DUP4 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH0 NOT DUP2 LT PUSH2 0x101B JUMPI JUMPDEST POP PUSH2 0x8A2 SWAP4 POP PUSH2 0x14DA JUMP JUMPDEST DUP4 DUP2 LT PUSH2 0x10B3 JUMPI DUP5 ISZERO PUSH2 0x1087 JUMPI CALLER ISZERO PUSH2 0x105B JUMPI PUSH2 0x8A2 SWAP5 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP4 PUSH1 0x40 PUSH0 KECCAK256 SWAP2 SUB SWAP1 SSTORE DUP5 PUSH2 0x1010 JUMP JUMPDEST PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST DUP4 SWAP1 PUSH32 0xFB8F41B200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x1100 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 DUP2 ISZERO ISZERO DUP1 SWAP3 SUB PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 PUSH2 0x111F PUSH2 0x149A JUMP JUMPDEST AND SWAP1 DUP2 ISZERO PUSH2 0x116C JUMPI PUSH1 0x20 PUSH32 0x8AF52CA6865DD040A1247F4D247E92DB436B658ABB69ED82E9EFA8A7DE0602E9 SWAP2 DUP4 PUSH0 MSTORE PUSH1 0x9 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0xFF NOT DUP2 SLOAD AND PUSH1 0xFF DUP4 AND OR SWAP1 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG2 STOP JUMPDEST PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH10 0x97418193B6F2E0B6DB6 PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x2 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x11F7 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x122C PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER ISZERO PUSH2 0x1087 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 ISZERO PUSH2 0x105B JUMPI CALLER PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP3 PUSH0 MSTORE PUSH1 0x20 MSTORE DUP1 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 CALLER SWAP3 LOG3 PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x3 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0x136C JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x130E JUMPI PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH1 0x3 PUSH0 MSTORE PUSH32 0xC2575A0E9E593C00F959F8C92F12DB2869C3395A3B0502D05E2516446F71F85B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0x1352 JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0x133A JUMP JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x12E2 JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 SWAP1 PUSH1 0xB SLOAD DUP2 MSTORE RETURN JUMPDEST PUSH1 0x1F NOT PUSH1 0x1F PUSH1 0x20 PUSH1 0x40 SWAP5 DUP2 DUP6 MSTORE DUP1 MLOAD SWAP2 DUP3 SWAP2 DUP3 DUP3 DUP9 ADD MSTORE ADD DUP7 DUP7 ADD MCOPY PUSH0 DUP6 DUP3 DUP7 ADD ADD MSTORE ADD AND ADD ADD SWAP1 JUMP JUMPDEST PUSH1 0x4 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST SWAP1 PUSH1 0x1F PUSH1 0x1F NOT SWAP2 ADD AND DUP2 ADD SWAP1 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR PUSH2 0x1409 JUMPI PUSH1 0x40 MSTORE JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 ADD DUP1 SWAP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 SUB SWAP2 DUP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH2 0x7E0 PUSH2 0x12C PUSH2 0x147B PUSH32 0x0 TIMESTAMP PUSH2 0x143E JUMP JUMPDEST DIV DIV PUSH1 0x14 DUP2 GT PUSH2 0x1495 JUMPI PUSH10 0x97418193B6F2E0B6DB6 SWAP1 SHR SWAP1 JUMP JUMPDEST POP PUSH0 SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND CALLER SUB PUSH2 0x14AE JUMPI JUMP JUMPDEST PUSH32 0x118CDAA700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND ISZERO PUSH2 0x1505 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1503 SWAP3 PUSH2 0x16DF JUMP JUMPDEST JUMP JUMPDEST PUSH32 0x96C6FD1E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH2 0x1540 JUMPI JUMP JUMPDEST PUSH32 0xD93C066500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST DUP2 ISZERO SWAP2 SWAP1 PUSH0 DUP4 ISZERO DUP1 PUSH2 0x16D8 JUMPI JUMPDEST DUP1 PUSH2 0x16C6 JUMPI JUMPDEST PUSH2 0x158A JUMPI JUMPDEST PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH0 DUP1 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH32 0xEC8156718A8372B1DB44BB411437D0870F3E3790D4A08526D024CE1B0B668F6B SLOAD PUSH1 0xFF AND ISZERO DUP1 PUSH2 0x16A6 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI POP PUSH1 0xA SLOAD SWAP3 DUP4 DUP4 MUL SWAP4 DUP4 DUP6 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x15F3 PUSH2 0x15EB PUSH2 0x2710 PUSH2 0x15F9 SWAP6 DIV DUP1 SWAP5 PUSH2 0x143E JUMP JUMPDEST SWAP3 ADDRESS PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0xFF DUP2 AND DUP1 PUSH2 0x1698 JUMPI JUMPDEST DUP1 PUSH2 0x1681 JUMPI JUMPDEST PUSH2 0x1613 JUMPI POP JUMP JUMPDEST PUSH2 0xFF00 NOT AND PUSH2 0x100 OR PUSH1 0xC SSTORE PUSH1 0xB SLOAD ADDRESS EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD SWAP1 PUSH32 0xA9AB232B00000000000000000000000000000000000000000000000000000000 DUP3 MSTORE PUSH1 0x4 DUP3 ADD MSTORE PUSH0 DUP2 PUSH1 0x24 DUP2 DUP4 ADDRESS GAS CALL PUSH2 0x1671 JUMPI JUMPDEST POP PUSH2 0xFF00 NOT PUSH1 0xC SLOAD AND PUSH1 0xC SSTORE JUMP JUMPDEST PUSH0 PUSH2 0x167B SWAP2 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 PUSH2 0x1663 JUMP JUMPDEST POP ADDRESS PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0xB SLOAD GT ISZERO PUSH2 0x160C JUMP JUMPDEST POP PUSH1 0xFF DUP2 PUSH1 0x8 SHR AND ISZERO PUSH2 0x1606 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x15BE JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x157B JUMP JUMPDEST POP PUSH0 PUSH2 0x1575 JUMP JUMPDEST SWAP2 SWAP1 DUP2 ISZERO SWAP3 DUP4 ISZERO DUP1 PUSH2 0x178B JUMPI JUMPDEST DUP1 PUSH2 0x1779 JUMPI JUMPDEST PUSH2 0x1700 JUMPI PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO DUP1 PUSH2 0x1759 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI PUSH1 0xA SLOAD SWAP4 DUP5 DUP5 MUL SWAP5 DUP5 DUP7 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x1754 PUSH2 0x174C PUSH2 0x2710 PUSH2 0x15F9 SWAP7 DIV DUP1 SWAP6 PUSH2 0x143E JUMP JUMPDEST SWAP4 ADDRESS DUP4 PUSH2 0x179D JUMP JUMPDEST PUSH2 0x179D JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x1720 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x16F2 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO ISZERO PUSH2 0x16EC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 PUSH2 0x1816 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 PUSH2 0x17E4 DUP7 PUSH1 0x2 SLOAD PUSH2 0x141D JUMP JUMPDEST PUSH1 0x2 SSTORE JUMPDEST AND SWAP4 DUP5 PUSH2 0x1801 JUMPI DUP1 PUSH1 0x2 SLOAD SUB PUSH1 0x2 SSTORE JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG3 JUMP JUMPDEST DUP5 PUSH0 MSTORE PUSH0 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 DUP2 SLOAD ADD SWAP1 SSTORE PUSH2 0x17F8 JUMP JUMPDEST DUP2 PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD DUP4 DUP2 LT PUSH2 0x1868 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 DUP6 PUSH1 0x20 SWAP4 DUP7 PUSH0 MSTORE PUSH0 DUP6 MSTORE SUB PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH2 0x17E8 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH32 0xE450D38C00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 SWAP13 PUSH11 0x86FB6287BE5FEAA975A12A PUSH26 0xEFA4E04B8A2AA7809ADCDACD04DC6A3328D164736F6C63430008 0x21 STOP CALLER ",
      "sourceMap": "985:7949:21:-:0;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;1500:62:0;;:::i;:::-;985:7949:21;4343:21;;4339:47;;985:7949;-1:-1:-1;;4396:16:21;985:7949;;;4396:16;985:7949;4427:18;;;;985:7949;;4339:47;985:7949;4373:13;;;;;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;-1:-1:-1;;;;;1702:32:21;985:7949;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;1500:62:0;;:::i;:::-;985:7949:21;2627:22:0;;2623:91;;-1:-1:-1;;;;;3004:6:0;985:7949:21;;-1:-1:-1;;985:7949:21;;;3004:6:0;985:7949:21;;3052:40:0;;;;985:7949:21;;2623:91:0;985:7949:21;2672:31:0;;;;985:7949:21;;;2672:31:0;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1622:35;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;5274:28;1500:62:0;;;:::i;:::-;-1:-1:-1;;5237:22:21;985:7949;;;;;;5237:22;985:7949;;;;;;5274:28;985:7949;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;;:::i;:::-;;;;;:::i;:::-;;;;;3561:11:2;985:7949:21;;;3561:27:2;985:7949:21;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2480:15;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;1500:62:0;;:::i;:::-;985:7949:21;5384:21;;5380:47;;-1:-1:-1;;;;;5541:6:21;985:7949;;5526:4;9717:19:2;9713:89;;9815:21;;9811:90;;5526:4:21;985:7949;;8746:4:2;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;9989:31:2;985:7949:21;5526:4;9989:31:2;;985:7949:21;-1:-1:-1;;5541:6:21;985:7949;;;5541:6;985:7949;5526:4;985:7949;;8746:4:2;985:7949:21;;;;;;-1:-1:-1;985:7949:21;;;;-1:-1:-1;985:7949:21;10503:17:2;;985:7949:21;;;;;10503:17:2;;985:7949:21;;9989:31:2;985:7949:21;5526:4;9989:31:2;;5674:22:21;;;;985:7949;;9811:90:2;985:7949:21;9859:31:2;;;;985:7949:21;;;9859:31:2;9713:89;985:7949:21;9759:32:2;;;;985:7949:21;;;9759:32:2;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;;;8339:4;8317:10;:27;8313:50;;985:7949;;;;;;:::i;:::-;8412:1;985:7949;;;;;;;;;;;;;;;8339:4;985:7949;;-1:-1:-1;;;;;8467:6:21;985:7949;;;;;;8467:13;;985:7949;8467:13;985:7949;8467:13;;;;;;;;;985:7949;8467:13;;;985:7949;8457:23;985:7949;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;8511:8;:16;;;8538:227;;;;;;985:7949;;;8538:227;;;985:7949;8538:227;;985:7949;;;8538:227;;985:7949;8538:227;;985:7949;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;8740:15;985:7949;;;;8538:227;;;;;;;;;;985:7949;8800:16;;:28;985:7949;8800:16;8781:48;8800:16;;:28;:::i;:::-;985:7949;;;;;;;;;8781:48;985:7949;;8538:227;8781:48;8538:227;;;;985:7949;8538:227;;985:7949;8800:28;8538:227;;:::i;:::-;985:7949;8538:227;;;;;;;;;985:7949;;;;;;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;8538:227;985:7949;;;;-1:-1:-1;;;985:7949:21;;;;;;;;8467:13;;;985:7949;8467:13;;985:7949;8467:13;;;;;;985:7949;8467:13;;;:::i;:::-;;;985:7949;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;8467:13;;;;;;-1:-1:-1;8467:13:21;;8313:50;8353:10;985:7949;8353:10;985:7949;;8353:10;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;3388:5:2;985:7949:21;;:::i;:::-;;;735:10:11;;3388:5:2;:::i;:::-;985:7949:21;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1354:5;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;1500:62:0;;:::i;:::-;2480:15:21;4936:31;;4932:66;;2594:9;5012:31;;5008:65;;985:7949;;5124:32;985:7949;5083:26;985:7949;;;;;;5124:32;985:7949;5008:65;5052:21;985:7949;5052:21;985:7949;;5052:21;4932:66;4976:22;985:7949;4976:22;985:7949;;4976:22;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;-1:-1:-1;;;985:7949:21;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;-1:-1:-1;;;;;1710:6:0;985:7949:21;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;1500:62:0;;:::i;:::-;1315:72:13;;:::i;:::-;985:7949:21;;2398:14:13;985:7949:21;;;2398:14:13;985:7949:21;2427:20:13;985:7949:21;;;735:10:11;985:7949:21;;2427:20:13;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;1500:62:0;;:::i;:::-;985:7949:21;-1:-1:-1;;;;;3004:6:0;985:7949:21;-1:-1:-1;;985:7949:21;;3004:6:0;985:7949:21;;3052:40:0;;;;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;2655:30;985:7949;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1606:9;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;-1:-1:-1;;;;;1663:33:21;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;1500:62:0;;:::i;:::-;2266:4:21;4748:18;;4744:43;;985:7949;;4825:19;985:7949;4797:13;985:7949;;;;;;4825:19;985:7949;4744:43;4775:12;985:7949;4775:12;985:7949;;4775:12;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;1796:7:13;985:7949:21;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1200:16;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;1785:25;985:7949;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;3373:6:21;985:7949;;3359:10;:20;3355:45;;1315:72:13;;:::i;:::-;6065:10:21;985:7949;1200:16;6065:19;;;;:::i;:::-;:33;6061:65;;6136:20;;;;:::i;:::-;6065:10;985:7949;-1:-1:-1;;;;;985:7949:21;;7432:21:2;7428:91;;7557:5;;;:::i;7428:91::-;7476:32;985:7949:21;7476:32:2;985:7949:21;;;;;7476:32:2;6061:65:21;6107:19;985:7949;6107:19;985:7949;;6107:19;3355:45;3388:12;985:7949;3388:12;985:7949;;3388:12;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;1500:62:0;;:::i;:::-;1796:7:13;985:7949:21;;;;;;2140:9:13;2136:62;;985:7949:21;;1796:7:13;985:7949:21;2674:22:13;985:7949:21;;;735:10:11;985:7949:21;;2674:22:13;985:7949:21;2136:62:13;2172:15;985:7949:21;2172:15:13;985:7949:21;;2172:15:13;985:7949:21;;;;;-1:-1:-1;;985:7949:21;;;;;;2147:27;985:7949;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1140:16;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2594:9;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1074:17;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2761:2:2;985:7949:21;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2266:4;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;:::i;:::-;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;;;;;;-1:-1:-1;;;;;735:10:11;985:7949:21;;;;;;;;;10503:17:2;;10484:36;;10480:309;;985:7949:21;4890:5:2;;;;;:::i;10480:309::-;10540:24;;;10536:130;;9717:19;;9713:89;;735:10:11;9815:21:2;9811:90;;4890:5;985:7949:21;;;;;;;;;-1:-1:-1;;;;;735:10:11;985:7949:21;;;;;;;;;;;;;10480:309:2;;;9811:90;9859:31;985:7949:21;9859:31:2;985:7949:21;;;;;9859:31:2;9713:89;9759:32;985:7949:21;9759:32:2;985:7949:21;;;;;9759:32:2;10536:130;10591:60;;;985:7949:21;10591:60:2;735:10:11;985:7949:21;;;;;;;;10591:60:2;985:7949:21;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;1500:62:0;;;:::i;:::-;985:7949:21;4543:21;;;4539:47;;985:7949;4640:29;985:7949;;;;4596:11;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;4640:29;985:7949;4539:47;4573:13;985:7949;4573:13;985:7949;;4573:13;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;1354:5;985:7949;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;2881:12:2;985:7949:21;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;;;;2012:43;985:7949;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;735:10:11;;9717:19:2;9713:89;;-1:-1:-1;;;;;985:7949:21;9815:21:2;;;9811:90;;735:10:11;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;9989:31:2;985:7949:21;735:10:11;9989:31:2;;985:7949:21;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;-1:-1:-1;;;;;1896:21:21;985:7949;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1837:5:2;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1837:5:2;985:7949:21;;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;2338:43;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;985:7949:21;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;985:7949:21;;;;;;:::o;:::-;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;:::o;:::-;-1:-1:-1;;;;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;:::o;:::-;-1:-1:-1;;;1354:5:21;;;;;;;;985:7949;;;;;;;;;;:::o;6341:413::-;1354:5;1606:9;6432:28;6450:10;6432:15;:28;:::i;:::-;1354:5;;6677:2;6662:17;;6658:31;;1354:5;985:7949;;6341:413;:::o;6658:31::-;6681:8;985:7949;6681:8;:::o;1796:162:0:-;-1:-1:-1;;;;;1710:6:0;985:7949:21;;735:10:11;1855:23:0;1851:101;;1796:162::o;1851:101::-;1901:40;-1:-1:-1;1901:40:0;735:10:11;1901:40:0;985:7949:21;;-1:-1:-1;1901:40:0;5297:300:2;;;-1:-1:-1;;;;;985:7949:21;;5380:18:2;5376:86;;-1:-1:-1;;;;;985:7949:21;;5475:16:2;5471:86;;5584:5;;;:::i;:::-;5297:300::o;5376:86::-;5421:30;5396:1;5421:30;5396:1;5421:30;985:7949:21;;5396:1:2;5421:30;1878:128:13;985:7949:21;1796:7:13;985:7949:21;;;;1939:61:13;;1878:128::o;1939:61::-;1974:15;-1:-1:-1;1974:15:13;;-1:-1:-1;1974:15:13;6995:1063:21;7195:9;;;6995:1063;985:7949;7195:9;;;:31;;6995:1063;7195:51;;;6995:1063;7191:820;;6995:1063;8045:5;;;;:::i;7191:820::-;985:7949;;;7267:11;985:7949;;;;;;7266:18;;:38;;7191:820;7262:739;7191:820;7262:739;985:7949;7347:6;985:7949;;;;;;;;;;;;;;7549:3;7400:11;7357:5;7595:9;1354:5;;7400:11;;;:::i;:::-;7542:4;;985:7949;7549:3;:::i;:::-;985:7949;7595:9;:::i;:::-;7727:11;985:7949;;;;7727:25;;;7262:739;7727:70;;;7262:739;7723:240;;7980:7;:::o;7723:240::-;-1:-1:-1;;985:7949:21;;;7727:11;985:7949;7880:13;985:7949;7542:4;7863:31;;;;985:7949;;7863:31;985:7949;7863:31;;;;;985:7949;;7542:4;7863:31;7542:4;;;7863:31;;;;7723:240;985:7949;-1:-1:-1;;7727:11:21;985:7949;;7727:11;985:7949;7980:7::o;7863:31::-;985:7949;7863:31;;;:::i;:::-;985:7949;7863:31;;7727:70;7542:4;;985:7949;;;;;;;;;7784:13;985:7949;-1:-1:-1;7756:41:21;7727:70;;:25;985:7949;;;;;;7742:10;7727:25;;7266:38;985:7949;-1:-1:-1;;;;;985:7949:21;;;;7267:11;985:7949;;;;;;;;7288:16;7266:38;;7195:51;985:7949;-1:-1:-1;;;;;985:7949:21;;7230:16;;7195:51;;:31;;985:7949;7195:31;;6995:1063;;;7195:9;;;;;:31;;;6995:1063;7195:51;;;6995:1063;7191:820;;8045:5;;;;:::i;7191:820::-;-1:-1:-1;;;;;985:7949:21;;7203:1;985:7949;7267:11;985:7949;;;;7203:1;985:7949;;;7266:18;:38;;;7191:820;7262:739;7191:820;7262:739;7347:6;985:7949;;;;;;;;;;;;;;7549:3;7400:11;7357:5;7595:9;1354:5;;7400:11;;;:::i;:::-;7542:4;;7549:3;;:::i;:::-;7595:9;:::i;7266:38::-;985:7949;-1:-1:-1;;;;;985:7949:21;;7203:1;985:7949;7267:11;985:7949;;;;7203:1;985:7949;;;7288:16;7266:38;;7195:51;985:7949;-1:-1:-1;;;;;985:7949:21;;7230:16;;7195:51;;:31;985:7949;-1:-1:-1;;;;;985:7949:21;;7208:18;;7195:31;;5912:1107:2;-1:-1:-1;;;;;985:7949:21;;6001:18:2;985:7949:21;;;-1:-1:-1;;;;;6987:25:2;985:7949:21;6137:21:2;985:7949:21;6137:21:2;985:7949:21;6137:21:2;:::i;:::-;;985:7949:21;5997:540:2;985:7949:21;;6551:16:2;985:7949:21;;;6714:21:2;985:7949:21;;6714:21:2;985:7949:21;6547:425:2;985:7949:21;;;;;6987:25:2;5912:1107::o;6547:425::-;985:7949:21;6017:1:2;985:7949:21;6017:1:2;985:7949:21;;;6017:1:2;985:7949:21;;;;;;;6547:425:2;;5997:540;985:7949:21;6017:1:2;985:7949:21;6017:1:2;985:7949:21;;;6017:1:2;985:7949:21;;6244:19:2;;;6240:115;;-1:-1:-1;;;;;6987:25:2;985:7949:21;;;;;6017:1:2;985:7949:21;6017:1:2;985:7949:21;;;;6017:1:2;985:7949:21;;5997:540:2;;6240:115;6290:50;;;;6017:1;6290:50;;985:7949:21;;;;;;6017:1:2;6290:50"
    },
    "gasEstimates": {
      "creation": {
        "codeDepositCost": "1270800",
        "executionCost": "infinite",
        "totalCost": "infinite"
      },
      "external": {
        "INITIAL_REWARD_PER_ROUND()": "293",
        "MAX_SUPPLY()": "400",
        "MAX_SWAP_THRESHOLD()": "931",
        "MAX_TAX_BPS()": "356",
        "MINING_POOL()": "554",
        "MIN_SWAP_THRESHOLD()": "422",
        "ROUNDS_PER_HALVING()": "840",
        "ROUND_DURATION()": "642",
        "TREASURY_PREMINT()": "444",
        "allowance(address,address)": "3350",
        "approve(address,uint256)": "24374",
        "balanceOf(address)": "2938",
        "currentRewardPerRound()": "infinite",
        "decimals()": "378",
        "deployedAt()": "infinite",
        "executeSwap(uint256)": "infinite",
        "isTaxExempt(address)": "2511",
        "mint(address,uint256)": "infinite",
        "minter()": "2323",
        "name()": "infinite",
        "owner()": "2873",
        "pause()": "30271",
        "paused()": "2697",
        "renounceOwnership()": "28594",
        "router()": "3162",
        "setMinter(address)": "28664",
        "setRouter(address)": "61630",
        "setSwapEnabled(bool)": "28417",
        "setSwapThreshold(uint256)": "26150",
        "setTaxBps(uint256)": "25908",
        "setTaxExempt(address,bool)": "28310",
        "swapEnabled()": "2779",
        "swapThreshold()": "2253",
        "symbol()": "infinite",
        "taxBps()": "2569",
        "totalMined()": "2635",
        "totalSupply()": "2371",
        "transfer(address,uint256)": "infinite",
        "transferFrom(address,address,uint256)": "infinite",
        "transferOwnership(address)": "29022",
        "treasury()": "infinite",
        "unpause()": "27902"
      },
      "internal": {
        "_update(address,address,uint256)": "infinite"
      }
    },
    "methodIdentifiers": {
      "INITIAL_REWARD_PER_ROUND()": "1bb9b0a3",
      "MAX_SUPPLY()": "32cb6b0c",
      "MAX_SWAP_THRESHOLD()": "dbdfca6c",
      "MAX_TAX_BPS()": "2c597de9",
      "MINING_POOL()": "598d7d0f",
      "MIN_SWAP_THRESHOLD()": "3352eb8c",
      "ROUNDS_PER_HALVING()": "a51f0c32",
      "ROUND_DURATION()": "6641ea08",
      "TREASURY_PREMINT()": "3c96b08f",
      "allowance(address,address)": "dd62ed3e",
      "approve(address,uint256)": "095ea7b3",
      "balanceOf(address)": "70a08231",
      "currentRewardPerRound()": "8e4fab80",
      "decimals()": "313ce567",
      "deployedAt()": "eae4c19f",
      "executeSwap(uint256)": "a9ab232b",
      "isTaxExempt(address)": "16c2be6b",
      "mint(address,uint256)": "40c10f19",
      "minter()": "07546172",
      "name()": "06fdde03",
      "owner()": "8da5cb5b",
      "pause()": "8456cb59",
      "paused()": "5c975abb",
      "renounceOwnership()": "715018a6",
      "router()": "f887ea40",
      "setMinter(address)": "fca3b5aa",
      "setRouter(address)": "c0d78655",
      "setSwapEnabled(bool)": "e01af92c",
      "setSwapThreshold(uint256)": "9d0014b1",
      "setTaxBps(uint256)": "60f71a0e",
      "setTaxExempt(address,bool)": "1dc61040",
      "swapEnabled()": "6ddd1713",
      "swapThreshold()": "0445b667",
      "symbol()": "95d89b41",
      "taxBps()": "3eacd2f8",
      "totalMined()": "5556db65",
      "totalSupply()": "18160ddd",
      "transfer(address,uint256)": "a9059cbb",
      "transferFrom(address,address,uint256)": "23b872dd",
      "transferOwnership(address)": "f2fde38b",
      "treasury()": "61d027b3",
      "unpause()": "3f4ba83a"
    }
  },
  "metadata": "{\"compiler\":{\"version\":\"0.8.33+commit.64118f21\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_treasury\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_router\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"allowance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"}],\"name\":\"ERC20InsufficientAllowance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"}],\"name\":\"ERC20InsufficientBalance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"approver\",\"type\":\"address\"}],\"name\":\"ERC20InvalidApprover\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"}],\"name\":\"ERC20InvalidReceiver\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"ERC20InvalidSender\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"ERC20InvalidSpender\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"EnforcedPause\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ExceedsMiningPool\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ExpectedPause\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"OnlyMinter\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"OnlySelf\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"SwapThresholdTooHigh\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"SwapThresholdTooLow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TaxTooHigh\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ZeroAddress\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"minter\",\"type\":\"address\"}],\"name\":\"MinterSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"Paused\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newRouter\",\"type\":\"address\"}],\"name\":\"RouterUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"enabled\",\"type\":\"bool\"}],\"name\":\"SwapEnabledUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newThreshold\",\"type\":\"uint256\"}],\"name\":\"SwapThresholdUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newBps\",\"type\":\"uint256\"}],\"name\":\"TaxBpsUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"exempt\",\"type\":\"bool\"}],\"name\":\"TaxExemptSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"afgAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"bnbAmount\",\"type\":\"uint256\"}],\"name\":\"TaxSwapped\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"Unpaused\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"INITIAL_REWARD_PER_ROUND\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_SUPPLY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_SWAP_THRESHOLD\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_TAX_BPS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MINING_POOL\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_SWAP_THRESHOLD\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ROUNDS_PER_HALVING\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ROUND_DURATION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"TREASURY_PREMINT\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"currentRewardPerRound\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deployedAt\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"executeSwap\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"isTaxExempt\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"minter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"pause\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"paused\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"router\",\"outputs\":[{\"internalType\":\"contract IUniswapV2Router02\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_minter\",\"type\":\"address\"}],\"name\":\"setMinter\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_router\",\"type\":\"address\"}],\"name\":\"setRouter\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_enabled\",\"type\":\"bool\"}],\"name\":\"setSwapEnabled\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_threshold\",\"type\":\"uint256\"}],\"name\":\"setSwapThreshold\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_bps\",\"type\":\"uint256\"}],\"name\":\"setTaxBps\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"exempt\",\"type\":\"bool\"}],\"name\":\"setTaxExempt\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"swapEnabled\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"swapThreshold\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"taxBps\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalMined\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"treasury\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"unpause\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ERC20InsufficientAllowance(address,uint256,uint256)\":[{\"details\":\"Indicates a failure with the `spender`\\u2019s `allowance`. Used in transfers.\",\"params\":{\"allowance\":\"Amount of tokens a `spender` is allowed to operate with.\",\"needed\":\"Minimum amount required to perform a transfer.\",\"spender\":\"Address that may be allowed to operate on tokens without being their owner.\"}}],\"ERC20InsufficientBalance(address,uint256,uint256)\":[{\"details\":\"Indicates an error related to the current `balance` of a `sender`. Used in transfers.\",\"params\":{\"balance\":\"Current balance for the interacting account.\",\"needed\":\"Minimum amount required to perform a transfer.\",\"sender\":\"Address whose tokens are being transferred.\"}}],\"ERC20InvalidApprover(address)\":[{\"details\":\"Indicates a failure with the `approver` of a token to be approved. Used in approvals.\",\"params\":{\"approver\":\"Address initiating an approval operation.\"}}],\"ERC20InvalidReceiver(address)\":[{\"details\":\"Indicates a failure with the token `receiver`. Used in transfers.\",\"params\":{\"receiver\":\"Address to which tokens are being transferred.\"}}],\"ERC20InvalidSender(address)\":[{\"details\":\"Indicates a failure with the token `sender`. Used in transfers.\",\"params\":{\"sender\":\"Address whose tokens are being transferred.\"}}],\"ERC20InvalidSpender(address)\":[{\"details\":\"Indicates a failure with the `spender` to be approved. Used in approvals.\",\"params\":{\"spender\":\"Address that may be allowed to operate on tokens without being their owner.\"}}],\"EnforcedPause()\":[{\"details\":\"The operation failed because the contract is paused.\"}],\"ExpectedPause()\":[{\"details\":\"The operation failed because the contract is not paused.\"}],\"OwnableInvalidOwner(address)\":[{\"details\":\"The owner is not a valid owner account. (eg. `address(0)`)\"}],\"OwnableUnauthorizedAccount(address)\":[{\"details\":\"The caller account is not authorized to perform an operation.\"}]},\"events\":{\"Approval(address,address,uint256)\":{\"details\":\"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.\"},\"Paused(address)\":{\"details\":\"Emitted when the pause is triggered by `account`.\"},\"Transfer(address,address,uint256)\":{\"details\":\"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.\"},\"Unpaused(address)\":{\"details\":\"Emitted when the pause is lifted by `account`.\"}},\"kind\":\"dev\",\"methods\":{\"allowance(address,address)\":{\"details\":\"Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.\"},\"approve(address,uint256)\":{\"details\":\"See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.\"},\"balanceOf(address)\":{\"details\":\"Returns the value of tokens owned by `account`.\"},\"currentRewardPerRound()\":{\"details\":\"Uses bit-shift for halving: reward >> halvingCount\"},\"decimals()\":{\"details\":\"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.\"},\"executeSwap(uint256)\":{\"details\":\"External so it can be wrapped in try-catch within _update [C-01 fix]\"},\"name()\":{\"details\":\"Returns the name of the token.\"},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"paused()\":{\"details\":\"Returns true if the contract is paused, and false otherwise.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.\"},\"symbol()\":{\"details\":\"Returns the symbol of the token, usually a shorter version of the name.\"},\"totalSupply()\":{\"details\":\"Returns the value of tokens in existence.\"},\"transfer(address,uint256)\":{\"details\":\"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.\"},\"transferFrom(address,address,uint256)\":{\"details\":\"See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"}},\"stateVariables\":{\"_swapping\":{\"details\":\"Reentrancy lock for swap operations\"}},\"title\":\"AFGToken\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"INITIAL_REWARD_PER_ROUND()\":{\"notice\":\"Initial reward per round: 90M / 2,016 \\u2248 44,642 AFG\"},\"MAX_SWAP_THRESHOLD()\":{\"notice\":\"Maximum allowed swap threshold\"},\"MAX_TAX_BPS()\":{\"notice\":\"Maximum allowed tax rate (10%)\"},\"MIN_SWAP_THRESHOLD()\":{\"notice\":\"Minimum allowed swap threshold\"},\"ROUNDS_PER_HALVING()\":{\"notice\":\"Number of rounds per halving period (7 days * 288 rounds/day = 2,016)\"},\"ROUND_DURATION()\":{\"notice\":\"Round duration: 5 minutes\"},\"currentRewardPerRound()\":{\"notice\":\"Current reward per round based on halving schedule\"},\"executeSwap(uint256)\":{\"notice\":\"Execute auto-swap of accumulated AFG tax to BNB. Only callable by this contract.\"},\"isTaxExempt(address)\":{\"notice\":\"Addresses exempt from transfer tax (protocol contracts, treasury, etc.)\"},\"mint(address,uint256)\":{\"notice\":\"Mint AFG rewards \\u2014 only callable by RewardDistributor\"},\"minter()\":{\"notice\":\"Only this address can call mint() \\u2014 set to RewardDistributor\"},\"swapEnabled()\":{\"notice\":\"Whether auto-swap is enabled\"},\"swapThreshold()\":{\"notice\":\"Minimum accumulated tax to trigger auto-swap\"},\"taxBps()\":{\"notice\":\"Transfer tax rate in basis points (default 300 = 3%, max 1000 = 10%)\"},\"totalMined()\":{\"notice\":\"Total AFG minted via mining\"}},\"notice\":\"ERC-20 token for AgentForge protocol   - Total supply cap: 100,000,000 AFG   - 10% (10M) pre-minted to treasury at deploy   - 90% (90M) released via problem-solving mining   - Configurable transfer tax (default 3%), with exempt addresses for protocol contracts   - Halving schedule based on elapsed time since deployment   - Auto-swap: accumulated tax AFG \\u2192 BNB via PancakeSwap when threshold is reached\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"project/contracts/AFGToken.sol\":\"AFGToken\"},\"evmVersion\":\"osaka\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":true,\"runs\":2000},\"remappings\":[\"project/:@openzeppelin/contracts/=npm/@openzeppelin/contracts@5.4.0/\"],\"viaIR\":true},\"sources\":{\"npm/@openzeppelin/contracts@5.4.0/access/Ownable.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)\\n\\npragma solidity ^0.8.20;\\n\\nimport {Context} from \\\"../utils/Context.sol\\\";\\n\\n/**\\n * @dev Contract module which provides a basic access control mechanism, where\\n * there is an account (an owner) that can be granted exclusive access to\\n * specific functions.\\n *\\n * The initial owner is set to the address provided by the deployer. This can\\n * later be changed with {transferOwnership}.\\n *\\n * This module is used through inheritance. It will make available the modifier\\n * `onlyOwner`, which can be applied to your functions to restrict their use to\\n * the owner.\\n */\\nabstract contract Ownable is Context {\\n    address private _owner;\\n\\n    /**\\n     * @dev The caller account is not authorized to perform an operation.\\n     */\\n    error OwnableUnauthorizedAccount(address account);\\n\\n    /**\\n     * @dev The owner is not a valid owner account. (eg. `address(0)`)\\n     */\\n    error OwnableInvalidOwner(address owner);\\n\\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\\n\\n    /**\\n     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.\\n     */\\n    constructor(address initialOwner) {\\n        if (initialOwner == address(0)) {\\n            revert OwnableInvalidOwner(address(0));\\n        }\\n        _transferOwnership(initialOwner);\\n    }\\n\\n    /**\\n     * @dev Throws if called by any account other than the owner.\\n     */\\n    modifier onlyOwner() {\\n        _checkOwner();\\n        _;\\n    }\\n\\n    /**\\n     * @dev Returns the address of the current owner.\\n     */\\n    function owner() public view virtual returns (address) {\\n        return _owner;\\n    }\\n\\n    /**\\n     * @dev Throws if the sender is not the owner.\\n     */\\n    function _checkOwner() internal view virtual {\\n        if (owner() != _msgSender()) {\\n            revert OwnableUnauthorizedAccount(_msgSender());\\n        }\\n    }\\n\\n    /**\\n     * @dev Leaves the contract without owner. It will not be possible to call\\n     * `onlyOwner` functions. Can only be called by the current owner.\\n     *\\n     * NOTE: Renouncing ownership will leave the contract without an owner,\\n     * thereby disabling any functionality that is only available to the owner.\\n     */\\n    function renounceOwnership() public virtual onlyOwner {\\n        _transferOwnership(address(0));\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Can only be called by the current owner.\\n     */\\n    function transferOwnership(address newOwner) public virtual onlyOwner {\\n        if (newOwner == address(0)) {\\n            revert OwnableInvalidOwner(address(0));\\n        }\\n        _transferOwnership(newOwner);\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Internal function without access restriction.\\n     */\\n    function _transferOwnership(address newOwner) internal virtual {\\n        address oldOwner = _owner;\\n        _owner = newOwner;\\n        emit OwnershipTransferred(oldOwner, newOwner);\\n    }\\n}\\n\",\"keccak256\":\"0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/interfaces/draft-IERC6093.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (interfaces/draft-IERC6093.sol)\\npragma solidity >=0.8.4;\\n\\n/**\\n * @dev Standard ERC-20 Errors\\n * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC-20 tokens.\\n */\\ninterface IERC20Errors {\\n    /**\\n     * @dev Indicates an error related to the current `balance` of a `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     * @param balance Current balance for the interacting account.\\n     * @param needed Minimum amount required to perform a transfer.\\n     */\\n    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);\\n\\n    /**\\n     * @dev Indicates a failure with the token `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     */\\n    error ERC20InvalidSender(address sender);\\n\\n    /**\\n     * @dev Indicates a failure with the token `receiver`. Used in transfers.\\n     * @param receiver Address to which tokens are being transferred.\\n     */\\n    error ERC20InvalidReceiver(address receiver);\\n\\n    /**\\n     * @dev Indicates a failure with the `spender`\\u2019s `allowance`. Used in transfers.\\n     * @param spender Address that may be allowed to operate on tokens without being their owner.\\n     * @param allowance Amount of tokens a `spender` is allowed to operate with.\\n     * @param needed Minimum amount required to perform a transfer.\\n     */\\n    error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed);\\n\\n    /**\\n     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.\\n     * @param approver Address initiating an approval operation.\\n     */\\n    error ERC20InvalidApprover(address approver);\\n\\n    /**\\n     * @dev Indicates a failure with the `spender` to be approved. Used in approvals.\\n     * @param spender Address that may be allowed to operate on tokens without being their owner.\\n     */\\n    error ERC20InvalidSpender(address spender);\\n}\\n\\n/**\\n * @dev Standard ERC-721 Errors\\n * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC-721 tokens.\\n */\\ninterface IERC721Errors {\\n    /**\\n     * @dev Indicates that an address can't be an owner. For example, `address(0)` is a forbidden owner in ERC-20.\\n     * Used in balance queries.\\n     * @param owner Address of the current owner of a token.\\n     */\\n    error ERC721InvalidOwner(address owner);\\n\\n    /**\\n     * @dev Indicates a `tokenId` whose `owner` is the zero address.\\n     * @param tokenId Identifier number of a token.\\n     */\\n    error ERC721NonexistentToken(uint256 tokenId);\\n\\n    /**\\n     * @dev Indicates an error related to the ownership over a particular token. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     * @param tokenId Identifier number of a token.\\n     * @param owner Address of the current owner of a token.\\n     */\\n    error ERC721IncorrectOwner(address sender, uint256 tokenId, address owner);\\n\\n    /**\\n     * @dev Indicates a failure with the token `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     */\\n    error ERC721InvalidSender(address sender);\\n\\n    /**\\n     * @dev Indicates a failure with the token `receiver`. Used in transfers.\\n     * @param receiver Address to which tokens are being transferred.\\n     */\\n    error ERC721InvalidReceiver(address receiver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator`\\u2019s approval. Used in transfers.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     * @param tokenId Identifier number of a token.\\n     */\\n    error ERC721InsufficientApproval(address operator, uint256 tokenId);\\n\\n    /**\\n     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.\\n     * @param approver Address initiating an approval operation.\\n     */\\n    error ERC721InvalidApprover(address approver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator` to be approved. Used in approvals.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     */\\n    error ERC721InvalidOperator(address operator);\\n}\\n\\n/**\\n * @dev Standard ERC-1155 Errors\\n * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC-1155 tokens.\\n */\\ninterface IERC1155Errors {\\n    /**\\n     * @dev Indicates an error related to the current `balance` of a `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     * @param balance Current balance for the interacting account.\\n     * @param needed Minimum amount required to perform a transfer.\\n     * @param tokenId Identifier number of a token.\\n     */\\n    error ERC1155InsufficientBalance(address sender, uint256 balance, uint256 needed, uint256 tokenId);\\n\\n    /**\\n     * @dev Indicates a failure with the token `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     */\\n    error ERC1155InvalidSender(address sender);\\n\\n    /**\\n     * @dev Indicates a failure with the token `receiver`. Used in transfers.\\n     * @param receiver Address to which tokens are being transferred.\\n     */\\n    error ERC1155InvalidReceiver(address receiver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator`\\u2019s approval. Used in transfers.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     * @param owner Address of the current owner of a token.\\n     */\\n    error ERC1155MissingApprovalForAll(address operator, address owner);\\n\\n    /**\\n     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.\\n     * @param approver Address initiating an approval operation.\\n     */\\n    error ERC1155InvalidApprover(address approver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator` to be approved. Used in approvals.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     */\\n    error ERC1155InvalidOperator(address operator);\\n\\n    /**\\n     * @dev Indicates an array length mismatch between ids and values in a safeBatchTransferFrom operation.\\n     * Used in batch transfers.\\n     * @param idsLength Length of the array of token identifiers\\n     * @param valuesLength Length of the array of token amounts\\n     */\\n    error ERC1155InvalidArrayLength(uint256 idsLength, uint256 valuesLength);\\n}\\n\",\"keccak256\":\"0x19fdfb0f3b89a230e7dbd1cf416f1a6b531a3ee5db4da483f946320fc74afc0e\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/token/ERC20/ERC20.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/ERC20.sol)\\n\\npragma solidity ^0.8.20;\\n\\nimport {IERC20} from \\\"./IERC20.sol\\\";\\nimport {IERC20Metadata} from \\\"./extensions/IERC20Metadata.sol\\\";\\nimport {Context} from \\\"../../utils/Context.sol\\\";\\nimport {IERC20Errors} from \\\"../../interfaces/draft-IERC6093.sol\\\";\\n\\n/**\\n * @dev Implementation of the {IERC20} interface.\\n *\\n * This implementation is agnostic to the way tokens are created. This means\\n * that a supply mechanism has to be added in a derived contract using {_mint}.\\n *\\n * TIP: For a detailed writeup see our guide\\n * https://forum.openzeppelin.com/t/how-to-implement-erc20-supply-mechanisms/226[How\\n * to implement supply mechanisms].\\n *\\n * The default value of {decimals} is 18. To change this, you should override\\n * this function so it returns a different value.\\n *\\n * We have followed general OpenZeppelin Contracts guidelines: functions revert\\n * instead returning `false` on failure. This behavior is nonetheless\\n * conventional and does not conflict with the expectations of ERC-20\\n * applications.\\n */\\nabstract contract ERC20 is Context, IERC20, IERC20Metadata, IERC20Errors {\\n    mapping(address account => uint256) private _balances;\\n\\n    mapping(address account => mapping(address spender => uint256)) private _allowances;\\n\\n    uint256 private _totalSupply;\\n\\n    string private _name;\\n    string private _symbol;\\n\\n    /**\\n     * @dev Sets the values for {name} and {symbol}.\\n     *\\n     * Both values are immutable: they can only be set once during construction.\\n     */\\n    constructor(string memory name_, string memory symbol_) {\\n        _name = name_;\\n        _symbol = symbol_;\\n    }\\n\\n    /**\\n     * @dev Returns the name of the token.\\n     */\\n    function name() public view virtual returns (string memory) {\\n        return _name;\\n    }\\n\\n    /**\\n     * @dev Returns the symbol of the token, usually a shorter version of the\\n     * name.\\n     */\\n    function symbol() public view virtual returns (string memory) {\\n        return _symbol;\\n    }\\n\\n    /**\\n     * @dev Returns the number of decimals used to get its user representation.\\n     * For example, if `decimals` equals `2`, a balance of `505` tokens should\\n     * be displayed to a user as `5.05` (`505 / 10 ** 2`).\\n     *\\n     * Tokens usually opt for a value of 18, imitating the relationship between\\n     * Ether and Wei. This is the default value returned by this function, unless\\n     * it's overridden.\\n     *\\n     * NOTE: This information is only used for _display_ purposes: it in\\n     * no way affects any of the arithmetic of the contract, including\\n     * {IERC20-balanceOf} and {IERC20-transfer}.\\n     */\\n    function decimals() public view virtual returns (uint8) {\\n        return 18;\\n    }\\n\\n    /// @inheritdoc IERC20\\n    function totalSupply() public view virtual returns (uint256) {\\n        return _totalSupply;\\n    }\\n\\n    /// @inheritdoc IERC20\\n    function balanceOf(address account) public view virtual returns (uint256) {\\n        return _balances[account];\\n    }\\n\\n    /**\\n     * @dev See {IERC20-transfer}.\\n     *\\n     * Requirements:\\n     *\\n     * - `to` cannot be the zero address.\\n     * - the caller must have a balance of at least `value`.\\n     */\\n    function transfer(address to, uint256 value) public virtual returns (bool) {\\n        address owner = _msgSender();\\n        _transfer(owner, to, value);\\n        return true;\\n    }\\n\\n    /// @inheritdoc IERC20\\n    function allowance(address owner, address spender) public view virtual returns (uint256) {\\n        return _allowances[owner][spender];\\n    }\\n\\n    /**\\n     * @dev See {IERC20-approve}.\\n     *\\n     * NOTE: If `value` is the maximum `uint256`, the allowance is not updated on\\n     * `transferFrom`. This is semantically equivalent to an infinite approval.\\n     *\\n     * Requirements:\\n     *\\n     * - `spender` cannot be the zero address.\\n     */\\n    function approve(address spender, uint256 value) public virtual returns (bool) {\\n        address owner = _msgSender();\\n        _approve(owner, spender, value);\\n        return true;\\n    }\\n\\n    /**\\n     * @dev See {IERC20-transferFrom}.\\n     *\\n     * Skips emitting an {Approval} event indicating an allowance update. This is not\\n     * required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve].\\n     *\\n     * NOTE: Does not update the allowance if the current allowance\\n     * is the maximum `uint256`.\\n     *\\n     * Requirements:\\n     *\\n     * - `from` and `to` cannot be the zero address.\\n     * - `from` must have a balance of at least `value`.\\n     * - the caller must have allowance for ``from``'s tokens of at least\\n     * `value`.\\n     */\\n    function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {\\n        address spender = _msgSender();\\n        _spendAllowance(from, spender, value);\\n        _transfer(from, to, value);\\n        return true;\\n    }\\n\\n    /**\\n     * @dev Moves a `value` amount of tokens from `from` to `to`.\\n     *\\n     * This internal function is equivalent to {transfer}, and can be used to\\n     * e.g. implement automatic token fees, slashing mechanisms, etc.\\n     *\\n     * Emits a {Transfer} event.\\n     *\\n     * NOTE: This function is not virtual, {_update} should be overridden instead.\\n     */\\n    function _transfer(address from, address to, uint256 value) internal {\\n        if (from == address(0)) {\\n            revert ERC20InvalidSender(address(0));\\n        }\\n        if (to == address(0)) {\\n            revert ERC20InvalidReceiver(address(0));\\n        }\\n        _update(from, to, value);\\n    }\\n\\n    /**\\n     * @dev Transfers a `value` amount of tokens from `from` to `to`, or alternatively mints (or burns) if `from`\\n     * (or `to`) is the zero address. All customizations to transfers, mints, and burns should be done by overriding\\n     * this function.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function _update(address from, address to, uint256 value) internal virtual {\\n        if (from == address(0)) {\\n            // Overflow check required: The rest of the code assumes that totalSupply never overflows\\n            _totalSupply += value;\\n        } else {\\n            uint256 fromBalance = _balances[from];\\n            if (fromBalance < value) {\\n                revert ERC20InsufficientBalance(from, fromBalance, value);\\n            }\\n            unchecked {\\n                // Overflow not possible: value <= fromBalance <= totalSupply.\\n                _balances[from] = fromBalance - value;\\n            }\\n        }\\n\\n        if (to == address(0)) {\\n            unchecked {\\n                // Overflow not possible: value <= totalSupply or value <= fromBalance <= totalSupply.\\n                _totalSupply -= value;\\n            }\\n        } else {\\n            unchecked {\\n                // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.\\n                _balances[to] += value;\\n            }\\n        }\\n\\n        emit Transfer(from, to, value);\\n    }\\n\\n    /**\\n     * @dev Creates a `value` amount of tokens and assigns them to `account`, by transferring it from address(0).\\n     * Relies on the `_update` mechanism\\n     *\\n     * Emits a {Transfer} event with `from` set to the zero address.\\n     *\\n     * NOTE: This function is not virtual, {_update} should be overridden instead.\\n     */\\n    function _mint(address account, uint256 value) internal {\\n        if (account == address(0)) {\\n            revert ERC20InvalidReceiver(address(0));\\n        }\\n        _update(address(0), account, value);\\n    }\\n\\n    /**\\n     * @dev Destroys a `value` amount of tokens from `account`, lowering the total supply.\\n     * Relies on the `_update` mechanism.\\n     *\\n     * Emits a {Transfer} event with `to` set to the zero address.\\n     *\\n     * NOTE: This function is not virtual, {_update} should be overridden instead\\n     */\\n    function _burn(address account, uint256 value) internal {\\n        if (account == address(0)) {\\n            revert ERC20InvalidSender(address(0));\\n        }\\n        _update(account, address(0), value);\\n    }\\n\\n    /**\\n     * @dev Sets `value` as the allowance of `spender` over the `owner`'s tokens.\\n     *\\n     * This internal function is equivalent to `approve`, and can be used to\\n     * e.g. set automatic allowances for certain subsystems, etc.\\n     *\\n     * Emits an {Approval} event.\\n     *\\n     * Requirements:\\n     *\\n     * - `owner` cannot be the zero address.\\n     * - `spender` cannot be the zero address.\\n     *\\n     * Overrides to this logic should be done to the variant with an additional `bool emitEvent` argument.\\n     */\\n    function _approve(address owner, address spender, uint256 value) internal {\\n        _approve(owner, spender, value, true);\\n    }\\n\\n    /**\\n     * @dev Variant of {_approve} with an optional flag to enable or disable the {Approval} event.\\n     *\\n     * By default (when calling {_approve}) the flag is set to true. On the other hand, approval changes made by\\n     * `_spendAllowance` during the `transferFrom` operation set the flag to false. This saves gas by not emitting any\\n     * `Approval` event during `transferFrom` operations.\\n     *\\n     * Anyone who wishes to continue emitting `Approval` events on the`transferFrom` operation can force the flag to\\n     * true using the following override:\\n     *\\n     * ```solidity\\n     * function _approve(address owner, address spender, uint256 value, bool) internal virtual override {\\n     *     super._approve(owner, spender, value, true);\\n     * }\\n     * ```\\n     *\\n     * Requirements are the same as {_approve}.\\n     */\\n    function _approve(address owner, address spender, uint256 value, bool emitEvent) internal virtual {\\n        if (owner == address(0)) {\\n            revert ERC20InvalidApprover(address(0));\\n        }\\n        if (spender == address(0)) {\\n            revert ERC20InvalidSpender(address(0));\\n        }\\n        _allowances[owner][spender] = value;\\n        if (emitEvent) {\\n            emit Approval(owner, spender, value);\\n        }\\n    }\\n\\n    /**\\n     * @dev Updates `owner`'s allowance for `spender` based on spent `value`.\\n     *\\n     * Does not update the allowance value in case of infinite allowance.\\n     * Revert if not enough allowance is available.\\n     *\\n     * Does not emit an {Approval} event.\\n     */\\n    function _spendAllowance(address owner, address spender, uint256 value) internal virtual {\\n        uint256 currentAllowance = allowance(owner, spender);\\n        if (currentAllowance < type(uint256).max) {\\n            if (currentAllowance < value) {\\n                revert ERC20InsufficientAllowance(spender, currentAllowance, value);\\n            }\\n            unchecked {\\n                _approve(owner, spender, currentAllowance - value, false);\\n            }\\n        }\\n    }\\n}\\n\",\"keccak256\":\"0x86b7b71a6aedefdad89b607378eeab1dcc5389b9ea7d17346d08af01d7190994\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/token/ERC20/IERC20.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/IERC20.sol)\\n\\npragma solidity >=0.4.16;\\n\\n/**\\n * @dev Interface of the ERC-20 standard as defined in the ERC.\\n */\\ninterface IERC20 {\\n    /**\\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\\n     * another (`to`).\\n     *\\n     * Note that `value` may be zero.\\n     */\\n    event Transfer(address indexed from, address indexed to, uint256 value);\\n\\n    /**\\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\\n     * a call to {approve}. `value` is the new allowance.\\n     */\\n    event Approval(address indexed owner, address indexed spender, uint256 value);\\n\\n    /**\\n     * @dev Returns the value of tokens in existence.\\n     */\\n    function totalSupply() external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the value of tokens owned by `account`.\\n     */\\n    function balanceOf(address account) external view returns (uint256);\\n\\n    /**\\n     * @dev Moves a `value` amount of tokens from the caller's account to `to`.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transfer(address to, uint256 value) external returns (bool);\\n\\n    /**\\n     * @dev Returns the remaining number of tokens that `spender` will be\\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\\n     * zero by default.\\n     *\\n     * This value changes when {approve} or {transferFrom} are called.\\n     */\\n    function allowance(address owner, address spender) external view returns (uint256);\\n\\n    /**\\n     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the\\n     * caller's tokens.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\\n     * that someone may use both the old and the new allowance by unfortunate\\n     * transaction ordering. One possible solution to mitigate this race\\n     * condition is to first reduce the spender's allowance to 0 and set the\\n     * desired value afterwards:\\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\\n     *\\n     * Emits an {Approval} event.\\n     */\\n    function approve(address spender, uint256 value) external returns (bool);\\n\\n    /**\\n     * @dev Moves a `value` amount of tokens from `from` to `to` using the\\n     * allowance mechanism. `value` is then deducted from the caller's\\n     * allowance.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transferFrom(address from, address to, uint256 value) external returns (bool);\\n}\\n\",\"keccak256\":\"0x74ed01eb66b923d0d0cfe3be84604ac04b76482a55f9dd655e1ef4d367f95bc2\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/token/ERC20/extensions/IERC20Metadata.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/extensions/IERC20Metadata.sol)\\n\\npragma solidity >=0.6.2;\\n\\nimport {IERC20} from \\\"../IERC20.sol\\\";\\n\\n/**\\n * @dev Interface for the optional metadata functions from the ERC-20 standard.\\n */\\ninterface IERC20Metadata is IERC20 {\\n    /**\\n     * @dev Returns the name of the token.\\n     */\\n    function name() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the symbol of the token.\\n     */\\n    function symbol() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the decimals places of the token.\\n     */\\n    function decimals() external view returns (uint8);\\n}\\n\",\"keccak256\":\"0xd6fa4088198f04eef10c5bce8a2f4d60554b7ec4b987f684393c01bf79b94d9f\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/utils/Context.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)\\n\\npragma solidity ^0.8.20;\\n\\n/**\\n * @dev Provides information about the current execution context, including the\\n * sender of the transaction and its data. While these are generally available\\n * via msg.sender and msg.data, they should not be accessed in such a direct\\n * manner, since when dealing with meta-transactions the account sending and\\n * paying for execution may not be the actual sender (as far as an application\\n * is concerned).\\n *\\n * This contract is only required for intermediate, library-like contracts.\\n */\\nabstract contract Context {\\n    function _msgSender() internal view virtual returns (address) {\\n        return msg.sender;\\n    }\\n\\n    function _msgData() internal view virtual returns (bytes calldata) {\\n        return msg.data;\\n    }\\n\\n    function _contextSuffixLength() internal view virtual returns (uint256) {\\n        return 0;\\n    }\\n}\\n\",\"keccak256\":\"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/utils/Pausable.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.3.0) (utils/Pausable.sol)\\n\\npragma solidity ^0.8.20;\\n\\nimport {Context} from \\\"../utils/Context.sol\\\";\\n\\n/**\\n * @dev Contract module which allows children to implement an emergency stop\\n * mechanism that can be triggered by an authorized account.\\n *\\n * This module is used through inheritance. It will make available the\\n * modifiers `whenNotPaused` and `whenPaused`, which can be applied to\\n * the functions of your contract. Note that they will not be pausable by\\n * simply including this module, only once the modifiers are put in place.\\n */\\nabstract contract Pausable is Context {\\n    bool private _paused;\\n\\n    /**\\n     * @dev Emitted when the pause is triggered by `account`.\\n     */\\n    event Paused(address account);\\n\\n    /**\\n     * @dev Emitted when the pause is lifted by `account`.\\n     */\\n    event Unpaused(address account);\\n\\n    /**\\n     * @dev The operation failed because the contract is paused.\\n     */\\n    error EnforcedPause();\\n\\n    /**\\n     * @dev The operation failed because the contract is not paused.\\n     */\\n    error ExpectedPause();\\n\\n    /**\\n     * @dev Modifier to make a function callable only when the contract is not paused.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must not be paused.\\n     */\\n    modifier whenNotPaused() {\\n        _requireNotPaused();\\n        _;\\n    }\\n\\n    /**\\n     * @dev Modifier to make a function callable only when the contract is paused.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must be paused.\\n     */\\n    modifier whenPaused() {\\n        _requirePaused();\\n        _;\\n    }\\n\\n    /**\\n     * @dev Returns true if the contract is paused, and false otherwise.\\n     */\\n    function paused() public view virtual returns (bool) {\\n        return _paused;\\n    }\\n\\n    /**\\n     * @dev Throws if the contract is paused.\\n     */\\n    function _requireNotPaused() internal view virtual {\\n        if (paused()) {\\n            revert EnforcedPause();\\n        }\\n    }\\n\\n    /**\\n     * @dev Throws if the contract is not paused.\\n     */\\n    function _requirePaused() internal view virtual {\\n        if (!paused()) {\\n            revert ExpectedPause();\\n        }\\n    }\\n\\n    /**\\n     * @dev Triggers stopped state.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must not be paused.\\n     */\\n    function _pause() internal virtual whenNotPaused {\\n        _paused = true;\\n        emit Paused(_msgSender());\\n    }\\n\\n    /**\\n     * @dev Returns to normal state.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must be paused.\\n     */\\n    function _unpause() internal virtual whenPaused {\\n        _paused = false;\\n        emit Unpaused(_msgSender());\\n    }\\n}\\n\",\"keccak256\":\"0xdb484371dfbb848cb6f5d70464e9ac9b2900e4164ead76bbce4fef0b44bcc68f\",\"license\":\"MIT\"},\"project/contracts/AFGToken.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.33;\\n\\nimport \\\"@openzeppelin/contracts/token/ERC20/ERC20.sol\\\";\\nimport \\\"@openzeppelin/contracts/access/Ownable.sol\\\";\\nimport \\\"@openzeppelin/contracts/utils/Pausable.sol\\\";\\n\\ninterface IUniswapV2Router02 {\\n    function swapExactTokensForETHSupportingFeeOnTransferTokens(\\n        uint256 amountIn,\\n        uint256 amountOutMin,\\n        address[] calldata path,\\n        address to,\\n        uint256 deadline\\n    ) external;\\n    function WETH() external pure returns (address);\\n}\\n\\n/**\\n * @title AFGToken\\n * @notice ERC-20 token for AgentForge protocol\\n *   - Total supply cap: 100,000,000 AFG\\n *   - 10% (10M) pre-minted to treasury at deploy\\n *   - 90% (90M) released via problem-solving mining\\n *   - Configurable transfer tax (default 3%), with exempt addresses for protocol contracts\\n *   - Halving schedule based on elapsed time since deployment\\n *   - Auto-swap: accumulated tax AFG \\u2192 BNB via PancakeSwap when threshold is reached\\n */\\ncontract AFGToken is ERC20, Ownable, Pausable {\\n    uint256 public constant MAX_SUPPLY = 100_000_000 ether;\\n    uint256 public constant TREASURY_PREMINT = 10_000_000 ether;\\n    uint256 public constant MINING_POOL = 90_000_000 ether;\\n\\n    /// @notice Number of rounds per halving period (7 days * 288 rounds/day = 2,016)\\n    uint256 public constant ROUNDS_PER_HALVING = 2_016;\\n    /// @notice Initial reward per round: 90M / 2,016 \\u2248 44,642 AFG\\n    uint256 public constant INITIAL_REWARD_PER_ROUND = MINING_POOL / ROUNDS_PER_HALVING;\\n    /// @notice Round duration: 5 minutes\\n    uint256 public constant ROUND_DURATION = 5 minutes;\\n\\n    uint256 public immutable deployedAt;\\n    address public immutable treasury;\\n    IUniswapV2Router02 public router;\\n\\n    /// @notice Total AFG minted via mining\\n    uint256 public totalMined;\\n\\n    /// @notice Only this address can call mint() \\u2014 set to RewardDistributor\\n    address public minter;\\n\\n    /// @notice Addresses exempt from transfer tax (protocol contracts, treasury, etc.)\\n    mapping(address => bool) public isTaxExempt;\\n\\n    /// @notice Transfer tax rate in basis points (default 300 = 3%, max 1000 = 10%)\\n    uint256 public taxBps = 300;\\n\\n    /// @notice Maximum allowed tax rate (10%)\\n    uint256 public constant MAX_TAX_BPS = 1000;\\n\\n    /// @notice Minimum accumulated tax to trigger auto-swap\\n    uint256 public swapThreshold = 10_000 ether;\\n\\n    /// @notice Maximum allowed swap threshold\\n    uint256 public constant MAX_SWAP_THRESHOLD = 1_000_000 ether;\\n\\n    /// @notice Minimum allowed swap threshold\\n    uint256 public constant MIN_SWAP_THRESHOLD = 100 ether;\\n\\n    /// @notice Whether auto-swap is enabled\\n    bool public swapEnabled = true;\\n\\n    /// @dev Reentrancy lock for swap operations\\n    bool private _swapping;\\n\\n    event MinterSet(address indexed minter);\\n    event TaxExemptSet(address indexed account, bool exempt);\\n    event TaxBpsUpdated(uint256 newBps);\\n    event SwapThresholdUpdated(uint256 newThreshold);\\n    event SwapEnabledUpdated(bool enabled);\\n    event RouterUpdated(address indexed newRouter);\\n    event TaxSwapped(uint256 afgAmount, uint256 bnbAmount);\\n\\n    error OnlyMinter();\\n    error OnlySelf();\\n    error ExceedsMiningPool();\\n    error ZeroAddress();\\n    error TaxTooHigh();\\n    error SwapThresholdTooHigh();\\n    error SwapThresholdTooLow();\\n\\n    modifier onlyMinter() {\\n        if (msg.sender != minter) revert OnlyMinter();\\n        _;\\n    }\\n\\n    constructor(\\n        address _treasury,\\n        address _router\\n    ) ERC20(\\\"AgentForge\\\", \\\"AFG\\\") Ownable(msg.sender) {\\n        if (_treasury == address(0)) revert ZeroAddress();\\n        if (_router == address(0)) revert ZeroAddress();\\n        treasury = _treasury;\\n        router = IUniswapV2Router02(_router);\\n        deployedAt = block.timestamp;\\n\\n        // Pre-mint 10M to treasury\\n        _mint(_treasury, TREASURY_PREMINT);\\n\\n        // Treasury, deployer, and this contract are tax-exempt by default\\n        isTaxExempt[_treasury] = true;\\n        isTaxExempt[msg.sender] = true;\\n        isTaxExempt[address(this)] = true;\\n\\n        // Pre-approve router for max spending (gas optimization)\\n        _approve(address(this), _router, type(uint256).max);\\n\\n        // Start paused\\n        _pause();\\n    }\\n\\n    // ============ Admin ============\\n\\n    function setMinter(address _minter) external onlyOwner {\\n        if (_minter == address(0)) revert ZeroAddress();\\n        minter = _minter;\\n        emit MinterSet(_minter);\\n    }\\n\\n    function setTaxExempt(address account, bool exempt) external onlyOwner {\\n        if (account == address(0)) revert ZeroAddress();\\n        isTaxExempt[account] = exempt;\\n        emit TaxExemptSet(account, exempt);\\n    }\\n\\n    function setTaxBps(uint256 _bps) external onlyOwner {\\n        if (_bps > MAX_TAX_BPS) revert TaxTooHigh();\\n        taxBps = _bps;\\n        emit TaxBpsUpdated(_bps);\\n    }\\n\\n    function setSwapThreshold(uint256 _threshold) external onlyOwner {\\n        if (_threshold > MAX_SWAP_THRESHOLD) revert SwapThresholdTooHigh();\\n        if (_threshold < MIN_SWAP_THRESHOLD) revert SwapThresholdTooLow();\\n        swapThreshold = _threshold;\\n        emit SwapThresholdUpdated(_threshold);\\n    }\\n\\n    function setSwapEnabled(bool _enabled) external onlyOwner {\\n        swapEnabled = _enabled;\\n        emit SwapEnabledUpdated(_enabled);\\n    }\\n\\n    function setRouter(address _router) external onlyOwner {\\n        if (_router == address(0)) revert ZeroAddress();\\n        // Revoke old router approval before setting new one [H-01 fix]\\n        _approve(address(this), address(router), 0);\\n        router = IUniswapV2Router02(_router);\\n        _approve(address(this), _router, type(uint256).max);\\n        emit RouterUpdated(_router);\\n    }\\n\\n    function pause() external onlyOwner {\\n        _pause();\\n    }\\n\\n    function unpause() external onlyOwner {\\n        _unpause();\\n    }\\n\\n    // ============ Mining ============\\n\\n    /**\\n     * @notice Mint AFG rewards \\u2014 only callable by RewardDistributor\\n     */\\n    function mint(address to, uint256 amount) external onlyMinter whenNotPaused {\\n        if (totalMined + amount > MINING_POOL) revert ExceedsMiningPool();\\n        totalMined += amount;\\n        _mint(to, amount);\\n    }\\n\\n    /**\\n     * @notice Current reward per round based on halving schedule\\n     * @dev Uses bit-shift for halving: reward >> halvingCount\\n     */\\n    function currentRewardPerRound() public view returns (uint256) {\\n        uint256 elapsed = block.timestamp - deployedAt;\\n        uint256 roundsSinceStart = elapsed / ROUND_DURATION;\\n        uint256 halvingCount = roundsSinceStart / ROUNDS_PER_HALVING;\\n\\n        // Cap at 20 halvings to avoid shifting to zero\\n        if (halvingCount > 20) return 0;\\n\\n        return INITIAL_REWARD_PER_ROUND >> halvingCount;\\n    }\\n\\n    // ============ Transfer Tax ============\\n\\n    /**\\n     * @notice Override _update to apply transfer tax on all non-exempt transfers\\n     * @dev Tax accumulates in this contract; auto-swaps to BNB when threshold is reached\\n     */\\n    function _update(\\n        address from,\\n        address to,\\n        uint256 value\\n    ) internal virtual override {\\n        // Apply tax unless sender or receiver is exempt (or mint/burn)\\n        if (value > 0 && from != address(0) && to != address(0)) {\\n            if (!isTaxExempt[from] && !isTaxExempt[to]) {\\n                uint256 tax = (value * taxBps) / 10000;\\n                uint256 netAmount = value - tax;\\n\\n                // Accumulate tax in this contract (instead of sending to treasury)\\n                super._update(from, address(this), tax);\\n                super._update(from, to, netAmount);\\n\\n                // Auto-swap if conditions are met (try-catch to never block transfers) [C-01 fix]\\n                if (swapEnabled && !_swapping && balanceOf(address(this)) >= swapThreshold) {\\n                    _swapping = true;\\n                    try this.executeSwap(swapThreshold) {} catch {}\\n                    _swapping = false;\\n                }\\n                return;\\n            }\\n        }\\n\\n        super._update(from, to, value);\\n    }\\n\\n    /**\\n     * @notice Execute auto-swap of accumulated AFG tax to BNB. Only callable by this contract.\\n     * @dev External so it can be wrapped in try-catch within _update [C-01 fix]\\n     */\\n    function executeSwap(uint256 amount) external {\\n        if (msg.sender != address(this)) revert OnlySelf();\\n\\n        address[] memory path = new address[](2);\\n        path[0] = address(this);\\n        path[1] = router.WETH();\\n\\n        uint256 balBefore = treasury.balance;\\n\\n        router.swapExactTokensForETHSupportingFeeOnTransferTokens(\\n            amount,\\n            0, // accept any amount of BNB (risk bounded by threshold)\\n            path,\\n            treasury,\\n            block.timestamp\\n        );\\n\\n        emit TaxSwapped(amount, treasury.balance - balBefore);\\n    }\\n\\n    /// @dev Required to receive BNB from router during swap\\n    receive() external payable {}\\n}\\n\",\"keccak256\":\"0x18ea696e442f3128e023d540482adc27a459f1328d99b0925a333f2acbd47da2\",\"license\":\"MIT\"}},\"version\":1}",
  "storageLayout": {
    "storage": [
      {
        "astId": 307,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_balances",
        "offset": 0,
        "slot": "0",
        "type": "t_mapping(t_address,t_uint256)"
      },
      {
        "astId": 313,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_allowances",
        "offset": 0,
        "slot": "1",
        "type": "t_mapping(t_address,t_mapping(t_address,t_uint256))"
      },
      {
        "astId": 315,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_totalSupply",
        "offset": 0,
        "slot": "2",
        "type": "t_uint256"
      },
      {
        "astId": 317,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_name",
        "offset": 0,
        "slot": "3",
        "type": "t_string_storage"
      },
      {
        "astId": 319,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_symbol",
        "offset": 0,
        "slot": "4",
        "type": "t_string_storage"
      },
      {
        "astId": 8,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_owner",
        "offset": 0,
        "slot": "5",
        "type": "t_address"
      },
      {
        "astId": 2220,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_paused",
        "offset": 20,
        "slot": "5",
        "type": "t_bool"
      },
      {
        "astId": 7418,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "router",
        "offset": 0,
        "slot": "6",
        "type": "t_contract(IUniswapV2Router02)7381"
      },
      {
        "astId": 7421,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "totalMined",
        "offset": 0,
        "slot": "7",
        "type": "t_uint256"
      },
      {
        "astId": 7424,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "minter",
        "offset": 0,
        "slot": "8",
        "type": "t_address"
      },
      {
        "astId": 7429,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "isTaxExempt",
        "offset": 0,
        "slot": "9",
        "type": "t_mapping(t_address,t_bool)"
      },
      {
        "astId": 7433,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "taxBps",
        "offset": 0,
        "slot": "10",
        "type": "t_uint256"
      },
      {
        "astId": 7441,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "swapThreshold",
        "offset": 0,
        "slot": "11",
        "type": "t_uint256"
      },
      {
        "astId": 7453,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "swapEnabled",
        "offset": 0,
        "slot": "12",
        "type": "t_bool"
      },
      {
        "astId": 7456,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_swapping",
        "offset": 1,
        "slot": "12",
        "type": "t_bool"
      }
    ],
    "types": {
      "t_address": {
        "encoding": "inplace",
        "label": "address",
        "numberOfBytes": "20"
      },
      "t_bool": {
        "encoding": "inplace",
        "label": "bool",
        "numberOfBytes": "1"
      },
      "t_contract(IUniswapV2Router02)7381": {
        "encoding": "inplace",
        "label": "contract IUniswapV2Router02",
        "numberOfBytes": "20"
      },
      "t_mapping(t_address,t_bool)": {
        "encoding": "mapping",
        "key": "t_address",
        "label": "mapping(address => bool)",
        "numberOfBytes": "32",
        "value": "t_bool"
      },
      "t_mapping(t_address,t_mapping(t_address,t_uint256))": {
        "encoding": "mapping",
        "key": "t_address",
        "label": "mapping(address => mapping(address => uint256))",
        "numberOfBytes": "32",
        "value": "t_mapping(t_address,t_uint256)"
      },
      "t_mapping(t_address,t_uint256)": {
        "encoding": "mapping",
        "key": "t_address",
        "label": "mapping(address => uint256)",
        "numberOfBytes": "32",
        "value": "t_uint256"
      },
      "t_string_storage": {
        "encoding": "bytes",
        "label": "string",
        "numberOfBytes": "32"
      },
      "t_uint256": {
        "encoding": "inplace",
        "label": "uint256",
        "numberOfBytes": "32"
      }
    }
  },
  "userdoc": {
    "kind": "user",
    "methods": {
      "INITIAL_REWARD_PER_ROUND()": {
        "notice": "Initial reward per round: 90M / 2,016 ≈ 44,642 AFG"
      },
      "MAX_SWAP_THRESHOLD()": {
        "notice": "Maximum allowed swap threshold"
      },
      "MAX_TAX_BPS()": {
        "notice": "Maximum allowed tax rate (10%)"
      },
      "MIN_SWAP_THRESHOLD()": {
        "notice": "Minimum allowed swap threshold"
      },
      "ROUNDS_PER_HALVING()": {
        "notice": "Number of rounds per halving period (7 days * 288 rounds/day = 2,016)"
      },
      "ROUND_DURATION()": {
        "notice": "Round duration: 5 minutes"
      },
      "currentRewardPerRound()": {
        "notice": "Current reward per round based on halving schedule"
      },
      "executeSwap(uint256)": {
        "notice": "Execute auto-swap of accumulated AFG tax to BNB. Only callable by this contract."
      },
      "isTaxExempt(address)": {
        "notice": "Addresses exempt from transfer tax (protocol contracts, treasury, etc.)"
      },
      "mint(address,uint256)": {
        "notice": "Mint AFG rewards — only callable by RewardDistributor"
      },
      "minter()": {
        "notice": "Only this address can call mint() — set to RewardDistributor"
      },
      "swapEnabled()": {
        "notice": "Whether auto-swap is enabled"
      },
      "swapThreshold()": {
        "notice": "Minimum accumulated tax to trigger auto-swap"
      },
      "taxBps()": {
        "notice": "Transfer tax rate in basis points (default 300 = 3%, max 1000 = 10%)"
      },
      "totalMined()": {
        "notice": "Total AFG minted via mining"
      }
    },
    "notice": "ERC-20 token for AgentForge protocol   - Total supply cap: 100,000,000 AFG   - 10% (10M) pre-minted to treasury at deploy   - 90% (90M) released via problem-solving mining   - Configurable transfer tax (default 3%), with exempt addresses for protocol contracts   - Halving schedule based on elapsed time since deployment   - Auto-swap: accumulated tax AFG → BNB via PancakeSwap when threshold is reached",
    "version": 1
  }
} = {
  "contractName": "AFGToken",
  "sourceName": "contracts/AFGToken.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_router",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "EnforcedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExceedsMiningPool",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ExpectedPause",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlyMinter",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OnlySelf",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SwapThresholdTooHigh",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "SwapThresholdTooLow",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TaxTooHigh",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroAddress",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "minter",
          "type": "address"
        }
      ],
      "name": "MinterSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "newRouter",
          "type": "address"
        }
      ],
      "name": "RouterUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "enabled",
          "type": "bool"
        }
      ],
      "name": "SwapEnabledUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newThreshold",
          "type": "uint256"
        }
      ],
      "name": "SwapThresholdUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newBps",
          "type": "uint256"
        }
      ],
      "name": "TaxBpsUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "exempt",
          "type": "bool"
        }
      ],
      "name": "TaxExemptSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "afgAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bnbAmount",
          "type": "uint256"
        }
      ],
      "name": "TaxSwapped",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "INITIAL_REWARD_PER_ROUND",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_SUPPLY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_SWAP_THRESHOLD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_TAX_BPS",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MINING_POOL",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MIN_SWAP_THRESHOLD",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ROUNDS_PER_HALVING",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ROUND_DURATION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TREASURY_PREMINT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentRewardPerRound",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deployedAt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "executeSwap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isTaxExempt",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minter",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "router",
      "outputs": [
        {
          "internalType": "contract IUniswapV2Router02",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_minter",
          "type": "address"
        }
      ],
      "name": "setMinter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_router",
          "type": "address"
        }
      ],
      "name": "setRouter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_enabled",
          "type": "bool"
        }
      ],
      "name": "setSwapEnabled",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_threshold",
          "type": "uint256"
        }
      ],
      "name": "setSwapThreshold",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_bps",
          "type": "uint256"
        }
      ],
      "name": "setTaxBps",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "exempt",
          "type": "bool"
        }
      ],
      "name": "setTaxExempt",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "swapEnabled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "swapThreshold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "taxBps",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalMined",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x60c080604052346105af57604081611ebd803803809161001f82856105b3565b8339810103126105af5761003e6020610037836105d6565b92016105d6565b6040519161004d6040846105b3565b600a8352694167656e74466f72676560b01b6020840152604051916100736040846105b3565b600383526241464760e81b602084015283516001600160401b0381116104b557600354600181811c911680156105a5575b602082101461049757601f8111610537575b50602094601f82116001146104d4579481929394955f926104c9575b50508160011b915f199060031b1c1916176003555b82516001600160401b0381116104b557600454600181811c911680156104ab575b602082101461049757601f8111610429575b506020601f82116001146103c657819293945f926103bb575b50508160011b915f199060031b1c1916176004555b33156103a85760058054336001600160a01b0319821681179092556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a361012c600a5569021e19e0c9bab2400000600b55600c805460ff191660011790556001600160a01b038216908115610399576001600160a01b03169182156103995760a052600680546001600160a01b03191683179055426080526a084595161401484a0000005f600254918083018093116103855760207fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef918594600255846103705780600254036002555b604051908152a35f52600960205260405f20600160ff19825416179055335f52600960205260405f20600160ff19825416179055305f52600960205260405f20600160ff19825416179055301561035d57305f52600160205260405f20815f5260205260405f205f1990556040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a360055460ff8160a01c1661034e5760ff60a01b1916600160a01b176005556040513381527f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25890602090a16040516118d290816105eb823960805181818161037f0152611456015260a0518181816106a20152610c580152f35b63d93c066560e01b5f5260045ffd5b63e602df0560e01b5f525f60045260245ffd5b845f525f825260405f2081815401905561023d565b634e487b7160e01b5f52601160045260245ffd5b63d92e233d60e01b5f5260045ffd5b631e4fbdf760e01b5f525f60045260245ffd5b015190505f80610133565b601f1982169060045f52805f20915f5b818110610411575095836001959697106103f9575b505050811b01600455610148565b01515f1960f88460031b161c191690555f80806103eb565b9192602060018192868b0151815501940192016103d6565b8181111561011a5760045f52601f820160051c7f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b6020841061048f575b81601f9101920160051c03905f5b82811061048257505061011a565b5f82820155600101610474565b5f9150610466565b634e487b7160e01b5f52602260045260245ffd5b90607f1690610108565b634e487b7160e01b5f52604160045260245ffd5b015190505f806100d2565b601f1982169560035f52805f20915f5b88811061051f57508360019596979810610507575b505050811b016003556100e7565b01515f1960f88460031b161c191690555f80806104f9565b919260206001819286850151815501940192016104e4565b818111156100b65760035f52601f820160051c7fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b6020841061059d575b81601f9101920160051c03905f5b8281106105905750506100b6565b5f82820155600101610582565b5f9150610574565b90607f16906100a4565b5f80fd5b601f909101601f19168101906001600160401b038211908210176104b557604052565b51906001600160a01b03821682036105af5756fe608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
  "deployedBytecode": "0x608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
  "linkReferences": {},
  "deployedLinkReferences": {},
  "immutableReferences": {
    "7413": [
      {
        "length": 32,
        "start": 895
      },
      {
        "length": 32,
        "start": 5206
      }
    ],
    "7415": [
      {
        "length": 32,
        "start": 1698
      },
      {
        "length": 32,
        "start": 3160
      }
    ]
  },
  "inputSourceName": "project/contracts/AFGToken.sol",
  "devdoc": {
    "errors": {
      "ERC20InsufficientAllowance(address,uint256,uint256)": [
        {
          "details": "Indicates a failure with the `spender`’s `allowance`. Used in transfers.",
          "params": {
            "allowance": "Amount of tokens a `spender` is allowed to operate with.",
            "needed": "Minimum amount required to perform a transfer.",
            "spender": "Address that may be allowed to operate on tokens without being their owner."
          }
        }
      ],
      "ERC20InsufficientBalance(address,uint256,uint256)": [
        {
          "details": "Indicates an error related to the current `balance` of a `sender`. Used in transfers.",
          "params": {
            "balance": "Current balance for the interacting account.",
            "needed": "Minimum amount required to perform a transfer.",
            "sender": "Address whose tokens are being transferred."
          }
        }
      ],
      "ERC20InvalidApprover(address)": [
        {
          "details": "Indicates a failure with the `approver` of a token to be approved. Used in approvals.",
          "params": {
            "approver": "Address initiating an approval operation."
          }
        }
      ],
      "ERC20InvalidReceiver(address)": [
        {
          "details": "Indicates a failure with the token `receiver`. Used in transfers.",
          "params": {
            "receiver": "Address to which tokens are being transferred."
          }
        }
      ],
      "ERC20InvalidSender(address)": [
        {
          "details": "Indicates a failure with the token `sender`. Used in transfers.",
          "params": {
            "sender": "Address whose tokens are being transferred."
          }
        }
      ],
      "ERC20InvalidSpender(address)": [
        {
          "details": "Indicates a failure with the `spender` to be approved. Used in approvals.",
          "params": {
            "spender": "Address that may be allowed to operate on tokens without being their owner."
          }
        }
      ],
      "EnforcedPause()": [
        {
          "details": "The operation failed because the contract is paused."
        }
      ],
      "ExpectedPause()": [
        {
          "details": "The operation failed because the contract is not paused."
        }
      ],
      "OwnableInvalidOwner(address)": [
        {
          "details": "The owner is not a valid owner account. (eg. `address(0)`)"
        }
      ],
      "OwnableUnauthorizedAccount(address)": [
        {
          "details": "The caller account is not authorized to perform an operation."
        }
      ]
    },
    "events": {
      "Approval(address,address,uint256)": {
        "details": "Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance."
      },
      "Paused(address)": {
        "details": "Emitted when the pause is triggered by `account`."
      },
      "Transfer(address,address,uint256)": {
        "details": "Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero."
      },
      "Unpaused(address)": {
        "details": "Emitted when the pause is lifted by `account`."
      }
    },
    "kind": "dev",
    "methods": {
      "allowance(address,address)": {
        "details": "Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called."
      },
      "approve(address,uint256)": {
        "details": "See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address."
      },
      "balanceOf(address)": {
        "details": "Returns the value of tokens owned by `account`."
      },
      "currentRewardPerRound()": {
        "details": "Uses bit-shift for halving: reward >> halvingCount"
      },
      "decimals()": {
        "details": "Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}."
      },
      "executeSwap(uint256)": {
        "details": "External so it can be wrapped in try-catch within _update [C-01 fix]"
      },
      "name()": {
        "details": "Returns the name of the token."
      },
      "owner()": {
        "details": "Returns the address of the current owner."
      },
      "paused()": {
        "details": "Returns true if the contract is paused, and false otherwise."
      },
      "renounceOwnership()": {
        "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner."
      },
      "symbol()": {
        "details": "Returns the symbol of the token, usually a shorter version of the name."
      },
      "totalSupply()": {
        "details": "Returns the value of tokens in existence."
      },
      "transfer(address,uint256)": {
        "details": "See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`."
      },
      "transferFrom(address,address,uint256)": {
        "details": "See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`."
      },
      "transferOwnership(address)": {
        "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
      }
    },
    "stateVariables": {
      "_swapping": {
        "details": "Reentrancy lock for swap operations"
      }
    },
    "title": "AFGToken",
    "version": 1
  },
  "evm": {
    "bytecode": {
      "functionDebugData": {
        "abi_decode_address_fromMemory": {
          "entryPoint": 1494,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "finalize_allocation": {
          "entryPoint": 1459,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 0
        }
      },
      "generatedSources": [],
      "linkReferences": {},
      "object": "60c080604052346105af57604081611ebd803803809161001f82856105b3565b8339810103126105af5761003e6020610037836105d6565b92016105d6565b6040519161004d6040846105b3565b600a8352694167656e74466f72676560b01b6020840152604051916100736040846105b3565b600383526241464760e81b602084015283516001600160401b0381116104b557600354600181811c911680156105a5575b602082101461049757601f8111610537575b50602094601f82116001146104d4579481929394955f926104c9575b50508160011b915f199060031b1c1916176003555b82516001600160401b0381116104b557600454600181811c911680156104ab575b602082101461049757601f8111610429575b506020601f82116001146103c657819293945f926103bb575b50508160011b915f199060031b1c1916176004555b33156103a85760058054336001600160a01b0319821681179092556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e05f80a361012c600a5569021e19e0c9bab2400000600b55600c805460ff191660011790556001600160a01b038216908115610399576001600160a01b03169182156103995760a052600680546001600160a01b03191683179055426080526a084595161401484a0000005f600254918083018093116103855760207fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef918594600255846103705780600254036002555b604051908152a35f52600960205260405f20600160ff19825416179055335f52600960205260405f20600160ff19825416179055305f52600960205260405f20600160ff19825416179055301561035d57305f52600160205260405f20815f5260205260405f205f1990556040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a360055460ff8160a01c1661034e5760ff60a01b1916600160a01b176005556040513381527f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25890602090a16040516118d290816105eb823960805181818161037f0152611456015260a0518181816106a20152610c580152f35b63d93c066560e01b5f5260045ffd5b63e602df0560e01b5f525f60045260245ffd5b845f525f825260405f2081815401905561023d565b634e487b7160e01b5f52601160045260245ffd5b63d92e233d60e01b5f5260045ffd5b631e4fbdf760e01b5f525f60045260245ffd5b015190505f80610133565b601f1982169060045f52805f20915f5b818110610411575095836001959697106103f9575b505050811b01600455610148565b01515f1960f88460031b161c191690555f80806103eb565b9192602060018192868b0151815501940192016103d6565b8181111561011a5760045f52601f820160051c7f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b6020841061048f575b81601f9101920160051c03905f5b82811061048257505061011a565b5f82820155600101610474565b5f9150610466565b634e487b7160e01b5f52602260045260245ffd5b90607f1690610108565b634e487b7160e01b5f52604160045260245ffd5b015190505f806100d2565b601f1982169560035f52805f20915f5b88811061051f57508360019596979810610507575b505050811b016003556100e7565b01515f1960f88460031b161c191690555f80806104f9565b919260206001819286850151815501940192016104e4565b818111156100b65760035f52601f820160051c7fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b6020841061059d575b81601f9101920160051c03905f5b8281106105905750506100b6565b5f82820155600101610582565b5f9150610574565b90607f16906100a4565b5f80fd5b601f909101601f19168101906001600160401b038211908210176104b557604052565b51906001600160a01b03821682036105af5756fe608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
      "opcodes": "PUSH1 0xC0 DUP1 PUSH1 0x40 MSTORE CALLVALUE PUSH2 0x5AF JUMPI PUSH1 0x40 DUP2 PUSH2 0x1EBD DUP1 CODESIZE SUB DUP1 SWAP2 PUSH2 0x1F DUP3 DUP6 PUSH2 0x5B3 JUMP JUMPDEST DUP4 CODECOPY DUP2 ADD SUB SLT PUSH2 0x5AF JUMPI PUSH2 0x3E PUSH1 0x20 PUSH2 0x37 DUP4 PUSH2 0x5D6 JUMP JUMPDEST SWAP3 ADD PUSH2 0x5D6 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP2 PUSH2 0x4D PUSH1 0x40 DUP5 PUSH2 0x5B3 JUMP JUMPDEST PUSH1 0xA DUP4 MSTORE PUSH10 0x4167656E74466F726765 PUSH1 0xB0 SHL PUSH1 0x20 DUP5 ADD MSTORE PUSH1 0x40 MLOAD SWAP2 PUSH2 0x73 PUSH1 0x40 DUP5 PUSH2 0x5B3 JUMP JUMPDEST PUSH1 0x3 DUP4 MSTORE PUSH3 0x414647 PUSH1 0xE8 SHL PUSH1 0x20 DUP5 ADD MSTORE DUP4 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP2 GT PUSH2 0x4B5 JUMPI PUSH1 0x3 SLOAD PUSH1 0x1 DUP2 DUP2 SHR SWAP2 AND DUP1 ISZERO PUSH2 0x5A5 JUMPI JUMPDEST PUSH1 0x20 DUP3 LT EQ PUSH2 0x497 JUMPI PUSH1 0x1F DUP2 GT PUSH2 0x537 JUMPI JUMPDEST POP PUSH1 0x20 SWAP5 PUSH1 0x1F DUP3 GT PUSH1 0x1 EQ PUSH2 0x4D4 JUMPI SWAP5 DUP2 SWAP3 SWAP4 SWAP5 SWAP6 PUSH0 SWAP3 PUSH2 0x4C9 JUMPI JUMPDEST POP POP DUP2 PUSH1 0x1 SHL SWAP2 PUSH0 NOT SWAP1 PUSH1 0x3 SHL SHR NOT AND OR PUSH1 0x3 SSTORE JUMPDEST DUP3 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP2 GT PUSH2 0x4B5 JUMPI PUSH1 0x4 SLOAD PUSH1 0x1 DUP2 DUP2 SHR SWAP2 AND DUP1 ISZERO PUSH2 0x4AB JUMPI JUMPDEST PUSH1 0x20 DUP3 LT EQ PUSH2 0x497 JUMPI PUSH1 0x1F DUP2 GT PUSH2 0x429 JUMPI JUMPDEST POP PUSH1 0x20 PUSH1 0x1F DUP3 GT PUSH1 0x1 EQ PUSH2 0x3C6 JUMPI DUP2 SWAP3 SWAP4 SWAP5 PUSH0 SWAP3 PUSH2 0x3BB JUMPI JUMPDEST POP POP DUP2 PUSH1 0x1 SHL SWAP2 PUSH0 NOT SWAP1 PUSH1 0x3 SHL SHR NOT AND OR PUSH1 0x4 SSTORE JUMPDEST CALLER ISZERO PUSH2 0x3A8 JUMPI PUSH1 0x5 DUP1 SLOAD CALLER PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP3 AND DUP2 OR SWAP1 SWAP3 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH0 DUP1 LOG3 PUSH2 0x12C PUSH1 0xA SSTORE PUSH10 0x21E19E0C9BAB2400000 PUSH1 0xB SSTORE PUSH1 0xC DUP1 SLOAD PUSH1 0xFF NOT AND PUSH1 0x1 OR SWAP1 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND SWAP1 DUP2 ISZERO PUSH2 0x399 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP2 DUP3 ISZERO PUSH2 0x399 JUMPI PUSH1 0xA0 MSTORE PUSH1 0x6 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND DUP4 OR SWAP1 SSTORE TIMESTAMP PUSH1 0x80 MSTORE PUSH11 0x84595161401484A000000 PUSH0 PUSH1 0x2 SLOAD SWAP2 DUP1 DUP4 ADD DUP1 SWAP4 GT PUSH2 0x385 JUMPI PUSH1 0x20 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP2 DUP6 SWAP5 PUSH1 0x2 SSTORE DUP5 PUSH2 0x370 JUMPI DUP1 PUSH1 0x2 SLOAD SUB PUSH1 0x2 SSTORE JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG3 PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0xFF NOT DUP3 SLOAD AND OR SWAP1 SSTORE CALLER PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0xFF NOT DUP3 SLOAD AND OR SWAP1 SSTORE ADDRESS PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0xFF NOT DUP3 SLOAD AND OR SWAP1 SSTORE ADDRESS ISZERO PUSH2 0x35D JUMPI ADDRESS PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH0 NOT SWAP1 SSTORE PUSH1 0x40 MLOAD PUSH0 NOT DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 PUSH1 0x5 SLOAD PUSH1 0xFF DUP2 PUSH1 0xA0 SHR AND PUSH2 0x34E JUMPI PUSH1 0xFF PUSH1 0xA0 SHL NOT AND PUSH1 0x1 PUSH1 0xA0 SHL OR PUSH1 0x5 SSTORE PUSH1 0x40 MLOAD CALLER DUP2 MSTORE PUSH32 0x62E78CEA01BEE320CD4E420270B5EA74000D11B0C9F74754EBDBFC544B05A258 SWAP1 PUSH1 0x20 SWAP1 LOG1 PUSH1 0x40 MLOAD PUSH2 0x18D2 SWAP1 DUP2 PUSH2 0x5EB DUP3 CODECOPY PUSH1 0x80 MLOAD DUP2 DUP2 DUP2 PUSH2 0x37F ADD MSTORE PUSH2 0x1456 ADD MSTORE PUSH1 0xA0 MLOAD DUP2 DUP2 DUP2 PUSH2 0x6A2 ADD MSTORE PUSH2 0xC58 ADD MSTORE RETURN JUMPDEST PUSH4 0xD93C0665 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH4 0xE602DF05 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST DUP5 PUSH0 MSTORE PUSH0 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 DUP2 SLOAD ADD SWAP1 SSTORE PUSH2 0x23D JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH4 0xD92E233D PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST ADD MLOAD SWAP1 POP PUSH0 DUP1 PUSH2 0x133 JUMP JUMPDEST PUSH1 0x1F NOT DUP3 AND SWAP1 PUSH1 0x4 PUSH0 MSTORE DUP1 PUSH0 KECCAK256 SWAP2 PUSH0 JUMPDEST DUP2 DUP2 LT PUSH2 0x411 JUMPI POP SWAP6 DUP4 PUSH1 0x1 SWAP6 SWAP7 SWAP8 LT PUSH2 0x3F9 JUMPI JUMPDEST POP POP POP DUP2 SHL ADD PUSH1 0x4 SSTORE PUSH2 0x148 JUMP JUMPDEST ADD MLOAD PUSH0 NOT PUSH1 0xF8 DUP5 PUSH1 0x3 SHL AND SHR NOT AND SWAP1 SSTORE PUSH0 DUP1 DUP1 PUSH2 0x3EB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x20 PUSH1 0x1 DUP2 SWAP3 DUP7 DUP12 ADD MLOAD DUP2 SSTORE ADD SWAP5 ADD SWAP3 ADD PUSH2 0x3D6 JUMP JUMPDEST DUP2 DUP2 GT ISZERO PUSH2 0x11A JUMPI PUSH1 0x4 PUSH0 MSTORE PUSH1 0x1F DUP3 ADD PUSH1 0x5 SHR PUSH32 0x8A35ACFBC15FF81A39AE7D344FD709F28E8600B4AA8C65C6B64BFE7FE36BD19B PUSH1 0x20 DUP5 LT PUSH2 0x48F JUMPI JUMPDEST DUP2 PUSH1 0x1F SWAP2 ADD SWAP3 ADD PUSH1 0x5 SHR SUB SWAP1 PUSH0 JUMPDEST DUP3 DUP2 LT PUSH2 0x482 JUMPI POP POP PUSH2 0x11A JUMP JUMPDEST PUSH0 DUP3 DUP3 ADD SSTORE PUSH1 0x1 ADD PUSH2 0x474 JUMP JUMPDEST PUSH0 SWAP2 POP PUSH2 0x466 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP1 PUSH1 0x7F AND SWAP1 PUSH2 0x108 JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST ADD MLOAD SWAP1 POP PUSH0 DUP1 PUSH2 0xD2 JUMP JUMPDEST PUSH1 0x1F NOT DUP3 AND SWAP6 PUSH1 0x3 PUSH0 MSTORE DUP1 PUSH0 KECCAK256 SWAP2 PUSH0 JUMPDEST DUP9 DUP2 LT PUSH2 0x51F JUMPI POP DUP4 PUSH1 0x1 SWAP6 SWAP7 SWAP8 SWAP9 LT PUSH2 0x507 JUMPI JUMPDEST POP POP POP DUP2 SHL ADD PUSH1 0x3 SSTORE PUSH2 0xE7 JUMP JUMPDEST ADD MLOAD PUSH0 NOT PUSH1 0xF8 DUP5 PUSH1 0x3 SHL AND SHR NOT AND SWAP1 SSTORE PUSH0 DUP1 DUP1 PUSH2 0x4F9 JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x20 PUSH1 0x1 DUP2 SWAP3 DUP7 DUP6 ADD MLOAD DUP2 SSTORE ADD SWAP5 ADD SWAP3 ADD PUSH2 0x4E4 JUMP JUMPDEST DUP2 DUP2 GT ISZERO PUSH2 0xB6 JUMPI PUSH1 0x3 PUSH0 MSTORE PUSH1 0x1F DUP3 ADD PUSH1 0x5 SHR PUSH32 0xC2575A0E9E593C00F959F8C92F12DB2869C3395A3B0502D05E2516446F71F85B PUSH1 0x20 DUP5 LT PUSH2 0x59D JUMPI JUMPDEST DUP2 PUSH1 0x1F SWAP2 ADD SWAP3 ADD PUSH1 0x5 SHR SUB SWAP1 PUSH0 JUMPDEST DUP3 DUP2 LT PUSH2 0x590 JUMPI POP POP PUSH2 0xB6 JUMP JUMPDEST PUSH0 DUP3 DUP3 ADD SSTORE PUSH1 0x1 ADD PUSH2 0x582 JUMP JUMPDEST PUSH0 SWAP2 POP PUSH2 0x574 JUMP JUMPDEST SWAP1 PUSH1 0x7F AND SWAP1 PUSH2 0xA4 JUMP JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH1 0x1F SWAP1 SWAP2 ADD PUSH1 0x1F NOT AND DUP2 ADD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0x40 SHL SUB DUP3 GT SWAP1 DUP3 LT OR PUSH2 0x4B5 JUMPI PUSH1 0x40 MSTORE JUMP JUMPDEST MLOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x5AF JUMPI JUMP INVALID PUSH1 0x80 DUP1 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT ISZERO PUSH2 0x1C JUMPI JUMPDEST POP CALLDATASIZE ISZERO PUSH2 0x1A JUMPI PUSH0 DUP1 REVERT JUMPDEST STOP JUMPDEST PUSH0 SWAP1 PUSH0 CALLDATALOAD PUSH1 0xE0 SHR SWAP1 DUP2 PUSH4 0x445B667 EQ PUSH2 0x1376 JUMPI POP DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x12BB JUMPI DUP1 PUSH4 0x7546172 EQ PUSH2 0x1295 JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x1213 JUMPI DUP1 PUSH4 0x16C2BE6B EQ PUSH2 0x11D6 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x11B9 JUMPI DUP1 PUSH4 0x1BB9B0A3 EQ PUSH2 0x1194 JUMPI DUP1 PUSH4 0x1DC61040 EQ PUSH2 0x10E7 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0xFB7 JUMPI DUP1 PUSH4 0x2C597DE9 EQ PUSH2 0xF9B JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0xF80 JUMPI DUP1 PUSH4 0x32CB6B0C EQ PUSH2 0xF5B JUMPI DUP1 PUSH4 0x3352EB8C EQ PUSH2 0xF38 JUMPI DUP1 PUSH4 0x3C96B08F EQ PUSH2 0xF13 JUMPI DUP1 PUSH4 0x3EACD2F8 EQ PUSH2 0xEF6 JUMPI DUP1 PUSH4 0x3F4BA83A EQ PUSH2 0xE56 JUMPI DUP1 PUSH4 0x40C10F19 EQ PUSH2 0xD61 JUMPI DUP1 PUSH4 0x5556DB65 EQ PUSH2 0xD44 JUMPI DUP1 PUSH4 0x598D7D0F EQ PUSH2 0xD1F JUMPI DUP1 PUSH4 0x5C975ABB EQ PUSH2 0xCFA JUMPI DUP1 PUSH4 0x60F71A0E EQ PUSH2 0xC7C JUMPI DUP1 PUSH4 0x61D027B3 EQ PUSH2 0xC39 JUMPI DUP1 PUSH4 0x6641EA08 EQ PUSH2 0xC1D JUMPI DUP1 PUSH4 0x6DDD1713 EQ PUSH2 0xBFB JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0xBC4 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0xB5E JUMPI DUP1 PUSH4 0x8456CB59 EQ PUSH2 0xAD3 JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0xAAD JUMPI DUP1 PUSH4 0x8E4FAB80 EQ PUSH2 0xA8B JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x987 JUMPI DUP1 PUSH4 0x9D0014B1 EQ PUSH2 0x8C9 JUMPI DUP1 PUSH4 0xA51F0C32 EQ PUSH2 0x8AD JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x87C JUMPI DUP1 PUSH4 0xA9AB232B EQ PUSH2 0x5F9 JUMPI DUP1 PUSH4 0xC0D78655 EQ PUSH2 0x47D JUMPI DUP1 PUSH4 0xDBDFCA6C EQ PUSH2 0x458 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x40A JUMPI DUP1 PUSH4 0xE01AF92C EQ PUSH2 0x3A2 JUMPI DUP1 PUSH4 0xEAE4C19F EQ PUSH2 0x367 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2BA JUMPI DUP1 PUSH4 0xF887EA40 EQ PUSH2 0x293 JUMPI PUSH4 0xFCA3B5AA SUB PUSH2 0xF JUMPI CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x213 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x21B PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x8 SLOAD AND OR PUSH1 0x8 SSTORE PUSH32 0x726B590EF91A8C76AD05BBE91A57EF84605276528F49CD47D787F558A4E755B6 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x4 DUP3 PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 DUP2 MSTORE REVERT JUMPDEST DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x2DC PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x2E4 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x33B JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP3 AND OR PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP4 DUP1 LOG3 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP3 PUSH32 0x1E4FBDF700000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH32 0x0 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x4 CALLDATALOAD DUP1 ISZERO ISZERO DUP1 SWAP2 SUB PUSH2 0x406 JUMPI PUSH1 0x20 PUSH32 0x436B6CF978C7B6998FCCE43DFE4D37E3A0DC2BB780144A2EB55D7138201E8A12 SWAP2 PUSH2 0x3ED PUSH2 0x149A JUMP JUMPDEST PUSH1 0xFF NOT PUSH1 0xC SLOAD AND PUSH1 0xFF DUP3 AND OR PUSH1 0xC SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 DUP1 RETURN JUMPDEST POP DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 PUSH2 0x42E PUSH2 0x13BA JUMP JUMPDEST SWAP3 DUP3 PUSH2 0x438 PUSH2 0x13D0 JUMP JUMPDEST SWAP5 AND DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE KECCAK256 SWAP2 AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH10 0xD3C21BCECCEDA1000000 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x49F PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x4A7 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND ADDRESS ISZERO PUSH2 0x5CD JUMPI DUP1 ISZERO PUSH2 0x5A1 JUMPI ADDRESS DUP4 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP4 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP3 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD DUP4 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x6 SLOAD AND OR PUSH1 0x6 SSTORE ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP3 KECCAK256 DUP2 PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH0 NOT SWAP1 SSTORE DUP1 PUSH1 0x40 MLOAD PUSH0 NOT DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 PUSH32 0x7AED1D3E8155A07CCF395E44EA3109A0E2D6C9B29BBBE9F142D9790596F4DC80 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP4 PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST PUSH1 0x24 DUP4 PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD ADDRESS CALLER SUB PUSH2 0x854 JUMPI PUSH1 0x40 MLOAD PUSH2 0x623 PUSH1 0x60 DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x2 DUP2 MSTORE PUSH1 0x20 DUP2 ADD SWAP1 PUSH1 0x40 CALLDATASIZE DUP4 CALLDATACOPY DUP1 MLOAD ISZERO PUSH2 0x7FE JUMPI ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND SWAP1 PUSH1 0x40 MLOAD PUSH32 0xAD5C464800000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 DUP2 PUSH1 0x4 DUP2 DUP7 GAS STATICCALL SWAP1 DUP2 ISZERO PUSH2 0x7CD JUMPI PUSH0 SWAP2 PUSH2 0x812 JUMPI JUMPDEST POP DUP2 MLOAD PUSH1 0x1 LT ISZERO PUSH2 0x7FE JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 DUP4 ADD SWAP2 AND SWAP1 MSTORE PUSH32 0x0 SWAP2 DUP3 BALANCE SWAP4 DUP2 EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI SWAP2 PUSH1 0x40 MLOAD SWAP3 DUP4 SWAP2 PUSH32 0x791AC94700000000000000000000000000000000000000000000000000000000 DUP4 MSTORE PUSH1 0xA4 DUP4 ADD SWAP1 DUP9 PUSH1 0x4 DUP6 ADD MSTORE PUSH0 PUSH1 0x24 DUP6 ADD MSTORE PUSH1 0xA0 PUSH1 0x44 DUP6 ADD MSTORE MLOAD DUP1 SWAP2 MSTORE PUSH1 0xC4 DUP4 ADD SWAP2 SWAP1 PUSH0 JUMPDEST DUP2 DUP2 LT PUSH2 0x7D8 JUMPI POP POP POP SWAP2 DUP2 PUSH0 DUP2 DUP2 SWAP6 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP10 AND PUSH1 0x64 DUP4 ADD MSTORE TIMESTAMP PUSH1 0x84 DUP4 ADD MSTORE SUB SWAP3 GAS CALL DUP1 ISZERO PUSH2 0x7CD JUMPI PUSH2 0x78C JUMPI JUMPDEST POP SWAP2 PUSH2 0x77E PUSH1 0x40 SWAP3 PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP5 BALANCE PUSH2 0x143E JUMP JUMPDEST DUP3 MLOAD SWAP2 DUP3 MSTORE PUSH1 0x20 DUP3 ADD MSTORE LOG1 DUP1 RETURN JUMPDEST PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP4 SWAP2 SWAP5 POP PUSH1 0x40 SWAP3 PUSH2 0x7C1 PUSH0 PUSH2 0x77E SWAP4 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 SWAP6 SWAP3 SWAP5 POP SWAP3 POP PUSH2 0x74E JUMP JUMPDEST PUSH1 0x40 MLOAD RETURNDATASIZE PUSH0 DUP3 RETURNDATACOPY RETURNDATASIZE SWAP1 REVERT JUMPDEST DUP3 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 MSTORE DUP7 SWAP5 POP PUSH1 0x20 SWAP4 DUP5 ADD SWAP4 SWAP1 SWAP3 ADD SWAP2 PUSH1 0x1 ADD PUSH2 0x71A JUMP JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 RETURNDATASIZE PUSH1 0x20 GT PUSH2 0x84C JUMPI JUMPDEST DUP2 PUSH2 0x82D PUSH1 0x20 SWAP4 DUP4 PUSH2 0x13E6 JUMP JUMPDEST DUP2 ADD SUB SLT PUSH2 0x7FA JUMPI MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 SUB PUSH2 0x7FA JUMPI PUSH0 PUSH2 0x685 JUMP JUMPDEST RETURNDATASIZE SWAP2 POP PUSH2 0x820 JUMP JUMPDEST PUSH32 0x14D4A4E800000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x8A2 PUSH2 0x898 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER PUSH2 0x14DA JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x7E0 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0x8E5 PUSH2 0x149A JUMP JUMPDEST PUSH10 0xD3C21BCECCEDA1000000 DUP2 GT PUSH2 0x95F JUMPI PUSH9 0x56BC75E2D63100000 DUP2 LT PUSH2 0x937 JUMPI PUSH1 0x20 DUP2 PUSH32 0x18FF2FC8464635E4F668567019152095047E34D7A2AB4B97661BA4DC7FD06476 SWAP3 PUSH1 0xB SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x6255FD8D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x18DCC43E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x4 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0xA81 JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x9EB JUMPI JUMPDEST PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP2 DUP3 SWAP2 DUP3 PUSH2 0x1390 JUMP JUMPDEST SUB SWAP1 RETURN JUMPDEST SWAP2 SWAP1 POP PUSH1 0x4 PUSH0 MSTORE PUSH32 0x8A35ACFBC15FF81A39AE7D344FD709F28E8600B4AA8C65C6B64BFE7FE36BD19B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0xA2F JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0xA17 JUMP JUMPDEST PUSH1 0xFF NOT AND PUSH1 0x20 DUP1 DUP7 ADD SWAP2 SWAP1 SWAP2 MSTORE SWAP2 ISZERO ISZERO PUSH1 0x5 SHL DUP5 ADD SWAP1 SWAP2 ADD SWAP2 POP PUSH2 0x9DB SWAP1 POP PUSH2 0x9CB JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x9AE JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH2 0xAA5 PUSH2 0x144B JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xAEB PUSH2 0x149A JUMP JUMPDEST PUSH2 0xAF3 PUSH2 0x1531 JUMP JUMPDEST PUSH21 0x10000000000000000000000000000000000000000 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x5 SLOAD AND OR PUSH1 0x5 SSTORE PUSH32 0x62E78CEA01BEE320CD4E420270B5EA74000D11B0C9F74754EBDBFC544B05A258 PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xB76 PUSH2 0x149A JUMP JUMPDEST PUSH0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP2 AND PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP3 DUP1 LOG3 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0xBE5 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0xC SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x12C DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0x0 AND DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0xC98 PUSH2 0x149A JUMP JUMPDEST PUSH2 0x3E8 DUP2 GT PUSH2 0xCD2 JUMPI PUSH1 0x20 DUP2 PUSH32 0x4ADFA0B8D8D98F0BC07D5FB9EB0CA7AE9C93EEDAABB7A8FA8AF77E270AB70812 SWAP3 PUSH1 0xA SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0xAF1EE13400000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x4A723DC6B40B8A9A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x7 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xD7A PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND CALLER SUB PUSH2 0xE2E JUMPI PUSH2 0xD97 PUSH2 0x1531 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH11 0x4A723DC6B40B8A9A000000 PUSH2 0xDB0 DUP4 DUP4 PUSH2 0x141D JUMP JUMPDEST GT PUSH2 0xE06 JUMPI DUP2 PUSH2 0xDBF SWAP2 PUSH2 0x141D JUMP JUMPDEST PUSH1 0x7 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1A SWAP2 PUSH2 0x1568 JUMP JUMPDEST PUSH32 0xEC442F0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xF532908700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x9CDC2ED500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xE6E PUSH2 0x149A JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH1 0xFF DUP2 PUSH1 0xA0 SHR AND ISZERO PUSH2 0xECE JUMPI PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x5 SSTORE PUSH32 0x5DB9EE0A495BF2E6FF9C91A7834C1BA4FDD244A5E8AA4E537BD38AEAE4B073AA PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x8DFC202B00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xA SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x84595161401484A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH9 0x56BC75E2D63100000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x52B7D2DCC80CD2E4000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x12 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x3E8 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x60 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xFD0 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0xFD8 PUSH2 0x13D0 JUMP JUMPDEST PUSH1 0x44 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP3 DUP4 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH0 NOT DUP2 LT PUSH2 0x101B JUMPI JUMPDEST POP PUSH2 0x8A2 SWAP4 POP PUSH2 0x14DA JUMP JUMPDEST DUP4 DUP2 LT PUSH2 0x10B3 JUMPI DUP5 ISZERO PUSH2 0x1087 JUMPI CALLER ISZERO PUSH2 0x105B JUMPI PUSH2 0x8A2 SWAP5 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP4 PUSH1 0x40 PUSH0 KECCAK256 SWAP2 SUB SWAP1 SSTORE DUP5 PUSH2 0x1010 JUMP JUMPDEST PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST DUP4 SWAP1 PUSH32 0xFB8F41B200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x1100 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 DUP2 ISZERO ISZERO DUP1 SWAP3 SUB PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 PUSH2 0x111F PUSH2 0x149A JUMP JUMPDEST AND SWAP1 DUP2 ISZERO PUSH2 0x116C JUMPI PUSH1 0x20 PUSH32 0x8AF52CA6865DD040A1247F4D247E92DB436B658ABB69ED82E9EFA8A7DE0602E9 SWAP2 DUP4 PUSH0 MSTORE PUSH1 0x9 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0xFF NOT DUP2 SLOAD AND PUSH1 0xFF DUP4 AND OR SWAP1 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG2 STOP JUMPDEST PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH10 0x97418193B6F2E0B6DB6 PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x2 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x11F7 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x122C PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER ISZERO PUSH2 0x1087 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 ISZERO PUSH2 0x105B JUMPI CALLER PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP3 PUSH0 MSTORE PUSH1 0x20 MSTORE DUP1 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 CALLER SWAP3 LOG3 PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x3 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0x136C JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x130E JUMPI PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH1 0x3 PUSH0 MSTORE PUSH32 0xC2575A0E9E593C00F959F8C92F12DB2869C3395A3B0502D05E2516446F71F85B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0x1352 JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0x133A JUMP JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x12E2 JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 SWAP1 PUSH1 0xB SLOAD DUP2 MSTORE RETURN JUMPDEST PUSH1 0x1F NOT PUSH1 0x1F PUSH1 0x20 PUSH1 0x40 SWAP5 DUP2 DUP6 MSTORE DUP1 MLOAD SWAP2 DUP3 SWAP2 DUP3 DUP3 DUP9 ADD MSTORE ADD DUP7 DUP7 ADD MCOPY PUSH0 DUP6 DUP3 DUP7 ADD ADD MSTORE ADD AND ADD ADD SWAP1 JUMP JUMPDEST PUSH1 0x4 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST SWAP1 PUSH1 0x1F PUSH1 0x1F NOT SWAP2 ADD AND DUP2 ADD SWAP1 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR PUSH2 0x1409 JUMPI PUSH1 0x40 MSTORE JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 ADD DUP1 SWAP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 SUB SWAP2 DUP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH2 0x7E0 PUSH2 0x12C PUSH2 0x147B PUSH32 0x0 TIMESTAMP PUSH2 0x143E JUMP JUMPDEST DIV DIV PUSH1 0x14 DUP2 GT PUSH2 0x1495 JUMPI PUSH10 0x97418193B6F2E0B6DB6 SWAP1 SHR SWAP1 JUMP JUMPDEST POP PUSH0 SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND CALLER SUB PUSH2 0x14AE JUMPI JUMP JUMPDEST PUSH32 0x118CDAA700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND ISZERO PUSH2 0x1505 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1503 SWAP3 PUSH2 0x16DF JUMP JUMPDEST JUMP JUMPDEST PUSH32 0x96C6FD1E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH2 0x1540 JUMPI JUMP JUMPDEST PUSH32 0xD93C066500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST DUP2 ISZERO SWAP2 SWAP1 PUSH0 DUP4 ISZERO DUP1 PUSH2 0x16D8 JUMPI JUMPDEST DUP1 PUSH2 0x16C6 JUMPI JUMPDEST PUSH2 0x158A JUMPI JUMPDEST PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH0 DUP1 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH32 0xEC8156718A8372B1DB44BB411437D0870F3E3790D4A08526D024CE1B0B668F6B SLOAD PUSH1 0xFF AND ISZERO DUP1 PUSH2 0x16A6 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI POP PUSH1 0xA SLOAD SWAP3 DUP4 DUP4 MUL SWAP4 DUP4 DUP6 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x15F3 PUSH2 0x15EB PUSH2 0x2710 PUSH2 0x15F9 SWAP6 DIV DUP1 SWAP5 PUSH2 0x143E JUMP JUMPDEST SWAP3 ADDRESS PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0xFF DUP2 AND DUP1 PUSH2 0x1698 JUMPI JUMPDEST DUP1 PUSH2 0x1681 JUMPI JUMPDEST PUSH2 0x1613 JUMPI POP JUMP JUMPDEST PUSH2 0xFF00 NOT AND PUSH2 0x100 OR PUSH1 0xC SSTORE PUSH1 0xB SLOAD ADDRESS EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD SWAP1 PUSH32 0xA9AB232B00000000000000000000000000000000000000000000000000000000 DUP3 MSTORE PUSH1 0x4 DUP3 ADD MSTORE PUSH0 DUP2 PUSH1 0x24 DUP2 DUP4 ADDRESS GAS CALL PUSH2 0x1671 JUMPI JUMPDEST POP PUSH2 0xFF00 NOT PUSH1 0xC SLOAD AND PUSH1 0xC SSTORE JUMP JUMPDEST PUSH0 PUSH2 0x167B SWAP2 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 PUSH2 0x1663 JUMP JUMPDEST POP ADDRESS PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0xB SLOAD GT ISZERO PUSH2 0x160C JUMP JUMPDEST POP PUSH1 0xFF DUP2 PUSH1 0x8 SHR AND ISZERO PUSH2 0x1606 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x15BE JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x157B JUMP JUMPDEST POP PUSH0 PUSH2 0x1575 JUMP JUMPDEST SWAP2 SWAP1 DUP2 ISZERO SWAP3 DUP4 ISZERO DUP1 PUSH2 0x178B JUMPI JUMPDEST DUP1 PUSH2 0x1779 JUMPI JUMPDEST PUSH2 0x1700 JUMPI PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO DUP1 PUSH2 0x1759 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI PUSH1 0xA SLOAD SWAP4 DUP5 DUP5 MUL SWAP5 DUP5 DUP7 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x1754 PUSH2 0x174C PUSH2 0x2710 PUSH2 0x15F9 SWAP7 DIV DUP1 SWAP6 PUSH2 0x143E JUMP JUMPDEST SWAP4 ADDRESS DUP4 PUSH2 0x179D JUMP JUMPDEST PUSH2 0x179D JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x1720 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x16F2 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO ISZERO PUSH2 0x16EC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 PUSH2 0x1816 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 PUSH2 0x17E4 DUP7 PUSH1 0x2 SLOAD PUSH2 0x141D JUMP JUMPDEST PUSH1 0x2 SSTORE JUMPDEST AND SWAP4 DUP5 PUSH2 0x1801 JUMPI DUP1 PUSH1 0x2 SLOAD SUB PUSH1 0x2 SSTORE JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG3 JUMP JUMPDEST DUP5 PUSH0 MSTORE PUSH0 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 DUP2 SLOAD ADD SWAP1 SSTORE PUSH2 0x17F8 JUMP JUMPDEST DUP2 PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD DUP4 DUP2 LT PUSH2 0x1868 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 DUP6 PUSH1 0x20 SWAP4 DUP7 PUSH0 MSTORE PUSH0 DUP6 MSTORE SUB PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH2 0x17E8 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH32 0xE450D38C00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 SWAP13 PUSH11 0x86FB6287BE5FEAA975A12A PUSH26 0xEFA4E04B8A2AA7809ADCDACD04DC6A3328D164736F6C63430008 0x21 STOP CALLER ",
      "sourceMap": "985:7949:21:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;985:7949:21;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;985:7949:21;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;1671:17:2;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;1671:17:2;985:7949:21;;3529:10;1273:26:0;1269:95;;3004:6;985:7949:21;;3529:10;-1:-1:-1;;;;;;985:7949:21;;;;;;;-1:-1:-1;;;;;985:7949:21;3052:40:0;-1:-1:-1;;3052:40:0;2171:3:21;985:7949;;2369:12;;985:7949;2681:4;985:7949;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;;3555:23;;3551:49;;-1:-1:-1;;;;;985:7949:21;;3614:21;;3610:47;;3667:20;;3697:36;985:7949;;-1:-1:-1;;;;;;985:7949:21;;;;;3756:15;3743:28;;1140:16;-1:-1:-1;6137:21:2;985:7949:21;;;;;;;;;;;6987:25:2;985:7949:21;;;6137:21:2;985:7949:21;6551:16:2;985:7949:21;;;6714:21:2;985:7949:21;;6714:21:2;985:7949:21;6547:425:2;985:7949:21;;;;;6987:25:2;-1:-1:-1;1140:16:21;3938:11;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;3529:10;-1:-1:-1;1140:16:21;3938:11;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;4037:4;-1:-1:-1;1140:16:21;3938:11;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;4037:4;9717:19:2;9713:89;;4037:4:21;-1:-1:-1;1140:16:21;985:7949;;1140:16;985:7949;-1:-1:-1;1140:16:21;;-1:-1:-1;1140:16:21;985:7949;1140:16;985:7949;-1:-1:-1;1140:16:21;985:7949;;;;;;;;;;9989:31:2;985:7949:21;4037:4;9989:31:2;;3004:6:0;985:7949:21;;;3667:20;985:7949;;1939:61:13;;-1:-1:-1;;;;985:7949:21;-1:-1:-1;;;985:7949:21;3004:6:0;985:7949:21;;;3529:10;985:7949;;2427:20:13;;985:7949:21;;2427:20:13;985:7949:21;;;;;;;;3743:28;985:7949;;;;;;;;;;3667:20;985:7949;;;;;;;;;;;1939:61:13;1974:15;;;-1:-1:-1;1974:15:13;1671:17:2;-1:-1:-1;1974:15:13;9713:89:2;9759:32;;;-1:-1:-1;9759:32:2;-1:-1:-1;1671:17:2;985:7949:21;;-1:-1:-1;9759:32:2;6547:425;1140:16:21;-1:-1:-1;1140:16:21;-1:-1:-1;1140:16:21;;;-1:-1:-1;1140:16:21;985:7949;;;;;;6547:425:2;;985:7949:21;;;;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;3610:47;3587:13;;;-1:-1:-1;3644:13:21;1671:17:2;-1:-1:-1;3644:13:21;1269:95:0;1322:31;;;-1:-1:-1;1322:31:0;-1:-1:-1;1671:17:2;985:7949:21;;-1:-1:-1;1322:31:0;985:7949:21;;;;-1:-1:-1;985:7949:21;;;;;;;;;;1671:17:2;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;1671:17:2;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1671:17:2;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;-1:-1:-1;;;985:7949:21;;;;;;-1:-1:-1;985:7949:21;;1671:17:2;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;-1:-1:-1;985:7949:21;;1671:17:2;985:7949:21;;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;-1:-1:-1;;;985:7949:21;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;-1:-1:-1;;985:7949:21;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;985:7949:21;;;;;;:::o"
    },
    "deployedBytecode": {
      "functionDebugData": {
        "abi_decode_address": {
          "entryPoint": 5050,
          "id": null,
          "parameterSlots": 0,
          "returnSlots": 1
        },
        "abi_decode_t_address": {
          "entryPoint": 5072,
          "id": null,
          "parameterSlots": 0,
          "returnSlots": 1
        },
        "abi_encode_string": {
          "entryPoint": 5008,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "checked_add_uint256": {
          "entryPoint": 5149,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "checked_sub_uint256": {
          "entryPoint": 5182,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "finalize_allocation": {
          "entryPoint": 5094,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "fun__update": {
          "entryPoint": 5855,
          "id": 7989,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "fun_checkOwner": {
          "entryPoint": 5274,
          "id": 84,
          "parameterSlots": 0,
          "returnSlots": 0
        },
        "fun_currentRewardPerRound": {
          "entryPoint": 5195,
          "id": 7872,
          "parameterSlots": 0,
          "returnSlots": 1
        },
        "fun_requireNotPaused": {
          "entryPoint": 5425,
          "id": 2273,
          "parameterSlots": 0,
          "returnSlots": 0
        },
        "fun_transfer": {
          "entryPoint": 5338,
          "id": 529,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "fun_update": {
          "entryPoint": 6045,
          "id": 606,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "fun_update_10781": {
          "entryPoint": 5480,
          "id": 7989,
          "parameterSlots": 2,
          "returnSlots": 0
        }
      },
      "generatedSources": [],
      "immutableReferences": {
        "7413": [
          {
            "length": 32,
            "start": 895
          },
          {
            "length": 32,
            "start": 5206
          }
        ],
        "7415": [
          {
            "length": 32,
            "start": 1698
          },
          {
            "length": 32,
            "start": 3160
          }
        ]
      },
      "linkReferences": {},
      "object": "608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c9081630445b667146113765750806306fdde03146112bb5780630754617214611295578063095ea7b31461121357806316c2be6b146111d657806318160ddd146111b95780631bb9b0a3146111945780631dc61040146110e757806323b872dd14610fb75780632c597de914610f9b578063313ce56714610f8057806332cb6b0c14610f5b5780633352eb8c14610f385780633c96b08f14610f135780633eacd2f814610ef65780633f4ba83a14610e5657806340c10f1914610d615780635556db6514610d44578063598d7d0f14610d1f5780635c975abb14610cfa57806360f71a0e14610c7c57806361d027b314610c395780636641ea0814610c1d5780636ddd171314610bfb57806370a0823114610bc4578063715018a614610b5e5780638456cb5914610ad35780638da5cb5b14610aad5780638e4fab8014610a8b57806395d89b41146109875780639d0014b1146108c9578063a51f0c32146108ad578063a9059cbb1461087c578063a9ab232b146105f9578063c0d786551461047d578063dbdfca6c14610458578063dd62ed3e1461040a578063e01af92c146103a2578063eae4c19f14610367578063f2fde38b146102ba578063f887ea40146102935763fca3b5aa0361000f5734610290576020600319360112610290576001600160a01b036102136113ba565b61021b61149a565b168015610268578073ffffffffffffffffffffffffffffffffffffffff1960085416176008557f726b590ef91a8c76ad05bbe91a57ef84605276528f49cd47d787f558a4e755b68280a280f35b6004827fd92e233d000000000000000000000000000000000000000000000000000000008152fd5b80fd5b503461029057806003193601126102905760206001600160a01b0360065416604051908152f35b5034610290576020600319360112610290576001600160a01b036102dc6113ba565b6102e461149a565b16801561033b576001600160a01b036005548273ffffffffffffffffffffffffffffffffffffffff19821617600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b6024827f1e4fbdf700000000000000000000000000000000000000000000000000000000815280600452fd5b503461029057806003193601126102905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b5034610290576020600319360112610290576004358015158091036104065760207f436b6cf978c7b6998fcce43dfe4d37e3a0dc2bb780144a2eb55d7138201e8a12916103ed61149a565b60ff19600c541660ff821617600c55604051908152a180f35b5080fd5b5034610290576040600319360112610290576001600160a01b03604061042e6113ba565b92826104386113d0565b9416815260016020522091165f52602052602060405f2054604051908152f35b5034610290578060031936011261029057602060405169d3c21bcecceda10000008152f35b5034610290576020600319360112610290576001600160a01b0361049f6113ba565b6104a761149a565b168015610268576001600160a01b036006541630156105cd5780156105a1573083526001602052604083206001600160a01b0382165f526020528260405f20556040518381527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a38073ffffffffffffffffffffffffffffffffffffffff196006541617600655308252600160205260408220815f5260205260405f205f199055806040515f1981527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203092a37f7aed1d3e8155a07ccf395e44ea3109a0e2d6c9b29bbbe9f142d9790596f4dc808280a280f35b6024837f94280d6200000000000000000000000000000000000000000000000000000000815280600452fd5b6024837fe602df0500000000000000000000000000000000000000000000000000000000815280600452fd5b50346107fa5760206003193601126107fa57600435303303610854576040516106236060826113e6565b60028152602081019060403683378051156107fe573082526001600160a01b0360065416906040517fad5c4648000000000000000000000000000000000000000000000000000000008152602081600481865afa9081156107cd575f91610812575b508151600110156107fe576001600160a01b0360408301911690527f000000000000000000000000000000000000000000000000000000000000000091823193813b156107fa57916040519283917f791ac94700000000000000000000000000000000000000000000000000000000835260a48301908860048501525f602485015260a060448501525180915260c4830191905f5b8181106107d85750505091815f8181956001600160a01b038916606483015242608483015203925af180156107cd5761078c575b509161077e6040927fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf943161143e565b82519182526020820152a180f35b7fe033f4ee00e9ef0d0e3de2d027fba8dafe3a3d8af9ee6a4f30a0122fc1a190cf939194506040926107c15f61077e936113e6565b5f95929450925061074e565b6040513d5f823e3d90fd5b82516001600160a01b031684528694506020938401939092019160010161071a565b5f80fd5b634e487b7160e01b5f52603260045260245ffd5b90506020813d60201161084c575b8161082d602093836113e6565b810103126107fa57516001600160a01b03811681036107fa575f610685565b3d9150610820565b7f14d4a4e8000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa5760406003193601126107fa576108a26108986113ba565b60243590336114da565b602060405160018152f35b346107fa575f6003193601126107fa5760206040516107e08152f35b346107fa5760206003193601126107fa576004356108e561149a565b69d3c21bcecceda1000000811161095f5768056bc75e2d631000008110610937576020817f18ff2fc8464635e4f668567019152095047e34d7a2ab4b97661ba4dc7fd0647692600b55604051908152a1005b7f6255fd8d000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f18dcc43e000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576040515f6004548060011c90600181168015610a81575b602083108114610a6d57828552908115610a4957506001146109eb575b6109e7836109db818503826113e6565b60405191829182611390565b0390f35b91905060045f527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b915f905b808210610a2f575090915081016020016109db6109cb565b919260018160209254838588010152019101909291610a17565b60ff191660208086019190915291151560051b840190910191506109db90506109cb565b634e487b7160e01b5f52602260045260245ffd5b91607f16916109ae565b346107fa575f6003193601126107fa576020610aa561144b565b604051908152f35b346107fa575f6003193601126107fa5760206001600160a01b0360055416604051908152f35b346107fa575f6003193601126107fa57610aeb61149a565b610af3611531565b740100000000000000000000000000000000000000007fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff60055416176005557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586020604051338152a1005b346107fa575f6003193601126107fa57610b7661149a565b5f6001600160a01b0360055473ffffffffffffffffffffffffffffffffffffffff198116600555167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b346107fa5760206003193601126107fa576001600160a01b03610be56113ba565b165f525f602052602060405f2054604051908152f35b346107fa575f6003193601126107fa57602060ff600c54166040519015158152f35b346107fa575f6003193601126107fa57602060405161012c8152f35b346107fa575f6003193601126107fa5760206040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b346107fa5760206003193601126107fa57600435610c9861149a565b6103e88111610cd2576020817f4adfa0b8d8d98f0bc07d5fb9eb0ca7ae9c93eedaabb7a8fa8af77e270ab7081292600a55604051908152a1005b7faf1ee134000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602060ff60055460a01c166040519015158152f35b346107fa575f6003193601126107fa5760206040516a4a723dc6b40b8a9a0000008152f35b346107fa575f6003193601126107fa576020600754604051908152f35b346107fa5760406003193601126107fa57610d7a6113ba565b6024356001600160a01b03600854163303610e2e57610d97611531565b6007546a4a723dc6b40b8a9a000000610db0838361141d565b11610e065781610dbf9161141d565b6007556001600160a01b03821615610dda5761001a91611568565b7fec442f05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7ff5329087000000000000000000000000000000000000000000000000000000005f5260045ffd5b7f9cdc2ed5000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57610e6e61149a565b60055460ff8160a01c1615610ece577fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff166005557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6020604051338152a1005b7f8dfc202b000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa576020600a54604051908152f35b346107fa575f6003193601126107fa5760206040516a084595161401484a0000008152f35b346107fa575f6003193601126107fa57602060405168056bc75e2d631000008152f35b346107fa575f6003193601126107fa5760206040516a52b7d2dcc80cd2e40000008152f35b346107fa575f6003193601126107fa57602060405160128152f35b346107fa575f6003193601126107fa5760206040516103e88152f35b346107fa5760606003193601126107fa57610fd06113ba565b610fd86113d0565b604435906001600160a01b03831692835f52600160205260405f206001600160a01b0333165f5260205260405f20545f19811061101b575b506108a293506114da565b8381106110b357841561108757331561105b576108a2945f52600160205260405f206001600160a01b0333165f526020528360405f209103905584611010565b7f94280d62000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b7fe602df05000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b83907ffb8f41b2000000000000000000000000000000000000000000000000000000005f523360045260245260445260645ffd5b346107fa5760406003193601126107fa576111006113ba565b602435908115158092036107fa576001600160a01b039061111f61149a565b1690811561116c5760207f8af52ca6865dd040a1247f4d247e92db436b658abb69ed82e9efa8a7de0602e991835f526009825260405f2060ff1981541660ff8316179055604051908152a2005b7fd92e233d000000000000000000000000000000000000000000000000000000005f5260045ffd5b346107fa575f6003193601126107fa57602069097418193b6f2e0b6db6604051908152f35b346107fa575f6003193601126107fa576020600254604051908152f35b346107fa5760206003193601126107fa576001600160a01b036111f76113ba565b165f526009602052602060ff60405f2054166040519015158152f35b346107fa5760406003193601126107fa5761122c6113ba565b602435903315611087576001600160a01b031690811561105b57335f52600160205260405f20825f526020528060405f20556040519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3602060405160018152f35b346107fa575f6003193601126107fa5760206001600160a01b0360085416604051908152f35b346107fa575f6003193601126107fa576040515f6003548060011c9060018116801561136c575b602083108114610a6d57828552908115610a49575060011461130e576109e7836109db818503826113e6565b91905060035f527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b915f905b808210611352575090915081016020016109db6109cb565b91926001816020925483858801015201910190929161133a565b91607f16916112e2565b346107fa575f6003193601126107fa57602090600b548152f35b601f19601f602060409481855280519182918282880152018686015e5f8582860101520116010190565b600435906001600160a01b03821682036107fa57565b602435906001600160a01b03821682036107fa57565b90601f601f19910116810190811067ffffffffffffffff82111761140957604052565b634e487b7160e01b5f52604160045260245ffd5b9190820180921161142a57565b634e487b7160e01b5f52601160045260245ffd5b9190820391821161142a57565b6107e061012c61147b7f00000000000000000000000000000000000000000000000000000000000000004261143e565b0404601481116114955769097418193b6f2e0b6db6901c90565b505f90565b6001600160a01b036005541633036114ae57565b7f118cdaa7000000000000000000000000000000000000000000000000000000005f523360045260245ffd5b91906001600160a01b03831615611505576001600160a01b03811615610dda57611503926116df565b565b7f96c6fd1e000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b60ff60055460a01c1661154057565b7fd93c0665000000000000000000000000000000000000000000000000000000005f5260045ffd5b811591905f8315806116d8575b806116c6575b61158a575b611503935061179d565b5f805260096020527fec8156718a8372b1db44bb411437d0870f3e3790d4a08526d024ce1b0b668f6b5460ff1615806116a6575b156115805750600a54928383029383850414171561142a576115f36115eb6127106115f99504809461143e565b92305f61179d565b5f61179d565b600c5460ff811680611698575b80611681575b6116135750565b61ff00191661010017600c55600b54303b156107fa57604051907fa9ab232b00000000000000000000000000000000000000000000000000000000825260048201525f8160248183305af1611671575b5061ff0019600c5416600c55565b5f61167b916113e6565b5f611663565b50305f525f60205260405f2054600b54111561160c565b5060ff8160081c1615611606565b506001600160a01b0382165f52600960205260ff60405f205416156115be565b506001600160a01b038216151561157b565b505f611575565b919081159283158061178b575b80611779575b61170057611503935061179d565b6001600160a01b0381165f52600960205260ff60405f2054161580611759575b1561158057600a54938484029484860414171561142a5761175461174c6127106115f99604809561143e565b93308361179d565b61179d565b506001600160a01b0382165f52600960205260ff60405f20541615611720565b506001600160a01b03821615156116f2565b506001600160a01b03811615156116ec565b6001600160a01b031690816118165760206001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926117e48660025461141d565b6002555b1693846118015780600254036002555b604051908152a3565b845f525f825260405f208181540190556117f8565b815f525f60205260405f2054838110611868576001600160a01b037fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9285602093865f525f85520360405f20556117e8565b9190507fe450d38c000000000000000000000000000000000000000000000000000000005f5260045260245260445260645ffdfea26469706673582212209c6a86fb6287be5feaa975a12a79efa4e04b8a2aa7809adcdacd04dc6a3328d164736f6c63430008210033",
      "opcodes": "PUSH1 0x80 DUP1 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT ISZERO PUSH2 0x1C JUMPI JUMPDEST POP CALLDATASIZE ISZERO PUSH2 0x1A JUMPI PUSH0 DUP1 REVERT JUMPDEST STOP JUMPDEST PUSH0 SWAP1 PUSH0 CALLDATALOAD PUSH1 0xE0 SHR SWAP1 DUP2 PUSH4 0x445B667 EQ PUSH2 0x1376 JUMPI POP DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x12BB JUMPI DUP1 PUSH4 0x7546172 EQ PUSH2 0x1295 JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x1213 JUMPI DUP1 PUSH4 0x16C2BE6B EQ PUSH2 0x11D6 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x11B9 JUMPI DUP1 PUSH4 0x1BB9B0A3 EQ PUSH2 0x1194 JUMPI DUP1 PUSH4 0x1DC61040 EQ PUSH2 0x10E7 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0xFB7 JUMPI DUP1 PUSH4 0x2C597DE9 EQ PUSH2 0xF9B JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0xF80 JUMPI DUP1 PUSH4 0x32CB6B0C EQ PUSH2 0xF5B JUMPI DUP1 PUSH4 0x3352EB8C EQ PUSH2 0xF38 JUMPI DUP1 PUSH4 0x3C96B08F EQ PUSH2 0xF13 JUMPI DUP1 PUSH4 0x3EACD2F8 EQ PUSH2 0xEF6 JUMPI DUP1 PUSH4 0x3F4BA83A EQ PUSH2 0xE56 JUMPI DUP1 PUSH4 0x40C10F19 EQ PUSH2 0xD61 JUMPI DUP1 PUSH4 0x5556DB65 EQ PUSH2 0xD44 JUMPI DUP1 PUSH4 0x598D7D0F EQ PUSH2 0xD1F JUMPI DUP1 PUSH4 0x5C975ABB EQ PUSH2 0xCFA JUMPI DUP1 PUSH4 0x60F71A0E EQ PUSH2 0xC7C JUMPI DUP1 PUSH4 0x61D027B3 EQ PUSH2 0xC39 JUMPI DUP1 PUSH4 0x6641EA08 EQ PUSH2 0xC1D JUMPI DUP1 PUSH4 0x6DDD1713 EQ PUSH2 0xBFB JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0xBC4 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0xB5E JUMPI DUP1 PUSH4 0x8456CB59 EQ PUSH2 0xAD3 JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0xAAD JUMPI DUP1 PUSH4 0x8E4FAB80 EQ PUSH2 0xA8B JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x987 JUMPI DUP1 PUSH4 0x9D0014B1 EQ PUSH2 0x8C9 JUMPI DUP1 PUSH4 0xA51F0C32 EQ PUSH2 0x8AD JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x87C JUMPI DUP1 PUSH4 0xA9AB232B EQ PUSH2 0x5F9 JUMPI DUP1 PUSH4 0xC0D78655 EQ PUSH2 0x47D JUMPI DUP1 PUSH4 0xDBDFCA6C EQ PUSH2 0x458 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x40A JUMPI DUP1 PUSH4 0xE01AF92C EQ PUSH2 0x3A2 JUMPI DUP1 PUSH4 0xEAE4C19F EQ PUSH2 0x367 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2BA JUMPI DUP1 PUSH4 0xF887EA40 EQ PUSH2 0x293 JUMPI PUSH4 0xFCA3B5AA SUB PUSH2 0xF JUMPI CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x213 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x21B PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x8 SLOAD AND OR PUSH1 0x8 SSTORE PUSH32 0x726B590EF91A8C76AD05BBE91A57EF84605276528F49CD47D787F558A4E755B6 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x4 DUP3 PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 DUP2 MSTORE REVERT JUMPDEST DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x2DC PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x2E4 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x33B JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP3 AND OR PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP4 DUP1 LOG3 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP3 PUSH32 0x1E4FBDF700000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH32 0x0 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x4 CALLDATALOAD DUP1 ISZERO ISZERO DUP1 SWAP2 SUB PUSH2 0x406 JUMPI PUSH1 0x20 PUSH32 0x436B6CF978C7B6998FCCE43DFE4D37E3A0DC2BB780144A2EB55D7138201E8A12 SWAP2 PUSH2 0x3ED PUSH2 0x149A JUMP JUMPDEST PUSH1 0xFF NOT PUSH1 0xC SLOAD AND PUSH1 0xFF DUP3 AND OR PUSH1 0xC SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 DUP1 RETURN JUMPDEST POP DUP1 REVERT JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 PUSH2 0x42E PUSH2 0x13BA JUMP JUMPDEST SWAP3 DUP3 PUSH2 0x438 PUSH2 0x13D0 JUMP JUMPDEST SWAP5 AND DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE KECCAK256 SWAP2 AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI DUP1 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH10 0xD3C21BCECCEDA1000000 DUP2 MSTORE RETURN JUMPDEST POP CALLVALUE PUSH2 0x290 JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x290 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x49F PUSH2 0x13BA JUMP JUMPDEST PUSH2 0x4A7 PUSH2 0x149A JUMP JUMPDEST AND DUP1 ISZERO PUSH2 0x268 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND ADDRESS ISZERO PUSH2 0x5CD JUMPI DUP1 ISZERO PUSH2 0x5A1 JUMPI ADDRESS DUP4 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP4 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP3 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD DUP4 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT PUSH1 0x6 SLOAD AND OR PUSH1 0x6 SSTORE ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP3 KECCAK256 DUP2 PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH0 NOT SWAP1 SSTORE DUP1 PUSH1 0x40 MLOAD PUSH0 NOT DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 ADDRESS SWAP3 LOG3 PUSH32 0x7AED1D3E8155A07CCF395E44EA3109A0E2D6C9B29BBBE9F142D9790596F4DC80 DUP3 DUP1 LOG2 DUP1 RETURN JUMPDEST PUSH1 0x24 DUP4 PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST PUSH1 0x24 DUP4 PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 DUP2 MSTORE DUP1 PUSH1 0x4 MSTORE REVERT JUMPDEST POP CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD ADDRESS CALLER SUB PUSH2 0x854 JUMPI PUSH1 0x40 MLOAD PUSH2 0x623 PUSH1 0x60 DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x2 DUP2 MSTORE PUSH1 0x20 DUP2 ADD SWAP1 PUSH1 0x40 CALLDATASIZE DUP4 CALLDATACOPY DUP1 MLOAD ISZERO PUSH2 0x7FE JUMPI ADDRESS DUP3 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x6 SLOAD AND SWAP1 PUSH1 0x40 MLOAD PUSH32 0xAD5C464800000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 DUP2 PUSH1 0x4 DUP2 DUP7 GAS STATICCALL SWAP1 DUP2 ISZERO PUSH2 0x7CD JUMPI PUSH0 SWAP2 PUSH2 0x812 JUMPI JUMPDEST POP DUP2 MLOAD PUSH1 0x1 LT ISZERO PUSH2 0x7FE JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x40 DUP4 ADD SWAP2 AND SWAP1 MSTORE PUSH32 0x0 SWAP2 DUP3 BALANCE SWAP4 DUP2 EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI SWAP2 PUSH1 0x40 MLOAD SWAP3 DUP4 SWAP2 PUSH32 0x791AC94700000000000000000000000000000000000000000000000000000000 DUP4 MSTORE PUSH1 0xA4 DUP4 ADD SWAP1 DUP9 PUSH1 0x4 DUP6 ADD MSTORE PUSH0 PUSH1 0x24 DUP6 ADD MSTORE PUSH1 0xA0 PUSH1 0x44 DUP6 ADD MSTORE MLOAD DUP1 SWAP2 MSTORE PUSH1 0xC4 DUP4 ADD SWAP2 SWAP1 PUSH0 JUMPDEST DUP2 DUP2 LT PUSH2 0x7D8 JUMPI POP POP POP SWAP2 DUP2 PUSH0 DUP2 DUP2 SWAP6 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP10 AND PUSH1 0x64 DUP4 ADD MSTORE TIMESTAMP PUSH1 0x84 DUP4 ADD MSTORE SUB SWAP3 GAS CALL DUP1 ISZERO PUSH2 0x7CD JUMPI PUSH2 0x78C JUMPI JUMPDEST POP SWAP2 PUSH2 0x77E PUSH1 0x40 SWAP3 PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP5 BALANCE PUSH2 0x143E JUMP JUMPDEST DUP3 MLOAD SWAP2 DUP3 MSTORE PUSH1 0x20 DUP3 ADD MSTORE LOG1 DUP1 RETURN JUMPDEST PUSH32 0xE033F4EE00E9EF0D0E3DE2D027FBA8DAFE3A3D8AF9EE6A4F30A0122FC1A190CF SWAP4 SWAP2 SWAP5 POP PUSH1 0x40 SWAP3 PUSH2 0x7C1 PUSH0 PUSH2 0x77E SWAP4 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 SWAP6 SWAP3 SWAP5 POP SWAP3 POP PUSH2 0x74E JUMP JUMPDEST PUSH1 0x40 MLOAD RETURNDATASIZE PUSH0 DUP3 RETURNDATACOPY RETURNDATASIZE SWAP1 REVERT JUMPDEST DUP3 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP5 MSTORE DUP7 SWAP5 POP PUSH1 0x20 SWAP4 DUP5 ADD SWAP4 SWAP1 SWAP3 ADD SWAP2 PUSH1 0x1 ADD PUSH2 0x71A JUMP JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 RETURNDATASIZE PUSH1 0x20 GT PUSH2 0x84C JUMPI JUMPDEST DUP2 PUSH2 0x82D PUSH1 0x20 SWAP4 DUP4 PUSH2 0x13E6 JUMP JUMPDEST DUP2 ADD SUB SLT PUSH2 0x7FA JUMPI MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 SUB PUSH2 0x7FA JUMPI PUSH0 PUSH2 0x685 JUMP JUMPDEST RETURNDATASIZE SWAP2 POP PUSH2 0x820 JUMP JUMPDEST PUSH32 0x14D4A4E800000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x8A2 PUSH2 0x898 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER PUSH2 0x14DA JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x7E0 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0x8E5 PUSH2 0x149A JUMP JUMPDEST PUSH10 0xD3C21BCECCEDA1000000 DUP2 GT PUSH2 0x95F JUMPI PUSH9 0x56BC75E2D63100000 DUP2 LT PUSH2 0x937 JUMPI PUSH1 0x20 DUP2 PUSH32 0x18FF2FC8464635E4F668567019152095047E34D7A2AB4B97661BA4DC7FD06476 SWAP3 PUSH1 0xB SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x6255FD8D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x18DCC43E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x4 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0xA81 JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x9EB JUMPI JUMPDEST PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP2 DUP3 SWAP2 DUP3 PUSH2 0x1390 JUMP JUMPDEST SUB SWAP1 RETURN JUMPDEST SWAP2 SWAP1 POP PUSH1 0x4 PUSH0 MSTORE PUSH32 0x8A35ACFBC15FF81A39AE7D344FD709F28E8600B4AA8C65C6B64BFE7FE36BD19B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0xA2F JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0xA17 JUMP JUMPDEST PUSH1 0xFF NOT AND PUSH1 0x20 DUP1 DUP7 ADD SWAP2 SWAP1 SWAP2 MSTORE SWAP2 ISZERO ISZERO PUSH1 0x5 SHL DUP5 ADD SWAP1 SWAP2 ADD SWAP2 POP PUSH2 0x9DB SWAP1 POP PUSH2 0x9CB JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x9AE JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH2 0xAA5 PUSH2 0x144B JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xAEB PUSH2 0x149A JUMP JUMPDEST PUSH2 0xAF3 PUSH2 0x1531 JUMP JUMPDEST PUSH21 0x10000000000000000000000000000000000000000 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PUSH1 0x5 SLOAD AND OR PUSH1 0x5 SSTORE PUSH32 0x62E78CEA01BEE320CD4E420270B5EA74000D11B0C9F74754EBDBFC544B05A258 PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xB76 PUSH2 0x149A JUMP JUMPDEST PUSH0 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP2 AND PUSH1 0x5 SSTORE AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 DUP3 DUP1 LOG3 STOP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0xBE5 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0xC SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x12C DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0x0 AND DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x4 CALLDATALOAD PUSH2 0xC98 PUSH2 0x149A JUMP JUMPDEST PUSH2 0x3E8 DUP2 GT PUSH2 0xCD2 JUMPI PUSH1 0x20 DUP2 PUSH32 0x4ADFA0B8D8D98F0BC07D5FB9EB0CA7AE9C93EEDAABB7A8FA8AF77E270AB70812 SWAP3 PUSH1 0xA SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0xAF1EE13400000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x4A723DC6B40B8A9A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x7 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xD7A PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND CALLER SUB PUSH2 0xE2E JUMPI PUSH2 0xD97 PUSH2 0x1531 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH11 0x4A723DC6B40B8A9A000000 PUSH2 0xDB0 DUP4 DUP4 PUSH2 0x141D JUMP JUMPDEST GT PUSH2 0xE06 JUMPI DUP2 PUSH2 0xDBF SWAP2 PUSH2 0x141D JUMP JUMPDEST PUSH1 0x7 SSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1A SWAP2 PUSH2 0x1568 JUMP JUMPDEST PUSH32 0xEC442F0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xF532908700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST PUSH32 0x9CDC2ED500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xE6E PUSH2 0x149A JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH1 0xFF DUP2 PUSH1 0xA0 SHR AND ISZERO PUSH2 0xECE JUMPI PUSH32 0xFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x5 SSTORE PUSH32 0x5DB9EE0A495BF2E6FF9C91A7834C1BA4FDD244A5E8AA4E537BD38AEAE4B073AA PUSH1 0x20 PUSH1 0x40 MLOAD CALLER DUP2 MSTORE LOG1 STOP JUMPDEST PUSH32 0x8DFC202B00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0xA SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x84595161401484A000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH9 0x56BC75E2D63100000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH11 0x52B7D2DCC80CD2E4000000 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x12 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x40 MLOAD PUSH2 0x3E8 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x60 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0xFD0 PUSH2 0x13BA JUMP JUMPDEST PUSH2 0xFD8 PUSH2 0x13D0 JUMP JUMPDEST PUSH1 0x44 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP3 DUP4 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH0 NOT DUP2 LT PUSH2 0x101B JUMPI JUMPDEST POP PUSH2 0x8A2 SWAP4 POP PUSH2 0x14DA JUMP JUMPDEST DUP4 DUP2 LT PUSH2 0x10B3 JUMPI DUP5 ISZERO PUSH2 0x1087 JUMPI CALLER ISZERO PUSH2 0x105B JUMPI PUSH2 0x8A2 SWAP5 PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB CALLER AND PUSH0 MSTORE PUSH1 0x20 MSTORE DUP4 PUSH1 0x40 PUSH0 KECCAK256 SWAP2 SUB SWAP1 SSTORE DUP5 PUSH2 0x1010 JUMP JUMPDEST PUSH32 0x94280D6200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH32 0xE602DF0500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST DUP4 SWAP1 PUSH32 0xFB8F41B200000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x1100 PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 DUP2 ISZERO ISZERO DUP1 SWAP3 SUB PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 PUSH2 0x111F PUSH2 0x149A JUMP JUMPDEST AND SWAP1 DUP2 ISZERO PUSH2 0x116C JUMPI PUSH1 0x20 PUSH32 0x8AF52CA6865DD040A1247F4D247E92DB436B658ABB69ED82E9EFA8A7DE0602E9 SWAP2 DUP4 PUSH0 MSTORE PUSH1 0x9 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 PUSH1 0xFF NOT DUP2 SLOAD AND PUSH1 0xFF DUP4 AND OR SWAP1 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG2 STOP JUMPDEST PUSH32 0xD92E233D00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH10 0x97418193B6F2E0B6DB6 PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x2 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH2 0x11F7 PUSH2 0x13BA JUMP JUMPDEST AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0x20 PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH1 0x40 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH2 0x122C PUSH2 0x13BA JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 CALLER ISZERO PUSH2 0x1087 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 ISZERO PUSH2 0x105B JUMPI CALLER PUSH0 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP3 PUSH0 MSTORE PUSH1 0x20 MSTORE DUP1 PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x20 CALLER SWAP3 LOG3 PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x8 SLOAD AND PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE RETURN JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD PUSH0 PUSH1 0x3 SLOAD DUP1 PUSH1 0x1 SHR SWAP1 PUSH1 0x1 DUP2 AND DUP1 ISZERO PUSH2 0x136C JUMPI JUMPDEST PUSH1 0x20 DUP4 LT DUP2 EQ PUSH2 0xA6D JUMPI DUP3 DUP6 MSTORE SWAP1 DUP2 ISZERO PUSH2 0xA49 JUMPI POP PUSH1 0x1 EQ PUSH2 0x130E JUMPI PUSH2 0x9E7 DUP4 PUSH2 0x9DB DUP2 DUP6 SUB DUP3 PUSH2 0x13E6 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH1 0x3 PUSH0 MSTORE PUSH32 0xC2575A0E9E593C00F959F8C92F12DB2869C3395A3B0502D05E2516446F71F85B SWAP2 PUSH0 SWAP1 JUMPDEST DUP1 DUP3 LT PUSH2 0x1352 JUMPI POP SWAP1 SWAP2 POP DUP2 ADD PUSH1 0x20 ADD PUSH2 0x9DB PUSH2 0x9CB JUMP JUMPDEST SWAP2 SWAP3 PUSH1 0x1 DUP2 PUSH1 0x20 SWAP3 SLOAD DUP4 DUP6 DUP9 ADD ADD MSTORE ADD SWAP2 ADD SWAP1 SWAP3 SWAP2 PUSH2 0x133A JUMP JUMPDEST SWAP2 PUSH1 0x7F AND SWAP2 PUSH2 0x12E2 JUMP JUMPDEST CALLVALUE PUSH2 0x7FA JUMPI PUSH0 PUSH1 0x3 NOT CALLDATASIZE ADD SLT PUSH2 0x7FA JUMPI PUSH1 0x20 SWAP1 PUSH1 0xB SLOAD DUP2 MSTORE RETURN JUMPDEST PUSH1 0x1F NOT PUSH1 0x1F PUSH1 0x20 PUSH1 0x40 SWAP5 DUP2 DUP6 MSTORE DUP1 MLOAD SWAP2 DUP3 SWAP2 DUP3 DUP3 DUP9 ADD MSTORE ADD DUP7 DUP7 ADD MCOPY PUSH0 DUP6 DUP3 DUP7 ADD ADD MSTORE ADD AND ADD ADD SWAP1 JUMP JUMPDEST PUSH1 0x4 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST PUSH1 0x24 CALLDATALOAD SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND DUP3 SUB PUSH2 0x7FA JUMPI JUMP JUMPDEST SWAP1 PUSH1 0x1F PUSH1 0x1F NOT SWAP2 ADD AND DUP2 ADD SWAP1 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR PUSH2 0x1409 JUMPI PUSH1 0x40 MSTORE JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 ADD DUP1 SWAP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 DUP3 SUB SWAP2 DUP3 GT PUSH2 0x142A JUMPI JUMP JUMPDEST PUSH2 0x7E0 PUSH2 0x12C PUSH2 0x147B PUSH32 0x0 TIMESTAMP PUSH2 0x143E JUMP JUMPDEST DIV DIV PUSH1 0x14 DUP2 GT PUSH2 0x1495 JUMPI PUSH10 0x97418193B6F2E0B6DB6 SWAP1 SHR SWAP1 JUMP JUMPDEST POP PUSH0 SWAP1 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH1 0x5 SLOAD AND CALLER SUB PUSH2 0x14AE JUMPI JUMP JUMPDEST PUSH32 0x118CDAA700000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE CALLER PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST SWAP2 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND ISZERO PUSH2 0x1505 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO PUSH2 0xDDA JUMPI PUSH2 0x1503 SWAP3 PUSH2 0x16DF JUMP JUMPDEST JUMP JUMPDEST PUSH32 0x96C6FD1E00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST PUSH1 0xFF PUSH1 0x5 SLOAD PUSH1 0xA0 SHR AND PUSH2 0x1540 JUMPI JUMP JUMPDEST PUSH32 0xD93C066500000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 PUSH0 REVERT JUMPDEST DUP2 ISZERO SWAP2 SWAP1 PUSH0 DUP4 ISZERO DUP1 PUSH2 0x16D8 JUMPI JUMPDEST DUP1 PUSH2 0x16C6 JUMPI JUMPDEST PUSH2 0x158A JUMPI JUMPDEST PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH0 DUP1 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH32 0xEC8156718A8372B1DB44BB411437D0870F3E3790D4A08526D024CE1B0B668F6B SLOAD PUSH1 0xFF AND ISZERO DUP1 PUSH2 0x16A6 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI POP PUSH1 0xA SLOAD SWAP3 DUP4 DUP4 MUL SWAP4 DUP4 DUP6 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x15F3 PUSH2 0x15EB PUSH2 0x2710 PUSH2 0x15F9 SWAP6 DIV DUP1 SWAP5 PUSH2 0x143E JUMP JUMPDEST SWAP3 ADDRESS PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH0 PUSH2 0x179D JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0xFF DUP2 AND DUP1 PUSH2 0x1698 JUMPI JUMPDEST DUP1 PUSH2 0x1681 JUMPI JUMPDEST PUSH2 0x1613 JUMPI POP JUMP JUMPDEST PUSH2 0xFF00 NOT AND PUSH2 0x100 OR PUSH1 0xC SSTORE PUSH1 0xB SLOAD ADDRESS EXTCODESIZE ISZERO PUSH2 0x7FA JUMPI PUSH1 0x40 MLOAD SWAP1 PUSH32 0xA9AB232B00000000000000000000000000000000000000000000000000000000 DUP3 MSTORE PUSH1 0x4 DUP3 ADD MSTORE PUSH0 DUP2 PUSH1 0x24 DUP2 DUP4 ADDRESS GAS CALL PUSH2 0x1671 JUMPI JUMPDEST POP PUSH2 0xFF00 NOT PUSH1 0xC SLOAD AND PUSH1 0xC SSTORE JUMP JUMPDEST PUSH0 PUSH2 0x167B SWAP2 PUSH2 0x13E6 JUMP JUMPDEST PUSH0 PUSH2 0x1663 JUMP JUMPDEST POP ADDRESS PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD PUSH1 0xB SLOAD GT ISZERO PUSH2 0x160C JUMP JUMPDEST POP PUSH1 0xFF DUP2 PUSH1 0x8 SHR AND ISZERO PUSH2 0x1606 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x15BE JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x157B JUMP JUMPDEST POP PUSH0 PUSH2 0x1575 JUMP JUMPDEST SWAP2 SWAP1 DUP2 ISZERO SWAP3 DUP4 ISZERO DUP1 PUSH2 0x178B JUMPI JUMPDEST DUP1 PUSH2 0x1779 JUMPI JUMPDEST PUSH2 0x1700 JUMPI PUSH2 0x1503 SWAP4 POP PUSH2 0x179D JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO DUP1 PUSH2 0x1759 JUMPI JUMPDEST ISZERO PUSH2 0x1580 JUMPI PUSH1 0xA SLOAD SWAP4 DUP5 DUP5 MUL SWAP5 DUP5 DUP7 DIV EQ OR ISZERO PUSH2 0x142A JUMPI PUSH2 0x1754 PUSH2 0x174C PUSH2 0x2710 PUSH2 0x15F9 SWAP7 DIV DUP1 SWAP6 PUSH2 0x143E JUMP JUMPDEST SWAP4 ADDRESS DUP4 PUSH2 0x179D JUMP JUMPDEST PUSH2 0x179D JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND PUSH0 MSTORE PUSH1 0x9 PUSH1 0x20 MSTORE PUSH1 0xFF PUSH1 0x40 PUSH0 KECCAK256 SLOAD AND ISZERO PUSH2 0x1720 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP3 AND ISZERO ISZERO PUSH2 0x16F2 JUMP JUMPDEST POP PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND ISZERO ISZERO PUSH2 0x16EC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND SWAP1 DUP2 PUSH2 0x1816 JUMPI PUSH1 0x20 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 PUSH2 0x17E4 DUP7 PUSH1 0x2 SLOAD PUSH2 0x141D JUMP JUMPDEST PUSH1 0x2 SSTORE JUMPDEST AND SWAP4 DUP5 PUSH2 0x1801 JUMPI DUP1 PUSH1 0x2 SLOAD SUB PUSH1 0x2 SSTORE JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE LOG3 JUMP JUMPDEST DUP5 PUSH0 MSTORE PUSH0 DUP3 MSTORE PUSH1 0x40 PUSH0 KECCAK256 DUP2 DUP2 SLOAD ADD SWAP1 SSTORE PUSH2 0x17F8 JUMP JUMPDEST DUP2 PUSH0 MSTORE PUSH0 PUSH1 0x20 MSTORE PUSH1 0x40 PUSH0 KECCAK256 SLOAD DUP4 DUP2 LT PUSH2 0x1868 JUMPI PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 DUP6 PUSH1 0x20 SWAP4 DUP7 PUSH0 MSTORE PUSH0 DUP6 MSTORE SUB PUSH1 0x40 PUSH0 KECCAK256 SSTORE PUSH2 0x17E8 JUMP JUMPDEST SWAP2 SWAP1 POP PUSH32 0xE450D38C00000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH1 0x4 MSTORE PUSH1 0x24 MSTORE PUSH1 0x44 MSTORE PUSH1 0x64 PUSH0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 SWAP13 PUSH11 0x86FB6287BE5FEAA975A12A PUSH26 0xEFA4E04B8A2AA7809ADCDACD04DC6A3328D164736F6C63430008 0x21 STOP CALLER ",
      "sourceMap": "985:7949:21:-:0;;;;;;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;1500:62:0;;:::i;:::-;985:7949:21;4343:21;;4339:47;;985:7949;-1:-1:-1;;4396:16:21;985:7949;;;4396:16;985:7949;4427:18;;;;985:7949;;4339:47;985:7949;4373:13;;;;;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;-1:-1:-1;;;;;1702:32:21;985:7949;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;1500:62:0;;:::i;:::-;985:7949:21;2627:22:0;;2623:91;;-1:-1:-1;;;;;3004:6:0;985:7949:21;;-1:-1:-1;;985:7949:21;;;3004:6:0;985:7949:21;;3052:40:0;;;;985:7949:21;;2623:91:0;985:7949:21;2672:31:0;;;;985:7949:21;;;2672:31:0;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1622:35;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;5274:28;1500:62:0;;;:::i;:::-;-1:-1:-1;;5237:22:21;985:7949;;;;;;5237:22;985:7949;;;;;;5274:28;985:7949;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;;:::i;:::-;;;;;:::i;:::-;;;;;3561:11:2;985:7949:21;;;3561:27:2;985:7949:21;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2480:15;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;1500:62:0;;:::i;:::-;985:7949:21;5384:21;;5380:47;;-1:-1:-1;;;;;5541:6:21;985:7949;;5526:4;9717:19:2;9713:89;;9815:21;;9811:90;;5526:4:21;985:7949;;8746:4:2;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;-1:-1:-1;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;9989:31:2;985:7949:21;5526:4;9989:31:2;;985:7949:21;-1:-1:-1;;5541:6:21;985:7949;;;5541:6;985:7949;5526:4;985:7949;;8746:4:2;985:7949:21;;;;;;-1:-1:-1;985:7949:21;;;;-1:-1:-1;985:7949:21;10503:17:2;;985:7949:21;;;;;10503:17:2;;985:7949:21;;9989:31:2;985:7949:21;5526:4;9989:31:2;;5674:22:21;;;;985:7949;;9811:90:2;985:7949:21;9859:31:2;;;;985:7949:21;;;9859:31:2;9713:89;985:7949:21;9759:32:2;;;;985:7949:21;;;9759:32:2;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;;;8339:4;8317:10;:27;8313:50;;985:7949;;;;;;:::i;:::-;8412:1;985:7949;;;;;;;;;;;;;;;8339:4;985:7949;;-1:-1:-1;;;;;8467:6:21;985:7949;;;;;;8467:13;;985:7949;8467:13;985:7949;8467:13;;;;;;;;;985:7949;8467:13;;;985:7949;8457:23;985:7949;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;8511:8;:16;;;8538:227;;;;;;985:7949;;;8538:227;;;985:7949;8538:227;;985:7949;;;8538:227;;985:7949;8538:227;;985:7949;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;8740:15;985:7949;;;;8538:227;;;;;;;;;;985:7949;8800:16;;:28;985:7949;8800:16;8781:48;8800:16;;:28;:::i;:::-;985:7949;;;;;;;;;8781:48;985:7949;;8538:227;8781:48;8538:227;;;;985:7949;8538:227;;985:7949;8800:28;8538:227;;:::i;:::-;985:7949;8538:227;;;;;;;;;985:7949;;;;;;;;;;;;-1:-1:-1;;;;;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;8538:227;985:7949;;;;-1:-1:-1;;;985:7949:21;;;;;;;;8467:13;;;985:7949;8467:13;;985:7949;8467:13;;;;;;985:7949;8467:13;;;:::i;:::-;;;985:7949;;;;;-1:-1:-1;;;;;985:7949:21;;;;;;8467:13;;;;;;-1:-1:-1;8467:13:21;;8313:50;8353:10;985:7949;8353:10;985:7949;;8353:10;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;3388:5:2;985:7949:21;;:::i;:::-;;;735:10:11;;3388:5:2;:::i;:::-;985:7949:21;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1354:5;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;1500:62:0;;:::i;:::-;2480:15:21;4936:31;;4932:66;;2594:9;5012:31;;5008:65;;985:7949;;5124:32;985:7949;5083:26;985:7949;;;;;;5124:32;985:7949;5008:65;5052:21;985:7949;5052:21;985:7949;;5052:21;4932:66;4976:22;985:7949;4976:22;985:7949;;4976:22;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;-1:-1:-1;;;985:7949:21;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;-1:-1:-1;;;;;1710:6:0;985:7949:21;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;1500:62:0;;:::i;:::-;1315:72:13;;:::i;:::-;985:7949:21;;2398:14:13;985:7949:21;;;2398:14:13;985:7949:21;2427:20:13;985:7949:21;;;735:10:11;985:7949:21;;2427:20:13;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;1500:62:0;;:::i;:::-;985:7949:21;-1:-1:-1;;;;;3004:6:0;985:7949:21;-1:-1:-1;;985:7949:21;;3004:6:0;985:7949:21;;3052:40:0;;;;985:7949:21;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;2655:30;985:7949;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1606:9;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;-1:-1:-1;;;;;1663:33:21;985:7949;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;1500:62:0;;:::i;:::-;2266:4:21;4748:18;;4744:43;;985:7949;;4825:19;985:7949;4797:13;985:7949;;;;;;4825:19;985:7949;4744:43;4775:12;985:7949;4775:12;985:7949;;4775:12;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;1796:7:13;985:7949:21;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1200:16;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;1785:25;985:7949;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;3373:6:21;985:7949;;3359:10;:20;3355:45;;1315:72:13;;:::i;:::-;6065:10:21;985:7949;1200:16;6065:19;;;;:::i;:::-;:33;6061:65;;6136:20;;;;:::i;:::-;6065:10;985:7949;-1:-1:-1;;;;;985:7949:21;;7432:21:2;7428:91;;7557:5;;;:::i;7428:91::-;7476:32;985:7949:21;7476:32:2;985:7949:21;;;;;7476:32:2;6061:65:21;6107:19;985:7949;6107:19;985:7949;;6107:19;3355:45;3388:12;985:7949;3388:12;985:7949;;3388:12;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;1500:62:0;;:::i;:::-;1796:7:13;985:7949:21;;;;;;2140:9:13;2136:62;;985:7949:21;;1796:7:13;985:7949:21;2674:22:13;985:7949:21;;;735:10:11;985:7949:21;;2674:22:13;985:7949:21;2136:62:13;2172:15;985:7949:21;2172:15:13;985:7949:21;;2172:15:13;985:7949:21;;;;;-1:-1:-1;;985:7949:21;;;;;;2147:27;985:7949;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1140:16;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2594:9;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1074:17;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2761:2:2;985:7949:21;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;2266:4;985:7949;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;:::i;:::-;;;;-1:-1:-1;;;;;985:7949:21;;;;;;;;;;;;-1:-1:-1;;;;;735:10:11;985:7949:21;;;;;;;;;10503:17:2;;10484:36;;10480:309;;985:7949:21;4890:5:2;;;;;:::i;10480:309::-;10540:24;;;10536:130;;9717:19;;9713:89;;735:10:11;9815:21:2;9811:90;;4890:5;985:7949:21;;;;;;;;;-1:-1:-1;;;;;735:10:11;985:7949:21;;;;;;;;;;;;;10480:309:2;;;9811:90;9859:31;985:7949:21;9859:31:2;985:7949:21;;;;;9859:31:2;9713:89;9759:32;985:7949:21;9759:32:2;985:7949:21;;;;;9759:32:2;10536:130;10591:60;;;985:7949:21;10591:60:2;735:10:11;985:7949:21;;;;;;;;10591:60:2;985:7949:21;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;1500:62:0;;;:::i;:::-;985:7949:21;4543:21;;;4539:47;;985:7949;4640:29;985:7949;;;;4596:11;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;4640:29;985:7949;4539:47;4573:13;985:7949;4573:13;985:7949;;4573:13;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;1354:5;985:7949;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;2881:12:2;985:7949:21;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;-1:-1:-1;;;;;985:7949:21;;:::i;:::-;;;;2012:43;985:7949;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;:::i;:::-;;;735:10:11;;9717:19:2;9713:89;;-1:-1:-1;;;;;985:7949:21;9815:21:2;;;9811:90;;735:10:11;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;9989:31:2;985:7949:21;735:10:11;9989:31:2;;985:7949:21;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;-1:-1:-1;;;;;1896:21:21;985:7949;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;;1837:5:2;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1837:5:2;985:7949:21;;;;;;;;;;;;-1:-1:-1;985:7949:21;;-1:-1:-1;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;985:7949:21;;;;;;;2338:43;985:7949;;;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;985:7949:21;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;985:7949:21;;;;;;:::o;:::-;;;-1:-1:-1;;985:7949:21;;;;;;;;;;;;;;;;:::o;:::-;-1:-1:-1;;;;985:7949:21;;;;;-1:-1:-1;985:7949:21;;;;;;;;;;;:::o;:::-;-1:-1:-1;;;1354:5:21;;;;;;;;985:7949;;;;;;;;;;:::o;6341:413::-;1354:5;1606:9;6432:28;6450:10;6432:15;:28;:::i;:::-;1354:5;;6677:2;6662:17;;6658:31;;1354:5;985:7949;;6341:413;:::o;6658:31::-;6681:8;985:7949;6681:8;:::o;1796:162:0:-;-1:-1:-1;;;;;1710:6:0;985:7949:21;;735:10:11;1855:23:0;1851:101;;1796:162::o;1851:101::-;1901:40;-1:-1:-1;1901:40:0;735:10:11;1901:40:0;985:7949:21;;-1:-1:-1;1901:40:0;5297:300:2;;;-1:-1:-1;;;;;985:7949:21;;5380:18:2;5376:86;;-1:-1:-1;;;;;985:7949:21;;5475:16:2;5471:86;;5584:5;;;:::i;:::-;5297:300::o;5376:86::-;5421:30;5396:1;5421:30;5396:1;5421:30;985:7949:21;;5396:1:2;5421:30;1878:128:13;985:7949:21;1796:7:13;985:7949:21;;;;1939:61:13;;1878:128::o;1939:61::-;1974:15;-1:-1:-1;1974:15:13;;-1:-1:-1;1974:15:13;6995:1063:21;7195:9;;;6995:1063;985:7949;7195:9;;;:31;;6995:1063;7195:51;;;6995:1063;7191:820;;6995:1063;8045:5;;;;:::i;7191:820::-;985:7949;;;7267:11;985:7949;;;;;;7266:18;;:38;;7191:820;7262:739;7191:820;7262:739;985:7949;7347:6;985:7949;;;;;;;;;;;;;;7549:3;7400:11;7357:5;7595:9;1354:5;;7400:11;;;:::i;:::-;7542:4;;985:7949;7549:3;:::i;:::-;985:7949;7595:9;:::i;:::-;7727:11;985:7949;;;;7727:25;;;7262:739;7727:70;;;7262:739;7723:240;;7980:7;:::o;7723:240::-;-1:-1:-1;;985:7949:21;;;7727:11;985:7949;7880:13;985:7949;7542:4;7863:31;;;;985:7949;;7863:31;985:7949;7863:31;;;;;985:7949;;7542:4;7863:31;7542:4;;;7863:31;;;;7723:240;985:7949;-1:-1:-1;;7727:11:21;985:7949;;7727:11;985:7949;7980:7::o;7863:31::-;985:7949;7863:31;;;:::i;:::-;985:7949;7863:31;;7727:70;7542:4;;985:7949;;;;;;;;;7784:13;985:7949;-1:-1:-1;7756:41:21;7727:70;;:25;985:7949;;;;;;7742:10;7727:25;;7266:38;985:7949;-1:-1:-1;;;;;985:7949:21;;;;7267:11;985:7949;;;;;;;;7288:16;7266:38;;7195:51;985:7949;-1:-1:-1;;;;;985:7949:21;;7230:16;;7195:51;;:31;;985:7949;7195:31;;6995:1063;;;7195:9;;;;;:31;;;6995:1063;7195:51;;;6995:1063;7191:820;;8045:5;;;;:::i;7191:820::-;-1:-1:-1;;;;;985:7949:21;;7203:1;985:7949;7267:11;985:7949;;;;7203:1;985:7949;;;7266:18;:38;;;7191:820;7262:739;7191:820;7262:739;7347:6;985:7949;;;;;;;;;;;;;;7549:3;7400:11;7357:5;7595:9;1354:5;;7400:11;;;:::i;:::-;7542:4;;7549:3;;:::i;:::-;7595:9;:::i;7266:38::-;985:7949;-1:-1:-1;;;;;985:7949:21;;7203:1;985:7949;7267:11;985:7949;;;;7203:1;985:7949;;;7288:16;7266:38;;7195:51;985:7949;-1:-1:-1;;;;;985:7949:21;;7230:16;;7195:51;;:31;985:7949;-1:-1:-1;;;;;985:7949:21;;7208:18;;7195:31;;5912:1107:2;-1:-1:-1;;;;;985:7949:21;;6001:18:2;985:7949:21;;;-1:-1:-1;;;;;6987:25:2;985:7949:21;6137:21:2;985:7949:21;6137:21:2;985:7949:21;6137:21:2;:::i;:::-;;985:7949:21;5997:540:2;985:7949:21;;6551:16:2;985:7949:21;;;6714:21:2;985:7949:21;;6714:21:2;985:7949:21;6547:425:2;985:7949:21;;;;;6987:25:2;5912:1107::o;6547:425::-;985:7949:21;6017:1:2;985:7949:21;6017:1:2;985:7949:21;;;6017:1:2;985:7949:21;;;;;;;6547:425:2;;5997:540;985:7949:21;6017:1:2;985:7949:21;6017:1:2;985:7949:21;;;6017:1:2;985:7949:21;;6244:19:2;;;6240:115;;-1:-1:-1;;;;;6987:25:2;985:7949:21;;;;;6017:1:2;985:7949:21;6017:1:2;985:7949:21;;;;6017:1:2;985:7949:21;;5997:540:2;;6240:115;6290:50;;;;6017:1;6290:50;;985:7949:21;;;;;;6017:1:2;6290:50"
    },
    "gasEstimates": {
      "creation": {
        "codeDepositCost": "1270800",
        "executionCost": "infinite",
        "totalCost": "infinite"
      },
      "external": {
        "INITIAL_REWARD_PER_ROUND()": "293",
        "MAX_SUPPLY()": "400",
        "MAX_SWAP_THRESHOLD()": "931",
        "MAX_TAX_BPS()": "356",
        "MINING_POOL()": "554",
        "MIN_SWAP_THRESHOLD()": "422",
        "ROUNDS_PER_HALVING()": "840",
        "ROUND_DURATION()": "642",
        "TREASURY_PREMINT()": "444",
        "allowance(address,address)": "3350",
        "approve(address,uint256)": "24374",
        "balanceOf(address)": "2938",
        "currentRewardPerRound()": "infinite",
        "decimals()": "378",
        "deployedAt()": "infinite",
        "executeSwap(uint256)": "infinite",
        "isTaxExempt(address)": "2511",
        "mint(address,uint256)": "infinite",
        "minter()": "2323",
        "name()": "infinite",
        "owner()": "2873",
        "pause()": "30271",
        "paused()": "2697",
        "renounceOwnership()": "28594",
        "router()": "3162",
        "setMinter(address)": "28664",
        "setRouter(address)": "61630",
        "setSwapEnabled(bool)": "28417",
        "setSwapThreshold(uint256)": "26150",
        "setTaxBps(uint256)": "25908",
        "setTaxExempt(address,bool)": "28310",
        "swapEnabled()": "2779",
        "swapThreshold()": "2253",
        "symbol()": "infinite",
        "taxBps()": "2569",
        "totalMined()": "2635",
        "totalSupply()": "2371",
        "transfer(address,uint256)": "infinite",
        "transferFrom(address,address,uint256)": "infinite",
        "transferOwnership(address)": "29022",
        "treasury()": "infinite",
        "unpause()": "27902"
      },
      "internal": {
        "_update(address,address,uint256)": "infinite"
      }
    },
    "methodIdentifiers": {
      "INITIAL_REWARD_PER_ROUND()": "1bb9b0a3",
      "MAX_SUPPLY()": "32cb6b0c",
      "MAX_SWAP_THRESHOLD()": "dbdfca6c",
      "MAX_TAX_BPS()": "2c597de9",
      "MINING_POOL()": "598d7d0f",
      "MIN_SWAP_THRESHOLD()": "3352eb8c",
      "ROUNDS_PER_HALVING()": "a51f0c32",
      "ROUND_DURATION()": "6641ea08",
      "TREASURY_PREMINT()": "3c96b08f",
      "allowance(address,address)": "dd62ed3e",
      "approve(address,uint256)": "095ea7b3",
      "balanceOf(address)": "70a08231",
      "currentRewardPerRound()": "8e4fab80",
      "decimals()": "313ce567",
      "deployedAt()": "eae4c19f",
      "executeSwap(uint256)": "a9ab232b",
      "isTaxExempt(address)": "16c2be6b",
      "mint(address,uint256)": "40c10f19",
      "minter()": "07546172",
      "name()": "06fdde03",
      "owner()": "8da5cb5b",
      "pause()": "8456cb59",
      "paused()": "5c975abb",
      "renounceOwnership()": "715018a6",
      "router()": "f887ea40",
      "setMinter(address)": "fca3b5aa",
      "setRouter(address)": "c0d78655",
      "setSwapEnabled(bool)": "e01af92c",
      "setSwapThreshold(uint256)": "9d0014b1",
      "setTaxBps(uint256)": "60f71a0e",
      "setTaxExempt(address,bool)": "1dc61040",
      "swapEnabled()": "6ddd1713",
      "swapThreshold()": "0445b667",
      "symbol()": "95d89b41",
      "taxBps()": "3eacd2f8",
      "totalMined()": "5556db65",
      "totalSupply()": "18160ddd",
      "transfer(address,uint256)": "a9059cbb",
      "transferFrom(address,address,uint256)": "23b872dd",
      "transferOwnership(address)": "f2fde38b",
      "treasury()": "61d027b3",
      "unpause()": "3f4ba83a"
    }
  },
  "metadata": "{\"compiler\":{\"version\":\"0.8.33+commit.64118f21\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_treasury\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_router\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"allowance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"}],\"name\":\"ERC20InsufficientAllowance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"}],\"name\":\"ERC20InsufficientBalance\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"approver\",\"type\":\"address\"}],\"name\":\"ERC20InvalidApprover\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"}],\"name\":\"ERC20InvalidReceiver\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"ERC20InvalidSender\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"ERC20InvalidSpender\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"EnforcedPause\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ExceedsMiningPool\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ExpectedPause\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"OnlyMinter\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"OnlySelf\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"SwapThresholdTooHigh\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"SwapThresholdTooLow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TaxTooHigh\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ZeroAddress\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"minter\",\"type\":\"address\"}],\"name\":\"MinterSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"Paused\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newRouter\",\"type\":\"address\"}],\"name\":\"RouterUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"enabled\",\"type\":\"bool\"}],\"name\":\"SwapEnabledUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newThreshold\",\"type\":\"uint256\"}],\"name\":\"SwapThresholdUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newBps\",\"type\":\"uint256\"}],\"name\":\"TaxBpsUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"exempt\",\"type\":\"bool\"}],\"name\":\"TaxExemptSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"afgAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"bnbAmount\",\"type\":\"uint256\"}],\"name\":\"TaxSwapped\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"Unpaused\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"INITIAL_REWARD_PER_ROUND\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_SUPPLY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_SWAP_THRESHOLD\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_TAX_BPS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MINING_POOL\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MIN_SWAP_THRESHOLD\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ROUNDS_PER_HALVING\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ROUND_DURATION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"TREASURY_PREMINT\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"currentRewardPerRound\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deployedAt\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"executeSwap\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"isTaxExempt\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"minter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"pause\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"paused\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"router\",\"outputs\":[{\"internalType\":\"contract IUniswapV2Router02\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_minter\",\"type\":\"address\"}],\"name\":\"setMinter\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_router\",\"type\":\"address\"}],\"name\":\"setRouter\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_enabled\",\"type\":\"bool\"}],\"name\":\"setSwapEnabled\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_threshold\",\"type\":\"uint256\"}],\"name\":\"setSwapThreshold\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_bps\",\"type\":\"uint256\"}],\"name\":\"setTaxBps\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"exempt\",\"type\":\"bool\"}],\"name\":\"setTaxExempt\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"swapEnabled\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"swapThreshold\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"taxBps\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalMined\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"treasury\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"unpause\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ERC20InsufficientAllowance(address,uint256,uint256)\":[{\"details\":\"Indicates a failure with the `spender`\\u2019s `allowance`. Used in transfers.\",\"params\":{\"allowance\":\"Amount of tokens a `spender` is allowed to operate with.\",\"needed\":\"Minimum amount required to perform a transfer.\",\"spender\":\"Address that may be allowed to operate on tokens without being their owner.\"}}],\"ERC20InsufficientBalance(address,uint256,uint256)\":[{\"details\":\"Indicates an error related to the current `balance` of a `sender`. Used in transfers.\",\"params\":{\"balance\":\"Current balance for the interacting account.\",\"needed\":\"Minimum amount required to perform a transfer.\",\"sender\":\"Address whose tokens are being transferred.\"}}],\"ERC20InvalidApprover(address)\":[{\"details\":\"Indicates a failure with the `approver` of a token to be approved. Used in approvals.\",\"params\":{\"approver\":\"Address initiating an approval operation.\"}}],\"ERC20InvalidReceiver(address)\":[{\"details\":\"Indicates a failure with the token `receiver`. Used in transfers.\",\"params\":{\"receiver\":\"Address to which tokens are being transferred.\"}}],\"ERC20InvalidSender(address)\":[{\"details\":\"Indicates a failure with the token `sender`. Used in transfers.\",\"params\":{\"sender\":\"Address whose tokens are being transferred.\"}}],\"ERC20InvalidSpender(address)\":[{\"details\":\"Indicates a failure with the `spender` to be approved. Used in approvals.\",\"params\":{\"spender\":\"Address that may be allowed to operate on tokens without being their owner.\"}}],\"EnforcedPause()\":[{\"details\":\"The operation failed because the contract is paused.\"}],\"ExpectedPause()\":[{\"details\":\"The operation failed because the contract is not paused.\"}],\"OwnableInvalidOwner(address)\":[{\"details\":\"The owner is not a valid owner account. (eg. `address(0)`)\"}],\"OwnableUnauthorizedAccount(address)\":[{\"details\":\"The caller account is not authorized to perform an operation.\"}]},\"events\":{\"Approval(address,address,uint256)\":{\"details\":\"Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.\"},\"Paused(address)\":{\"details\":\"Emitted when the pause is triggered by `account`.\"},\"Transfer(address,address,uint256)\":{\"details\":\"Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.\"},\"Unpaused(address)\":{\"details\":\"Emitted when the pause is lifted by `account`.\"}},\"kind\":\"dev\",\"methods\":{\"allowance(address,address)\":{\"details\":\"Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. This value changes when {approve} or {transferFrom} are called.\"},\"approve(address,uint256)\":{\"details\":\"See {IERC20-approve}. NOTE: If `value` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.\"},\"balanceOf(address)\":{\"details\":\"Returns the value of tokens owned by `account`.\"},\"currentRewardPerRound()\":{\"details\":\"Uses bit-shift for halving: reward >> halvingCount\"},\"decimals()\":{\"details\":\"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the default value returned by this function, unless it's overridden. NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.\"},\"executeSwap(uint256)\":{\"details\":\"External so it can be wrapped in try-catch within _update [C-01 fix]\"},\"name()\":{\"details\":\"Returns the name of the token.\"},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"paused()\":{\"details\":\"Returns true if the contract is paused, and false otherwise.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.\"},\"symbol()\":{\"details\":\"Returns the symbol of the token, usually a shorter version of the name.\"},\"totalSupply()\":{\"details\":\"Returns the value of tokens in existence.\"},\"transfer(address,uint256)\":{\"details\":\"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `value`.\"},\"transferFrom(address,address,uint256)\":{\"details\":\"See {IERC20-transferFrom}. Skips emitting an {Approval} event indicating an allowance update. This is not required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve]. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `value`. - the caller must have allowance for ``from``'s tokens of at least `value`.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"}},\"stateVariables\":{\"_swapping\":{\"details\":\"Reentrancy lock for swap operations\"}},\"title\":\"AFGToken\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"INITIAL_REWARD_PER_ROUND()\":{\"notice\":\"Initial reward per round: 90M / 2,016 \\u2248 44,642 AFG\"},\"MAX_SWAP_THRESHOLD()\":{\"notice\":\"Maximum allowed swap threshold\"},\"MAX_TAX_BPS()\":{\"notice\":\"Maximum allowed tax rate (10%)\"},\"MIN_SWAP_THRESHOLD()\":{\"notice\":\"Minimum allowed swap threshold\"},\"ROUNDS_PER_HALVING()\":{\"notice\":\"Number of rounds per halving period (7 days * 288 rounds/day = 2,016)\"},\"ROUND_DURATION()\":{\"notice\":\"Round duration: 5 minutes\"},\"currentRewardPerRound()\":{\"notice\":\"Current reward per round based on halving schedule\"},\"executeSwap(uint256)\":{\"notice\":\"Execute auto-swap of accumulated AFG tax to BNB. Only callable by this contract.\"},\"isTaxExempt(address)\":{\"notice\":\"Addresses exempt from transfer tax (protocol contracts, treasury, etc.)\"},\"mint(address,uint256)\":{\"notice\":\"Mint AFG rewards \\u2014 only callable by RewardDistributor\"},\"minter()\":{\"notice\":\"Only this address can call mint() \\u2014 set to RewardDistributor\"},\"swapEnabled()\":{\"notice\":\"Whether auto-swap is enabled\"},\"swapThreshold()\":{\"notice\":\"Minimum accumulated tax to trigger auto-swap\"},\"taxBps()\":{\"notice\":\"Transfer tax rate in basis points (default 300 = 3%, max 1000 = 10%)\"},\"totalMined()\":{\"notice\":\"Total AFG minted via mining\"}},\"notice\":\"ERC-20 token for AgentForge protocol   - Total supply cap: 100,000,000 AFG   - 10% (10M) pre-minted to treasury at deploy   - 90% (90M) released via problem-solving mining   - Configurable transfer tax (default 3%), with exempt addresses for protocol contracts   - Halving schedule based on elapsed time since deployment   - Auto-swap: accumulated tax AFG \\u2192 BNB via PancakeSwap when threshold is reached\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"project/contracts/AFGToken.sol\":\"AFGToken\"},\"evmVersion\":\"osaka\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":true,\"runs\":2000},\"remappings\":[\"project/:@openzeppelin/contracts/=npm/@openzeppelin/contracts@5.4.0/\"],\"viaIR\":true},\"sources\":{\"npm/@openzeppelin/contracts@5.4.0/access/Ownable.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)\\n\\npragma solidity ^0.8.20;\\n\\nimport {Context} from \\\"../utils/Context.sol\\\";\\n\\n/**\\n * @dev Contract module which provides a basic access control mechanism, where\\n * there is an account (an owner) that can be granted exclusive access to\\n * specific functions.\\n *\\n * The initial owner is set to the address provided by the deployer. This can\\n * later be changed with {transferOwnership}.\\n *\\n * This module is used through inheritance. It will make available the modifier\\n * `onlyOwner`, which can be applied to your functions to restrict their use to\\n * the owner.\\n */\\nabstract contract Ownable is Context {\\n    address private _owner;\\n\\n    /**\\n     * @dev The caller account is not authorized to perform an operation.\\n     */\\n    error OwnableUnauthorizedAccount(address account);\\n\\n    /**\\n     * @dev The owner is not a valid owner account. (eg. `address(0)`)\\n     */\\n    error OwnableInvalidOwner(address owner);\\n\\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\\n\\n    /**\\n     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.\\n     */\\n    constructor(address initialOwner) {\\n        if (initialOwner == address(0)) {\\n            revert OwnableInvalidOwner(address(0));\\n        }\\n        _transferOwnership(initialOwner);\\n    }\\n\\n    /**\\n     * @dev Throws if called by any account other than the owner.\\n     */\\n    modifier onlyOwner() {\\n        _checkOwner();\\n        _;\\n    }\\n\\n    /**\\n     * @dev Returns the address of the current owner.\\n     */\\n    function owner() public view virtual returns (address) {\\n        return _owner;\\n    }\\n\\n    /**\\n     * @dev Throws if the sender is not the owner.\\n     */\\n    function _checkOwner() internal view virtual {\\n        if (owner() != _msgSender()) {\\n            revert OwnableUnauthorizedAccount(_msgSender());\\n        }\\n    }\\n\\n    /**\\n     * @dev Leaves the contract without owner. It will not be possible to call\\n     * `onlyOwner` functions. Can only be called by the current owner.\\n     *\\n     * NOTE: Renouncing ownership will leave the contract without an owner,\\n     * thereby disabling any functionality that is only available to the owner.\\n     */\\n    function renounceOwnership() public virtual onlyOwner {\\n        _transferOwnership(address(0));\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Can only be called by the current owner.\\n     */\\n    function transferOwnership(address newOwner) public virtual onlyOwner {\\n        if (newOwner == address(0)) {\\n            revert OwnableInvalidOwner(address(0));\\n        }\\n        _transferOwnership(newOwner);\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Internal function without access restriction.\\n     */\\n    function _transferOwnership(address newOwner) internal virtual {\\n        address oldOwner = _owner;\\n        _owner = newOwner;\\n        emit OwnershipTransferred(oldOwner, newOwner);\\n    }\\n}\\n\",\"keccak256\":\"0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/interfaces/draft-IERC6093.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (interfaces/draft-IERC6093.sol)\\npragma solidity >=0.8.4;\\n\\n/**\\n * @dev Standard ERC-20 Errors\\n * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC-20 tokens.\\n */\\ninterface IERC20Errors {\\n    /**\\n     * @dev Indicates an error related to the current `balance` of a `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     * @param balance Current balance for the interacting account.\\n     * @param needed Minimum amount required to perform a transfer.\\n     */\\n    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);\\n\\n    /**\\n     * @dev Indicates a failure with the token `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     */\\n    error ERC20InvalidSender(address sender);\\n\\n    /**\\n     * @dev Indicates a failure with the token `receiver`. Used in transfers.\\n     * @param receiver Address to which tokens are being transferred.\\n     */\\n    error ERC20InvalidReceiver(address receiver);\\n\\n    /**\\n     * @dev Indicates a failure with the `spender`\\u2019s `allowance`. Used in transfers.\\n     * @param spender Address that may be allowed to operate on tokens without being their owner.\\n     * @param allowance Amount of tokens a `spender` is allowed to operate with.\\n     * @param needed Minimum amount required to perform a transfer.\\n     */\\n    error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed);\\n\\n    /**\\n     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.\\n     * @param approver Address initiating an approval operation.\\n     */\\n    error ERC20InvalidApprover(address approver);\\n\\n    /**\\n     * @dev Indicates a failure with the `spender` to be approved. Used in approvals.\\n     * @param spender Address that may be allowed to operate on tokens without being their owner.\\n     */\\n    error ERC20InvalidSpender(address spender);\\n}\\n\\n/**\\n * @dev Standard ERC-721 Errors\\n * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC-721 tokens.\\n */\\ninterface IERC721Errors {\\n    /**\\n     * @dev Indicates that an address can't be an owner. For example, `address(0)` is a forbidden owner in ERC-20.\\n     * Used in balance queries.\\n     * @param owner Address of the current owner of a token.\\n     */\\n    error ERC721InvalidOwner(address owner);\\n\\n    /**\\n     * @dev Indicates a `tokenId` whose `owner` is the zero address.\\n     * @param tokenId Identifier number of a token.\\n     */\\n    error ERC721NonexistentToken(uint256 tokenId);\\n\\n    /**\\n     * @dev Indicates an error related to the ownership over a particular token. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     * @param tokenId Identifier number of a token.\\n     * @param owner Address of the current owner of a token.\\n     */\\n    error ERC721IncorrectOwner(address sender, uint256 tokenId, address owner);\\n\\n    /**\\n     * @dev Indicates a failure with the token `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     */\\n    error ERC721InvalidSender(address sender);\\n\\n    /**\\n     * @dev Indicates a failure with the token `receiver`. Used in transfers.\\n     * @param receiver Address to which tokens are being transferred.\\n     */\\n    error ERC721InvalidReceiver(address receiver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator`\\u2019s approval. Used in transfers.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     * @param tokenId Identifier number of a token.\\n     */\\n    error ERC721InsufficientApproval(address operator, uint256 tokenId);\\n\\n    /**\\n     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.\\n     * @param approver Address initiating an approval operation.\\n     */\\n    error ERC721InvalidApprover(address approver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator` to be approved. Used in approvals.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     */\\n    error ERC721InvalidOperator(address operator);\\n}\\n\\n/**\\n * @dev Standard ERC-1155 Errors\\n * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC-1155 tokens.\\n */\\ninterface IERC1155Errors {\\n    /**\\n     * @dev Indicates an error related to the current `balance` of a `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     * @param balance Current balance for the interacting account.\\n     * @param needed Minimum amount required to perform a transfer.\\n     * @param tokenId Identifier number of a token.\\n     */\\n    error ERC1155InsufficientBalance(address sender, uint256 balance, uint256 needed, uint256 tokenId);\\n\\n    /**\\n     * @dev Indicates a failure with the token `sender`. Used in transfers.\\n     * @param sender Address whose tokens are being transferred.\\n     */\\n    error ERC1155InvalidSender(address sender);\\n\\n    /**\\n     * @dev Indicates a failure with the token `receiver`. Used in transfers.\\n     * @param receiver Address to which tokens are being transferred.\\n     */\\n    error ERC1155InvalidReceiver(address receiver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator`\\u2019s approval. Used in transfers.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     * @param owner Address of the current owner of a token.\\n     */\\n    error ERC1155MissingApprovalForAll(address operator, address owner);\\n\\n    /**\\n     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.\\n     * @param approver Address initiating an approval operation.\\n     */\\n    error ERC1155InvalidApprover(address approver);\\n\\n    /**\\n     * @dev Indicates a failure with the `operator` to be approved. Used in approvals.\\n     * @param operator Address that may be allowed to operate on tokens without being their owner.\\n     */\\n    error ERC1155InvalidOperator(address operator);\\n\\n    /**\\n     * @dev Indicates an array length mismatch between ids and values in a safeBatchTransferFrom operation.\\n     * Used in batch transfers.\\n     * @param idsLength Length of the array of token identifiers\\n     * @param valuesLength Length of the array of token amounts\\n     */\\n    error ERC1155InvalidArrayLength(uint256 idsLength, uint256 valuesLength);\\n}\\n\",\"keccak256\":\"0x19fdfb0f3b89a230e7dbd1cf416f1a6b531a3ee5db4da483f946320fc74afc0e\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/token/ERC20/ERC20.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/ERC20.sol)\\n\\npragma solidity ^0.8.20;\\n\\nimport {IERC20} from \\\"./IERC20.sol\\\";\\nimport {IERC20Metadata} from \\\"./extensions/IERC20Metadata.sol\\\";\\nimport {Context} from \\\"../../utils/Context.sol\\\";\\nimport {IERC20Errors} from \\\"../../interfaces/draft-IERC6093.sol\\\";\\n\\n/**\\n * @dev Implementation of the {IERC20} interface.\\n *\\n * This implementation is agnostic to the way tokens are created. This means\\n * that a supply mechanism has to be added in a derived contract using {_mint}.\\n *\\n * TIP: For a detailed writeup see our guide\\n * https://forum.openzeppelin.com/t/how-to-implement-erc20-supply-mechanisms/226[How\\n * to implement supply mechanisms].\\n *\\n * The default value of {decimals} is 18. To change this, you should override\\n * this function so it returns a different value.\\n *\\n * We have followed general OpenZeppelin Contracts guidelines: functions revert\\n * instead returning `false` on failure. This behavior is nonetheless\\n * conventional and does not conflict with the expectations of ERC-20\\n * applications.\\n */\\nabstract contract ERC20 is Context, IERC20, IERC20Metadata, IERC20Errors {\\n    mapping(address account => uint256) private _balances;\\n\\n    mapping(address account => mapping(address spender => uint256)) private _allowances;\\n\\n    uint256 private _totalSupply;\\n\\n    string private _name;\\n    string private _symbol;\\n\\n    /**\\n     * @dev Sets the values for {name} and {symbol}.\\n     *\\n     * Both values are immutable: they can only be set once during construction.\\n     */\\n    constructor(string memory name_, string memory symbol_) {\\n        _name = name_;\\n        _symbol = symbol_;\\n    }\\n\\n    /**\\n     * @dev Returns the name of the token.\\n     */\\n    function name() public view virtual returns (string memory) {\\n        return _name;\\n    }\\n\\n    /**\\n     * @dev Returns the symbol of the token, usually a shorter version of the\\n     * name.\\n     */\\n    function symbol() public view virtual returns (string memory) {\\n        return _symbol;\\n    }\\n\\n    /**\\n     * @dev Returns the number of decimals used to get its user representation.\\n     * For example, if `decimals` equals `2`, a balance of `505` tokens should\\n     * be displayed to a user as `5.05` (`505 / 10 ** 2`).\\n     *\\n     * Tokens usually opt for a value of 18, imitating the relationship between\\n     * Ether and Wei. This is the default value returned by this function, unless\\n     * it's overridden.\\n     *\\n     * NOTE: This information is only used for _display_ purposes: it in\\n     * no way affects any of the arithmetic of the contract, including\\n     * {IERC20-balanceOf} and {IERC20-transfer}.\\n     */\\n    function decimals() public view virtual returns (uint8) {\\n        return 18;\\n    }\\n\\n    /// @inheritdoc IERC20\\n    function totalSupply() public view virtual returns (uint256) {\\n        return _totalSupply;\\n    }\\n\\n    /// @inheritdoc IERC20\\n    function balanceOf(address account) public view virtual returns (uint256) {\\n        return _balances[account];\\n    }\\n\\n    /**\\n     * @dev See {IERC20-transfer}.\\n     *\\n     * Requirements:\\n     *\\n     * - `to` cannot be the zero address.\\n     * - the caller must have a balance of at least `value`.\\n     */\\n    function transfer(address to, uint256 value) public virtual returns (bool) {\\n        address owner = _msgSender();\\n        _transfer(owner, to, value);\\n        return true;\\n    }\\n\\n    /// @inheritdoc IERC20\\n    function allowance(address owner, address spender) public view virtual returns (uint256) {\\n        return _allowances[owner][spender];\\n    }\\n\\n    /**\\n     * @dev See {IERC20-approve}.\\n     *\\n     * NOTE: If `value` is the maximum `uint256`, the allowance is not updated on\\n     * `transferFrom`. This is semantically equivalent to an infinite approval.\\n     *\\n     * Requirements:\\n     *\\n     * - `spender` cannot be the zero address.\\n     */\\n    function approve(address spender, uint256 value) public virtual returns (bool) {\\n        address owner = _msgSender();\\n        _approve(owner, spender, value);\\n        return true;\\n    }\\n\\n    /**\\n     * @dev See {IERC20-transferFrom}.\\n     *\\n     * Skips emitting an {Approval} event indicating an allowance update. This is not\\n     * required by the ERC. See {xref-ERC20-_approve-address-address-uint256-bool-}[_approve].\\n     *\\n     * NOTE: Does not update the allowance if the current allowance\\n     * is the maximum `uint256`.\\n     *\\n     * Requirements:\\n     *\\n     * - `from` and `to` cannot be the zero address.\\n     * - `from` must have a balance of at least `value`.\\n     * - the caller must have allowance for ``from``'s tokens of at least\\n     * `value`.\\n     */\\n    function transferFrom(address from, address to, uint256 value) public virtual returns (bool) {\\n        address spender = _msgSender();\\n        _spendAllowance(from, spender, value);\\n        _transfer(from, to, value);\\n        return true;\\n    }\\n\\n    /**\\n     * @dev Moves a `value` amount of tokens from `from` to `to`.\\n     *\\n     * This internal function is equivalent to {transfer}, and can be used to\\n     * e.g. implement automatic token fees, slashing mechanisms, etc.\\n     *\\n     * Emits a {Transfer} event.\\n     *\\n     * NOTE: This function is not virtual, {_update} should be overridden instead.\\n     */\\n    function _transfer(address from, address to, uint256 value) internal {\\n        if (from == address(0)) {\\n            revert ERC20InvalidSender(address(0));\\n        }\\n        if (to == address(0)) {\\n            revert ERC20InvalidReceiver(address(0));\\n        }\\n        _update(from, to, value);\\n    }\\n\\n    /**\\n     * @dev Transfers a `value` amount of tokens from `from` to `to`, or alternatively mints (or burns) if `from`\\n     * (or `to`) is the zero address. All customizations to transfers, mints, and burns should be done by overriding\\n     * this function.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function _update(address from, address to, uint256 value) internal virtual {\\n        if (from == address(0)) {\\n            // Overflow check required: The rest of the code assumes that totalSupply never overflows\\n            _totalSupply += value;\\n        } else {\\n            uint256 fromBalance = _balances[from];\\n            if (fromBalance < value) {\\n                revert ERC20InsufficientBalance(from, fromBalance, value);\\n            }\\n            unchecked {\\n                // Overflow not possible: value <= fromBalance <= totalSupply.\\n                _balances[from] = fromBalance - value;\\n            }\\n        }\\n\\n        if (to == address(0)) {\\n            unchecked {\\n                // Overflow not possible: value <= totalSupply or value <= fromBalance <= totalSupply.\\n                _totalSupply -= value;\\n            }\\n        } else {\\n            unchecked {\\n                // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.\\n                _balances[to] += value;\\n            }\\n        }\\n\\n        emit Transfer(from, to, value);\\n    }\\n\\n    /**\\n     * @dev Creates a `value` amount of tokens and assigns them to `account`, by transferring it from address(0).\\n     * Relies on the `_update` mechanism\\n     *\\n     * Emits a {Transfer} event with `from` set to the zero address.\\n     *\\n     * NOTE: This function is not virtual, {_update} should be overridden instead.\\n     */\\n    function _mint(address account, uint256 value) internal {\\n        if (account == address(0)) {\\n            revert ERC20InvalidReceiver(address(0));\\n        }\\n        _update(address(0), account, value);\\n    }\\n\\n    /**\\n     * @dev Destroys a `value` amount of tokens from `account`, lowering the total supply.\\n     * Relies on the `_update` mechanism.\\n     *\\n     * Emits a {Transfer} event with `to` set to the zero address.\\n     *\\n     * NOTE: This function is not virtual, {_update} should be overridden instead\\n     */\\n    function _burn(address account, uint256 value) internal {\\n        if (account == address(0)) {\\n            revert ERC20InvalidSender(address(0));\\n        }\\n        _update(account, address(0), value);\\n    }\\n\\n    /**\\n     * @dev Sets `value` as the allowance of `spender` over the `owner`'s tokens.\\n     *\\n     * This internal function is equivalent to `approve`, and can be used to\\n     * e.g. set automatic allowances for certain subsystems, etc.\\n     *\\n     * Emits an {Approval} event.\\n     *\\n     * Requirements:\\n     *\\n     * - `owner` cannot be the zero address.\\n     * - `spender` cannot be the zero address.\\n     *\\n     * Overrides to this logic should be done to the variant with an additional `bool emitEvent` argument.\\n     */\\n    function _approve(address owner, address spender, uint256 value) internal {\\n        _approve(owner, spender, value, true);\\n    }\\n\\n    /**\\n     * @dev Variant of {_approve} with an optional flag to enable or disable the {Approval} event.\\n     *\\n     * By default (when calling {_approve}) the flag is set to true. On the other hand, approval changes made by\\n     * `_spendAllowance` during the `transferFrom` operation set the flag to false. This saves gas by not emitting any\\n     * `Approval` event during `transferFrom` operations.\\n     *\\n     * Anyone who wishes to continue emitting `Approval` events on the`transferFrom` operation can force the flag to\\n     * true using the following override:\\n     *\\n     * ```solidity\\n     * function _approve(address owner, address spender, uint256 value, bool) internal virtual override {\\n     *     super._approve(owner, spender, value, true);\\n     * }\\n     * ```\\n     *\\n     * Requirements are the same as {_approve}.\\n     */\\n    function _approve(address owner, address spender, uint256 value, bool emitEvent) internal virtual {\\n        if (owner == address(0)) {\\n            revert ERC20InvalidApprover(address(0));\\n        }\\n        if (spender == address(0)) {\\n            revert ERC20InvalidSpender(address(0));\\n        }\\n        _allowances[owner][spender] = value;\\n        if (emitEvent) {\\n            emit Approval(owner, spender, value);\\n        }\\n    }\\n\\n    /**\\n     * @dev Updates `owner`'s allowance for `spender` based on spent `value`.\\n     *\\n     * Does not update the allowance value in case of infinite allowance.\\n     * Revert if not enough allowance is available.\\n     *\\n     * Does not emit an {Approval} event.\\n     */\\n    function _spendAllowance(address owner, address spender, uint256 value) internal virtual {\\n        uint256 currentAllowance = allowance(owner, spender);\\n        if (currentAllowance < type(uint256).max) {\\n            if (currentAllowance < value) {\\n                revert ERC20InsufficientAllowance(spender, currentAllowance, value);\\n            }\\n            unchecked {\\n                _approve(owner, spender, currentAllowance - value, false);\\n            }\\n        }\\n    }\\n}\\n\",\"keccak256\":\"0x86b7b71a6aedefdad89b607378eeab1dcc5389b9ea7d17346d08af01d7190994\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/token/ERC20/IERC20.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/IERC20.sol)\\n\\npragma solidity >=0.4.16;\\n\\n/**\\n * @dev Interface of the ERC-20 standard as defined in the ERC.\\n */\\ninterface IERC20 {\\n    /**\\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\\n     * another (`to`).\\n     *\\n     * Note that `value` may be zero.\\n     */\\n    event Transfer(address indexed from, address indexed to, uint256 value);\\n\\n    /**\\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\\n     * a call to {approve}. `value` is the new allowance.\\n     */\\n    event Approval(address indexed owner, address indexed spender, uint256 value);\\n\\n    /**\\n     * @dev Returns the value of tokens in existence.\\n     */\\n    function totalSupply() external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the value of tokens owned by `account`.\\n     */\\n    function balanceOf(address account) external view returns (uint256);\\n\\n    /**\\n     * @dev Moves a `value` amount of tokens from the caller's account to `to`.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transfer(address to, uint256 value) external returns (bool);\\n\\n    /**\\n     * @dev Returns the remaining number of tokens that `spender` will be\\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\\n     * zero by default.\\n     *\\n     * This value changes when {approve} or {transferFrom} are called.\\n     */\\n    function allowance(address owner, address spender) external view returns (uint256);\\n\\n    /**\\n     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the\\n     * caller's tokens.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\\n     * that someone may use both the old and the new allowance by unfortunate\\n     * transaction ordering. One possible solution to mitigate this race\\n     * condition is to first reduce the spender's allowance to 0 and set the\\n     * desired value afterwards:\\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\\n     *\\n     * Emits an {Approval} event.\\n     */\\n    function approve(address spender, uint256 value) external returns (bool);\\n\\n    /**\\n     * @dev Moves a `value` amount of tokens from `from` to `to` using the\\n     * allowance mechanism. `value` is then deducted from the caller's\\n     * allowance.\\n     *\\n     * Returns a boolean value indicating whether the operation succeeded.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transferFrom(address from, address to, uint256 value) external returns (bool);\\n}\\n\",\"keccak256\":\"0x74ed01eb66b923d0d0cfe3be84604ac04b76482a55f9dd655e1ef4d367f95bc2\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/token/ERC20/extensions/IERC20Metadata.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/extensions/IERC20Metadata.sol)\\n\\npragma solidity >=0.6.2;\\n\\nimport {IERC20} from \\\"../IERC20.sol\\\";\\n\\n/**\\n * @dev Interface for the optional metadata functions from the ERC-20 standard.\\n */\\ninterface IERC20Metadata is IERC20 {\\n    /**\\n     * @dev Returns the name of the token.\\n     */\\n    function name() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the symbol of the token.\\n     */\\n    function symbol() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the decimals places of the token.\\n     */\\n    function decimals() external view returns (uint8);\\n}\\n\",\"keccak256\":\"0xd6fa4088198f04eef10c5bce8a2f4d60554b7ec4b987f684393c01bf79b94d9f\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/utils/Context.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)\\n\\npragma solidity ^0.8.20;\\n\\n/**\\n * @dev Provides information about the current execution context, including the\\n * sender of the transaction and its data. While these are generally available\\n * via msg.sender and msg.data, they should not be accessed in such a direct\\n * manner, since when dealing with meta-transactions the account sending and\\n * paying for execution may not be the actual sender (as far as an application\\n * is concerned).\\n *\\n * This contract is only required for intermediate, library-like contracts.\\n */\\nabstract contract Context {\\n    function _msgSender() internal view virtual returns (address) {\\n        return msg.sender;\\n    }\\n\\n    function _msgData() internal view virtual returns (bytes calldata) {\\n        return msg.data;\\n    }\\n\\n    function _contextSuffixLength() internal view virtual returns (uint256) {\\n        return 0;\\n    }\\n}\\n\",\"keccak256\":\"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2\",\"license\":\"MIT\"},\"npm/@openzeppelin/contracts@5.4.0/utils/Pausable.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v5.3.0) (utils/Pausable.sol)\\n\\npragma solidity ^0.8.20;\\n\\nimport {Context} from \\\"../utils/Context.sol\\\";\\n\\n/**\\n * @dev Contract module which allows children to implement an emergency stop\\n * mechanism that can be triggered by an authorized account.\\n *\\n * This module is used through inheritance. It will make available the\\n * modifiers `whenNotPaused` and `whenPaused`, which can be applied to\\n * the functions of your contract. Note that they will not be pausable by\\n * simply including this module, only once the modifiers are put in place.\\n */\\nabstract contract Pausable is Context {\\n    bool private _paused;\\n\\n    /**\\n     * @dev Emitted when the pause is triggered by `account`.\\n     */\\n    event Paused(address account);\\n\\n    /**\\n     * @dev Emitted when the pause is lifted by `account`.\\n     */\\n    event Unpaused(address account);\\n\\n    /**\\n     * @dev The operation failed because the contract is paused.\\n     */\\n    error EnforcedPause();\\n\\n    /**\\n     * @dev The operation failed because the contract is not paused.\\n     */\\n    error ExpectedPause();\\n\\n    /**\\n     * @dev Modifier to make a function callable only when the contract is not paused.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must not be paused.\\n     */\\n    modifier whenNotPaused() {\\n        _requireNotPaused();\\n        _;\\n    }\\n\\n    /**\\n     * @dev Modifier to make a function callable only when the contract is paused.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must be paused.\\n     */\\n    modifier whenPaused() {\\n        _requirePaused();\\n        _;\\n    }\\n\\n    /**\\n     * @dev Returns true if the contract is paused, and false otherwise.\\n     */\\n    function paused() public view virtual returns (bool) {\\n        return _paused;\\n    }\\n\\n    /**\\n     * @dev Throws if the contract is paused.\\n     */\\n    function _requireNotPaused() internal view virtual {\\n        if (paused()) {\\n            revert EnforcedPause();\\n        }\\n    }\\n\\n    /**\\n     * @dev Throws if the contract is not paused.\\n     */\\n    function _requirePaused() internal view virtual {\\n        if (!paused()) {\\n            revert ExpectedPause();\\n        }\\n    }\\n\\n    /**\\n     * @dev Triggers stopped state.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must not be paused.\\n     */\\n    function _pause() internal virtual whenNotPaused {\\n        _paused = true;\\n        emit Paused(_msgSender());\\n    }\\n\\n    /**\\n     * @dev Returns to normal state.\\n     *\\n     * Requirements:\\n     *\\n     * - The contract must be paused.\\n     */\\n    function _unpause() internal virtual whenPaused {\\n        _paused = false;\\n        emit Unpaused(_msgSender());\\n    }\\n}\\n\",\"keccak256\":\"0xdb484371dfbb848cb6f5d70464e9ac9b2900e4164ead76bbce4fef0b44bcc68f\",\"license\":\"MIT\"},\"project/contracts/AFGToken.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.33;\\n\\nimport \\\"@openzeppelin/contracts/token/ERC20/ERC20.sol\\\";\\nimport \\\"@openzeppelin/contracts/access/Ownable.sol\\\";\\nimport \\\"@openzeppelin/contracts/utils/Pausable.sol\\\";\\n\\ninterface IUniswapV2Router02 {\\n    function swapExactTokensForETHSupportingFeeOnTransferTokens(\\n        uint256 amountIn,\\n        uint256 amountOutMin,\\n        address[] calldata path,\\n        address to,\\n        uint256 deadline\\n    ) external;\\n    function WETH() external pure returns (address);\\n}\\n\\n/**\\n * @title AFGToken\\n * @notice ERC-20 token for AgentForge protocol\\n *   - Total supply cap: 100,000,000 AFG\\n *   - 10% (10M) pre-minted to treasury at deploy\\n *   - 90% (90M) released via problem-solving mining\\n *   - Configurable transfer tax (default 3%), with exempt addresses for protocol contracts\\n *   - Halving schedule based on elapsed time since deployment\\n *   - Auto-swap: accumulated tax AFG \\u2192 BNB via PancakeSwap when threshold is reached\\n */\\ncontract AFGToken is ERC20, Ownable, Pausable {\\n    uint256 public constant MAX_SUPPLY = 100_000_000 ether;\\n    uint256 public constant TREASURY_PREMINT = 10_000_000 ether;\\n    uint256 public constant MINING_POOL = 90_000_000 ether;\\n\\n    /// @notice Number of rounds per halving period (7 days * 288 rounds/day = 2,016)\\n    uint256 public constant ROUNDS_PER_HALVING = 2_016;\\n    /// @notice Initial reward per round: 90M / 2,016 \\u2248 44,642 AFG\\n    uint256 public constant INITIAL_REWARD_PER_ROUND = MINING_POOL / ROUNDS_PER_HALVING;\\n    /// @notice Round duration: 5 minutes\\n    uint256 public constant ROUND_DURATION = 5 minutes;\\n\\n    uint256 public immutable deployedAt;\\n    address public immutable treasury;\\n    IUniswapV2Router02 public router;\\n\\n    /// @notice Total AFG minted via mining\\n    uint256 public totalMined;\\n\\n    /// @notice Only this address can call mint() \\u2014 set to RewardDistributor\\n    address public minter;\\n\\n    /// @notice Addresses exempt from transfer tax (protocol contracts, treasury, etc.)\\n    mapping(address => bool) public isTaxExempt;\\n\\n    /// @notice Transfer tax rate in basis points (default 300 = 3%, max 1000 = 10%)\\n    uint256 public taxBps = 300;\\n\\n    /// @notice Maximum allowed tax rate (10%)\\n    uint256 public constant MAX_TAX_BPS = 1000;\\n\\n    /// @notice Minimum accumulated tax to trigger auto-swap\\n    uint256 public swapThreshold = 10_000 ether;\\n\\n    /// @notice Maximum allowed swap threshold\\n    uint256 public constant MAX_SWAP_THRESHOLD = 1_000_000 ether;\\n\\n    /// @notice Minimum allowed swap threshold\\n    uint256 public constant MIN_SWAP_THRESHOLD = 100 ether;\\n\\n    /// @notice Whether auto-swap is enabled\\n    bool public swapEnabled = true;\\n\\n    /// @dev Reentrancy lock for swap operations\\n    bool private _swapping;\\n\\n    event MinterSet(address indexed minter);\\n    event TaxExemptSet(address indexed account, bool exempt);\\n    event TaxBpsUpdated(uint256 newBps);\\n    event SwapThresholdUpdated(uint256 newThreshold);\\n    event SwapEnabledUpdated(bool enabled);\\n    event RouterUpdated(address indexed newRouter);\\n    event TaxSwapped(uint256 afgAmount, uint256 bnbAmount);\\n\\n    error OnlyMinter();\\n    error OnlySelf();\\n    error ExceedsMiningPool();\\n    error ZeroAddress();\\n    error TaxTooHigh();\\n    error SwapThresholdTooHigh();\\n    error SwapThresholdTooLow();\\n\\n    modifier onlyMinter() {\\n        if (msg.sender != minter) revert OnlyMinter();\\n        _;\\n    }\\n\\n    constructor(\\n        address _treasury,\\n        address _router\\n    ) ERC20(\\\"AgentForge\\\", \\\"AFG\\\") Ownable(msg.sender) {\\n        if (_treasury == address(0)) revert ZeroAddress();\\n        if (_router == address(0)) revert ZeroAddress();\\n        treasury = _treasury;\\n        router = IUniswapV2Router02(_router);\\n        deployedAt = block.timestamp;\\n\\n        // Pre-mint 10M to treasury\\n        _mint(_treasury, TREASURY_PREMINT);\\n\\n        // Treasury, deployer, and this contract are tax-exempt by default\\n        isTaxExempt[_treasury] = true;\\n        isTaxExempt[msg.sender] = true;\\n        isTaxExempt[address(this)] = true;\\n\\n        // Pre-approve router for max spending (gas optimization)\\n        _approve(address(this), _router, type(uint256).max);\\n\\n        // Start paused\\n        _pause();\\n    }\\n\\n    // ============ Admin ============\\n\\n    function setMinter(address _minter) external onlyOwner {\\n        if (_minter == address(0)) revert ZeroAddress();\\n        minter = _minter;\\n        emit MinterSet(_minter);\\n    }\\n\\n    function setTaxExempt(address account, bool exempt) external onlyOwner {\\n        if (account == address(0)) revert ZeroAddress();\\n        isTaxExempt[account] = exempt;\\n        emit TaxExemptSet(account, exempt);\\n    }\\n\\n    function setTaxBps(uint256 _bps) external onlyOwner {\\n        if (_bps > MAX_TAX_BPS) revert TaxTooHigh();\\n        taxBps = _bps;\\n        emit TaxBpsUpdated(_bps);\\n    }\\n\\n    function setSwapThreshold(uint256 _threshold) external onlyOwner {\\n        if (_threshold > MAX_SWAP_THRESHOLD) revert SwapThresholdTooHigh();\\n        if (_threshold < MIN_SWAP_THRESHOLD) revert SwapThresholdTooLow();\\n        swapThreshold = _threshold;\\n        emit SwapThresholdUpdated(_threshold);\\n    }\\n\\n    function setSwapEnabled(bool _enabled) external onlyOwner {\\n        swapEnabled = _enabled;\\n        emit SwapEnabledUpdated(_enabled);\\n    }\\n\\n    function setRouter(address _router) external onlyOwner {\\n        if (_router == address(0)) revert ZeroAddress();\\n        // Revoke old router approval before setting new one [H-01 fix]\\n        _approve(address(this), address(router), 0);\\n        router = IUniswapV2Router02(_router);\\n        _approve(address(this), _router, type(uint256).max);\\n        emit RouterUpdated(_router);\\n    }\\n\\n    function pause() external onlyOwner {\\n        _pause();\\n    }\\n\\n    function unpause() external onlyOwner {\\n        _unpause();\\n    }\\n\\n    // ============ Mining ============\\n\\n    /**\\n     * @notice Mint AFG rewards \\u2014 only callable by RewardDistributor\\n     */\\n    function mint(address to, uint256 amount) external onlyMinter whenNotPaused {\\n        if (totalMined + amount > MINING_POOL) revert ExceedsMiningPool();\\n        totalMined += amount;\\n        _mint(to, amount);\\n    }\\n\\n    /**\\n     * @notice Current reward per round based on halving schedule\\n     * @dev Uses bit-shift for halving: reward >> halvingCount\\n     */\\n    function currentRewardPerRound() public view returns (uint256) {\\n        uint256 elapsed = block.timestamp - deployedAt;\\n        uint256 roundsSinceStart = elapsed / ROUND_DURATION;\\n        uint256 halvingCount = roundsSinceStart / ROUNDS_PER_HALVING;\\n\\n        // Cap at 20 halvings to avoid shifting to zero\\n        if (halvingCount > 20) return 0;\\n\\n        return INITIAL_REWARD_PER_ROUND >> halvingCount;\\n    }\\n\\n    // ============ Transfer Tax ============\\n\\n    /**\\n     * @notice Override _update to apply transfer tax on all non-exempt transfers\\n     * @dev Tax accumulates in this contract; auto-swaps to BNB when threshold is reached\\n     */\\n    function _update(\\n        address from,\\n        address to,\\n        uint256 value\\n    ) internal virtual override {\\n        // Apply tax unless sender or receiver is exempt (or mint/burn)\\n        if (value > 0 && from != address(0) && to != address(0)) {\\n            if (!isTaxExempt[from] && !isTaxExempt[to]) {\\n                uint256 tax = (value * taxBps) / 10000;\\n                uint256 netAmount = value - tax;\\n\\n                // Accumulate tax in this contract (instead of sending to treasury)\\n                super._update(from, address(this), tax);\\n                super._update(from, to, netAmount);\\n\\n                // Auto-swap if conditions are met (try-catch to never block transfers) [C-01 fix]\\n                if (swapEnabled && !_swapping && balanceOf(address(this)) >= swapThreshold) {\\n                    _swapping = true;\\n                    try this.executeSwap(swapThreshold) {} catch {}\\n                    _swapping = false;\\n                }\\n                return;\\n            }\\n        }\\n\\n        super._update(from, to, value);\\n    }\\n\\n    /**\\n     * @notice Execute auto-swap of accumulated AFG tax to BNB. Only callable by this contract.\\n     * @dev External so it can be wrapped in try-catch within _update [C-01 fix]\\n     */\\n    function executeSwap(uint256 amount) external {\\n        if (msg.sender != address(this)) revert OnlySelf();\\n\\n        address[] memory path = new address[](2);\\n        path[0] = address(this);\\n        path[1] = router.WETH();\\n\\n        uint256 balBefore = treasury.balance;\\n\\n        router.swapExactTokensForETHSupportingFeeOnTransferTokens(\\n            amount,\\n            0, // accept any amount of BNB (risk bounded by threshold)\\n            path,\\n            treasury,\\n            block.timestamp\\n        );\\n\\n        emit TaxSwapped(amount, treasury.balance - balBefore);\\n    }\\n\\n    /// @dev Required to receive BNB from router during swap\\n    receive() external payable {}\\n}\\n\",\"keccak256\":\"0x18ea696e442f3128e023d540482adc27a459f1328d99b0925a333f2acbd47da2\",\"license\":\"MIT\"}},\"version\":1}",
  "storageLayout": {
    "storage": [
      {
        "astId": 307,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_balances",
        "offset": 0,
        "slot": "0",
        "type": "t_mapping(t_address,t_uint256)"
      },
      {
        "astId": 313,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_allowances",
        "offset": 0,
        "slot": "1",
        "type": "t_mapping(t_address,t_mapping(t_address,t_uint256))"
      },
      {
        "astId": 315,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_totalSupply",
        "offset": 0,
        "slot": "2",
        "type": "t_uint256"
      },
      {
        "astId": 317,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_name",
        "offset": 0,
        "slot": "3",
        "type": "t_string_storage"
      },
      {
        "astId": 319,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_symbol",
        "offset": 0,
        "slot": "4",
        "type": "t_string_storage"
      },
      {
        "astId": 8,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_owner",
        "offset": 0,
        "slot": "5",
        "type": "t_address"
      },
      {
        "astId": 2220,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_paused",
        "offset": 20,
        "slot": "5",
        "type": "t_bool"
      },
      {
        "astId": 7418,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "router",
        "offset": 0,
        "slot": "6",
        "type": "t_contract(IUniswapV2Router02)7381"
      },
      {
        "astId": 7421,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "totalMined",
        "offset": 0,
        "slot": "7",
        "type": "t_uint256"
      },
      {
        "astId": 7424,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "minter",
        "offset": 0,
        "slot": "8",
        "type": "t_address"
      },
      {
        "astId": 7429,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "isTaxExempt",
        "offset": 0,
        "slot": "9",
        "type": "t_mapping(t_address,t_bool)"
      },
      {
        "astId": 7433,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "taxBps",
        "offset": 0,
        "slot": "10",
        "type": "t_uint256"
      },
      {
        "astId": 7441,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "swapThreshold",
        "offset": 0,
        "slot": "11",
        "type": "t_uint256"
      },
      {
        "astId": 7453,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "swapEnabled",
        "offset": 0,
        "slot": "12",
        "type": "t_bool"
      },
      {
        "astId": 7456,
        "contract": "project/contracts/AFGToken.sol:AFGToken",
        "label": "_swapping",
        "offset": 1,
        "slot": "12",
        "type": "t_bool"
      }
    ],
    "types": {
      "t_address": {
        "encoding": "inplace",
        "label": "address",
        "numberOfBytes": "20"
      },
      "t_bool": {
        "encoding": "inplace",
        "label": "bool",
        "numberOfBytes": "1"
      },
      "t_contract(IUniswapV2Router02)7381": {
        "encoding": "inplace",
        "label": "contract IUniswapV2Router02",
        "numberOfBytes": "20"
      },
      "t_mapping(t_address,t_bool)": {
        "encoding": "mapping",
        "key": "t_address",
        "label": "mapping(address => bool)",
        "numberOfBytes": "32",
        "value": "t_bool"
      },
      "t_mapping(t_address,t_mapping(t_address,t_uint256))": {
        "encoding": "mapping",
        "key": "t_address",
        "label": "mapping(address => mapping(address => uint256))",
        "numberOfBytes": "32",
        "value": "t_mapping(t_address,t_uint256)"
      },
      "t_mapping(t_address,t_uint256)": {
        "encoding": "mapping",
        "key": "t_address",
        "label": "mapping(address => uint256)",
        "numberOfBytes": "32",
        "value": "t_uint256"
      },
      "t_string_storage": {
        "encoding": "bytes",
        "label": "string",
        "numberOfBytes": "32"
      },
      "t_uint256": {
        "encoding": "inplace",
        "label": "uint256",
        "numberOfBytes": "32"
      }
    }
  },
  "userdoc": {
    "kind": "user",
    "methods": {
      "INITIAL_REWARD_PER_ROUND()": {
        "notice": "Initial reward per round: 90M / 2,016 ≈ 44,642 AFG"
      },
      "MAX_SWAP_THRESHOLD()": {
        "notice": "Maximum allowed swap threshold"
      },
      "MAX_TAX_BPS()": {
        "notice": "Maximum allowed tax rate (10%)"
      },
      "MIN_SWAP_THRESHOLD()": {
        "notice": "Minimum allowed swap threshold"
      },
      "ROUNDS_PER_HALVING()": {
        "notice": "Number of rounds per halving period (7 days * 288 rounds/day = 2,016)"
      },
      "ROUND_DURATION()": {
        "notice": "Round duration: 5 minutes"
      },
      "currentRewardPerRound()": {
        "notice": "Current reward per round based on halving schedule"
      },
      "executeSwap(uint256)": {
        "notice": "Execute auto-swap of accumulated AFG tax to BNB. Only callable by this contract."
      },
      "isTaxExempt(address)": {
        "notice": "Addresses exempt from transfer tax (protocol contracts, treasury, etc.)"
      },
      "mint(address,uint256)": {
        "notice": "Mint AFG rewards — only callable by RewardDistributor"
      },
      "minter()": {
        "notice": "Only this address can call mint() — set to RewardDistributor"
      },
      "swapEnabled()": {
        "notice": "Whether auto-swap is enabled"
      },
      "swapThreshold()": {
        "notice": "Minimum accumulated tax to trigger auto-swap"
      },
      "taxBps()": {
        "notice": "Transfer tax rate in basis points (default 300 = 3%, max 1000 = 10%)"
      },
      "totalMined()": {
        "notice": "Total AFG minted via mining"
      }
    },
    "notice": "ERC-20 token for AgentForge protocol   - Total supply cap: 100,000,000 AFG   - 10% (10M) pre-minted to treasury at deploy   - 90% (90M) released via problem-solving mining   - Configurable transfer tax (default 3%), with exempt addresses for protocol contracts   - Halving schedule based on elapsed time since deployment   - Auto-swap: accumulated tax AFG → BNB via PancakeSwap when threshold is reached",
    "version": 1
  }
} as const;