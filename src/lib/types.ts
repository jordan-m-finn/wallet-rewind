import { type Address } from 'viem'
// RawTransaction - what Covalent returns (will slim down)?
// Nameplate - the badges/categories?

// Supported chains with their Covalent IDs:
// key (chain_name): value (chain_id)
const SUPPORTED_CHAINS = {
    "eth-mainnet": 1,
    "base-mainnet": 8453,
    "polygon-mainnet": 137,
    "bnb": 56,
    "zkSync-Era": 324,
    "arbitrum-mainnet": 42161,
}

// Aggregator function return types
type MostTransactedToken = {
    symbol: string,
    count: number
}

type GasSpent = {
    native: number,
    usd: number
}

// WalletRecap
type WalletRecap = {
    address: Address,
    year: number,
    topToken: MostTransactedToken,
    uniqueContracts: number,
    nftCount: number,
    gasSpent: Record<string, GasSpent>,
    nameplates: string[],
    transactionByChain: Record<string, number> 
}
