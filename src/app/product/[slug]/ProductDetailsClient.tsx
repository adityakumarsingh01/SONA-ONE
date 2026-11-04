'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cartStore';
import { useWishlist } from '@/lib/wishlistStore';
import RatingStars from '@/components/ui/RatingStars';
import ProductCard from '@/components/ui/ProductCard';
import { trackEcommerce } from '@/lib/gtag';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews' | 'shipping'>('features');

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const inWishlist = isInWishlist(product.id);

  // Track view_item in GA4
  useEffect(() => {
    trackEcommerce('view_item', {
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          item_variant: selectedColor?.name,
          price: product.price,
          quantity: 1,
        },
      ],
    });
  }, [product, selectedColor]);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor?.name, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor?.name, selectedSize);
    trackEcommerce('begin_checkout', {
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          item_variant: `${selectedColor?.name} / ${selectedSize}`,
          price: product.price,
          quantity,
        },
      ],
    });
    router.push('/checkout');
  };

  return (
    <div className="w-full bg-[var(--background)] pt-28 pb-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-muted uppercase mb-8">
          <Link href="/" className="hover:text-coral transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-coral transition-colors">SHOP</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-coral transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Top Product Hero: Image Gallery + Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Gallery (Left: 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 border transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-coral ring-2 ring-coral/20' : 'border-foreground/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-square bg-foreground/[0.02] border border-foreground/15 overflow-hidden">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-foreground/40 pointer-events-none z-10" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-foreground/40 pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-foreground/40 pointer-events-none z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-foreground/40 pointer-events-none z-10" />
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-coral" />

              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-500"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[9px] font-black tracking-[0.25em] uppercase px-3 py-1 bg-coral text-white shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details & Configurator (Right: 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-[0.3em] text-coral uppercase">
                {product.category}
              </span>
              <button
                onClick={() => toggleWishlist(product)}
                className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-coral transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`w-4 h-4 ${inWishlist ? 'fill-coral stroke-coral' : 'fill-none stroke-current stroke-2'}`}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{inWishlist ? 'SAVED' : 'SAVE TO WISHLIST'}</span>
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-foreground/10">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-xs text-muted/40 font-bold">|</span>
              <span className="text-xs font-bold text-emerald-600 uppercase">
                {product.inStock ? `In Stock (${product.stockCount} units)` : 'Out of Stock'}
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl md:text-4xl font-black text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-muted/60 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-black tracking-widest uppercase text-coral bg-coral/10 px-2 py-0.5">
                    SAVE {discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-muted leading-relaxed font-medium mb-8">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-3">
                  ACOUSTIC FINISH: <span className="text-coral ml-1">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        selectedColorIndex === idx ? 'ring-2 ring-coral ring-offset-2 ring-offset-background' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size / Fit (for headphones) */}
            {product.categorySlug === 'wireless-headphones' && (
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-3">
                  CUSHION PROFILE
                </p>
                <div className="flex gap-3">
                  {['S - Compact', 'Standard', 'L - Studio Pro'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-2 border text-xs font-bold transition-all ${
                        selectedSize === sz
                          ? 'border-coral bg-coral text-white'
                          : 'border-foreground/15 text-foreground hover:border-foreground/30'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8 flex items-center gap-6">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-foreground uppercase mb-2">QUANTITY</p>
                <div className="flex items-center border border-foreground/20 w-max">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-foreground/5 text-sm"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-foreground/5 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 pt-6 text-[11px] text-muted font-medium">
                Free Express Delivery across India &bull; Ships within 24 hours.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-4 bg-coral text-white text-xs font-black tracking-widest uppercase hover:scale-[1.01] transition-transform shadow-xl disabled:opacity-50"
                style={{ boxShadow: '0 10px 25px rgba(255, 77, 77, 0.25)' }}
              >
                ADD TO SHOPPING BAG
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-4 bg-foreground text-background text-xs font-black tracking-widest uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                BUY NOW (EXPRESS CHECKOUT) →
              </button>
            </div>

            {/* Guarantees Strip */}
            <div className="mt-8 pt-6 border-t border-foreground/10 grid grid-cols-2 gap-4 text-[10px] font-bold tracking-wider uppercase text-muted">
              <div className="flex items-center gap-2">
                <span>🛡️</span> 1-Year Sonic Warranty
              </div>
              <div className="flex items-center gap-2">
                <span>↩️</span> 30-Day Risk-Free Return
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span> 24h Express Dispatch
              </div>
              <div className="flex items-center gap-2">
                <span>🎧</span> Audiophile Support Lab
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Reviews */}
        <div className="mb-20">
          <div className="flex border-b border-foreground/10 mb-8 overflow-x-auto">
            {[
              { id: 'features', label: 'KEY FEATURES' },
              { id: 'specs', label: 'TECHNICAL SPECIFICATIONS' },
              { id: 'reviews', label: `VERIFIED REVIEWS (${product.reviews.length})` },
              { id: 'shipping', label: 'DELIVERY & RETURNS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-6 text-xs font-black tracking-widest uppercase border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-coral text-foreground'
                    : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-foreground/[0.015] border border-foreground/10 p-6 md:p-10 relative">
            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-base font-black tracking-tight text-foreground mb-4">
                  ACOUSTIC ENGINEERING HIGHLIGHTS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-coral/10 text-coral flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <p className="text-xs text-foreground font-medium leading-relaxed">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div>
                <h3 className="text-base font-black tracking-tight text-foreground mb-4">
                  LAB BENCH SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-2 border-b border-foreground/10 text-xs">
                      <span className="text-muted font-bold tracking-wider uppercase">{spec.label}</span>
                      <span className="text-foreground font-black">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-foreground/10">
                  <div>
                    <h3 className="text-2xl font-black text-foreground">
                      {product.rating.toFixed(1)} / 5.0
                    </h3>
                    <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
                  </div>
                  <button
                    onClick={() => alert('Review submission open to verified buyers.')}
                    className="px-4 py-2 border border-foreground/20 text-[10px] font-black tracking-widest uppercase text-foreground hover:border-coral hover:text-coral transition-colors"
                  >
                    WRITE A REVIEW
                  </button>
                </div>

                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 border border-foreground/10 bg-background">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-black text-foreground">{rev.author}</span>
                        <span className="text-[10px] text-muted">{rev.date}</span>
                      </div>
                      <div className="mb-2">
                        <RatingStars rating={rev.rating} size="sm" showCount={false} />
                      </div>
                      <h4 className="text-xs font-black tracking-tight text-foreground mb-1">{rev.title}</h4>
                      <p className="text-xs text-muted leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs text-muted leading-relaxed">
                <h3 className="text-base font-black tracking-tight text-foreground mb-2">
                  DOMESTIC & EXPRESS DISPATCH
                </h3>
                <p>
                  All SONA products ship via insured priority air freight directly from our Bengaluru acoustic lab. Orders received prior to 2:00 PM IST are handed to carriers on the same business day.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 border border-foreground/10 bg-background">
                    <p className="font-black text-foreground uppercase mb-1">METRO CITIES</p>
                    <p className="text-[11px]">1–2 Business Days</p>
                  </div>
                  <div className="p-4 border border-foreground/10 bg-background">
                    <p className="font-black text-foreground uppercase mb-1">REST OF INDIA</p>
                    <p className="text-[11px]">2–4 Business Days</p>
                  </div>
                  <div className="p-4 border border-foreground/10 bg-background">
                    <p className="font-black text-foreground uppercase mb-1">EASY RETURNS</p>
                    <p className="text-[11px]">30 Days Hassle-Free</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-foreground/10">
              <div>
                <p className="text-[9px] font-black tracking-[0.3em] text-coral uppercase">
                  COMPLEMENTARY ACOUSTICS
                </p>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                  RELATED PRODUCTS
                </h2>
              </div>
              <Link href="/shop" className="text-xs font-black tracking-widest uppercase text-foreground hover:text-coral transition-colors">
                SEE ALL →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

