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
      <div className="absolute inset-0 bg-background">
        {/* Subtle radial gradient */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(187 100% 49% / 0.15), transparent)",
          }}
        />
      </div>

      {/* Floating orbs (subtle, Gemini-style) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-primary opacity-[0.03] blur-[100px] animate-float" />
        <div
          className="absolute -right-40 top-2/3 h-64 w-64 rounded-full bg-primary opacity-[0.03] blur-[80px] animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-tight text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-sm font-medium text-primary">
            Your {currentYear} Recap is Ready
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 animate-slide-up">
          <span className="block text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Your year.
          </span>
          <span className="mt-2 block text-5xl font-bold tracking-tight text-gradient md:text-7xl">
            On-chain.
          </span>
          <span className="mt-2 block text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Rewound.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-md text-lg text-muted-foreground animate-slide-up delay-100">
          Every swap, every mint, every late-night transaction.{" "}
          <span className="text-foreground">See it all.</span>
        </p>

        {/* CTA Section */}
        <div className="animate-slide-up delay-200">
          {!isConnected ? (
            <div className="flex flex-col items-center gap-4">
              {!showManualInput ? (
                <>
                  <ConnectButton.Custom>
                    {({ openConnectModal, mounted }) => {
                      const ready = mounted;
                      return (
                        <button
                          onClick={openConnectModal}
                          disabled={!ready}
                          className="group relative inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-cyan-dim hover:shadow-glow"
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
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    or enter an address manually
                  </button>
                </>
              ) : (
                <form onSubmit={handleManualSubmit} className="w-full max-w-md">
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        placeholder="0x... or Solana address"
                        className="w-full rounded-xl border border-border bg-card px-4 py-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowManualInput(false);
                          setManualAddress("");
                        }}
                        className="flex-1 btn-secondary"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!manualAddress.trim()}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        View Recap
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <p className="mt-4 text-xs text-muted-foreground">
                Read-only access. We never touch your keys.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="mb-2 flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-500">
                  Connected
                </span>
              </div>

              <p className="font-mono text-sm text-muted-foreground mb-2">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>

              <button
                onClick={handleViewRecap}
                className="group relative inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-cyan-dim hover:shadow-glow"
              >
                <SparklesIcon className="h-5 w-5" />
                View Your {currentYear} Recap
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setShowManualInput(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                or view a different address
              </button>

              {showManualInput && (
                <form onSubmit={handleManualSubmit} className="w-full max-w-md mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="0x... or Solana address"
                      className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!manualAddress.trim()}
                      className="btn-primary disabled:opacity-50"
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-500">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs">Scroll to explore</span>
            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-muted-foreground/30 p-1.5">
              <div className="h-1.5 w-1 rounded-full bg-muted-foreground/50 animate-float" />
            </div>
          </div>
        </div>
      </div>
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
