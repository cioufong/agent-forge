/// ----------------------------------------------------------------------------
// Typed Config
// ----------------------------------------------------------------------------
import type { UserConfig } from "rocketh/types";

export const config = {
    accounts: {
        deployer: {
            default: 0,
        },
    },
    data: {},

    chains: {
        1337: {
            info: {
                id: 1337,
                name: "hardhat",
                nativeCurrency: {
                    name: "Ether",
                    symbol: "ETH",
                    decimals: 18
                },
                rpcUrls: {
                    default: {
                        http: ["http://127.0.0.1:8545"],
                    }
                }
            }
        },
        97: {
            info: {
                id: 97,
                name: "bscTestnet",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "tBNB",
                    decimals: 18
                },
                rpcUrls: {
                    default: {
                        http: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                    }
                }
            }
        },
        56: {
            info: {
                id: 56,
                name: "bsc",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18
                },
                rpcUrls: {
                    default: {
                        http: ["https://bsc-dataseed1.binance.org"],
                    }
                }
            }
        }
    }
} as const satisfies UserConfig;

import * as deployExtension from "@rocketh/deploy";
import * as readExecuteExtension from "@rocketh/read-execute";
import * as viemExtension from '@rocketh/viem';

const extensions = {
    ...deployExtension,
    ...readExecuteExtension,
    ...viemExtension,
};
export { extensions };

type Extensions = typeof extensions;
type Accounts = typeof config.accounts;
type Data = typeof config.data;

export type { Extensions, Accounts, Data };
