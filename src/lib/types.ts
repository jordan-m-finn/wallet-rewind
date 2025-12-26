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

// Needed for extracting data from Covalent's transaction returns
export type Transaction = {
    chainID: (typeof SUPPORTED_CHAINS)[keyof typeof SUPPORTED_CHAINS],
    chainName: keyof typeof SUPPORTED_CHAINS,
    toAddress: Address,
    // Access the token info in the logs of the transaction response returned by Covalent in which
    //   items[i].log_events[j] contains sender_name, sender_contract_ticker_symbol, and sender_address (the token contract)
    //   to verify
    tokenSymbol: string[],
    contractAddress: Address,
    // To detect NFT transfers, we need to access the log event information, "supports_erc" array to determine if it contains "erc721" or "erc1155"
    // OR check if the decoded event (decoded.name, .params) is one of "Transfer", "TransferSingle", or "TransferBatch"
    isNFTTransfer: boolean,
    gasSpent: number,
    // Needed in order to filer by year
    block_signed_at: string
}
