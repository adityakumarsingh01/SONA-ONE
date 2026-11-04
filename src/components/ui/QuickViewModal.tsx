'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cartStore';
import RatingStars from '@/components/ui/RatingStars';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor?.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[var(--background)] border border-foreground/15 shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/40 pointer-events-none" />
        <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-coral" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:text-coral hover:border-coral transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative aspect-square bg-foreground/[0.02] border border-foreground/10 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-[9px] font-bold tracking-[0.3em] text-coral uppercase mb-1">
              {product.category}
            </span>
            <h2 className="text-2xl font-black tracking-tight text-foreground mb-2">
              {product.name}
            </h2>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />

            <div className="my-4 flex items-baseline gap-3">
              <span className="text-2xl font-black text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted/60 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-muted leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-widest uppercase text-foreground mb-2">
                  COLOR: <span className="text-muted font-normal">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-6 h-6 rounded-full transition-all ${
                        selectedColorIndex === idx ? 'ring-2 ring-coral ring-offset-2 ring-offset-background' : 'opacity-80'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6 flex items-center gap-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-foreground">QTY</p>
              <div className="flex items-center border border-foreground/20">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-foreground/5"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-foreground/5"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-coral hover:text-white transition-colors"
              >
                ADD TO CART
              </button>
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="w-full py-2.5 border border-foreground/20 text-center text-[10px] font-black tracking-widest uppercase text-foreground hover:border-foreground transition-colors"
              >
                VIEW FULL SPECIFICATIONS →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

