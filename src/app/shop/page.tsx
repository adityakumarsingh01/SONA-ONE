'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, Product } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useWishlist } from '@/lib/wishlistStore';
import { trackEcommerce } from '@/lib/gtag';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';

  const { wishlistIds } = useWishlist();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [priceRange, setPriceRange] = useState<number>(25000);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(initialFilter === 'wishlist');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const filt = searchParams.get('filter');
    if (filt === 'wishlist') setShowWishlistOnly(true);
  }, [searchParams]);

  // Track view_item_list in GA4
  useEffect(() => {
    trackEcommerce('view_item_list', {
      item_list_name: `Shop All - ${selectedCategory}`,
      items: PRODUCTS.map((p) => ({
        item_id: p.id,
        item_name: p.name,
        item_category: p.category,
        price: p.price,
        quantity: 1,
      })),
    });
  }, [selectedCategory]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Price ceiling
      if (product.price > priceRange) {
        return false;
      }
      // Rating minimum
      if (ratingFilter > 0 && product.rating < ratingFilter) {
        return false;
      }
      // Stock
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Wishlist
      if (showWishlistOnly && !wishlistIds.includes(product.id)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [selectedCategory, priceRange, ratingFilter, onlyInStock, showWishlistOnly, wishlistIds, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(25000);
    setRatingFilter(0);
    setOnlyInStock(false);
    setShowWishlistOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-[var(--background)] pt-28 pb-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb & Header */}
        <div className="mb-10 pb-8 border-b border-foreground/10">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-coral uppercase mb-2">
            <span>SONA LABS</span>
            <span>/</span>
            <span>CATALOGUE</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-foreground">{selectedCategory.replace('-', ' ')}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground">
                {showWishlistOnly ? 'YOUR WISHLIST' : 'EXPLORE SOUND'}
              </h1>
              <p className="text-xs md:text-sm text-muted font-medium tracking-wide mt-2 max-w-xl">
                {showWishlistOnly
                  ? 'Your saved audiophile selections and acoustic gear.'
                  : 'Studio reference monitors, noise-cancelling headphones, low-latency gaming headsets, and omnidirectional portable speakers.'}
              </p>
            </div>

            <div className="text-xs font-black tracking-widest text-muted">
              SHOWING <span className="text-foreground font-black">{filteredProducts.length}</span> OF{' '}
              <span className="text-foreground">{PRODUCTS.length}</span> PRODUCTS
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Main Product Grid */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-3 flex items-center justify-between">
                <span>CATEGORIES</span>
                {selectedCategory !== 'all' && (
                  <button onClick={() => setSelectedCategory('all')} className="text-[9px] text-coral font-bold">
                    RESET
                  </button>
                )}
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left py-1.5 px-2 text-xs font-bold tracking-wider uppercase transition-colors flex justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-foreground text-background'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left py-1.5 px-2 text-xs font-bold tracking-wider uppercase transition-colors flex justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-foreground text-background'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span>{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-black tracking-widest uppercase text-foreground">MAX PRICE</h3>
                <span className="text-xs font-black text-coral">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={25000}
                step={500}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-muted font-bold mt-1">
                <span>₹1,000</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <h3 className="text-xs font-black tracking-widest uppercase text-foreground mb-3">MINIMUM RATING</h3>
              <div className="space-y-1.5">
                {[0, 4.5, 4.7, 4.8].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === stars}
                      onChange={() => setRatingFilter(stars)}
                      className="accent-coral"
                    />
                    <span>{stars === 0 ? 'All Ratings' : `${stars}★ & above`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability & Wishlist */}
            <div className="space-y-2 pt-4 border-t border-foreground/10">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-foreground">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-coral"
                />
                <span>In Stock Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-foreground">
                <input
                  type="checkbox"
                  checked={showWishlistOnly}
                  onChange={(e) => setShowWishlistOnly(e.target.checked)}
                  className="accent-coral"
                />
                <span>Wishlist Only ({wishlistIds.length})</span>
              </label>
            </div>

            {/* Reset All Filters */}
            <button
              onClick={resetFilters}
              className="w-full py-2.5 border border-foreground/15 text-[10px] font-black tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              CLEAR ALL FILTERS
            </button>
          </aside>

          {/* Main Grid Section */}
          <div className="flex-1">
            {/* Sort Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-foreground/10 gap-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted">
                FILTERED RESULTS ({filteredProducts.length})
              </span>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted">SORT BY:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border border-foreground/15 py-1.5 px-3 text-xs font-bold uppercase text-foreground focus:outline-none focus:border-coral cursor-pointer"
                >
                  <option value="featured" className="bg-[var(--background)]">Featured</option>
                  <option value="newest" className="bg-[var(--background)]">New Arrivals</option>
                  <option value="rating" className="bg-[var(--background)]">Highest Rated</option>
                  <option value="price-asc" className="bg-[var(--background)]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[var(--background)]">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-foreground/15 p-8">
                <div className="w-16 h-16 rounded-full border border-foreground/15 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🔍</span>
                </div>
                <h3 className="text-base font-black tracking-tight text-foreground mb-1">
                  NO PRODUCTS MATCH YOUR FILTERS
                </h3>
                <p className="text-xs text-muted max-w-sm mx-auto mb-6">
                  Try broadening your price range, clearing ratings, or switching category tags.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-foreground text-background text-[10px] font-black tracking-widest uppercase hover:bg-coral transition-colors"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-xs font-bold tracking-widest">LOADING CATALOGUE...</div>}>
      <ShopContent />
    </Suspense>
  );
}

