import { CreditCardRecap } from '../types';

export const creditCardMockData: CreditCardRecap = {
  type: "credit-card",
  year: 2026,
  totalSpend: 24532.47,
  totalCryptoBack: {
    usd: 736.02,
    breakdown: {
      "BTC": 0.0089,
      "ETH": 0.142,
      "DOGE": 1247.5
    }
  },
  topCategories: [
    { category: "Dining", amount: 4200, percentage: 17.1 },
    { category: "Travel", amount: 3800, percentage: 15.5 },
    { category: "Shopping", amount: 3200, percentage: 13.0 },
    { category: "Groceries", amount: 2800, percentage: 11.4 },
    { category: "Entertainment", amount: 1900, percentage: 7.7 }
  ],
  topMerchants: [
    { name: "Amazon", count: 47, amount: 2340 },
    { name: "Uber Eats", count: 34, amount: 890 },
    { name: "Whole Foods", count: 28, amount: 1120 },
    { name: "Starbucks", count: 52, amount: 312 },
    { name: "Target", count: 18, amount: 1450 }
  ],
  cryptoBackHistory: [
    { month: "Jan", token: "BTC" },
    { month: "Feb", token: "BTC" },
    { month: "Mar", token: "ETH" },
    { month: "Apr", token: "DOGE" },
    { month: "May", token: "DOGE" },
    { month: "Jun", token: "BTC" },
    { month: "Jul", token: "BTC" },
    { month: "Aug", token: "BTC" },
    { month: "Sep", token: "ETH" },
    { month: "Oct", token: "BTC" },
    { month: "Nov", token: "BTC" },
    { month: "Dec", token: "BTC" }
  ],
  favoriteCrypto: {
    token: "BTC",
    monthsSelected: 8
  },
  biggestPurchase: {
    merchant: "Apple",
    amount: 2399.99,
    date: "2026-09-15"
  },
  countries: ["USA", "Japan", "Mexico", "Canada"],
  nameplates: ["BTC Maximalist", "Foodie", "Globetrotter", "Consistent"]
};

/**
 * Returns the mock Credit Card recap data.
 * In production, this would fetch from Gemini's Card transaction API.
 */
export function getCreditCardRecap(year: number = 2026): CreditCardRecap {
  return {
    ...creditCardMockData,
    year
  };
}
