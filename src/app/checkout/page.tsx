'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const VARIANTS = [
  { id: 'red', name: 'SONA Red', primary: '#FF4D4D' },
  { id: 'midnight', name: 'Midnight', primary: '#171820' },
  { id: 'forest', name: 'Forest', primary: '#2A6A50' },
  { id: 'cobalt', name: 'Cobalt', primary: '#1746A2' },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form state
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
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

  // Read order info from URL params (populated by Buy Now button)
  const [orderInfo] = useState(() => {
    if (typeof window === 'undefined') return { variant: 'red', size: 'M', quantity: 1 };
    const params = new URLSearchParams(window.location.search);
    return {
      variant: params.get('variant') || 'red',
      size: params.get('size') || 'M',
      quantity: Number(params.get('qty')) || 1,
    };
  });

  const selectedVariant = VARIANTS.find(v => v.id === orderInfo.variant) || VARIANTS[0];
  const unitPrice = 9999;
  const subtotal = unitPrice * orderInfo.quantity;
  const shipping = 0;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  // Format expiry as MM/YY
  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  // --- ORDER CONFIRMATION ---
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full border-2 border-coral flex items-center justify-center mx-auto mb-8 relative">
            <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-coral stroke-[2]" fill="none">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full" />
          </div>

          <p className="text-[10px] font-bold tracking-[0.3em] text-coral uppercase mb-2">ORDER CONFIRMED</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
            THANK YOU.
          </h1>
          <p className="text-sm text-muted font-medium tracking-wide mb-2">
            Your SONA ONE in <span className="text-foreground font-bold">{selectedVariant.name}</span> is on its way.
          </p>
          <p className="text-xs text-muted/70 font-medium tracking-wide mb-8">
            Order #SONA-{Math.random().toString(36).substring(2, 8).toUpperCase()} &bull; Confirmation sent to {form.email || 'your email'}
          </p>

          {/* Order Summary Card */}
          <div className="relative border border-foreground/10 p-6 mb-8 text-left">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/30" />
            <div className="absolute top-0 left-0 w-[5px] h-[5px] bg-coral" />

            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: selectedVariant.primary }} />
              <div>
                <p className="text-sm font-black tracking-widest text-foreground">SONA ONE</p>
                <p className="text-[10px] text-muted font-bold tracking-wider">{selectedVariant.name} &bull; Size {orderInfo.size} &bull; Qty {orderInfo.quantity}</p>
              </div>
            </div>
            <div className="border-t border-foreground/10 pt-4">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-muted">Total Paid</span>
                <span className="text-foreground">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="w-full py-4 bg-foreground text-[var(--background)] text-xs font-black tracking-widest uppercase text-center hover:scale-105 transition-transform"
            >
              CONTINUE SHOPPING
            </Link>
          </div>

          {/* Demo Notice */}
          <p className="mt-8 text-[10px] text-muted/50 font-bold tracking-wider uppercase">
            ⚠ This is a demo — no real payment was processed
          </p>
        </div>
      </div>
    );
  }

  // --- CHECKOUT FORM ---
  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-12">

      {/* Top Bar */}
      <div className="w-full px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between border-b border-foreground/10">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="block w-1.5 h-1.5 bg-coral rounded-full" />
          <span className="font-black text-xs tracking-[0.3em] text-foreground group-hover:text-coral transition-colors">SONA</span>
        </Link>
        <p className="text-[10px] font-bold tracking-[0.3em] text-coral uppercase">CHECKOUT</p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-12">

        {/* LEFT: Form Area */}
        <div className="flex-1 min-w-0">

          {/* Step Indicators */}
          <div className="flex items-center gap-4 mb-8">
            {[
              { num: 1, label: 'SHIPPING' },
              { num: 2, label: 'PAYMENT' },
              { num: 3, label: 'REVIEW' },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                {i > 0 && <div className={`flex-1 h-[1px] ${step >= s.num ? 'bg-coral' : 'bg-foreground/15'} transition-colors`} />}
                <button
                  onClick={() => { if (s.num < step) setStep(s.num as 1 | 2 | 3); }}
                  className="flex items-center gap-2 group"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                    step >= s.num
                      ? 'bg-coral text-white'
                      : 'border border-foreground/20 text-foreground/40'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase hidden sm:inline ${
                    step >= s.num ? 'text-foreground' : 'text-foreground/40'
                  }`}>
                    {s.label}
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handlePlaceOrder}>

            {/* STEP 1: SHIPPING */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground mb-1">SHIPPING DETAILS</h2>
                <p className="text-xs text-muted font-medium tracking-wide mb-8">Where should we send your SONA ONE?</p>

                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">FIRST NAME</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground focus:border-coral focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">LAST NAME</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground focus:border-coral focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">ADDRESS</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="123 Main Street, Apt 4"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none transition-colors"
                    />
                  </div>

                  {/* City / State / Zip */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">CITY</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground focus:border-coral focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">STATE</label>
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground focus:border-coral focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">PIN CODE</label>
                      <input
                        type="text"
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground focus:border-coral focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">PHONE</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-8 w-full py-4 bg-coral text-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-lg"
                  style={{ boxShadow: '0 10px 25px rgba(255, 77, 77, 0.2)' }}
                >
                  CONTINUE TO PAYMENT →
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground mb-1">PAYMENT METHOD</h2>
                <p className="text-xs text-muted font-medium tracking-wide mb-8">All transactions are secure and encrypted.</p>

                {/* Payment Method Tabs */}
                <div className="flex gap-3 mb-8">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-3 border text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                      paymentMethod === 'card'
                        ? 'border-coral bg-coral text-white'
                        : 'border-foreground/15 text-foreground/60 hover:border-foreground/30'
                    }`}
                  >
                    💳 CARD
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex-1 py-3 border text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                      paymentMethod === 'upi'
                        ? 'border-coral bg-coral text-white'
                        : 'border-foreground/15 text-foreground/60 hover:border-foreground/30'
                    }`}
                  >
                    ₹ UPI
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">CARD NUMBER</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={(e) => setForm(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none transition-colors font-mono tracking-wider"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">NAME ON CARD</label>
                      <input
                        type="text"
                        name="cardName"
                        value={form.cardName}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground focus:border-coral focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">EXPIRY</label>
                        <input
                          type="text"
                          name="expiry"
                          value={form.expiry}
                          onChange={(e) => setForm(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none transition-colors font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={form.cvv}
                          onChange={handleChange}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-1.5 block">UPI ID</label>
                      <input
                        type="text"
                        name="upiId"
                        value={form.upiId}
                        onChange={handleChange}
                        placeholder="yourname@upi"
                        className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-coral focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="border border-dashed border-foreground/15 p-6 flex flex-col items-center gap-3">
                      <div className="w-32 h-32 bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                        <span className="text-[10px] text-muted font-bold tracking-widest">QR CODE</span>
                      </div>
                      <p className="text-[10px] text-muted font-bold tracking-wider uppercase">Scan to pay with any UPI app</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-4 px-6 border border-foreground/15 text-xs font-black tracking-widest uppercase text-foreground hover:border-foreground/40 transition-colors"
                  >
                    ← BACK
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-coral text-white text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-lg"
                    style={{ boxShadow: '0 10px 25px rgba(255, 77, 77, 0.2)' }}
                  >
                    REVIEW ORDER →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground mb-1">REVIEW ORDER</h2>
                <p className="text-xs text-muted font-medium tracking-wide mb-8">Confirm everything looks good before placing your order.</p>

                {/* Shipping Summary */}
                <div className="relative border border-foreground/10 p-5 mb-4">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/30" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/30" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/30" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/30" />
                  <div className="absolute top-0 left-0 w-[5px] h-[5px] bg-coral" />

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold tracking-widest text-coral uppercase">SHIPPING</p>
                    <button type="button" onClick={() => setStep(1)} className="text-[10px] font-bold tracking-widest text-foreground/40 hover:text-coral uppercase transition-colors">EDIT</button>
                  </div>
                  <p className="text-sm text-foreground font-bold">{form.firstName} {form.lastName}</p>
                  <p className="text-xs text-muted">{form.address}</p>
                  <p className="text-xs text-muted">{form.city}, {form.state} {form.zip}</p>
                  <p className="text-xs text-muted mt-1">{form.email} &bull; {form.phone}</p>
                </div>

                {/* Payment Summary */}
                <div className="relative border border-foreground/10 p-5 mb-8">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/30" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/30" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/30" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/30" />

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold tracking-widest text-coral uppercase">PAYMENT</p>
                    <button type="button" onClick={() => setStep(2)} className="text-[10px] font-bold tracking-widest text-foreground/40 hover:text-coral uppercase transition-colors">EDIT</button>
                  </div>
                  {paymentMethod === 'card' ? (
                    <p className="text-sm text-foreground font-bold">
                      💳 •••• •••• •••• {form.cardNumber.replace(/\s/g, '').slice(-4) || '0000'}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground font-bold">₹ UPI — {form.upiId || 'Not set'}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-4 px-6 border border-foreground/15 text-xs font-black tracking-widest uppercase text-foreground hover:border-foreground/40 transition-colors"
                  >
                    ← BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-foreground text-[var(--background)] text-xs font-black tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    PLACE ORDER — ₹{total.toLocaleString('en-IN')}
                  </button>
                </div>

                <p className="mt-4 text-[10px] text-muted/50 font-bold tracking-wider uppercase text-center">
                  ⚠ Demo only — no real payment will be charged
                </p>
              </div>
            )}
          </form>
        </div>

        {/* RIGHT: Order Summary Sidebar */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="sticky top-24">
            <div className="relative border border-foreground/10 bg-foreground/[0.015] p-6">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/30" />
              <div className="absolute top-0 left-0 w-[5px] h-[5px] bg-coral" />
              <div className="absolute bottom-0 right-0 w-[5px] h-[5px] bg-coral" />

              {/* Tech label */}
              <div className="absolute -top-[4px] left-6 px-1.5 bg-[var(--background)] flex items-center">
                <span className="text-[6.5px] font-black tracking-[0.2em] text-foreground/40 uppercase leading-none">ORDER.SUM // 01</span>
              </div>

              <p className="text-[10px] font-bold tracking-[0.3em] text-coral uppercase mb-4">ORDER SUMMARY</p>

              {/* Product */}
              <div className="flex items-start gap-4 pb-5 border-b border-foreground/10">
                <div className="w-16 h-16 rounded border border-foreground/10 flex items-center justify-center bg-foreground/5 shrink-0">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: selectedVariant.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black tracking-widest text-foreground">SONA ONE</p>
                  <p className="text-[10px] text-muted font-bold tracking-wider">
                    {selectedVariant.name} &bull; Size {orderInfo.size}
                  </p>
                  <p className="text-[10px] text-muted font-bold tracking-wider">Qty: {orderInfo.quantity}</p>
                </div>
                <p className="text-sm font-black text-foreground whitespace-nowrap">₹{subtotal.toLocaleString('en-IN')}</p>
              </div>

              {/* Pricing */}
              <div className="pt-5 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">Subtotal</span>
                  <span className="text-foreground font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">Shipping</span>
                  <span className="text-coral font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted font-medium">GST (18%)</span>
                  <span className="text-foreground font-bold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-foreground/10 pt-4 flex justify-between">
                  <span className="text-sm font-black tracking-widest text-foreground uppercase">Total</span>
                  <span className="text-xl font-black tracking-tight text-foreground">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-5 border-t border-foreground/10 space-y-3">
                {[
                  { icon: '🔒', text: 'Secure SSL Encryption' },
                  { icon: '🚚', text: 'Free Express Shipping' },
                  { icon: '↩️', text: '30-Day Easy Returns' },
                  { icon: '🛡️', text: '1 Year Warranty' },
                ].map((g) => (
                  <div key={g.text} className="flex items-center gap-3">
                    <span className="text-sm">{g.icon}</span>
                    <span className="text-[10px] font-bold tracking-widest text-muted uppercase">{g.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

