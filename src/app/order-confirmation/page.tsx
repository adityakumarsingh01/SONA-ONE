'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SONA-ORDER';
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('sona_last_order');
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to read last order', e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-32 pb-20 flex flex-col items-center px-6">
      <div className="w-full max-w-2xl bg-foreground/[0.015] border border-foreground/15 p-8 md:p-12 relative text-center">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/40" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/40" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/40" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/40" />
        <div className="absolute top-0 left-0 w-2 h-2 bg-coral" />

        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto mb-6 text-2xl font-black">
          ✓
        </div>

        <p className="text-[10px] font-black tracking-[0.3em] text-coral uppercase mb-2">
          TRANSACTION VERIFIED &bull; DEMO MODE
        </p>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
          ORDER CONFIRMED.
        </h1>
        <p className="text-xs text-muted max-w-md mx-auto mb-6 leading-relaxed">
          Thank you for ordering with SONA ONE. Your simulated order has been registered, and GA4 e-commerce <code>purchase</code> event was dispatched.
        </p>

        {/* Order Metadata Box */}
        <div className="p-4 bg-foreground/5 border border-foreground/10 text-xs font-mono text-foreground mb-8 flex flex-col sm:flex-row justify-around gap-2 text-center">
          <div>
            <span className="text-muted block text-[9px] uppercase font-bold">ORDER NUMBER</span>
            <span className="font-bold text-coral">{orderData?.orderId || orderId}</span>
          </div>
          <div>
            <span className="text-muted block text-[9px] uppercase font-bold">PAYMENT STATUS</span>
            <span className="font-bold text-emerald-600">PAID (DEMO SIMULATION)</span>
          </div>
          <div>
            <span className="text-muted block text-[9px] uppercase font-bold">TOTAL AMOUNT</span>
            <span className="font-bold">₹{orderData?.total?.toLocaleString('en-IN') || '—'}</span>
          </div>
        </div>

        {/* Items Summary */}
        {orderData?.items && orderData.items.length > 0 && (
          <div className="text-left mb-8 border-t border-foreground/10 pt-6">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-4">
              ORDERED ACOUSTIC SYSTEMS ({orderData.items.length})
            </h3>
            <div className="space-y-3">
              {orderData.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-foreground/5 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-foreground/5 border border-foreground/10 overflow-hidden shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-black text-foreground">{item.product.name}</p>
                      <p className="text-[10px] text-muted">
                        Finish: {item.selectedColor} &bull; Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-foreground">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-coral transition-colors"
          >
            CONTINUE SHOPPING →
          </Link>
          <Link
            href="/"
            className="px-8 py-3.5 border border-foreground/15 text-foreground text-xs font-black tracking-widest uppercase hover:border-foreground transition-colors"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-xs font-bold tracking-widest">LOADING CONFIRMATION...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}

