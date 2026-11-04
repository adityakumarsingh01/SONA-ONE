'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartStore';

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, subtotal, shipping, tax, total, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--background)] border-l border-foreground/15 shadow-2xl flex flex-col relative animate-fadeIn">
          {/* Header */}
          <div className="p-6 border-b border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <h2 className="text-sm font-black tracking-[0.2em] uppercase text-foreground">
                SHOPPING BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[10px] font-black tracking-widest text-muted hover:text-coral transition-colors"
            >
              CLOSE ✕
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full border border-foreground/15 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-foreground/40 stroke-2" fill="none">
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-sm font-black tracking-tight text-foreground mb-1">YOUR BAG IS EMPTY</p>
                <p className="text-xs text-muted mb-6 max-w-xs">Explore our audiophile headphones, earbuds, and speakers.</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-foreground text-background text-[10px] font-black tracking-widest uppercase hover:bg-coral hover:text-white transition-colors"
                >
                  START EXPLORING →
                </Link>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${idx}`}
                  className="flex gap-4 p-3 border border-foreground/10 bg-foreground/[0.015] relative group"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-foreground/5 shrink-0 overflow-hidden border border-foreground/10">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-black tracking-tight text-foreground truncate hover:text-coral transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-muted/60 hover:text-coral text-xs pl-2"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-[10px] text-muted font-bold tracking-wider uppercase mt-0.5">
                        {item.selectedColor} {item.selectedSize && `• ${item.selectedSize}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-foreground/15">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-foreground hover:bg-foreground/5"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-foreground hover:bg-foreground/5"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="text-xs font-black text-foreground">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-foreground/10 bg-foreground/[0.015]">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">Subtotal</span>
                  <span className="text-foreground font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">Shipping</span>
                  <span className={shipping === 0 ? 'text-coral font-bold' : 'text-foreground font-bold'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">GST (18%)</span>
                  <span className="text-foreground font-bold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-foreground/10 flex justify-between">
                  <span className="text-xs font-black tracking-widest uppercase text-foreground">TOTAL</span>
                  <span className="text-base font-black text-foreground">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 bg-coral text-white text-xs font-black tracking-widest uppercase text-center hover:scale-[1.01] transition-transform shadow-lg"
                  style={{ boxShadow: '0 8px 20px rgba(255, 77, 77, 0.25)' }}
                >
                  PROCEED TO CHECKOUT →
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 border border-foreground/15 text-foreground text-[10px] font-black tracking-widest uppercase text-center hover:border-foreground transition-colors"
                >
                  VIEW FULL CART
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

