import { type Address } from 'viem'
import { SUPPORTED_CHAINS, Transaction, SwapSafeTokenInformation } from './types.ts'
// Goal: fetch transactions for a single address on one chain (start with Ethereum mainnet)
// 1. `getTransactions(chainSlug: string, address: string, year: number)` — fetches paginated transactions within date range
// 2. `getTransactionsAllChains(address: string, year: number)` — fans out to all chains, returns combined
// Note:
//  Covalent's v3 endpoint we'll hit is GET https://api.covalenthq.com/v1/{chainSlug}/address/{address}/transactions_v3

// Helper function to extract particular fields within the transactions response from Covalent in getTransactions()
// make a custom returned type later for additional safety?
function extractFilteredResponse(response: any): any {
    return {
        chain_id: response.chain_id,
        chain_name: response.chain_name,
        items: response.items.map((item: any) => ({
            to_address: item.to_address,
            log_events: item.log_events.map((log: any) => ({
                sender_name: log.sender_name,
                sender_contract_ticker_symbol: log.sender_contract_ticker_symbol,
                sender_address: log.sender_address,
                decoded: {
                    name: log.decoded?.name || "",
                    params: log.decoded?.params || [],
                },
            })),
            gas_spent: item.gas_spent,
            gas_price: item.gas_price,
            gas_quote: item.gas_quote,
            block_signed_at: item.block_signed_at,
        })),
    };
}

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

        // check decoded event names
        const name = log.decoded?.name;
        if (!name) continue;

        if (name === "Transfer" || name === "TransferSingle" || name === "TransferBatch") {
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
        const transaction = await covalentResponse.json();
    
        for (const item of covalentResponse.items) {
            // 2, Filter by year first
            // convert covalent timestamp -> JS Date
            const txYear = new Date(item.block_signed_at).getFullYear();
            if (txYear !== year) continue;
            
            // 3. Extract processed fields 
            const filteredTransactionData = extractFilteredResponse(item);
            const tokenInfo = extractTokenInfo(item.log_events);
            const isNFT = detectNFT(item.log_events);

            // 4. compute gas
            const gasSpentNative = (Number(item.gas_spent) * Number(item.gas_price)) / 1e18;
            const gasSpentUSD = Number(item.gas_quote) || 0;
            
            // 5. Push the formatted Transaction object 
            filteredTransactions.push({
                chainID: filteredTransactionData.chain_id,
                chainName: filteredTransactionData.chain_name,
                toAddress: filteredTransactionData.to_address,
                token: tokenInfo,
                isNFTTransfer: isNFT, 
                gasSpent: {
                    native: gasSpentNative,
                    usd: gasSpentUSD,
                },
                block_signed_at: item.block_signed_at,
            });
        }

        // remove logs later
        console.log("\nTransaction response:");
        console.log(transaction);
        console.log("\nTransaction response filtered:");
        console.log(filteredTransactionData);

    } catch (error) {
        console.error(error);
    }

    // 6. return the array of transactions
    return filteredTransactions;

}
