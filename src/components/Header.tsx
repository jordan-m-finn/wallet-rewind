import { WalletConnectButton } from './ConnectButton'

export function Header() {
    return (
        <header className="flex justify-between items-center p-4">
            <span className="font-bold text-xl">WalletRewind</span>
            <WalletConnectButton />
        </header>
    )
}
