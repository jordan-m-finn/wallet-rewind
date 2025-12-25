import { type Address } from 'viem'
// RawTransaction - what Covalent returns (will slim down)
// Nameplate - the badges/categories

// Supported chains with their Covalent IDs:
// key (chain_name): value (chain_id)
const SUPPORTED_CHAINS = {
    "eth-mainnet": 1,
    "eth-sepolia": 11155111,
    "base-mainnet": 8453,
    "base-sepolia": 84532,
    "polygon-mainnet": 137,
    "polygon-amoy": 80002,
    "bnb": 56,
    "bnb-testnet": 97,
    "zkSync-Era": 324,
    "zkSync-Era-testnet": 4002,
    "arbitrum-one": 42161,
    "arbitrum-sepolia": 421614,
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

// WalletRecap - your aggregated output
// - The wallet address
// - The year
// - Results from aggregators (transaction by chain, top token, unique contracts, NFT count, gas spent, nameplates)
// - Anything else?
type WalletRecap = {
    address: Address,
    year: number,
    topToken: MostTransactedToken,
    uniqueContracts: number,
    nftCount: number,
    gasSpent: GasSpent,
    nameplates: []
}
