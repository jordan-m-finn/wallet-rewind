// Goal: Fetch + aggregate txn data
import { NextRequest, NextResponse } from 'next/server'
import { getAddress } from 'viem'
import { getTransactionsAllChains } from '@/lib/covalent'
import {
    countTransactionsByChain,
    findMostTransactedToken,
    countUniqueContracts,
    countNFTTransfers,
    calculateTotalGasSpent,
    assignNameplates
} from '@/lib/aggregators'
import { WalletRecap, Transaction, MostTransactedToken, GasSpent, RecapStats } from '@/lib/types'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ address: string }> }
) {  
    const { address } = await params;

    // 1. Validate addressva
    let validatedAddress;
    try {
        validatedAddress = getAddress(address);
    } catch {
        return NextResponse.json(
            { error: "Invalid address" },
            { status: 400 }
        );
    }

    // 2. Get year from query params (default to current year)
    const yearParam = request.nextUrl.searchParams.get("year");
    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

    // 3. Fetch transactions
    const transactions: Transaction[] = await getTransactionsAllChains(validatedAddress, year);

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
        address: validatedAddress,
        year,
        topToken,
        uniqueContracts,
        nftCount,
        gasSpent,
        nameplates,
        transactionsByChain
    }

    // modify
    return NextResponse.json({ data: walletRecap });
}
