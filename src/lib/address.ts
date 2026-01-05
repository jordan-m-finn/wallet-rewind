export default function isSolanaAddress(address: string): boolean {
    if (address.startsWith('0x')) return false;
    if (address.length < 32 || address.length > 44) return false;

    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    return base58Regex.test(address);
}
