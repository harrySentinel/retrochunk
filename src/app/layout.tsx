import type { Metadata } from "next";
import { Silkscreen, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RetroChunk — Pixel-Art UI Component Library",
  description:
    "A retro pixel-art React component library with mascots, hard shadows, and CRT vibes. Built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${silkscreen.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
