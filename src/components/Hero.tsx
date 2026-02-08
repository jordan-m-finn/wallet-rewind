"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

export function Hero() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [manualAddress, setManualAddress] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleViewRecap = () => {
    if (isConnected && address) {
      router.push(`/recap/${address}?year=${currentYear}`);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualAddress.trim()) {
      router.push(`/recap/${manualAddress.trim()}?year=${currentYear}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#050505]">
        {/* Subtle radial gradient from top */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,220,250,0.15), transparent)",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-40 top-2/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-[100px]"
          style={{ animation: "float 6s ease-in-out infinite", animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span className="text-sm font-medium text-cyan-400">
            Your {currentYear} Recap is Ready
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-8">
          <span className="block text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            Your year.
          </span>
          <span 
            className="mt-3 block text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl"
            style={{
              background: "linear-gradient(135deg, #00DCFA 0%, #3b82f6 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            On-chain.
          </span>
          <span className="mt-3 block text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            Rewound.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-12 max-w-lg text-xl text-zinc-400 leading-relaxed">
          Every swap, every mint, every late-night transaction.{" "}
          <span className="text-white">See it all.</span>
        </p>

        {/* CTA Section */}
        <div>
          {!isConnected ? (
            <div className="flex flex-col items-center gap-5">
              {!showManualInput ? (
                <>
                  <ConnectButton.Custom>
                    {({ openConnectModal, mounted }) => {
                      const ready = mounted;
                      return (
                        <button
                          onClick={openConnectModal}
                          disabled={!ready}
                          className="group relative inline-flex items-center gap-3 rounded-2xl bg-cyan-400 px-10 py-5 text-lg font-semibold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,220,250,0.4)]"
                        >
                          <WalletIcon className="h-5 w-5" />
                          Connect Wallet
                          <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                      );
                    }}
                  </ConnectButton.Custom>
                  <button
                    onClick={() => setShowManualInput(true)}
                    className="text-sm text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
                  >
                    or enter an address manually
                  </button>
                </>
              ) : (
                <form onSubmit={handleManualSubmit} className="w-full max-w-md">
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="0x... or Solana address"
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono text-sm"
                      autoFocus
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowManualInput(false);
                          setManualAddress("");
                        }}
                        className="flex-1 rounded-xl border border-white/20 bg-transparent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!manualAddress.trim()}
                        className="flex-1 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        View Recap
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <p className="mt-2 text-xs text-zinc-600">
                Read-only access. We never touch your keys.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              {/* Connected badge */}
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-emerald-400">
                  Connected
                </span>
              </div>

              <p className="font-mono text-sm text-zinc-500">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>

              <button
                onClick={handleViewRecap}
                className="group relative inline-flex items-center gap-3 rounded-2xl bg-cyan-400 px-10 py-5 text-lg font-semibold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,220,250,0.4)]"
              >
                <SparklesIcon className="h-5 w-5" />
                View Your {currentYear} Recap
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setShowManualInput(true)}
                className="text-sm text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
              >
                or view a different address
              </button>

              {showManualInput && (
                <form onSubmit={handleManualSubmit} className="w-full max-w-md mt-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="0x... or Solana address"
                      className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono text-sm"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!manualAddress.trim()}
                      className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-cyan-300 disabled:opacity-50"
                    >
                      Go
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 text-zinc-600">
            <span className="text-xs">Scroll to explore</span>
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-zinc-700 p-1.5">
              <div 
                className="h-2 w-1 rounded-full bg-zinc-600"
                style={{ animation: "float 2s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
