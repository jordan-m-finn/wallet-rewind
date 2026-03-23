import { PredictionMarketsRecap } from '../types';

export const predictionMarketsMockData: PredictionMarketsRecap = {
  type: "prediction-markets",
  year: 2026,
  totalPredictions: 47,
  totalWagered: 3240,
  totalWon: 4132,
  netPnL: 892,
  winRate: 68,
  categoryBreakdown: [
    { category: "Crypto", predictions: 15, winRate: 82, pnl: 520 },
    { category: "Politics", predictions: 18, winRate: 61, pnl: 180 },
    { category: "Sports", predictions: 8, winRate: 75, pnl: 245 },
    { category: "Entertainment", predictions: 6, winRate: 50, pnl: -53 }
  ],
  bestCategory: {
    category: "Crypto",
    winRate: 82
  },
  biggestWin: {
    market: "BTC above $100K by March 2026",
    amount: 340,
    odds: 2.4,
    date: "2026-03-01"
  },
  biggestLoss: {
    market: "2026 Midterm Senate Control",
    amount: -120,
    date: "2026-11-05"
  },
  longestStreak: 7,
  favoriteCategory: {
    category: "Politics",
    count: 18
  },
  bestCall: {
    market: "Underdog UFC Championship",
    consensusOdds: 15,
    yourPosition: "YES",
    payout: 280
  },
  monthlyActivity: {
    "Jan": 3,
    "Feb": 5,
    "Mar": 8,
    "Apr": 4,
    "May": 2,
    "Jun": 3,
    "Jul": 4,
    "Aug": 3,
    "Sep": 5,
    "Oct": 4,
    "Nov": 4,
    "Dec": 2
  },
  nameplates: ["Oracle", "Crypto Prophet", "Streak Master"]
};

/**
 * Returns the mock Prediction Markets recap data.
 * In production, this would fetch from Gemini's PM positions/outcomes API.
 */
export function getPredictionMarketsRecap(year: number = 2026): PredictionMarketsRecap {
  return {
    ...predictionMarketsMockData,
    year
  };
}
