import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS classes with proper precedence.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 * 
 * @example
 * cn("px-4 py-2", isActive && "bg-cyan", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with thousand separators
 * @example formatNumber(1234567) => "1,234,567"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Format a currency value
 * @example formatCurrency(1234.56) => "$1,234.56"
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format gas in native token units (up to 6 decimals)
 * @example formatGas(0.00123456789) => "0.001235"
 */
export function formatGas(amount: number): string {
  if (amount === 0) return "0";
  if (amount < 0.000001) return "<0.000001";
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

/**
 * Truncate an address for display
 * @example truncateAddress("0x1234...9999", 4, 4) => "0x12...99"
 */
export function truncateAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Get chain display name from internal chain ID
 */
export function getChainDisplayName(chainName: string): string {
  const chainNames: Record<string, string> = {
    "eth-mainnet": "Ethereum",
    "base-mainnet": "Base",
    "polygon-mainnet": "Polygon",
    "arbitrum-mainnet": "Arbitrum",
    "bnb-mainnet": "BNB Chain",
    "solana-mainnet": "Solana",
  };
  return chainNames[chainName] || chainName;
}

/**
 * Get chain native token symbol
 */
export function getChainToken(chainName: string): string {
  const tokens: Record<string, string> = {
    "eth-mainnet": "ETH",
    "base-mainnet": "ETH",
    "polygon-mainnet": "POL",
    "arbitrum-mainnet": "ETH",
    "bnb-mainnet": "BNB",
    "solana-mainnet": "SOL",
  };
  return tokens[chainName] || "???";
}
