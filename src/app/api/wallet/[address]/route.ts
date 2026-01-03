// Goal: Fetch + aggregate txn data
import { NextRequest, NextResponse } from 'next/server'
import { getAddress } from 'viem'
import { getWalletRecap } from '@/lib/recap'

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

    const walletRecap = await getWalletRecap(validatedAddress, year);

    return NextResponse.json({ data: walletRecap });
}
