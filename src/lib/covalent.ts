import { type Address } from 'viem'
import { SUPPORTED_CHAINS, Transaction } from './types.ts'
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
        const covalentResponse = await fetch(baseUrl);
        const transaction = await covalentResponse.json();
       
        // instead of console, handle paginated data 
        const filteredTransactionData = extractFilteredResponse(transaction);
    
        for (const item of filtered.items) {
            // convert covalent timestamp -> JS Date
            const txYear = new Date(item.block_signed_at).getFullYear();

            // To gather a particular year's txn data
            if (txYear === year) {
                filteredTransactions.push({
                    chain_id: filteredTransactionData.chain_id,
                    chain_name: filteredTransactionData.chain_name,
                    ...item,
                } as Transaction);
            }
        }

        // remove logs later
        console.log("\nTransaction response:");
        console.log(transaction);
        console.log("\nTransaction response filtered:");
        console.log(filteredTransactionData);

    } catch (error) {
        console.error(error);
    }

    return filteredTransactions;
    // 2. filter transactions to only include those from 'year'
     

    // 3. transform Covalent's response into the Transaction type
    // 4. return the array of transactions

}
