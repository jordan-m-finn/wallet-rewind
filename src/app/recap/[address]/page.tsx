import { getAddress } from 'viem'
import { getWalletRecap } from '@/lib/recap'
import { AddressInput } from '@/components/AddressInput'

export default async function RecapPage({
    params,
    searchParams
}: {
    params: Promise<{ address: string }>,
    searchParams: Promise<{ year?: string }>
}) {
    const { address } = await params;
    const { year: yearParam } = await searchParams;

    let validatedAddress = string;
    
    if (isSolanaAddress(address)) {
        validatedAddress = address;
    } else {
        try {
            validatedAddress = getAddress(address);
        } catch {
            return (
                <div>
                    <AddressInput error="Invalid wallet address" />
                </div>
            )
        }
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
