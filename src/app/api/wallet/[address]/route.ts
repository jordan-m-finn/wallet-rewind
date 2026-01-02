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
import { WalletRecap } from '@/lib/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { address: string } }
) {
    // 1. Validate address
    // 2. Get year from query params (default to current year)
    // 3. Fetch transactions
    // 4. Run aggregators
    // 5. Build and return WalletRecap
    
    const validatedAddress = getAddress(address);
    const currentYear = request.nextUrl.searchParams(); // verify
    
    // modify
    return NextResponse.json({ data: "something" });
}
