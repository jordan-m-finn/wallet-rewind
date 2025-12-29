import { type Address } from 'viem'
import { SUPPORTED_CHAINS, Transaction, SwapSafeTokenInformation } from './types.ts'

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
    if (!apiKey) throw new Error("Missing Covalent API key");
    
    // LATER: Revisit and make secure so that API keys are never exposed
    const baseUrl = `https://api.covalenthq.com/v1/${chainSlug}/address/${address}/transactions_v3/`;
    let nextUrl: string | null = baseUrl;

    let filteredTransactions: Transaction[] = [];

    // flag for exiting based on year
    let isYearOutOfBounds = false;

    // 1. fetch from Covalent (handle pagination)
    while(nextUrl && !isYearOutOfBounds) {
        const covalentResponse = await fetch(nextUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const response = await covalentResponse.json();
        
        // Since these are unique at the response level and not the item level, we'll capture them here
        const data = response.data;
        if (!data || !Array.isArray(data.items)) break;
        const { chain_id, chain_name, items } = data;
    
        for (const item of items) {
            // 2, Filter by year first
            // convert covalent timestamp -> JS Date
            const txDate = new Date(item.block_signed_at);
            const txYear = txDate.getFullYear();
           
            // Early Exit: older than target year -> stop everything
            if (txYear < year) {
                isYearOutOfBounds = true;
                break;
            }

            // skip newer years but continue scanning
            if (txYear > year) continue;

            // 3. Extract processed fields 
            const tokenInfo = extractTokenInfo(item.log_events);
            const isNFT = detectNFT(item.log_events);

            // 4. compute gas
            const gasSpentNative = (Number(item.gas_spent) * Number(item.gas_price)) / 1e18;
            const gasSpentUSD = Number(item.gas_quote) || 0;
            
            // 5. Push the formatted Transaction object 
            filteredTransactions.push({
                chainID: chain_id as (typeof SUPPORTED_CHAINS)[keyof typeof SUPPORTED_CHAINS],
                chainName: chain_name as keyof typeof SUPPORTED_CHAINS,
                toAddress: item.to_address as Address,
                token: tokenInfo,
                isNFTTransfer: isNFT, 
                gasSpent: {
                    native: gasSpentNative,
                    usd: gasSpentUSD,
                },
                block_signed_at: item.block_signed_at,
            });
        }
        
        // Check for / get next page
        nextUrl = response.links?.next ?? null;
    } 

    // 6. return the array of transactions
    return filteredTransactions;
}

// Fans out to all chains in SUPPORTED_CHAINS and combines the result into a single array
export async function getTransactionsAllChains(
    address: Address,
    year: number
): Promise<Transaction[]> {
    const chains = Object.keys(SUPPORTED_CHAINS) as (keyof typeof SUPPORTED_CHAINS)[];

    const results = await Promise.all(
        chains.map(chain => getTransactions(chain, address, year))
    );
    
    // Flattens our nested array by one level turning [][] into []
    return results.flat();
}
