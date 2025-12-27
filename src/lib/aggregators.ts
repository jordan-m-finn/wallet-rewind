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
