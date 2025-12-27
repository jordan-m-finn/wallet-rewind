import { type Address } from 'viem'
import { SUPPORTED_CHAINS, Transaction, SwapSafeTokenInformation } from './types.ts'
// Goal: fetch transactions for a single address on one chain (start with Ethereum mainnet)
// 1. `getTransactions(chainSlug: string, address: string, year: number)` — fetches paginated transactions within date range
// 2. `getTransactionsAllChains(address: string, year: number)` — fans out to all chains, returns combined
// Note:
//  Covalent's v3 endpoint we'll hit is GET https://api.covalenthq.com/v1/{chainSlug}/address/{address}/transactions_v3

function extractTokenInfo(logEvents: any[]): SwapSafeTokenInformation[] {
    const map = new Map<string, SwapSafeTokenInformation>();

    for (const log of logEvents) {
        if (!log.sender_address) continue;

        const key = log.sender_address.toLowerCase();

        if (!map.has(key)) {
            map.set(key, {
                token: log.sender_contract_ticker_symbol ?? log.sender_name ?? "UNKNOWN",
                contractAddress: log.sender_address
            });
        }
    }

    return Array.from(map.values());
}

function detectNFT(logEvents: any[]): boolean {
    for (const log of logEvents) {
        // check supports_erc array
        if (log.supports_erc?.includes("erc721") || log.supports_erc?.includes("erc1155")) {
            return true;
        }
    }
    
    return false;
}

export async function getTransactions(
    chainSlug: keyof typeof SUPPORTED_CHAINS,
    address: Address,
    year: number
): Promise<Transaction[]> {
    const apiKey = process.env.COVALENT_API_KEY;
    const baseUrl = `https://api.covalenthq.com/v1/${chainSlug}/address/${address}/transactions_v3/`;
   
    let filteredTransactions: Transaction[] = [];

    // 1. fetch from Covalent (handle pagination)
    try {
        const covalentResponse = await fetch(baseUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const response = await covalentResponse.json();
        
        // Since these are unique at the response level and not the item level, we'll capture them here
        const { chain_id, chain_name, items } = response.data;
    
        for (const item of items) {
            // 2, Filter by year first
            // convert covalent timestamp -> JS Date
            const txYear = new Date(item.block_signed_at).getFullYear();
            if (txYear !== year) continue;
            
            // 3. Extract processed fields 
            const tokenInfo = extractTokenInfo(item.log_events);
            const isNFT = detectNFT(item.log_events);

            // 4. compute gas
            const gasSpentNative = (Number(item.gas_spent) * Number(item.gas_price)) / 1e18;
            const gasSpentUSD = Number(item.gas_quote) || 0;
            
            // 5. Push the formatted Transaction object 
            filteredTransactions.push({
                chainID: chain_id,
                chainName: chain_name,
                toAddress: item.to_address,
                token: tokenInfo,
                isNFTTransfer: isNFT, 
                gasSpent: {
                    native: gasSpentNative,
                    usd: gasSpentUSD,
                },
                block_signed_at: item.block_signed_at,
            });
        }
    } catch (error) {
        console.error(error);
    }

    // 6. return the array of transactions
    return filteredTransactions;

}
