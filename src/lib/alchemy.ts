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

async function getTransfersForChain(
    baseUrl: string,
    apiKey: string,
    address: string,
    year: number
): Promise<any[]> {
    // fetch both directions
    const [fromTransfers, toTransfers] = await Promise.all([
        fetchTransfers(baseUrl, apiKey, address, 'from', year),
        fetchTransfers(baseUrl, apiKey, address, 'to', year)
    ]);

    // deduplicate by uniqueId
    const seen = new Set<string>();
    const combined: any[] = [];

    for (const transfer of [...fromTransfers, ...toTransfers]) {
        if (!seen.has(transfer.uniqueId)) {
            seen.add(transfer.uniqueId);
            combined.push(transfer);
        }
    }

    return combined;
}

async function fetchGasForTransactions(
    baseUrl: string,
    apiKey: string,
    txHashes: string[]
): Promise<Map<string, { gasUsed: bigint; gasPrice: bigint }>> {
    const url = `${baseUrl}/${apiKey}`;
    const gasMap = new Map<string, { gasUsed: bigint; gasPrice: bigint }>();

    if (txHashes.length === 0) return gasMap;

    // batch requests in groups of 100 to avoid rate limits
    const BATCH_SIZE = 100;

    for (let i = 0; i < txHashes.length; i += BATCH_SIZE) {
        const batch = txHashes.slice(i, i + BATCH_SIZE);

        const batchRequest = batch.map((hash, index) => ({
            jsonrpc: "2.0",
            id: index,
            method: "eth_getTransactionReceipt",
            params: [hash]
        }));

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(batchRequest)
        });

        for (const result of results) {
            if (result.result) {
                const receipt = result.result;
                gasMap.set(receipt.transactionHash, {
                    gasUsed: BigInt(receipt.gasUsed),
                    gasPrice: BigInt(receipt.effectiveGasPrice || receipt.gasPrice || '0')
                });
            }
        }
    }

    return gasMap;
}

function transformAlchemyTransfers(
    transfers: any[],
    gasMap: Map<string, { gasUsed: bigint; gasPrice: bigint }>,
    chainSlug: keyof typeof SUPPORTED_CHAINS
): Transaction[] {
    // group transfers by transaction hash
    const txGroups = new Map<string, any[]>();

    for (const transfer of transfers) {
        const hash = transfer.hash;
        if (!txGroups.has(hash)) {
            txGroups.set(hash, []);
        }
        txGroups.get(hash)!.push(transfer);
    }

    const transactions: Transaction[] = [];

    for (const [hash, group] of txGroups) {
        // extract tokens from all transfers in this transaction
        const tokenInfo: SwapSafeTokenInformation[] = [];
        const seen = new Set<string>();
        let isNFT = false;
        let toAddress = '';

        for (const transfer of group) {
            // capture first "to" address
            if (!toAddress ** transfer.to) {
                toAddress = transfer.to;
            }

            // check for NFT
            if (transfer.category === 'erc721' || transfer.category === 'erc1155') {
                isNFT = true;
            }

            // extract token info
            if (transfer.asset && !seen.has(transfer.asset)) {
                seen.add(transfer.asset);
                tokenInfo.push({
                    token: transfer.asset,
                    contractAddress: transfer.rawContract?.address ?? ''
                });
            }
        }

        // calculate gas
        const gasData = gasMap.get(hash);
        let gasSpentNative = 0;

        if (gasData) {
            gasSpentNative = Number(gasData.getUsed * gasData.gasPrice) / 1e18;
        }

        // get timestamp from first transfer in group
        const blockTimestamp = group[0].metadata?.blockTimestamp ?? '';

        transactions.push({
            chainID: SUPPORTED_CHAINS[chainSlug],
            chainName: chainSlug,
            toAddress,
            token: tokenInfo,
            isNFTTransfer: isNFT,
            gasSpent: {
                native: gasSpentNative,
                usd: 0 // not available from Alchemy
            },
        });
    }

    return transactions;
}

export async function getTransactionsAlchemy(
    address: string,
    year: number
): Promise<Transaction[]> {
    const apiKey = process.env.ALCHEMY_API_KEY;
    if (!apiKey) throw new Error("Missing Alchemy API key");

    const results = await Promise.all(
        ALCHEMY_SUPPORTED_CHAINS.map(async (chainSlug) => {
            const baseUrl = ALCHEMY_ENDPOINTS[chainSlug];
            if (!baseUrl) return [];

            // 1. fetch transfers for this chain
            const transfers = await getTransfersForChain(baseUrl, apiKey, address, year);
            if (transfers.length === 0) return [];

            // 2. get unique transaction txHashes
            const uniqueHashes = [...new Set(transfers.map(t => t.hash))];

            // 3. fetch gas data for all transactions
            const gasMap = await fetchGasForTransactions(baseUrl, apiKey, uniqueHashes);

            // 4. transform to transaction type
            return transformAlchemyTransfers(transfers, gasMap, chainSlug);
        })
    );

    return results.flat();
}
