import { Transaction, MostTransactedToken, GasSpent } from './types'
// Functions needed:
// calculateTotalGasSpent()
// assignNameplates()

export function countTransactionsByChain(transactions: Transaction[]): Record<string, number> {
    const counts: Record<string, number> = {};

    for (const txn of transactions) {
        const key = txn.chainName;
        counts[key] = (counts[key] ?? 0) + 1;
    }
    
    return counts;
}

export function findMostTransactedToken(transactions: Transaction[]): MostTransactedToken | null {
    if (transactions.length === 0) return null;    

    const counts: Record<string, number> = {};
    let maxSymbol: string = "";
    let maxCount: number = 0; 

    for (const txn of transactions) {
        // txn.token returns an array so handle that
        for (const tok of txn.token) {
            const symbol = tok.token;
            
            counts[symbol] = (counts[symbol] ?? 0) + 1;
            
            if (counts[symbol] > maxCount) {
                maxCount = counts[symbol];
                maxSymbol = symbol;
            }
        }
    }

    return {
        symbol: maxSymbol,
        count: maxCount
    };
}

export function countUniqueContracts(transactions: Transaction[]): number {
    const uniqueAddresses = new Set<Address>();

    for (const txn of transactions) {
       uniqueAddresses.add(txn.toAddress); 
    }

    return uniqueAddresses.size;

    // NOW (MVP):
    // Counts unique toAddress values returned by Covalent to display,
    // "unique addresses interacted with."
    //
    // LATER:
    // We should implement either within this or created a separate aggregator to
    // separate: 
    // - dApps from EOAs from token contracts
    // - indirect contract interactions
    // - protocol labeling (i.e. "Uniswap" instead of "0x7a25...")
    //
    // NOTE:
    // Eventually, we'll have to perform an on-chain check to determine exactly what a contract
    // is and will require RPC calls, maintain a map of known dApp addresses, and maybe rely on
    // Covalent to return appropriate labels for known contracts
}

export function countNFTTransfers(transactions: Transaction[]): number {
    let count = 0;

    for (const txn of transactions) {
        if (txn.isNFTTransfer) count ++;
    }

    return count;
}

export function calculateTotalGasSpent(transactions: Transaction[]): Record<string, GasSpent> { 
// transactions.gasSpent will return a structure:
// { native: number, usd: number }
//
// So maybe we:
//  1. make a list of the chain_names from SUPPORTED_CHAINS
//  2. match each transactions chain_name with the GasSpent structure returned from the transaction
//  3. build up a list of chain_names tied to their respective native and usd equivalent gas metrics
}


