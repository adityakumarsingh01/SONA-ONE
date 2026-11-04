'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { trackEcommerce } from '@/lib/gtag';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sona_cart_items_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsMounted(true);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items, isMounted]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    const color = selectedColor || (product.colors?.[0]?.name ?? 'Default');
    const size = selectedSize || 'Standard';

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(product.stockCount, next[existingIndex].quantity + quantity);
        next[existingIndex] = { ...next[existingIndex], quantity: newQty };
        return next;
      } else {
        return [...prev, { product, quantity: Math.min(product.stockCount, quantity), selectedColor: color, selectedSize: size }];
      }
    });

    // GA4 add_to_cart tracking
    trackEcommerce('add_to_cart', {
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          item_variant: `${color} / ${size}`,
          price: product.price,
          quantity,
        },
      ],
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    const itemToRemove = items.find(
      (i) => i.product.id === productId && (!selectedColor || i.selectedColor === selectedColor)
    );

    if (itemToRemove) {
      trackEcommerce('remove_from_cart', {
        value: itemToRemove.product.price * itemToRemove.quantity,
        items: [
          {
            item_id: itemToRemove.product.id,
            item_name: itemToRemove.product.name,
            item_category: itemToRemove.product.category,
            item_variant: `${itemToRemove.selectedColor} / ${itemToRemove.selectedSize || 'Standard'}`,
            price: itemToRemove.product.price,
            quantity: itemToRemove.quantity,
          },
        ],
      });
    }

    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && (!selectedColor || i.selectedColor === selectedColor)))
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id === productId && (!selectedColor || i.selectedColor === selectedColor)) {
          const clamped = Math.min(i.product.stockCount, quantity);
          return { ...i, quantity: clamped };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = 0; // Promotion / coupon ready
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 250;
  const tax = Math.round(subtotal * 0.18); // 18% GST standard on audio electronics
  const total = subtotal - discount + shipping + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        itemCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

