'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/products';

export default function CategoriesPage() {
  return (
    <div className="w-full bg-[var(--background)] pt-28 pb-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-foreground/10 text-center md:text-left">
          <p className="text-[10px] font-black tracking-[0.3em] text-coral uppercase mb-2">
            AUDIO SYSTEMS ARCHITECTURE
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-3">
            PRODUCT CATEGORIES
          </h1>
          <p className="text-xs md:text-sm text-muted font-medium tracking-wide max-w-xl">
            From planar magnetic studio references to waterproof omnidirectional sound fields, explore our acoustic lineup engineered for pure clarity.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col bg-foreground/[0.015] border border-foreground/10 overflow-hidden hover:border-coral/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/30 z-10" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/30 z-10" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/30 z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/30 z-10" />

              {/* Category Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-foreground/5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-coral uppercase block">
                      SYSTEM // 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-black tracking-tight">{cat.name}</h3>
                  </div>
                  <span className="text-xs font-black tracking-widest bg-white/10 backdrop-blur-md px-2.5 py-1 uppercase">
                    {cat.itemCount} ITEMS
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted leading-relaxed mb-6 font-medium">
                  {cat.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-black tracking-widest uppercase text-foreground group-hover:text-coral transition-colors pt-4 border-t border-foreground/10">
                  <span>DISCOVER COLLECTION</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

