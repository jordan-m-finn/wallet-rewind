'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'

export function AddressInput({ error }: { error?: string }) {
    const [address, setAddress] = useState('')
    const router = useRouter()
    const { address: connectedAddress, isConnected } = useAccount()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (address.trim()) {
            router.push(`/recap/${address.trim()}`)
        }
    }

    const handleViewMyRecap = () => {
        if (connectedAddress) {
            router.push(`/recap/${connectedAddress}`)
        }
    }

    return (
        <div>
            {isConnected && (
                <button onClick={handleViewMyRecap}>
                    View My Recap
                </button>
            )}

            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeHolder="Enter wallet address (0x...)"
                />
                <button type="submit">View Recap</button>
            </form>
        </div>
    )
}
