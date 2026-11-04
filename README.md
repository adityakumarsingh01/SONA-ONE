# SONA ONE – Multi-Product Audiophile E-Commerce Experience

A comprehensive, multi-product e-commerce platform and 3D product showcase for **SONA ONE** audio products. Built with Next.js 16 (App Router), React 19, TypeScript, GSAP ScrollTrigger, and Tailwind CSS. Integrated with Google Analytics 4 (GA4) with complete e-commerce event tracking.

**Website:** [https://sona-one-gamma.vercel.app/](https://sona-one-gamma.vercel.app/)  
**Tagline:** SOUND. UNBOUND.

---

## 1. Project Overview & Multi-Product Architecture

The platform features an acoustic ecosystem across 5 major categories and 12+ audio products, complete with cart persistence, instant search, wishlist management, dynamic filtering, multi-product checkout, simulated demo payment, and order confirmation.

### Site Navigation & Pages
1. **Home (`/`)**: Cinematic 3D interactive headphone showcase, technical scroll breakdown, Bestsellers, New Arrivals, Category showcase, and brand highlights.
2. **Shop All (`/shop`)**: Complete product catalogue with interactive sorting (price, rating, newest, featured), price range slider, category toggles, wishlist filter, and quick-view modals.
3. **Product Details (`/product/[slug]`)**: SSG pre-rendered dynamic pages with multi-image gallery, finish selectors, specifications tab, verified reviews, stock status, and related products.
4. **Categories (`/categories`)**: Visual directory of audio domains (Wireless Headphones, Earbuds, Gaming Headsets, Bluetooth Speakers, Accessories).
5. **Shopping Bag (`/cart`)**: Client-persisted shopping bag with real-time price updates, 18% GST calculation, quantity adjustments, and insured shipping indicators.
6. **Checkout (`/checkout`)**: 3-step checkout flow (Shipping address, demo payment simulation with Card/UPI, and final order review).
7. **Order Confirmation (`/order-confirmation`)**: Order summary with generated unique order ID (`SONA-XXXXXX`) and items purchased.
8. **About Us (`/about`)**: Acoustic engineering philosophy, driver matching precision, and laboratory standards.
9. **Contact Us (`/contact`)**: Support channels, warranty information, and customer inquiry form.

---

## 2. Product Catalogue

Centrally managed in `src/lib/products.ts`:

| Category | Products | Price (INR) | Key Features |
| :--- | :--- | :--- | :--- |
| **Wireless Headphones** | SONA ONE | ₹9,999 | 40mm Graphene Drivers, 24h Battery, Hybrid ANC |
| | SONA Auralux Pro | ₹18,999 | 50mm Planar Magnetic, Lossless LDAC, Lambskin Pads |
| | SONA Nova X | ₹7,499 | 195g Ultralight, Foldable, Ambient Mode |
| | SONA Phantom Max | ₹11,999 | Haptic Sub-Bass Resonator, Cinema Immersion |
| **Wireless Earbuds** | SONA AirPods Neo | ₹5,999 | 11mm Beryllium Drivers, 48dB ANC, Qi Wireless Case |
| | SONA Buds Pro | ₹8,499 | Coaxial Dual-Driver (Dynamic + Knowles BA), LDAC |
| | SONA MiniPods | ₹3,499 | 3.2g Invisible Sleep Profile, IPX7 Waterproof |
| **Gaming Headsets** | SONA Phantom 7.1 | ₹12,499 | 2.4GHz Zero-Latency, 7.1 DSP, Cooling Gel Pads |
| | SONA Arena X | ₹4,999 | 220g Tournament Headset, 3.5mm Gold-Plated |
| **Portable Bluetooth Speakers** | SONA Boom 360 | ₹8,999 | 60W Omnidirectional 360, Dual Radiators, IP67 |
| | SONA Pulse Mini | ₹3,999 | 12W Machined Aluminum Puck, Magnetic Base |
| **Accessories** | SONA Flex Charging Case | ₹2,499 | 10,000mAh Battery Reserve, Ballistic Nylon |
| | SONA AudioLink Cable | ₹1,499 | 8-Core Braided Silver OFC, 24-bit/192kHz DAC Dongle |

---

## 3. Technology Stack

- **Framework:** Next.js 16 (App Router with Static Site Generation)
- **Library:** React 19
- **Languages:** TypeScript
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Animation Orchestration:** GSAP (GreenSock) & ScrollTrigger
- **Styling:** Tailwind CSS v4
- **State Management:** Custom React Context stores with `localStorage` persistence:
  - `src/lib/cartStore.tsx` — Shopping bag state, price recalculations, and drawer triggers.
  - `src/lib/wishlistStore.tsx` — Wishlist items and persistence.
- **Analytics:** Google Analytics 4 (GA4) with native DataLayer queuing and Next.js Script strategy.

---

## 4. Google Analytics 4 (GA4) Integration

The project has GA4 integration via `src/lib/gtag.ts` and `src/components/analytics/GoogleAnalytics.tsx`.

### Measurement Configuration
- **Measurement ID:** `G-B8GQF174JM`
- **Environment Variable:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`

#### Local Environment (`.env.local`)
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-B8GQF174JM
```

#### Vercel Environment Variables
Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to `G-B8GQF174JM` across Production, Preview, and Development.

### Tracked E-Commerce Events
1. **`view_item_list`**: Triggered when visiting `/shop` or catalogue sections.
2. **`select_item`**: Triggered when selecting product cards or switching finishes.
3. **`view_item`**: Triggered on `/product/[slug]` details page loads.
4. **`search`**: Triggered when using the instant header search modal.
5. **`add_to_cart`**: Triggered from product cards, quick view modals, or details pages.
6. **`remove_from_cart`**: Triggered when removing items from the cart.
7. **`view_cart`**: Triggered when opening `/cart`.
8. **`begin_checkout`**: Triggered on checkout initiation or Buy Now clicks.
9. **`add_shipping_info`**: Triggered upon completion of shipping address step.
10. **`add_payment_info`**: Triggered after selecting payment method (Card or UPI).
11. **`purchase`**: Triggered strictly after successful simulated demo payment with unique transaction ID and full item manifest.

---

## 5. Local Development Commands

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Run production build:**
   ```bash
   npm run build
   ```

4. **Start production server:**
   ```bash
   npm run start
   ```

---

## 6. Production Deployment

This project is deployed on **Vercel**:
- Branch: `main`
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`
