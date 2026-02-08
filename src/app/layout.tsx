import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "WalletRewind | Your Year On-Chain",
  description:
    "See your yearly crypto recap across all chains. Every swap, every mint, every transaction — beautifully visualized.",
  openGraph: {
    title: "WalletRewind | Your Year On-Chain",
    description:
      "See your yearly crypto recap across all chains. Every swap, every mint, every transaction — beautifully visualized.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WalletRewind | Your Year On-Chain",
    description:
      "See your yearly crypto recap across all chains. Every swap, every mint, every transaction — beautifully visualized.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
