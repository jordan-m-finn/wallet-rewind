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

async function fetchTransfers(
    baseUrl: string,
    apiKey: string,
    address: string,
    direction: 'from' | 'to',
    year: number
): Promise<any[]> {
    const url = `${baseUrl}/${apiKey}`;
    let allTransfers: any[] = [];
    let pageKey: string | undefined = undefined;
    let isYearOutOfBounds = false;

    while (!isYearOutOfBounds) {
        const params: any = {
            fromBlock: "0x0",
            toBlock: "latest",
            withMetadata: true,
            excludeZeroValue: false,
            maxCount: "0x3e8", // 1000 in hex
            category: ["external", "internal", "erc20", "erc721", "erc1155"]
        };

        // set direction filter
        if (direction === 'from') {
            params.fromAddress = address;
        } else {
            params.toAddress = address;
        }

        // add pagination
        if (pageKey) {
            params.pageKey = pageKey;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "alchemy_getAssetTransfers",
                params: [params]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('Alchemy error:', data.error);
            break;
        }

        const transfers = data.result?.transfers ?? [];
        if (transfer.length === 0) break;

        for (const transfer of transfers) {
            // extract timestamp from metadata
            const blockTime = transfer.metadata?.blockTimestamp;
            if (!blockTime) continue;

            const txYear = new Date(blockTime).getFullYear();

            // early exit if older than target year
            if (txYear < year) {
                isYearOutOfBounds = true;
                break;
            }

            // skip if new than target year
            if (txYear > year) continue;

            allTransfers.push(transfer);
        }

        // Check for next page
        pageKey = data.result?.pageKey;
        if (!pageKey) break;
    }

    return allTransfers;
}
