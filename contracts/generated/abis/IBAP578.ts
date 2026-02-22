export type Abi_IBAP578 = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "logicAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "ActionExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "funder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "AgentFunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newLogic",
        "type": "address"
      }
    ],
    "name": "LogicUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "MetadataUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum IBAP578.Status",
        "name": "newStatus",
        "type": "uint8"
      }
    ],
    "name": "StatusChanged",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "executeAction",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "fundAgent",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getAgentMetadata",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "persona",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "experience",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "voiceHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "animationURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "vaultURI",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "vaultHash",
            "type": "bytes32"
          }
        ],
        "internalType": "struct IBAP578.AgentMetadata",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getState",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "enum IBAP578.Status",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "logicAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "lastActionTimestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct IBAP578.State",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "setLogicAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "terminate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "persona",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "experience",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "voiceHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "animationURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "vaultURI",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "vaultHash",
            "type": "bytes32"
          }
        ],
        "internalType": "struct IBAP578.AgentMetadata",
        "name": "metadata",
        "type": "tuple"
      }
    ],
    "name": "updateAgentMetadata",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export const Abi_IBAP578: Abi_IBAP578 = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "logicAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "ActionExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "funder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "AgentFunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newLogic",
        "type": "address"
      }
    ],
    "name": "LogicUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "MetadataUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum IBAP578.Status",
        "name": "newStatus",
        "type": "uint8"
      }
    ],
    "name": "StatusChanged",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "executeAction",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "fundAgent",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getAgentMetadata",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "persona",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "experience",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "voiceHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "animationURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "vaultURI",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "vaultHash",
            "type": "bytes32"
          }
        ],
        "internalType": "struct IBAP578.AgentMetadata",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getState",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "enum IBAP578.Status",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "logicAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "lastActionTimestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct IBAP578.State",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "logic",
        "type": "address"
      }
    ],
    "name": "setLogicAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "terminate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "persona",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "experience",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "voiceHash",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "animationURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "vaultURI",
            "type": "string"
          },
          {
            "internalType": "bytes32",
            "name": "vaultHash",
            "type": "bytes32"
          }
        ],
        "internalType": "struct IBAP578.AgentMetadata",
        "name": "metadata",
        "type": "tuple"
      }
    ],
    "name": "updateAgentMetadata",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
