'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[var(--background)] pt-16 pb-12 border-t border-foreground/10 flex flex-col items-center relative z-40">
      <div className="w-full px-6 md:px-12 lg:px-24">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-foreground/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start pr-6">
            <Link href="/" className="flex items-center gap-2 group mb-3">
              <span className="w-2.5 h-2.5 bg-coral rounded-full" />
              <span className="text-xl font-black tracking-[0.3em] text-foreground">SONA ONE</span>
            </Link>
            <p className="text-xs text-muted leading-relaxed max-w-sm mb-6">
              Precision acoustic architecture engineered for movement, studio accuracy, and deep sensory immersion. Fusing industrial minimalism with world-class audiophile engineering.
            </p>
            <div className="flex items-center gap-3 text-xs text-foreground font-black tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              FLAGSHIP STORE: JALANDHAR, PB, INDIA
            </div>
          </div>

          {/* Audio Products */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-coral mb-4">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs font-bold tracking-wider text-muted">
              <li>
                <Link href="/shop?category=wireless-headphones" className="hover:text-foreground transition-colors">
                  Wireless Headphones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wireless-earbuds" className="hover:text-foreground transition-colors">
                  Wireless Earbuds
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gaming-headsets" className="hover:text-foreground transition-colors">
                  Gaming Headsets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=portable-speakers" className="hover:text-foreground transition-colors">
                  Bluetooth Speakers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-foreground transition-colors">
                  Cables & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-coral mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-bold tracking-wider text-muted">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About SONA
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground transition-colors">
                  Audio Categories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-foreground transition-colors">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-coral mb-4">
              STAY TUNED
            </h4>
            <p className="text-xs text-muted mb-3 leading-snug">
              Receive private product release drops and exclusive audiophile tuning presets.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to SONA Drops!'); }} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="audiophile@domain.com"
                className="w-full bg-foreground/[0.03] border border-foreground/15 px-3 py-2 text-xs text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-foreground text-background text-[10px] font-black tracking-widest uppercase hover:bg-coral transition-colors"
              >
                JOIN THE LAB →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[10px] text-muted/70 font-bold tracking-wider uppercase">
            © 2026 SONA ACOUSTICS LABS PVT. LTD. ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-6 text-[10px] font-bold tracking-widest text-muted">
            <span className="hover:text-foreground cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-foreground cursor-pointer">TERMS OF SALE</span>
            <span className="hover:text-foreground cursor-pointer">WARRANTY (1 YR)</span>
          </div>

          <button
            onClick={scrollToTop}
            className="text-[10px] font-black tracking-widest text-foreground uppercase hover:text-coral transition-colors flex items-center gap-1.5"
          >
            TOP <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

