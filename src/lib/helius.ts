import { SUPPORTED_CHAINS, Transaction, SwapSafeTokenInformation } from './types'

// fetch token metadata for a list of mint addresses
async function getTokenMetadata(mints: string[], apiKey: string): Promise<Map<string, string>> {
    const mintToSymbol = new Map<string, string>();

    if (mints.length === 0) return mintToSymbol;

    const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
    
    const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'token-metadata',
            method: 'getAssetBatch',
            params: {
                ids: mints
            }
        })
    });

    const data = await response.json();

    if (data.result) {
        for (const asset of data.result) {
            if (asset?.id && asset?.content?.metadata?.symbol) {
                mintToSymbol.set(asset.id, asset.content.metadata.symbol);
            }
        }
    }

    return mintToSymbol;
}

export async function getSolanaTransactions(
    address: string,
    year: number
): Promise<Transaction[]> {
    const apiKey = process.env.HELIUS_API_KEY;
    if (!apiKey) throw new Error("Missing Helius API key");

    const baseUrl = `https://api-mainnet.helius-rpc.com/v0/addresses/${address}/transactions`;

    let transactions: Transaction[] = [];
    let beforeSignature: string | null = null;
    let isYearOutOfBounds = false;

    while (!isYearOutOfBounds) {
        // Build URl with pagination
        const url = beforeSignature
            ? `${baseUrl}?api-key=${apiKey}&before=${beforeSignature}`
            : `${baseUrl}?api-key=${apiKey}`;

        const response = await fetch(url);
        const items = await response.json();

        // Empty response means we've reached the end
        if (!items || items.length === 0) break;

        for (const item of items) {
            // Convert Unix timestamp to Date
            const txDate = new Date(item.timestamp * 1000);
            const txYear = txDate.getFullYear();

            // Early exit if we've gone past our target year
            if (txYear < year) {
                isYearOutOfBounds = true;
                break;
            }

            // Skip if newer than target year
            if (txYear > year) continue;

            // Transform to our Transaction type
            transactions.push(transformHeliusTransaction(item));
        }

        // Set up pagination - use last transaction's signature
        beforeSignature = items[items.length - 1]?.signature ?? null;
    }

    // collect unique mints from all transactions
    const uniqueMints = new Set<string>();
    for (const tx of transactions) {
        for (const tokenInfo of tx.token) {
            uniqueMints.add(tokenInfo.contractAddress);
        }
    }

    // fetch token metadata and update symbols
    if (uniqueMints.size > 0) {
        const mintToSymbol = await getTokenMetadata(Array.from(uniqueMints), apiKey);
        
        for (const tx of transactions) {
            for (const tokenInfo of tx.token) {
                const symbol = mintToSymbol.get(tokenInfo.contractAddress);
                if (symbol) {
                    tokenInfo.token = symbol;
                }
            }
        }
    }
    
    return transactions;
}

function transformHeliusTransaction(item: any): Transaction {
    const tokenInfo: SwapSafeTokenInformation[] = [];

    if (item.tokenTransfers && Array.isArray(item.tokenTransfers)) {
        const seen = new Set<string>();

        for (const transfer of item.tokenTransfers) {
            if (transfer.mint && !seen.has(transfer.mint)) {
                seen.add(transfer.mint);
                tokenInfo.push({
                    // Mint address for now, not symbol (add lookup later)
                    token: transfer.mint,
                    contractAddress: transfer.mint
                });
            }
        }
    }

    // Detect NFT transfer from events
    const isNFT = !!item.events?.nft;

    // Fee is in lamports (1 SOL = 1e9 lamports)
    const gasSpentNative = item.fee / 1e9; 

    // Extract "to" address - first recipient from transfers
    let toAddress = '';
    if (item.nativeTransfers?.length > 0) {
        toAddress = item.nativeTransfers[0].toUserAccount ?? '';
    } else if (item.tokenTransfers?.length > 0) {
        toAddress = item.tokenTransfers[0].toUserAccount ?? '';
    }

    return {
        chainID: 900,
        chainName: "solana-mainnet",
        toAddress,
        token: tokenInfo,
        isNFTTransfer: isNFT,
        gasSpent: {
            native: gasSpentNative,
            // Not available from Helius without price lookup
            usd: 0
        },
        block_signed_at: new Date(item.timestamp * 1000).toISOString()
    };
}

