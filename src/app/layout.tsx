import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { CartProvider } from "@/lib/cartStore";
import { WishlistProvider } from "@/lib/wishlistStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SONA ONE | Premium Audio & Audiophile Systems",
  description: "Sound. Unbound. Explore studio-grade wireless headphones, spatial earbuds, tournament headsets, and omnidirectional portable speakers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden min-h-screen flex flex-col`}
      >
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />

            <GoogleAnalytics />
            <Analytics />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
