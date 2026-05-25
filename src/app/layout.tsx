import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fret Lab — ギター練習スタジオ",
  description:
    "バッキングトラックに合わせて自由に弾く。スケールをフレットボードで可視化する。ギター練習のためのウェブアプリ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <header className="border-b border-edge">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="font-mono text-lg font-semibold tracking-tight text-gold"
            >
              🎸 Fret Lab
            </Link>
            <div className="flex gap-6 text-sm text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                バッキング
              </Link>
              <Link
                href="/scales"
                className="transition-colors hover:text-gold"
              >
                スケール
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-edge py-6 text-center text-xs text-muted">
          Fret Lab · Built for guitarists
        </footer>
      </body>
    </html>
  );
}
