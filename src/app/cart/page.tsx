'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartStore';
import { trackEcommerce } from '@/lib/gtag';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, shipping, tax, total } = useCart();

  useEffect(() => {
    trackEcommerce('view_cart', {
      value: subtotal,
      items: items.map((i) => ({
        item_id: i.product.id,
        item_name: i.product.name,
        item_category: i.product.category,
        item_variant: `${i.selectedColor} / ${i.selectedSize || 'Standard'}`,
        price: i.product.price,
        quantity: i.quantity,
      })),
    });
  }, [items, subtotal]);

  return (
    <div className="w-full bg-[var(--background)] pt-28 pb-20 min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-foreground/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] text-coral uppercase mb-2">
              SHOPPING BAG
            </p>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
              YOUR CART ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-muted hover:text-coral font-bold tracking-wider uppercase transition-colors"
            >
              CLEAR ENTIRE BAG
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-foreground/15 p-12">
            <div className="w-20 h-20 rounded-full border border-foreground/15 flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-foreground/40 stroke-2" fill="none">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-foreground mb-2">YOUR SHOPPING BAG IS CURRENTLY EMPTY</h2>
            <p className="text-xs text-muted max-w-md mx-auto mb-8 leading-relaxed">
              Experience the pinnacle of audio performance with our wireless headphones, earbuds, and speakers.
            </p>
            <Link
              href="/shop"
              className="px-8 py-4 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-coral hover:text-white transition-colors shadow-lg"
            >
              EXPLORE OUR STORE →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Items Table (Left: 8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${idx}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border border-foreground/10 bg-foreground/[0.015] gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-foreground/5 shrink-0 border border-foreground/10 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] font-bold tracking-[0.2em] text-coral uppercase block">
                        {item.product.category}
                      </span>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm md:text-base font-black text-foreground hover:text-coral transition-colors truncate block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted font-medium mt-0.5">
                        Finish: <span className="text-foreground">{item.selectedColor}</span>
                        {item.selectedSize && ` • Size: ${item.selectedSize}`}
                      </p>
                      <p className="text-xs font-black text-foreground mt-1">
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-foreground/10">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-foreground/20">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-foreground/5 font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-foreground/5 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[80px]">
                      <span className="text-sm font-black text-foreground">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="text-muted hover:text-coral p-1 text-sm font-bold"
                      title="Remove from bag"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-between items-center">
                <Link
                  href="/shop"
                  className="text-xs font-black tracking-widest uppercase text-foreground hover:text-coral transition-colors flex items-center gap-2"
                >
                  ← CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            {/* Order Summary Card (Right: 4 Cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 border border-foreground/15 bg-foreground/[0.015] p-6 relative">
                {/* Corner Marks */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/30" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/30" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/30" />
                <div className="absolute top-0 left-0 w-[5px] h-[5px] bg-coral" />

                <h3 className="text-xs font-black tracking-[0.25em] uppercase text-coral mb-6">
                  SUMMARY
                </h3>

                <div className="space-y-3 pb-6 border-b border-foreground/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted font-medium">Subtotal</span>
                    <span className="text-foreground font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted font-medium">Shipping (Insured Air Freight)</span>
                    <span className={shipping === 0 ? 'text-coral font-bold' : 'text-foreground font-bold'}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted font-medium">GST (18% Included)</span>
                    <span className="text-foreground font-bold">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="py-4 flex justify-between items-baseline">
                  <span className="text-xs font-black tracking-widest uppercase text-foreground">TOTAL</span>
                  <span className="text-xl font-black text-foreground">₹{total.toLocaleString('en-IN')}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-coral text-white text-xs font-black tracking-widest uppercase text-center block hover:scale-[1.01] transition-transform shadow-xl mt-4"
                  style={{ boxShadow: '0 8px 25px rgba(255, 77, 77, 0.25)' }}
                >
                  CHECKOUT NOW →
                </Link>

                <p className="mt-4 text-[9px] text-muted/60 font-bold uppercase tracking-wider text-center">
                  🔒 256-Bit Encrypted Secure Checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

