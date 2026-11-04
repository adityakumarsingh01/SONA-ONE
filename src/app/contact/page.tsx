'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[var(--background)] pt-28 pb-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 pb-8 border-b border-foreground/10 text-center md:text-left">
          <p className="text-[10px] font-black tracking-[0.3em] text-coral uppercase mb-2">
            AUDIO SUPPORT & LAB ACCESS
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-3">
            CONTACT SONA
          </h1>
          <p className="text-xs md:text-sm text-muted font-medium tracking-wide max-w-xl">
            Have questions regarding sound profiles, technical impedance, warranty service, or bulk studio inquiries? Our acoustic engineers are at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Contact Details (Left: 5 Cols) */}
          <div className="md:col-span-5 space-y-8">
            <div className="p-6 border border-foreground/10 bg-foreground/[0.015]">
              <span className="text-[9px] font-bold tracking-widest text-coral uppercase block mb-1">
                ACOUSTIC HQ & LAB
              </span>
              <h3 className="text-sm font-black text-foreground mb-2">SONA ONE LABS INDIA</h3>
              <p className="text-xs text-muted leading-relaxed">
                JALANDHAR, PB, INDIA, 144411<br />
              </p>
            </div>

            <div className="p-6 border border-foreground/10 bg-foreground/[0.015]">
              <span className="text-[9px] font-bold tracking-widest text-coral uppercase block mb-1">
                DIRECT CHANNELS
              </span>
              <p className="text-xs text-foreground font-black mb-1">support@sona-audio.in</p>
              <p className="text-xs text-muted font-medium mb-3">+91 1234567890</p>
              <p className="text-[10px] text-muted uppercase font-bold tracking-wider">
                Support Hours: Mon – Fri (9:00 AM – 5:00 PM IST)
              </p>
            </div>

            <div className="p-6 border border-foreground/10 bg-foreground/[0.015]">
              <span className="text-[9px] font-bold tracking-widest text-coral uppercase block mb-1">
                WARRANTY ASSURANCE
              </span>
              <p className="text-xs text-muted leading-relaxed">
                All SONA hardware products include a 1-year complimentary replacement warranty covering acoustic driver failure, Bluetooth transceiver defect, or structural component damage.
              </p>
            </div>
          </div>

          {/* Contact Form (Right: 7 Cols) */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-10 border border-emerald-500/30 bg-emerald-500/5 text-center">
                <span className="w-12 h-12 rounded-full border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto mb-4 text-xl font-black">
                  ✓
                </span>
                <h3 className="text-xl font-black text-foreground mb-2">DISPATCH TRANSMITTED</h3>
                <p className="text-xs text-muted max-w-sm mx-auto mb-6">
                  Thank you, {formData.name}. Our acoustic support engineering team has received your dispatch and will respond within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-foreground text-background text-[10px] font-black tracking-widest uppercase hover:bg-coral transition-colors"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aditya Kumar Singh"
                    className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aditya@example.com"
                    className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                    INQUIRY CLASSIFICATION
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[var(--background)] border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none cursor-pointer"
                  >
                    <option value="General Inquiry">General Product Inquiry</option>
                    <option value="Technical Specifications">Driver & Impedance Specifications</option>
                    <option value="Warranty & Service">Warranty & Service Request</option>
                    <option value="Bulk Order">Studio & Corporate Bulk Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-widest text-foreground uppercase block mb-1.5">
                    MESSAGE / QUERY DETAILS *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry..."
                    className="w-full bg-transparent border border-foreground/15 px-4 py-3 text-xs text-foreground focus:border-coral focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-coral transition-colors shadow-lg"
                >
                  TRANSMIT INQUIRY →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

