const CHAIN_TO_COINGECKO: Record<string, string> = {
    'eth-mainnet': 'ethereum',
    'base-mainnet': 'ethereum',
    'arbitrum-mainnet': 'ethereum',
    'polygon-mainnet': 'polygon-ecosystem-token',
    'bnb-mainnet': 'binancecoin',
    'solana-mainnet': 'solana'
};

export type ChainPrices = Record<string, number>;

export async function getNativeTokenPrices(): Promise<ChainPrices> {
    // Get unique CoinGecko IDs
    const coinIds = [...new Set(Object.values(CHAIN_TO_COINGECKO))];

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error(`CoinGecko API error: ${response.status}`);
            return getEmptyPrices();
        }

        const data = await response.json();

        // map back to chain names
        const prices: ChainPrices = {};
        for (const [chain, coinId] of Object.entries(CHAIN_TO_COINGECKO)) {
            prices[chain] = data[coinId]?.usd ?? 0;
        }
        
        return prices;
    } catch (error) {
        console.error('Failed to fetch prices:', error);
        return getEmptyPrices();
    }
}

function getEmptyPrices(): ChainPrices {
    const prices: ChainPrices = {};
    for (const chain of Object.keys(CHAIN_TO_COINGECKO)) {
        prices[chain] = 0;
    }
    return prices;
}
