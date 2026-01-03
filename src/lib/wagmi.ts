import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
    mainnet,
    base,
    polygon,
    bsc,
    zkSync,
    arbitrum
} from 'wagmi/chains'

export const config = getDefaultConfig({
    appName: 'WalletRewind',
    // POST-MVP: Add proper validation instead of just using the '!'
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_CLOUD_PROJECT_ID!,
    chains: [mainnet, base, polygon, bsc, zkSync, arbitrum],
    ssr: true
})
