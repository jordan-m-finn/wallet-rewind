import { type Address } from 'viem'

// ============================================
// SUPPORTED CHAINS
// ============================================

export const SUPPORTED_CHAINS = {
    "eth-mainnet": 1,
    "base-mainnet": 8453,
    "polygon-mainnet": 137,
    "bnb": 56,
    "zkSync-Era": 324,
    "arbitrum-mainnet": 42161,
    "solana-mainnet": 900,
} as const

// ============================================
// SHARED / UTILITY TYPES
// ============================================

export type MostTransactedToken = {
    symbol: string,
    count: number
}

export type GasSpent = {
    native: number,
    usd: number
}

export type SwapSafeTokenInformation = {
    token: string,
    contractAddress: string
}

export type Transaction = {
    chainID: (typeof SUPPORTED_CHAINS)[keyof typeof SUPPORTED_CHAINS],
    chainName: keyof typeof SUPPORTED_CHAINS,
    toAddress: string,
    token: SwapSafeTokenInformation[],
    isNFTTransfer: boolean,
    gasSpent: GasSpent,
    block_signed_at: string
}

export type RecapStats = {
    transactionsByChain: Record<string, number>;
    nftCount: number,
    gasSpent: Record<string, GasSpent>;
}

// ============================================
// WALLET RECAP (existing, with type discriminant added)
// ============================================

export type WalletRecap = {
    type: "wallet",
    address: string,
    year: number,
    topToken: MostTransactedToken | null,
    uniqueContracts: number,
    nftCount: number,
    gasSpent: Record<string, GasSpent>,
    nameplates: string[],
    transactionsByChain: Record<string, number> 
}

// ============================================
// CREDIT CARD RECAP
// ============================================

export interface CreditCardRecap {
    type: "credit-card";
    year: number;
    nameplates: string[];
    totalSpend: number;
    totalCryptoBack: {
        usd: number;
        breakdown: Record<string, number>;
    };
    topCategories: Array<{
        category: string;
        amount: number;
        percentage: number;
    }>;
    topMerchants: Array<{
        name: string;
        count: number;
        amount: number;
    }>;
    cryptoBackHistory: Array<{
        month: string;
        token: string;
    }>;
    favoriteCrypto: {
        token: string;
        monthsSelected: number;
    };
    biggestPurchase: {
        merchant: string;
        amount: number;
        date: string;
    };
    countries: string[];
}

// ============================================
// PREDICTION MARKETS RECAP
// ============================================

export interface PredictionMarketsRecap {
    type: "prediction-markets";
    year: number;
    nameplates: string[];
    totalPredictions: number;
    totalWagered: number;
    totalWon: number;
    netPnL: number;
    winRate: number;
    categoryBreakdown: Array<{
        category: string;
        predictions: number;
        winRate: number;
        pnl: number;
    }>;
    bestCategory: {
        category: string;
        winRate: number;
    };
    biggestWin: {
        market: string;
        amount: number;
        odds: number;
        date: string;
    };
    biggestLoss: {
        market: string;
        amount: number;
        date: string;
    };
    longestStreak: number;
    favoriteCategory: {
        category: string;
        count: number;
    };
    bestCall: {
        market: string;
        consensusOdds: number;
        yourPosition: string;
        payout: number;
    };
    monthlyActivity: Record<string, number>;
}

// ============================================
// TRADING RECAP
// ============================================

export interface TradingRecap {
    type: "trading";
    year: number;
    nameplates: string[];
    totalVolume: number;
    tradesExecuted: number;
    mostTradedPairs: Array<{
        pair: string;
        volume: number;
        count: number;
    }>;
    uniqueAssets: string[];
    avgTradeSize: number;
    biggestTrade: {
        pair: string;
        side: "buy" | "sell";
        amount: number;
        date: string;
    };
    monthlyActivity: Record<string, number>;
    busiestMonth: string;
    tradingHours: {
        mostActive: string;
        distribution: Record<string, number>;
    };
    buySellRatio: {
        buys: number;
        sells: number;
    };
    holdTimeAvg: number;
}

// ============================================
// UNION TYPE
// ============================================

export type GeminiRecap = 
    | CreditCardRecap 
    | PredictionMarketsRecap 
    | TradingRecap 
    | WalletRecap;

// ============================================
// NAMEPLATE DEFINITIONS
// ============================================

export const CREDIT_CARD_NAMEPLATES = {
    BTC_MAXIMALIST: { id: 'btc-maximalist', name: 'BTC Maximalist', icon: '₿', description: 'Selected BTC for rewards 10+ months' },
    ETH_BELIEVER: { id: 'eth-believer', name: 'ETH Believer', icon: '◊', description: 'Selected ETH for rewards 10+ months' },
    MEME_COIN_ENTHUSIAST: { id: 'meme-coin-enthusiast', name: 'Meme Coin Enthusiast', icon: '🐕', description: 'Selected DOGE/SHIB/PEPE for 3+ months' },
    REWARD_OPTIMIZER: { id: 'reward-optimizer', name: 'Reward Optimizer', icon: '🔄', description: 'Changed crypto-back selection 6+ times' },
    DIAMOND_CARD: { id: 'diamond-card', name: 'Diamond Card', icon: '💎', description: 'Spent $50,000+ annually' },
    FOODIE: { id: 'foodie', name: 'Foodie', icon: '🍽️', description: '30%+ spend on dining' },
    GLOBETROTTER: { id: 'globetrotter', name: 'Globetrotter', icon: '✈️', description: 'Purchases in 5+ countries' },
    NIGHT_SHOPPER: { id: 'night-shopper', name: 'Night Shopper', icon: '🌙', description: '20%+ purchases after 10pm' },
    IMPULSE_BUYER: { id: 'impulse-buyer', name: 'Impulse Buyer', icon: '⚡', description: '10+ purchases over $500' },
    CONSISTENT: { id: 'consistent', name: 'Consistent', icon: '📅', description: 'Made purchases every month' },
} as const;

export const PREDICTION_MARKETS_NAMEPLATES = {
    ORACLE: { id: 'oracle', name: 'Oracle', icon: '🔮', description: '70%+ overall win rate' },
    SHARP: { id: 'sharp', name: 'Sharp', icon: '🎯', description: '75%+ win rate with 20+ predictions' },
    RISK_TAKER: { id: 'risk-taker', name: 'Risk Taker', icon: '🎲', description: 'Average position size $200+' },
    POLITICAL_JUNKIE: { id: 'political-junkie', name: 'Political Junkie', icon: '🏛️', description: '50%+ predictions on politics' },
    SPORTS_FAN: { id: 'sports-fan', name: 'Sports Fan', icon: '⚽', description: '50%+ predictions on sports' },
    CRYPTO_PROPHET: { id: 'crypto-prophet', name: 'Crypto Prophet', icon: '📈', description: '50%+ predictions on crypto' },
    ENTERTAINMENT_BUFF: { id: 'entertainment-buff', name: 'Entertainment Buff', icon: '🎬', description: '50%+ predictions on entertainment' },
    CONTRARIAN: { id: 'contrarian', name: 'Contrarian', icon: '🔄', description: '5+ wins betting against >70% consensus' },
    EARLY_CALLER: { id: 'early-caller', name: 'Early Caller', icon: '⏰', description: '3+ correct predictions before odds shifted' },
    ALL_IN: { id: 'all-in', name: 'All In', icon: '💰', description: 'Single position of $1,000+' },
    DIVERSIFIED: { id: 'diversified', name: 'Diversified', icon: '🎨', description: 'Predictions in 5+ categories' },
    STREAK_MASTER: { id: 'streak-master', name: 'Streak Master', icon: '🔥', description: '5+ correct predictions in a row' },
    COMEBACK_KING: { id: 'comeback-king', name: 'Comeback King', icon: '👑', description: 'Recovered from -$500 to positive' },
    DIAMOND_HANDS: { id: 'diamond-hands', name: 'Diamond Hands', icon: '💎', description: 'Held position through 50%+ swing' },
} as const;

export const TRADING_NAMEPLATES = {
    DIAMOND_HANDS: { id: 'diamond-hands', name: 'Diamond Hands', icon: '💎', description: 'Average hold time 60+ days' },
    DAY_TRADER: { id: 'day-trader', name: 'Day Trader', icon: '📈', description: '50%+ trades closed same day' },
    DCA_BELIEVER: { id: 'dca-believer', name: 'DCA Believer', icon: '🔁', description: '10+ recurring buys' },
    WHALE: { id: 'whale', name: 'Whale', icon: '🐋', description: 'Single trade over $100,000' },
    DIVERSIFIED: { id: 'diversified', name: 'Diversified', icon: '🎨', description: 'Traded 15+ different assets' },
    BTC_ONLY: { id: 'btc-only', name: 'BTC Only', icon: '₿', description: '90%+ volume in BTC' },
    ALT_EXPLORER: { id: 'alt-explorer', name: 'Alt Explorer', icon: '🔍', description: '50%+ volume in non-BTC/ETH' },
    NIGHT_OWL: { id: 'night-owl', name: 'Night Owl', icon: '🦉', description: '30%+ trades after midnight' },
    EARLY_BIRD: { id: 'early-bird', name: 'Early Bird', icon: '🌅', description: '30%+ trades before 7am' },
    CONSISTENT_TRADER: { id: 'consistent-trader', name: 'Consistent Trader', icon: '📅', description: 'Traded every month' },
    DIP_BUYER: { id: 'dip-buyer', name: 'Dip Buyer', icon: '🛒', description: 'Bought during 3+ major dips' },
    PEAK_SELLER: { id: 'peak-seller', name: 'Peak Seller', icon: '🎯', description: 'Sold during 3+ local tops' },
} as const;

export const WALLET_NAMEPLATES = {
    NFT_COLLECTOR: { id: 'nft-collector', name: 'NFT Collector', icon: '🎨', description: '10+ NFT transfers' },
    GAS_GUZZLER: { id: 'gas-guzzler', name: 'Gas Guzzler', icon: '⛽', description: '$500+ in gas fees' },
    CHAIN_HOPPER: { id: 'chain-hopper', name: 'Chain Hopper', icon: '🔀', description: 'Activity on 3+ chains' },
    DEGEN_HOURS: { id: 'degen-hours', name: 'Degen Hours', icon: '🌙', description: 'Transactions 12am-5am' },
    EARLY_ADOPTER: { id: 'early-adopter', name: 'Early Adopter', icon: '🌅', description: 'Activity in January' },
} as const;
