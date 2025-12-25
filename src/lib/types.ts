import { type Address } from 'viem'
// RawTransaction - what Covalent returns (will slim down)?
// Nameplate - the badges/categories?

// Supported chains with their Covalent IDs:
// key (chain_name): value (chain_id)
export const SUPPORTED_CHAINS = {
    "eth-mainnet": 1,
    "base-mainnet": 8453,
    "polygon-mainnet": 137,
    "bnb": 56,
    "zkSync-Era": 324,
    "arbitrum-mainnet": 42161,
} as const

// Aggregator function return types
export type MostTransactedToken = {
    symbol: string,
    count: number
}

export type GasSpent = {
    native: number,
    usd: number
}

// WalletRecap
export type WalletRecap = {
    address: Address,
    year: number,
    topToken: MostTransactedToken,
    uniqueContracts: number,
    nftCount: number,
    gasSpent: Record<string, GasSpent>,
    nameplates: string[],
    transactionByChain: Record<string, number> 
}
