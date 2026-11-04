'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cartStore';
import { trackEcommerce } from '@/lib/gtag';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoPaymentFailed, setDemoPaymentFailed] = useState(false);

  // Form State
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
    phone: '',
    cardNumber: '4242 4242 4242 4242',
    cardName: 'DEMO BUYER',
    expiry: '12/28',
    cvv: '888',
    upiId: 'demo@sona',
  });

  // Track begin_checkout upon entering
  useEffect(() => {
    if (items.length > 0) {
      trackEcommerce('begin_checkout', {
        value: total,
        items: items.map((i) => ({
          item_id: i.product.id,
          item_name: i.product.name,
          item_category: i.product.category,
          item_variant: `${i.selectedColor} / ${i.selectedSize || 'Standard'}`,
          price: i.product.price,
          quantity: i.quantity,
        })),
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    trackEcommerce('add_shipping_info', {
      value: total,
      shipping_tier: 'Insured Air Freight',
      items: items.map((i) => ({
        item_id: i.product.id,
        item_name: i.product.name,
        item_category: i.product.category,
        item_variant: `${i.selectedColor} / ${i.selectedSize || 'Standard'}`,
        price: i.product.price,
        quantity: i.quantity,
      })),
    });
    setStep(2);
  };

  const handleReviewOrder = () => {
    trackEcommerce('add_payment_info', {
      value: total,
      payment_type: paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI',
      items: items.map((i) => ({
        item_id: i.product.id,
        item_name: i.product.name,
        item_category: i.product.category,
        item_variant: `${i.selectedColor} / ${i.selectedSize || 'Standard'}`,
        price: i.product.price,
        quantity: i.quantity,
      })),
    });
    setStep(3);
  };

  const handlePlaceOrder = (simulateFailure = false) => {
    setIsProcessing(true);
    setDemoPaymentFailed(false);

    setTimeout(() => {
      setIsProcessing(false);

      if (simulateFailure) {
        setDemoPaymentFailed(true);
        // Do NOT create order, do NOT fire purchase event, do NOT clear cart!
        return;
      }

      // Successful demo payment:
      const generatedOrderId = `SONA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const orderData = {
        orderId: generatedOrderId,
        date: new Date().toISOString(),
        items: [...items],
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress: { ...form },
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI',
      };

      // Save order for confirmation page
      try {
        sessionStorage.setItem('sona_last_order', JSON.stringify(orderData));
      } catch (e) {
        console.error('Session storage error', e);
      }

      // Track GA4 purchase event
      trackEcommerce('purchase', {
        transaction_id: generatedOrderId,
        value: total,
        tax,
        shipping,
        payment_type: paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI',
        items: items.map((i) => ({
          item_id: i.product.id,
          item_name: i.product.name,
          item_category: i.product.category,
          item_variant: `${i.selectedColor} / ${i.selectedSize || 'Standard'}`,
          price: i.product.price,
          quantity: i.quantity,
        })),
      });

      // Clear the shopping bag only after successful order placement
      clearCart();

      // Navigate to order confirmation
      router.push(`/order-confirmation?orderId=${generatedOrderId}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] pt-32 pb-20 flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-black text-foreground mb-3">NO ITEMS TO CHECKOUT</h2>
          <p className="text-xs text-muted mb-8 leading-relaxed">
            Your shopping bag is currently empty. Please select an acoustic product from our store before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="px-8 py-4 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-coral transition-colors"
          >
            DISCOVER PRODUCTS →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-28 pb-20">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        {/* Checkout Header */}
        <div className="mb-10 pb-6 border-b border-foreground/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] text-coral uppercase mb-1">
              DEMO CHECKOUT PORTAL
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
              SECURE CHECKOUT
            </h1>
          </div>
          <Link href="/cart" className="text-xs font-bold text-muted hover:text-foreground uppercase">
            ← EDIT BAG
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-10 max-w-md">
          {[
            { num: 1, label: 'SHIPPING' },
            { num: 2, label: 'PAYMENT' },
            { num: 3, label: 'CONFIRM' },
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              {i > 0 && (
                <div
                  className={`flex-1 h-[1.5px] transition-colors ${
                    step >= s.num ? 'bg-coral' : 'bg-foreground/15'
                  }`}
                />
              )}
              <button
                onClick={() => {
                  if (s.num < step) setStep(s.num as any);
                }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                    step >= s.num
                      ? 'bg-coral text-white shadow-md'
                      : 'border border-foreground/20 text-muted'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase hidden sm:inline ${
                    step >= s.num ? 'text-foreground font-black' : 'text-muted'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form (Left: 7 Cols) */}
          <div className="lg:col-span-7">
            {/* STEP 1: SHIPPING FORM */}
            {step === 1 && (
              <form onSubmit={handleContinueToPayment} className="space-y-6">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-foreground mb-1">
                    1. SHIPPING INFORMATION
                  </h2>
                  <p className="text-xs text-muted">
                    Enter the delivery address for insured air express shipping across India.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@domain.com"
                    className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Aditya"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Singh"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                    DELIVERY STREET ADDRESS *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="Apt 402, Signature Towers, MG Road"
                    className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                      CITY *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="Bengaluru"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                      STATE *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      placeholder="Karnataka"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                      PIN CODE *
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      required
                      placeholder="560001"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-coral text-white text-xs font-black tracking-widest uppercase hover:scale-[1.01] transition-transform shadow-lg"
                  style={{ boxShadow: '0 8px 25px rgba(255, 77, 77, 0.25)' }}
                >
                  PROCEED TO PAYMENT METHOD →
                </button>
              </form>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-foreground mb-1">
                    2. PAYMENT SIMULATION (DEMO)
                  </h2>
                  <p className="text-xs text-muted">
                    This is a simulated demo payment system for academic testing. No real money or card is charged.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-3 px-4 border text-xs font-black tracking-widest uppercase transition-all ${
                      paymentMethod === 'card'
                        ? 'border-coral bg-coral text-white'
                        : 'border-foreground/15 text-muted hover:border-foreground/30'
                    }`}
                  >
                    💳 CARD DEMO
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex-1 py-3 px-4 border text-xs font-black tracking-widest uppercase transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-coral bg-coral text-white'
                        : 'border-foreground/15 text-muted hover:border-foreground/30'
                    }`}
                  >
                    ₹ UPI SIMULATION
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="p-6 border border-foreground/10 bg-foreground/[0.015] space-y-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest uppercase text-foreground block mb-1">
                        DEMO CARD NUMBER
                      </label>
                      <input
                        type="text"
                        value={form.cardNumber}
                        readOnly
                        className="w-full bg-transparent border border-foreground/15 px-3 py-2 text-xs font-mono text-foreground opacity-80"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold tracking-widest uppercase text-foreground block mb-1">
                          EXPIRY
                        </label>
                        <input
                          type="text"
                          value={form.expiry}
                          readOnly
                          className="w-full bg-transparent border border-foreground/15 px-3 py-2 text-xs font-mono text-foreground opacity-80"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-widest uppercase text-foreground block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={form.cvv}
                          readOnly
                          className="w-full bg-transparent border border-foreground/15 px-3 py-2 text-xs font-mono text-foreground opacity-80"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 border border-foreground/10 bg-foreground/[0.015] space-y-4 text-center">
                    <p className="text-xs font-bold text-foreground">DEMO UPI QR & VPA</p>
                    <div className="w-32 h-32 mx-auto bg-foreground/5 border border-foreground/15 flex items-center justify-center font-mono text-[10px] text-muted">
                      [DEMO QR CODE]
                    </div>
                    <p className="text-xs text-muted font-mono">{form.upiId}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-6 border border-foreground/15 text-xs font-bold uppercase"
                  >
                    ← BACK
                  </button>
                  <button
                    type="button"
                    onClick={handleReviewOrder}
                    className="flex-1 py-4 bg-coral text-white text-xs font-black tracking-widest uppercase hover:scale-[1.01] transition-transform"
                  >
                    REVIEW ORDER DETAILS →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & DEMO PURCHASE */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-foreground mb-1">
                    3. FINAL ORDER VERIFICATION
                  </h2>
                  <p className="text-xs text-muted">
                    Review your delivery destination and confirm simulated payment.
                  </p>
                </div>

                {/* Delivery Snapshot */}
                <div className="p-4 border border-foreground/10 bg-foreground/[0.015]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black tracking-widest text-coral uppercase">
                      DELIVERY RECIPIENT
                    </span>
                    <button onClick={() => setStep(1)} className="text-[10px] text-muted hover:text-coral font-bold">
                      EDIT
                    </button>
                  </div>
                  <p className="text-xs font-bold text-foreground">
                    {form.firstName} {form.lastName} ({form.phone})
                  </p>
                  <p className="text-xs text-muted">
                    {form.address}, {form.city}, {form.state} {form.zip}
                  </p>
                  <p className="text-xs text-muted mt-1">{form.email}</p>
                </div>

                {/* Payment Simulation Warning */}
                <div className="p-4 border border-amber-500/20 bg-amber-500/5 text-xs text-amber-800 dark:text-amber-400">
                  <p className="font-bold mb-1">⚠️ Academic Demo Simulation Active</p>
                  <p className="text-[11px] leading-relaxed">
                    Clicking "COMPLETE DEMO PURCHASE" will test successful transaction creation, unique order ID generation, cart cleanup, and GA4 <code>purchase</code> event transmission.
                  </p>
                </div>

                {demoPaymentFailed && (
                  <div className="p-4 border border-red-500/30 bg-red-500/10 text-xs text-red-600 font-bold">
                    ❌ Simulated Payment Failed. No order was created and no GA4 purchase event was sent. You can retry with the success button.
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handlePlaceOrder(false)}
                    className="w-full py-4 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-coral transition-colors shadow-xl disabled:opacity-50"
                  >
                    {isProcessing ? 'PROCESSING SIMULATION...' : `COMPLETE DEMO PURCHASE — ₹${total.toLocaleString('en-IN')}`}
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handlePlaceOrder(true)}
                    className="w-full py-2.5 border border-red-500/30 text-red-500 text-[10px] font-bold tracking-widest uppercase hover:bg-red-500 hover:text-white transition-colors"
                  >
                    TEST SIMULATED PAYMENT FAILURE
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Order Summary (Right: 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="border border-foreground/15 bg-foreground/[0.015] p-6 sticky top-28">
              <h3 className="text-xs font-black tracking-[0.25em] uppercase text-coral mb-4">
                BAG ITEMS ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 pb-4 border-b border-foreground/10">
                {items.map((i, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 bg-foreground/5 shrink-0 border border-foreground/10 overflow-hidden">
                      <Image src={i.product.images[0]} alt={i.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-foreground truncate">{i.product.name}</p>
                      <p className="text-[10px] text-muted">
                        {i.selectedColor} &bull; Qty {i.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-black text-foreground">
                      ₹{(i.product.price * i.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Subtotal</span>
                  <span className="text-foreground font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-medium">Insured Shipping</span>
                  <span className={shipping === 0 ? 'text-coral font-bold' : 'text-foreground font-bold'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-medium">GST (18%)</span>
                  <span className="text-foreground font-bold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-3 border-t border-foreground/10 flex justify-between items-baseline">
                  <span className="text-xs font-black tracking-widest uppercase text-foreground">TOTAL</span>
                  <span className="text-lg font-black text-foreground">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
