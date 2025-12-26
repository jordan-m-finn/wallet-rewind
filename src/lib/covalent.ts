import { type Address } from 'viem'
// Goal: fetch transactions for a single address on one chain (start with Ethereum mainnet)
// 1. `getTransactions(chainSlug: string, address: string, year: number)` — fetches paginated transactions within date range
// 2. `getTransactionsAllChains(address: string, year: number)` — fans out to all chains, returns combined
// Note:
//  Covalent's v3 endpoint we'll hit is GET https://api.covalenthq.com/v1/{chainSlug}/address/{address}/transactions_v3

export async function getTransactions(
    chainSlug: keyof typeof SUPPORTED_CHAINS,
    address: Address,
    year: number
): Promise<Transaction[]> {
    
}
