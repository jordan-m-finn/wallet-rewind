import { getAddress } from 'viem'
import { getWalletRecap } from '@/lib/recap'
import { AddressInput } from '@/components/AddressInput'

// POST-MVP: Remove once Solana is supported
function isSolanaAddress(address: string): boolean {
    // Solana addresses: 32-44 chars, base58 (no 0, O, I, l), no 0x prefix
    if (address.startsWith('0x')) return false;
    if (address.length < 32 || address.length > 44) return false;
    
    // Base58 character set (excludes 0, O, I, l)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    return base58Regex.test(address);
}

export default async function RecapPage({
    params,
    searchParams
}: {
    params: Promise<{ address: string }>,
    searchParams: Promise<{ year?: string }>
}) {
    const { address } = await params;
    
    // Delete later
    console.log("Address from params:", address, "Length:", address.length);

    const { year: yearParam } = await searchParams;

    let validatedAddress;
    try {
        validatedAddress = getAddress(address);
    } catch {
        // Check if it looks like a Solana address
        if (isSolanaAddress(address)) {
            return (
                <div>
                    <AddressInput error="Solana addresses aren't supported yet. Please try an Ethereum, Base, or Polygon address." />
                </div>
            )
        }

        return (
            <div>
                <AddressInput error="Invalid wallet address" />
            </div>
        )
    }

    const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear(); 
    const recap = await getWalletRecap(validatedAddress, year);
    
    return (
        <div>
            <AddressInput />
            <pre>{JSON.stringify(recap, null, 2)}</pre>
        </div>
    )
}
