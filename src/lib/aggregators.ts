import { type Address } from 'viem'
import { Transaction, MostTransactedToken, GasSpent, RecapStats } from './types'
// Functions needed:
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

    const spent: Record<string, GasSpent> = {};

    for (const txn of transactions) {
        const key = txn.chainName;

        if (!spent[key]) {
            spent[key] = { native: 0, usd: 0 }
        }

        spent[key].native += txn.gasSpent.native;
        spent[key].usd += txn.gasSpent.usd;
    }
    
    return spent;
}

export function assignNameplates(stats: RecapStats): string[] {
// MVP Nameplates (subject to change):
    // "DeFi Degen" ~ High txn count on DeFi chains
    // "NFT Collector" ~ High NFT transfer count
    // "Gas Guzzler" ~ Spent a lot on gas
    // "Chain Hopper" ~ Active on many different chains
    // (Post-MVP) "Diamond Hands" ~ Per token where the user has never sold and only ever bought more of (holding, not trading)

    const NAMEPLATE_PRIORITY = [
        "Gas Guzzler",
        "NFT Collector",
        "Chain Hopper",
        "DeFi Degen"
    ];
    
    const nameplates: string[] = [];

    // 1. Compute total gas spent (USD)
    let totalGasUsd = 0;
    for (const chain in stats.gasSpent) {
        totalGasUsd += stats.gasSpent[chain].usd;
    }

    // 2. Count active chains
    const activeChains = Object.keys(stats.transactionsByChain).filter(
        chain => stats.transactionsByChain[chain] > 0
    ).length;

    // 3. Compute DeFi transactions
    let totalTransactions = 0;

    for (const chain in stats.transactionsByChain) {
        totalTransactions += stats.transactionsByChain[chain] ?? 0;
    }

    // ============ ASSIGN NAMEPLATES =========== //

    // Gas Guzzler
    if (totalGasUsd > 500) nameplates.push("Gas Guzzler");

    // NFT Collector
    if (stats.nftCount > 10) nameplates.push("NFT Collector");

    // Chain Hopper
    if (activeChains >= 3) nameplates.push("Chain Hopper");

    // DeFi Degen
    if (totalTransactions >= 100) nameplates.push("DeFi Degen");

    // Sort by priority
    nameplates.sort(
        (a, b) => NAMEPLATE_PRIORITY.indexOf(a) - NAMEPLATE_PRIORITY.indexOf(b)
    );

    return nameplates;
}
