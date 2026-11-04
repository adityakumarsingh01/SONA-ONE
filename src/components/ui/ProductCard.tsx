'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cartStore';
import { useWishlist } from '@/lib/wishlistStore';
import RatingStars from '@/components/ui/RatingStars';
import { trackEcommerce } from '@/lib/gtag';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    trackEcommerce('select_item', {
      item_list_name: 'Product Card Selection',
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1,
        },
      ],
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedColor?.name);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const displayImage = product.images[isHovered && product.images.length > 1 ? 1 : 0] || product.images[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-foreground/[0.015] border border-foreground/10 transition-all duration-300 hover:border-coral/50 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Corner Technical Marks */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-foreground/30 pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-foreground/30 pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-foreground/30 pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-foreground/30 pointer-events-none z-10" />

      {/* Top Badges & Actions */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.badge && (
            <span
              className={`text-[8px] font-black tracking-[0.2em] uppercase px-2 py-0.5 pointer-events-auto ${
                product.badge === 'Bestseller'
                  ? 'bg-coral text-white'
                  : product.badge === 'New Arrival'
                  ? 'bg-foreground text-background'
                  : 'bg-yellow-500 text-black'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 bg-foreground/10 text-foreground pointer-events-auto backdrop-blur-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground hover:text-coral transition-colors pointer-events-auto shadow-sm"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${
              inWishlist ? 'fill-coral stroke-coral' : 'fill-none stroke-current stroke-2'
            }`}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      {/* Product Image Stage */}
      <Link href={`/product/${product.slug}`} onClick={handleCardClick} className="relative block aspect-square w-full overflow-hidden bg-foreground/[0.02]">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={false}
          />
        </div>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickView}
              className="w-full py-2.5 bg-background/90 backdrop-blur-md border border-foreground/20 text-foreground text-[10px] font-black tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors shadow-md"
            >
              QUICK VIEW
            </button>
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold tracking-[0.25em] text-coral uppercase truncate max-w-[150px]">
            {product.category}
          </span>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        <Link href={`/product/${product.slug}`} onClick={handleCardClick} className="group-hover:text-coral transition-colors">
          <h3 className="text-base font-black tracking-tight text-foreground line-clamp-1">{product.name}</h3>
        </Link>

        <p className="text-xs text-muted font-medium line-clamp-2 mt-1 mb-4 flex-1">
          {product.shortDescription}
        </p>

        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-4">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-4 h-4 rounded-full transition-all ${
                  selectedColorIndex === idx ? 'ring-2 ring-coral ring-offset-2 ring-offset-background' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            <span className="text-[9px] text-muted ml-1.5 font-bold tracking-wider truncate">
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-foreground/10 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted/60 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className={`text-[8px] font-bold tracking-wider uppercase ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="px-3.5 py-2.5 bg-foreground text-background text-[10px] font-black tracking-widest uppercase hover:bg-coral hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + CART
          </button>
        </div>
      </div>
    </div>
  );
}

