'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PRODUCTS, Product } from '@/lib/products';
import { trackEvent } from '@/lib/gtag';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const matches = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.shortDescription.toLowerCase().includes(trimmed)
    );
    setResults(matches);

    // Track search event in GA4
    if (trimmed.length > 2) {
      trackEvent('search', {
        search_term: trimmed,
      });
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center bg-black/70 backdrop-blur-md p-4 pt-16 md:pt-24 animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[var(--background)] border border-foreground/15 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 md:p-6 border-b border-foreground/10 flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-coral shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search headphones, earbuds, speakers, cables..."
            className="w-full bg-transparent text-sm md:text-base text-foreground placeholder:text-muted/40 font-medium focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-muted hover:text-foreground font-bold p-1"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[10px] font-black tracking-widest uppercase text-muted hover:text-coral pl-2"
          >
            ESC ✕
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        {!query && (
          <div className="p-6 border-b border-foreground/5 bg-foreground/[0.01]">
            <p className="text-[9px] font-bold tracking-[0.25em] text-muted uppercase mb-3">POPULAR SEARCHES</p>
            <div className="flex flex-wrap gap-2">
              {['Wireless Headphones', 'ANC', 'AirPods Neo', 'Boom 360', 'Gaming 7.1', 'Planar Magnetic'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 border border-foreground/10 text-xs font-medium text-foreground hover:border-coral hover:text-coral transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {query.trim() && results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-black text-foreground mb-1">NO ACOUSTIC MATCHES FOUND</p>
              <p className="text-xs text-muted">Try searching with a different term or explore the full shop catalogue.</p>
              <button
                onClick={() => {
                  onClose();
                  router.push('/shop');
                }}
                className="mt-6 px-6 py-2.5 bg-foreground text-background text-[10px] font-black tracking-widest uppercase hover:bg-coral transition-colors"
              >
                BROWSE ALL PRODUCTS →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2.5 hover:bg-foreground/[0.03] border border-transparent hover:border-foreground/10 transition-colors group"
                >
                  <div className="relative w-14 h-14 bg-foreground/5 shrink-0 overflow-hidden border border-foreground/10">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-bold tracking-[0.2em] text-coral uppercase block">
                      {product.category}
                    </span>
                    <h4 className="text-xs font-black text-foreground group-hover:text-coral transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-muted truncate mt-0.5">{product.shortDescription}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-foreground block">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] text-emerald-600 font-bold uppercase">
                      In Stock
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

