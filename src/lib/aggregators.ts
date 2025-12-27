// Goal: Take raw txns -> compute most transacted token, tx count, unique contracts interacted with
// Functions needed:
// countTransactionsByChain()
// findMostTransactedToken()
// countUniqueContracts()
// countNFTTransfers()
// calculateTotalGasSpent()
// assignNameplates()

export function countTransactionsByChain(_transactions: Transaction[]): Record<string, number> {
    const counts: Record<string, number> = {};
    // loop
    for (let i = 0; i < _transactions.chainName.size; i++) {
        counts[key] = (counts[key] ?? 0) + 1;
    }
}
