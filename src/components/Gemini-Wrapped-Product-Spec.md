# Gemini Wrapped — Product Specification

**Version:** 4.0  
**Last Updated:** February 2026  
**Authors:** Jordan Finn, Jamie Morris

---

## 1. Executive Summary

### 1.1 What is Gemini Wrapped?

Gemini Wrapped is an annual recap experience that gives users a personalized, visual summary of their activity across Gemini's product suite. Inspired by Spotify Wrapped, it transforms user data into shareable moments that drive engagement and brand affinity.

**Four Products, One Concept:**

| Product                      | Team               | Data Source | MVP Priority | Design       |
| ---------------------------- | ------------------ | ----------- | ------------ | ------------ |
| **Credit Card Recap**        | Credit Card        | Mocked      | 🥇 Primary   | Mobile-first |
| **Prediction Markets Recap** | Prediction Markets | Mocked      | 🥈 Secondary | Mobile-first |
| **WalletRewind**             | On-Chain           | Real APIs   | 🥉 Tertiary  | Mobile-first |
| **Trading Recap**            | Exchange           | Mocked      | 4th          | Desktop      |

### 1.2 Why Build This?

**For Users:**

- Personalized insights they can't get elsewhere
- Shareable content for social media
- Annual ritual that creates anticipation

**For Gemini:**

- Drives annual re-engagement across all products
- Organic social marketing (every share = Gemini exposure)
- Differentiates Gemini in a crowded market
- Cross-product touchpoint reinforces ecosystem value

**For This Proposal:**

- Shows product-focused thinking across Gemini's product line
- Further reinforces ownership priority
- Further reinforces full-stack capabilities
- Creates coordination opportunities across teams

### 1.3 Production vs MVP

| Aspect         | Production               | MVP (Demo)                                         |
| -------------- | ------------------------ | -------------------------------------------------- |
| Access point   | Within each product's UI | Unified demo page                                  |
| Data source    | Real user data           | Real (Wallet) + Mocked (CC/PM/Trading)             |
| Authentication | Gemini login             | Wallet connect only                                |
| Sharing        | Native social + NFT mint | Visual only                                        |
| Design         | Native to each product   | Mobile-first for CC/PM/Wallet, desktop for Trading |

---

## 2. Target Users

### 2.1 Credit Card Users

- Gemini Credit Card holders
- Interested in spending insights
- Want to understand crypto-back rewards patterns
- Active on social, likely to share status

### 2.2 Prediction Markets Users

- Active predictors on Gemini markets
- Engaged with politics, sports, crypto, entertainment outcomes
- Competitive — want to see win rate and accuracy
- Social sharers who want to flex correct calls

### 2.3 Wallet Users

- Use Gemini Wallet or external wallets
- Multi-chain activity
- Interested in on-chain footprint
- NFT collectors, DeFi users

### 2.4 Traders

- Active on Gemini Exchange
- Range from casual to power traders
- Interested in performance metrics
- Competitive — want to see how they rank

---

## 3. Product Definitions

---

## 3.1 Credit Card Recap (Priority 1)

**Tagline:** "Your spending year. Rewarded."  
**Design:** Mobile-first

### Overview

A visual summary of the user's Gemini Credit Card activity, focusing on spending patterns and crypto-back reward choices.

### Key Metrics _(Subject To Change)_

| Metric            | Description                     | Display Example         |
| ----------------- | ------------------------------- | ----------------------- |
| Total Spend       | Sum of all purchases            | "$24,532"               |
| Total Crypto-Back | USD value of rewards earned     | "$736"                  |
| Top Category      | Highest spending category       | "Dining — $4,200"       |
| Top Merchant      | Most frequented merchant        | "Amazon — 47 purchases" |
| Favorite Crypto   | Most selected reward token      | "BTC — 8 months"        |
| Crypto Switches   | Times changed reward selection  | "Changed 5 times"       |
| Biggest Purchase  | Single largest transaction      | "$2,400 at Apple"       |
| Countries         | Unique countries with purchases | "4 countries"           |

### Nameplates (Achievements) _(Subject To Change)_

| Nameplate            | Criteria                               | Icon |
| -------------------- | -------------------------------------- | ---- |
| BTC Maximalist       | Selected BTC for rewards 10+ months    | ₿    |
| ETH Believer         | Selected ETH for rewards 10+ months    | ◊    |
| Meme Coin Enthusiast | Selected DOGE/SHIB/PEPE for 3+ months  | 🐕   |
| Reward Optimizer     | Changed crypto-back selection 6+ times | 🔄   |
| Diamond Card         | Spent $50,000+ annually                | 💎   |
| Foodie               | 30%+ spend on dining                   | 🍽️   |
| Globetrotter         | Purchases in 5+ countries              | ✈️   |
| Night Shopper        | 20%+ purchases after 10pm              | 🌙   |
| Impulse Buyer        | 10+ purchases over $500                | ⚡   |
| Consistent           | Made purchases every month             | 📅   |

### Mock Data Structure

```typescript
interface CreditCardRecap {
  type: "credit-card";
  year: number;
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
  nameplates: string[];
}
```

### Sample Mock Data

```json
{
  "type": "credit-card",
  "year": 2026,
  "totalSpend": 24532.47,
  "totalCryptoBack": {
    "usd": 736.02,
    "breakdown": {
      "BTC": 0.0089,
      "ETH": 0.142,
      "DOGE": 1247.5
    }
  },
  "topCategories": [
    { "category": "Dining", "amount": 4200, "percentage": 17.1 },
    { "category": "Travel", "amount": 3800, "percentage": 15.5 },
    { "category": "Shopping", "amount": 3200, "percentage": 13.0 }
  ],
  "topMerchants": [
    { "name": "Amazon", "count": 47, "amount": 2340 },
    { "name": "Uber Eats", "count": 34, "amount": 890 },
    { "name": "Whole Foods", "count": 28, "amount": 1120 }
  ],
  "cryptoBackHistory": [
    { "month": "Jan", "token": "BTC" },
    { "month": "Feb", "token": "BTC" },
    { "month": "Mar", "token": "ETH" },
    { "month": "Apr", "token": "DOGE" },
    { "month": "May", "token": "DOGE" },
    { "month": "Jun", "token": "BTC" }
  ],
  "favoriteCrypto": {
    "token": "BTC",
    "monthsSelected": 8
  },
  "biggestPurchase": {
    "merchant": "Apple",
    "amount": 2399.99,
    "date": "2026-09-15"
  },
  "countries": ["USA", "Japan", "Mexico", "Canada"],
  "nameplates": ["BTC Maximalist", "Foodie", "Globetrotter"]
}
```

---

## 3.2 Prediction Markets Recap (Priority 2)

**Tagline:** "Your predictions. Your accuracy. Your year."  
**Design:** Mobile-first

### Overview

A visual summary of the user's prediction market activity, highlighting their forecasting accuracy, biggest wins, and prediction patterns.

### Key Metrics _(Subject To Change)_

| Metric            | Description                          | Display Example      |
| ----------------- | ------------------------------------ | -------------------- |
| Total Predictions | Number of markets participated in    | "47 predictions"     |
| Total Wagered     | Sum of all positions                 | "$3,240"             |
| Total Won         | Net winnings                         | "+$892"              |
| Win Rate          | Percentage of correct predictions    | "68%"                |
| Best Category     | Highest accuracy category            | "Crypto — 82%"       |
| Biggest Win       | Largest single payout                | "+$340 on BTC $100K" |
| Biggest Loss      | Largest single loss                  | "-$120 on Election"  |
| Longest Streak    | Consecutive correct predictions      | "7 in a row"         |
| Favorite Category | Most predictions made                | "Politics — 18"      |
| Best Call         | Correctly predicted unlikely outcome | "Called the upset"   |

### Nameplates (Achievements) _(Subject To Change)_

| Nameplate          | Criteria                                   | Icon |
| ------------------ | ------------------------------------------ | ---- |
| Oracle             | 70%+ overall win rate                      | 🔮   |
| Sharp              | 75%+ win rate with 20+ predictions         | 🎯   |
| Risk Taker         | Average position size $200+                | 🎲   |
| Political Junkie   | 50%+ predictions on politics               | 🏛️   |
| Sports Fan         | 50%+ predictions on sports                 | ⚽   |
| Crypto Prophet     | 50%+ predictions on crypto                 | 📈   |
| Entertainment Buff | 50%+ predictions on entertainment          | 🎬   |
| Contrarian         | 5+ wins betting against >70% consensus     | 🔄   |
| Early Caller       | 3+ correct predictions before odds shifted | ⏰   |
| All In             | Single position of $1,000+                 | 💰   |
| Diversified        | Predictions in 5+ categories               | 🎨   |
| Streak Master      | 5+ correct predictions in a row            | 🔥   |
| Comeback King      | Recovered from -$500 to positive           | 👑   |
| Diamond Hands      | Held position through 50%+ swing           | 💎   |

### Mock Data Structure

```typescript
interface PredictionMarketsRecap {
  type: "prediction-markets";
  year: number;
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
  nameplates: string[];
}
```

### Sample Mock Data

```json
{
  "type": "prediction-markets",
  "year": 2026,
  "totalPredictions": 47,
  "totalWagered": 3240,
  "totalWon": 4132,
  "netPnL": 892,
  "winRate": 68,
  "categoryBreakdown": [
    { "category": "Crypto", "predictions": 15, "winRate": 82, "pnl": 520 },
    { "category": "Politics", "predictions": 18, "winRate": 61, "pnl": 180 },
    { "category": "Sports", "predictions": 8, "winRate": 75, "pnl": 245 },
    { "category": "Entertainment", "predictions": 6, "winRate": 50, "pnl": -53 }
  ],
  "bestCategory": {
    "category": "Crypto",
    "winRate": 82
  },
  "biggestWin": {
    "market": "BTC above $100K by March 2026",
    "amount": 340,
    "odds": 2.4,
    "date": "2026-03-01"
  },
  "biggestLoss": {
    "market": "2026 Midterm Senate Control",
    "amount": -120,
    "date": "2026-11-05"
  },
  "longestStreak": 7,
  "favoriteCategory": {
    "category": "Politics",
    "count": 18
  },
  "bestCall": {
    "market": "Underdog UFC Championship",
    "consensusOdds": 15,
    "yourPosition": "YES",
    "payout": 280
  },
  "monthlyActivity": {
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
  "nameplates": ["Oracle", "Crypto Prophet", "Streak Master"]
}
```

---

## 3.3 WalletRewind — On-Chain (Priority 3)

**Tagline:** "Your year. On-chain. Rewound."  
**Design:** Mobile-first

### Overview

A visual summary of on-chain wallet activity across multiple blockchains. Unlike the other products, this uses real blockchain data via external APIs.

### Key Metrics _(Subject To Change)_

| Metric             | Description                | Display Example          |
| ------------------ | -------------------------- | ------------------------ |
| Total Transactions | Sum across all chains      | "35 transactions"        |
| Chains Used        | Networks with activity     | "Ethereum, Base, Solana" |
| Top Token          | Most frequently transacted | "ETH — 7 transactions"   |
| Gas Spent          | Total fees in USD          | "$1.37"                  |
| Unique Contracts   | dApps interacted with      | "7 contracts"            |
| NFTs Transferred   | NFT activity count         | "14 NFTs"                |

### Nameplates (Achievements) _(Subject To Change)_

| Nameplate     | Criteria              | Icon |
| ------------- | --------------------- | ---- |
| NFT Collector | 10+ NFT transfers     | 🎨   |
| Gas Guzzler   | $500+ in gas fees     | ⛽   |
| Chain Hopper  | Activity on 3+ chains | 🔀   |
| Degen Hours   | Transactions 12am-5am | 🌙   |
| Early Adopter | Activity in January   | 🌅   |

### Data Structure (Existing)

```typescript
interface WalletRecap {
  type: "wallet";
  address: string;
  year: number;
  transactionsByChain: Record<string, number>;
  topToken: {
    symbol: string;
    count: number;
  };
  uniqueContracts: number;
  nftCount: number;
  gasSpent: Record<
    string,
    {
      native: number;
      usd: number;
    }
  >;
  nameplates: string[];
}
```

### Technical Implementation (Complete)

| Component           | Technology    | Status |
| ------------------- | ------------- | ------ |
| EVM Transactions    | Alchemy API   | ✅     |
| Solana Transactions | Helius API    | ✅     |
| Token Metadata      | Helius DAS    | ✅     |
| USD Prices          | CoinGecko     | ✅     |
| Address Validation  | viem / manual | ✅     |

---

## 3.4 Trading Recap (Priority 4)

**Tagline:** "Your trading year. Analyzed."  
**Design:** Desktop (lower priority)

### Overview

A visual summary of the user's trading activity on Gemini Exchange, highlighting patterns, performance, and trading style.

### Key Metrics _(Subject To Change)_

| Metric           | Description                 | Display Example     |
| ---------------- | --------------------------- | ------------------- |
| Total Volume     | Sum of all trades (USD)     | "$142,500"          |
| Trades Executed  | Number of trades            | "234 trades"        |
| Most Traded Pair | Highest volume pair         | "BTC/USD — $89,000" |
| Unique Assets    | Different tokens traded     | "12 assets"         |
| Avg Trade Size   | Mean trade value            | "$609"              |
| Biggest Trade    | Largest single trade        | "$15,000 BTC buy"   |
| Busiest Month    | Highest activity month      | "March — 45 trades" |
| Trading Hours    | Most active time            | "2pm - 4pm EST"     |
| Buy/Sell Ratio   | Proportion of buys to sells | "65% buys"          |

### Nameplates (Achievements) _(Subject To Change)_

| Nameplate         | Criteria                    | Icon |
| ----------------- | --------------------------- | ---- |
| Diamond Hands     | Average hold time 60+ days  | 💎   |
| Day Trader        | 50%+ trades closed same day | 📈   |
| DCA Believer      | 10+ recurring buys          | 🔁   |
| Whale             | Single trade over $100,000  | 🐋   |
| Diversified       | Traded 15+ different assets | 🎨   |
| BTC Only          | 90%+ volume in BTC          | ₿    |
| Alt Explorer      | 50%+ volume in non-BTC/ETH  | 🔍   |
| Night Owl         | 30%+ trades after midnight  | 🦉   |
| Early Bird        | 30%+ trades before 7am      | 🌅   |
| Consistent Trader | Traded every month          | 📅   |
| Dip Buyer         | Bought during 3+ major dips | 🛒   |
| Peak Seller       | Sold during 3+ local tops   | 🎯   |

### Mock Data Structure

```typescript
interface TradingRecap {
  type: "trading";
  year: number;
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
  nameplates: string[];
}
```

### Sample Mock Data

```json
{
  "type": "trading",
  "year": 2026,
  "totalVolume": 142500,
  "tradesExecuted": 234,
  "mostTradedPairs": [
    { "pair": "BTC/USD", "volume": 89000, "count": 87 },
    { "pair": "ETH/USD", "volume": 32000, "count": 64 },
    { "pair": "SOL/USD", "volume": 12500, "count": 43 }
  ],
  "uniqueAssets": [
    "BTC",
    "ETH",
    "SOL",
    "MATIC",
    "LINK",
    "UNI",
    "AAVE",
    "ARB",
    "OP",
    "DOGE",
    "SHIB",
    "PEPE"
  ],
  "avgTradeSize": 609.4,
  "biggestTrade": {
    "pair": "BTC/USD",
    "side": "buy",
    "amount": 15000,
    "date": "2026-03-12"
  },
  "monthlyActivity": {
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
  "busiestMonth": "March",
  "tradingHours": {
    "mostActive": "2pm - 4pm EST",
    "distribution": {
      "morning": 22,
      "afternoon": 45,
      "evening": 25,
      "night": 8
    }
  },
  "buySellRatio": {
    "buys": 65,
    "sells": 35
  },
  "holdTimeAvg": 34,
  "nameplates": ["Diversified", "Dip Buyer", "Consistent Trader"]
}
```

---

## 4. User Flows

### 4.1 MVP Demo Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE                             │
│                                                                  │
│                      Gemini Wrapped 2026                         │
│            "See your year across Gemini's products"              │
│                                                                  │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│   │    💳      │ │    🎯      │ │    🔗      │ │    📈      │   │
│   │   Card     │ │ Prediction │ │   Wallet   │ │   Trade    │   │
│   │   Recap    │ │  Markets   │ │   Rewind   │ │   Recap    │   │
│   │  [Demo]    │ │   [Demo]   │ │ [Connect]  │ │  [Demo]    │   │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
│    Mobile-first   Mobile-first   Mobile-first    Desktop         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
   ┌───────────┐       ┌───────────┐       ┌───────────┐
   │  Mobile   │       │  Mobile   │       │  Desktop  │
   │  Slides   │       │  Slides   │       │  Slides   │
   │ (390px)   │       │ (390px)   │       │ (1200px)  │
   └───────────┘       └───────────┘       └───────────┘
```

### 4.2 Production Flow (Future)

```
User logs into Gemini product
        │
        ▼
┌───────────────────────┐
│ "Your 2026 Wrapped    │
│  is ready!"           │
│  [View Now]           │
└───────────────────────┘
        │
        ▼
Shows recap relevant to current product context:
- In Credit Card app → Card Recap (mobile)
- In Prediction Markets → PM Recap (mobile)
- In Exchange → Trading Recap (desktop)
- In Wallet → WalletRewind (mobile)
        │
        ▼
Option to view other recaps from within experience
```

### 4.3 Slide Progression (Per Product)

Each product follows the same narrative structure:

```
1. INTRO SLIDE
   "Your [Product] Year in Review"

2. BIG NUMBER
   Total spend / predictions / volume / transactions

3. BREAKDOWN
   Categories / accuracy / chains / pairs

4. TOP ITEM
   Favorite merchant / best call / top token / most traded

5. FUN STAT
   Unique insight (countries, streak, gas, trading hours)

6. NAMEPLATES
   Achievements earned

7. SUMMARY
   All stats at a glance + share CTA
```

---

## 5. Design System

### 5.1 Mobile-First Approach

| Product            | Viewport         | Rationale                          |
| ------------------ | ---------------- | ---------------------------------- |
| Credit Card        | 390px (mobile)   | Users access via Gemini mobile app |
| Prediction Markets | 390px (mobile)   | Quick, social-first predictions    |
| WalletRewind       | 390px (mobile)   | Wallet users on mobile             |
| Trading            | 1200px (desktop) | Traders use desktop platforms      |

### 5.2 Mobile Slide Dimensions

```
┌─────────────────────────┐
│                         │
│     390px × 844px       │
│     (iPhone 14 Pro)     │
│                         │
│  ┌───────────────────┐  │
│  │                   │  │
│  │   Content Area    │  │
│  │   340px × 600px   │  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  [ ← ]  ● ● ○ ○  [ → ]  │
│                         │
└─────────────────────────┘
```

### 5.3 Color Palette _(Subject To Change)_

| Token           | Hex     | Usage               |
| --------------- | ------- | ------------------- |
| Background      | #050505 | Page background     |
| Card            | #0d0f12 | Elevated surfaces   |
| Border          | #1a1c20 | Subtle dividers     |
| Muted Text      | #5f6368 | Secondary text      |
| Primary Text    | #fafafa | Headlines, body     |
| Cyan (Primary)  | #00DCFA | Gemini accent, CTAs |
| Gradient Purple | #a855f7 | Slide gradients     |
| Gradient Blue   | #3b82f6 | Slide gradients     |
| Gradient Teal   | #14b8a6 | Slide gradients     |
| Gradient Orange | #f97316 | Slide gradients     |
| Gradient Pink   | #ec4899 | Slide gradients     |

### 5.4 Product-Specific Accents _(Subject To Change)_

| Product            | Primary Color    | Gradient      |
| ------------------ | ---------------- | ------------- |
| Credit Card        | Gold (#FFD700)   | Gold → Orange |
| Prediction Markets | Purple (#a855f7) | Purple → Pink |
| Wallet             | Cyan (#00DCFA)   | Cyan → Blue   |
| Trading            | Green (#10b981)  | Green → Teal  |

### 5.5 Typography _(Subject To Change)_

- **Headlines:** Inter Bold, tight tracking
- **Body:** Inter Regular
- **Numbers/Stats:** Inter Bold or JetBrains Mono
- **Addresses:** JetBrains Mono

---

## 6. Social Sharing & Marketing Integration

### 6.1 Overview

Social sharing is a core driver of Gemini Wrapped's value. Each recap will include shareable assets optimized for major social platforms.

### 6.2 Marketing Collaboration

Direct communication with Gemini's marketing teams will be established to:

- Define creative direction for branded social templates
- Ensure brand consistency across all shareable assets
- Coordinate launch timing and promotional campaigns
- Develop platform-specific templates (X, Instagram, LinkedIn, etc.)

### 6.3 Social Templates

| Platform    | Format     | Dimensions    | Content                                       |
| ----------- | ---------- | ------------- | --------------------------------------------- |
| X (Twitter) | Image card | 1200 × 675px  | Summary slide with key stat + nameplates      |
| Instagram   | Story      | 1080 × 1920px | Full recap carousel or single highlight       |
| Instagram   | Post       | 1080 × 1080px | Square summary with branded frame             |
| LinkedIn    | Post       | 1200 × 627px  | Professional summary emphasizing achievements |

### 6.4 Template Elements

Each social template will include:

- Gemini branding (logo, colors)
- User's key stat (total spend, win rate, etc.)
- 1-2 nameplates earned
- Year identifier ("Wrapped 2026")
- Call-to-action ("Get your recap at gemini.com/wrapped")

### 6.5 Implementation Notes

- Templates will be generated dynamically based on user data
- Marketing will provide final creative assets and brand guidelines
- Legal review required for any user data displayed publicly
- Opt-in sharing only — users choose what to share

---

## 7. Technical Architecture

### 7.1 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                           Frontend                               │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ ProductCard │  │ RecapSlides │  │  Nameplate  │              │
│  │  Selector   │  │  Component  │  │   Badge     │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                  │
│  State: selectedProduct, recapData, currentSlide, isMobile       │
└──────────────────────────────┬───────────────────────────────────┘
                               │
      ┌────────────────────────┼────────────────────────┐
      │                        │                        │
      ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│ Credit Card   │      │  Prediction   │      │   Wallet /    │
│   Service     │      │   Markets     │      │   Trading     │
│               │      │   Service     │      │   Service     │
│ getMockCard() │      │ getMockPM()   │      │ getRecap()    │
│ → Static JSON │      │ → Static JSON │      │ → APIs/Mock   │
└───────────────┘      └───────────────┘      └───────────────┘
```

### 7.2 File Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                    # Main landing with product selector
│   ├── providers.tsx
│   └── recap/
│       └── [address]/
│           └── page.tsx            # WalletRewind display
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProductSelector.tsx         # Four product cards
│   ├── RecapSlides.tsx             # Slide container + navigation
│   ├── MobileFrame.tsx             # Phone mockup wrapper
│   ├── slides/
│   │   ├── IntroSlide.tsx
│   │   ├── BigNumberSlide.tsx
│   │   ├── BreakdownSlide.tsx
│   │   ├── TopItemSlide.tsx
│   │   ├── FunStatSlide.tsx
│   │   ├── NameplatesSlide.tsx
│   │   └── SummarySlide.tsx
│   ├── Nameplate.tsx               # Achievement badge
│   └── StatCard.tsx                # Reusable stat display
│
├── lib/
│   ├── alchemy.ts
│   ├── helius.ts
│   ├── prices.ts
│   ├── aggregators.ts
│   ├── recap.ts                    # WalletRewind orchestrator
│   ├── types.ts                    # All TypeScript interfaces
│   ├── wagmi.ts
│   ├── utils.ts
│   └── mocks/
│       ├── creditCard.ts           # Mock CC data
│       ├── predictionMarkets.ts    # Mock PM data
│       └── trading.ts              # Mock trading data
│
└── data/
    ├── creditCardMock.json
    ├── predictionMarketsMock.json
    └── tradingMock.json
```

### 7.3 Shared Types

```typescript
// Base recap interface all products extend
interface BaseRecap {
  year: number;
  nameplates: string[];
}

interface CreditCardRecap extends BaseRecap {
  type: "credit-card";
  // ... fields defined in Section 3.1
}

interface PredictionMarketsRecap extends BaseRecap {
  type: "prediction-markets";
  // ... fields defined in Section 3.2
}

interface WalletRecap extends BaseRecap {
  type: "wallet";
  // ... fields defined in Section 3.3
}

interface TradingRecap extends BaseRecap {
  type: "trading";
  // ... fields defined in Section 3.4
}

type GeminiRecap =
  | CreditCardRecap
  | PredictionMarketsRecap
  | WalletRecap
  | TradingRecap;
```

---

## 8. Implementation Plan

### 8.1 MVP Phases

| Phase                     | Scope                                              | Status      |
| ------------------------- | -------------------------------------------------- | ----------- |
| **1. Foundation**         | WalletRewind backend, design system, homepage      | ✅ Complete |
| **2. Unified Interface**  | ProductSelector, state management, mock data files | 🔲 To Do    |
| **3. Slide System**       | RecapSlides container, 7 slide types, mobile frame | 🔲 To Do    |
| **4. Credit Card**        | CC mock data → slides (mobile-first)               | 🔲 To Do    |
| **5. Prediction Markets** | PM mock data → slides (mobile-first)               | 🔲 To Do    |
| **6. WalletRewind UI**    | Real data → slides (mobile-first)                  | 🔲 To Do    |
| **7. Trading**            | Trading mock data → slides (desktop)               | 🔲 To Do    |
| **8. Polish**             | Animations, transitions, error states              | 🔲 To Do    |

---

## 9. Production Timeline & Team Structure

### 9.1 Timeline Overview

| Phase                  | Timeframe                 | Focus                                  |
| ---------------------- | ------------------------- | -------------------------------------- |
| **MVP Demo**           | Now – June 2026           | Prototype for presentation             |
| **Production Kickoff** | July 2026                 | Jordan returns, team forms             |
| **Design & Planning**  | July – August 2026        | UI/UX collaboration, data requirements |
| **Development**        | September – November 2026 | Build per-product recaps               |
| **QA & Polish**        | December 2026             | Testing, edge cases, performance       |
| **Launch**             | January 2027              | Gemini Wrapped 2026 goes live          |

### 9.2 Cross-Team Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    GEMINI WRAPPED WORKING GROUP                  │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │   Jordan    │  │   Rep #2    │  │   Rep #3    │  │ Rep #4  │ │
│  │  (Credit    │  │ (Prediction │  │  (On-Chain  │  │(Exchange│ │
│  │   Card)     │  │  Markets)   │  │   Wallet)   │  │/Trading)│ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └────┬────┘ │
│         │                │                │              │      │
│         └────────────────┴────────────────┴──────────────┘      │
│                                   │                              │
│                    ┌──────────────┴──────────────┐               │
│                    │                             │               │
│                    ▼                             ▼               │
│            ┌─────────────┐               ┌─────────────┐         │
│            │   UI/UX     │               │   Product   │         │
│            │   Design    │               │   Leads     │         │
│            └─────────────┘               └─────────────┘         │
│                    │                                             │
│                    ▼                                             │
│            ┌─────────────┐                                       │
│            │  Marketing  │                                       │
│            │  (Social    │                                       │
│            │  Templates) │                                       │
│            └─────────────┘                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 Responsibilities

| Role                                      | Responsibilities                                                       |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| **Jordan (Credit Card Rep, Coordinator)** | Overall feature ownership, Credit Card implementation, cross-team sync |
| **Prediction Markets Rep**                | PM data requirements, PM-specific nameplates, PM slide content         |
| **On-Chain Wallet Rep**                   | Wallet data APIs, chain coverage, gas calculations                     |
| **Exchange/Trading Rep**                  | Trading data requirements, trading-specific metrics                    |
| **UI/UX**                                 | Visual consistency, mobile designs, animations                         |
| **Product Leads**                         | Prioritization, success metrics, launch coordination                   |
| **Marketing**                             | Social templates, brand guidelines, launch promotion                   |

### 9.4 Coordination Model

**Option A: Jordan as Cross-Team Coordinator**

- Jordan owns the Wrapped feature across all products
- Attends standups for each team as needed
- Single point of contact for UI/UX, Product, and Marketing
- 6-month dedicated focus

**Option B: Representative Model**

- Each team owns their product's recap
- Jordan owns Credit Card + coordinates
- Weekly sync across all reps
- Shared design system and components

### 9.5 Monthly Milestones

| Month         | Milestone                                                              |
| ------------- | ---------------------------------------------------------------------- |
| **July**      | Team formed, kickoff, data requirements gathered                       |
| **August**    | Design mockups approved, shared component library, marketing alignment |
| **September** | Credit Card + Prediction Markets development                           |
| **October**   | WalletRewind + Trading development                                     |
| **November**  | Integration, cross-product testing, social templates finalized         |
| **December**  | QA, performance, launch prep                                           |
| **January**   | 🚀 Launch Gemini Wrapped 2026                                          |

---

## 10. Production Considerations

### 10.1 Data Sources (Production)

| Product            | MVP Source       | Production Source                |
| ------------------ | ---------------- | -------------------------------- |
| Credit Card        | Static mock JSON | Gemini Card transaction API      |
| Prediction Markets | Static mock JSON | Gemini PM positions/outcomes API |
| Trading            | Static mock JSON | Gemini Exchange API              |
| WalletRewind       | Alchemy + Helius | Gemini internal indexers         |

### 10.2 Gemini Infrastructure Advantages

| MVP Limitation              | Gemini Advantage         |
| --------------------------- | ------------------------ |
| External APIs (rate limits) | Direct database access   |
| Public wallet data only     | Authenticated user data  |
| No personalization          | Full user context        |
| Manual address input        | Auto-detect from session |
| Mocked data                 | Real transaction history |

### 10.3 Cross-Product Insights (Future)

With production data, Gemini could offer combined insights:

- "You earned $736 in crypto-back, then traded it into $892"
- "Your prediction accuracy was 68%, and you traded on days you won"
- "You're a BTC Maximalist across all products"
- "Your biggest card purchase was the same day as your biggest prediction win"

### 10.4 Privacy & Compliance

| Consideration      | Approach                              |
| ------------------ | ------------------------------------- |
| PII in recaps      | No names, only aggregates             |
| Sharing            | User-initiated only                   |
| Data retention     | Computed on-demand, not stored        |
| CCPA/GDPR          | Standard Gemini compliance            |
| Prediction Markets | Comply with jurisdiction restrictions |

---

## 11. Success Metrics

### 11.1 Engagement Metrics

| Metric              | Target                            |
| ------------------- | --------------------------------- |
| Recap views         | 60%+ of eligible users            |
| Completion rate     | 80%+ view all slides              |
| Share rate          | 15%+ share to social              |
| Return visits       | 2+ views per user                 |
| Cross-product views | 30%+ view another product's recap |

### 11.2 Business Metrics

| Metric             | Target                   |
| ------------------ | ------------------------ |
| Social impressions | 1M+ from shared recaps   |
| New user signups   | 5%+ lift from social     |
| Product cross-sell | 10%+ try another product |
| NPS impact         | +5 point lift            |

---

## 12. Open Questions

| Question                                               | Owner     | Status |
| ------------------------------------------------------ | --------- | ------ |
| Which team owns the unified Wrapped experience?        | Product   | Open   |
| Should recaps be mintable as NFTs?                     | Product   | Open   |
| What's the annual release cadence?                     | Product   | Open   |
| How do we handle users with minimal activity?          | Design    | Open   |
| Prediction Markets legal review for shareable content? | Legal     | Open   |
| Should there be a "compare with friends" feature?      | Product   | Open   |
| Final social template dimensions and formats?          | Marketing | Open   |

---

## 13. Appendix

### A. Competitive Analysis

| Product               | What They Do              | Gemini Differentiation         |
| --------------------- | ------------------------- | ------------------------------ |
| Spotify Wrapped       | Annual listening recap    | Proven format, high engagement |
| Apple Music Replay    | Monthly + annual stats    | Less viral than Spotify        |
| Polymarket (no recap) | Prediction markets        | Opportunity to differentiate   |
| Robinhood Recap       | Trading summary (limited) | Basic, not shareable           |

### B. Sample Slide Content

**Credit Card — Big Number Slide:**

```
"You spent"
$24,532
"this year with your Gemini Card"

"That's $736 back in crypto 🎉"
```

**Prediction Markets — Fun Stat Slide:**

```
"Your longest winning streak?"
7 PREDICTIONS
"You were on fire in March"

"Best call: UFC Underdog at 15% odds 🎯"
```

**WalletRewind — Nameplates Slide:**

```
"You earned 2 nameplates this year"

🎨 NFT Collector
   "14 NFTs touched your wallet"

🔀 Chain Hopper
   "Active on 3 different chains"
```

### C. Links

- [Gemini Credit Card](https://www.gemini.com/credit-card)
- [Gemini Prediction Markets](https://www.gemini.com/prediction-markets)
- [Gemini Exchange](https://www.gemini.com/exchange)
- [Gemini Wallet](https://www.gemini.com/wallet)
- [Helius Wallet API](https://docs.helius.dev/wallet-api/overview)
- [Spotify Wrapped Case Study](https://newsroom.spotify.com/wrapped/)
