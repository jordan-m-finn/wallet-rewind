import { Transaction, MostTransactedToken } from './types'
// Goal: Take raw txns -> compute most transacted token, tx count, unique contracts interacted with
// Functions needed:
// countTransactionsByChain()
// findMostTransactedToken()
// countUniqueContracts()
// countNFTTransfers()
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

export function findMostTransactedToken(transactions: Transaction[]): MostTransactedToken {
    const counts: Record<string, number> = {};
    let maxSymbol: string = "";
    let maxCount: number = 0; 

    for (count txn of transactions) {
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
