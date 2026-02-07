import {
    SUPPORTED_CHAINS,
    Transaction,
    SwapSafeTokenInformation
} from './types'

// Aclhemy endpoint URLs per chain
const ALCHEMY_ENDPOINTS: Partial<Record<keyof typeof SUPPORTED_CHAINS, string>> = {
    "eth-mainnet": "https://eth-mainnet.g.alchemy.com/v2",
    "base-mainnet": "https://base-mainnet.g.alchemy.com/v2",
    "polygon-mainnet": "https://polygon-mainnet.g.alchemy.com/v2",
    "bnb": "https://bnb-mainnet.g.alchemy.com/v2",
    "arbitrum-mainnet": "https://arb-mainnet.g.alchemy.com/v2",
    // zkSync-Era not supported by alchemy_getAssetTransfers
}

export const ALCHEMY_SUPPORTED_CHAINS = Object.keys(ALCHEMY_ENDPOINTS) as (keyof typeof SUPPORTED_CHAINS)[]
