import Image from "next/image";
import { AddressInput } from "../components/AddressInput.tsx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">WalletRewind</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Your yearly crypto recap
        </p>
        <AddressInput />
    </main>
  );
}
