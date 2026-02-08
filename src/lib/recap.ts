import { getTransactionsAllChains } from './covalent'
import { getTransactionsAlchemy } from './alchemy'
import { getSolanaTransactions } from './helius.ts'
import {
    countTransactionsByChain,
    findMostTransactedToken,
    countUniqueContracts,
    countNFTTransfers,
    calculateTotalGasSpent,
    assignNameplates
} from './aggregators.ts'
import { WalletRecap, RecapStats, Transaction } from './types'
import isSolanaAddress from './address'

async function getEVMTransactions(address: string, year: number): Promise<Transaction[]> {
    // try alchemy first
    try {
        console.log('Attempting Alchemy...');
        const transactions = await getTransactionsAlchemy(address, year);
        console.log(`Alchemy succeeded: ${transactions.length} transactions`);
        return transactions;
    } catch (error) {
        console.error('Alchemy failed:', error);
    }
    
    // fall back to Covalent
    try {
        console.log('Falling back to Covalent...');
        const transactions = await getTransactionsAllChains(address, year);
        console.log(`Covalent succeeded: ${transactions.length} transactions`);
        return transactions;
    } catch (error) {
        console.error('Covalent failed:', error);
    }

    // both failed - throw error to propagate to UI
    throw new Error('Unable to fetch transaction data. Please try again later.');
}

export async function getWalletRecap(address: Address, year: number): Promise<WalletRecap> {
    
    // Fetch transactions based on address type
    let transactions: Transaction[];

    if (isSolanaAddress(address)) {
        transactions = await getSolanaTransactions(address, year);
    } else {
        transactions = await getEVMTransactions(address, year);
    }

    //Run aggregators
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

    // Build and return WalletRecap
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
