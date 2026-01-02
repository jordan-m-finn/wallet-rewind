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
import { WalletRecap, Transaction } from '@/lib/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { address: string } }
) {   
    // 1. Validate addressva
    let validatedAddress;
    try {
        validatedAddress = getAddress(params.address);
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
    let transactions: Transaction[] = getTransactionsAllChains(validatedAddress, year);

    // 4. Run aggregators
    
    // 5. Build and return WalletRecap

    // modify
    return NextResponse.json({ data: "something" });
}
