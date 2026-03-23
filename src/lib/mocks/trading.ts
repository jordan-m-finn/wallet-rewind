import { TradingRecap } from '../types';

export const tradingMockData: TradingRecap = {
  type: "trading",
  year: 2026,
  totalVolume: 142500,
  tradesExecuted: 234,
  mostTradedPairs: [
    { pair: "BTC/USD", volume: 89000, count: 87 },
    { pair: "ETH/USD", volume: 32000, count: 64 },
    { pair: "SOL/USD", volume: 12500, count: 43 },
    { pair: "LINK/USD", volume: 5200, count: 22 },
    { pair: "ARB/USD", volume: 3800, count: 18 }
  ],
  uniqueAssets: [
    "BTC", "ETH", "SOL", "MATIC", "LINK", 
    "UNI", "AAVE", "ARB", "OP", "DOGE", 
    "SHIB", "PEPE"
  ],
  avgTradeSize: 609.40,
  biggestTrade: {
    pair: "BTC/USD",
    side: "buy",
    amount: 15000,
    date: "2026-03-12"
  },
  monthlyActivity: {
    "Jan": 18,
    "Feb": 22,
    "Mar": 45,
    "Apr": 31,
    "May": 19,
    "Jun": 24,
    "Jul": 15,
    "Aug": 12,
    "Sep": 14,
    "Oct": 11,
    "Nov": 13,
    "Dec": 10
  },
  busiestMonth: "March",
  tradingHours: {
    mostActive: "2pm - 4pm EST",
    distribution: {
      "morning": 22,
      "afternoon": 45,
      "evening": 25,
      "night": 8
    }
  },
  buySellRatio: {
    buys: 65,
    sells: 35
  },
  holdTimeAvg: 34,
  nameplates: ["Diversified", "Dip Buyer", "Consistent Trader"]
};

/**
 * Returns the mock Trading recap data.
 * In production, this would fetch from Gemini's Exchange API.
 */
export function getTradingRecap(year: number = 2026): TradingRecap {
  return {
    ...tradingMockData,
    year
  };
}
