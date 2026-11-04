'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cartStore';
import { useWishlist } from '@/lib/wishlistStore';
import CartDrawer from '@/components/ui/CartDrawer';
import SearchModal from '@/components/ui/SearchModal';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'SHOP ALL', href: '/shop' },
  { label: 'CATEGORIES', href: '/categories' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="global-nav"
        className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-4 flex justify-between items-center text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--background)]/90 border-b border-foreground/10 shadow-sm'
            : 'bg-[var(--background)]/75 border-b border-foreground/5'
        }`}
      >
        {/* Brand Logo */}
        <div className="flex-1 flex items-center">
          <Link
            href="/"
            className="text-foreground hover:text-coral transition-colors flex items-center gap-2 group cursor-pointer"
            aria-label="SONA Homepage"
          >
            <span className="block w-2 h-2 bg-coral rounded-full group-hover:scale-125 transition-transform" />
            <span className="font-black text-sm tracking-[0.3em]">SONA ONE</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex gap-6 xl:gap-8 justify-center items-center flex-shrink-0">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-2 text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  isActive ? 'text-foreground font-black' : ''
                }`}
              >
                {isActive && <span className="block w-1 h-1 bg-coral rounded-full absolute -left-2.5 top-1/2 -translate-y-1/2" />}
                <span className="whitespace-nowrap">{link.label}</span>
                <span
                  className={`block absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-coral transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Wishlist, Cart */}
        <div className="flex items-center gap-5 md:gap-6 flex-1 justify-end">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 text-foreground hover:text-coral transition-colors"
            aria-label="Search products"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-2 fill-none">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="hidden sm:inline text-[9px] tracking-widest font-black">SEARCH</span>
          </button>

          {/* Wishlist Link */}
          <Link
            href="/shop?filter=wishlist"
            className="relative flex items-center text-foreground hover:text-coral transition-colors"
            aria-label="Wishlist"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-2 fill-none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-coral text-white rounded-full text-[8px] font-black flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3 py-1.5 bg-foreground text-background hover:bg-coral hover:text-white transition-colors"
            aria-label="Shopping bag"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-[9px] font-black tracking-widest">BAG ({itemCount})</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-[4px] w-6 group items-end p-2 -mr-2 cursor-pointer"
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
            >
              <span className="w-full h-[1.5px] bg-foreground group-hover:bg-coral transition-colors" />
              <span className="w-3/4 h-[1.5px] bg-foreground group-hover:bg-coral transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-[160] bg-[var(--background)] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full px-6 py-5 flex justify-between items-center border-b border-foreground/5">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-foreground hover:text-coral transition-colors flex items-center gap-2"
          >
            <span className="block w-2 h-2 bg-coral rounded-full" />
            <span className="font-black text-xs tracking-[0.3em]">SONA ONE</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground hover:text-coral transition-colors p-2"
          >
            CLOSE ✕
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-10 gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-left flex items-center gap-3 text-2xl font-black tracking-widest uppercase transition-colors ${
                  isActive ? 'text-coral' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {isActive && <span className="block w-2 h-2 bg-coral rounded-full" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-foreground/5 flex flex-col gap-3">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full py-3 border border-foreground/15 text-center text-xs font-black tracking-widest uppercase text-foreground hover:border-coral hover:text-coral transition-colors"
          >
            SEARCH CATALOGUE 🔍
          </button>
          <Link
            href="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="w-full py-3.5 bg-foreground text-background text-center text-xs font-black tracking-widest uppercase hover:bg-coral transition-colors"
          >
            SHOP ALL AUDIO →
          </Link>
        </div>
      </div>

      {/* Cart Drawer & Search Modal Components */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
