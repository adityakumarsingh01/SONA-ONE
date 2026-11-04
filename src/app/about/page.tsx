'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="w-full bg-[var(--background)] pt-28 pb-20">
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 pb-12 border-b border-foreground/10 text-center">
          <p className="text-[10px] font-black tracking-[0.3em] text-coral uppercase mb-3">
            ACOUSTIC ENGINEERING PHILOSOPHY
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            SOUND. UNBOUND.
          </h1>
          <p className="text-sm md:text-base text-muted font-medium max-w-2xl mx-auto leading-relaxed">
            SONA ONE was born out of an uncompromising obsession: to engineer personal audio hardware that delivers studio-reference acoustic transparency with sculptural industrial permanence.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-coral uppercase block mb-2">
              PILLAR 01 // PURITY OF SIGNAL
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
              ZERO ACOUSTIC COMPROMISE
            </h2>
            <p className="text-xs text-muted leading-relaxed mb-4">
              Most consumer headphones artificially hype sub-bass frequencies to mask diaphragm distortion. At SONA Labs, we reject spectral deceit. We custom-tune custom graphene diaphragms, planar magnetic transducers, and symmetrical neodymium motors to render transients exactly as recorded in the master booth.
            </p>
            <p className="text-xs text-muted leading-relaxed">
              Every driver unit is pair-matched within ±0.5dB tolerance, ensuring holographic spatial imaging and immersive stage positioning.
            </p>
          </div>

          <div className="p-8 border border-foreground/15 bg-foreground/[0.015] relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/30" />
            <span className="text-4xl font-black text-coral block mb-2">±0.5dB</span>
            <p className="text-xs font-black tracking-wider uppercase text-foreground mb-1">
              DRIVER MATCHING PRECISION
            </p>
            <p className="text-[11px] text-muted">
              Individual acoustic chamber calibration ensures flawless phase coherence across left and right earcups.
            </p>
          </div>
        </div>

        {/* Brand Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-foreground/10 mb-20 text-center">
          <div>
            <span className="text-3xl md:text-4xl font-black text-foreground block">12+</span>
            <span className="text-[10px] text-muted font-bold tracking-widest uppercase">AUDIO SYSTEMS</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black text-coral block">40mm</span>
            <span className="text-[10px] text-muted font-bold tracking-widest uppercase">GRAPHENE TRANSDUCERS</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black text-foreground block">48dB</span>
            <span className="text-[10px] text-muted font-bold tracking-widest uppercase">ACTIVE NOISE CONTROL</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black text-coral block">99.9%</span>
            <span className="text-[10px] text-muted font-bold tracking-widest uppercase">SIGNAL ACCURACY</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 bg-foreground/[0.02] border border-foreground/10">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
            EXPERIENCE THE ACOUSTIC LAB
          </h2>
          <p className="text-xs text-muted max-w-md mx-auto mb-6">
            Browse our complete audio portfolio spanning studio headphones, true wireless spatial earbuds, and omnidirectional portable sound fields.
          </p>
          <Link
            href="/shop"
            className="px-8 py-4 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-coral transition-colors"
          >
            DISCOVER THE LINEUP →
          </Link>
        </div>
      </div>
    </div>
  );
}

