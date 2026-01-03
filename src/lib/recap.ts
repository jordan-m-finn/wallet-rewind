import { type Address } from 'viem'
import { getTransactionsAllChains } from './covalent'
import {
    countTransactionsByChain,
    findMostTransactedToken,
    countUniqueContracts,
    countNFTTransfers,
    calculateTotalGasSpent,
    assignNameplates
} from './aggregators.ts'
import { WalletRecap, RecapStats, Transaction } from './types'

export async function getWalletRecap(address: Address, year: number): Promise<WalletRecap> {
    // Fetch transactions
    // Run aggregators
    // Build and return WalletRecap
    
    // 3. Fetch transactions
    const transactions: Transaction[] = await getTransactionsAllChains(address, year);

    // 4. Run aggregators
    const transactionsByChain = countTransactionsByChain(transactions);
    const topToken = findMostTransactedToken(transactions);
    const uniqueContracts = countUniqueContracts(transactions);
    const nftCount = countNFTTransfers(transactions);
    const gasSpent = calculateTotalGasSpent(transactions);
   
    const stats: RecapStats = {
        transactionsByChain,
        nftCount,
        gasSpent
    }

    const nameplates = assignNameplates(stats);

    // 5. Build and return WalletRecap
    const walletRecap: WalletRecap = {
        address,
        year,
        topToken,
        uniqueContracts,
        nftCount,
        gasSpent,
        nameplates,
        transactionsByChain
    }

    return walletRecap;
}
