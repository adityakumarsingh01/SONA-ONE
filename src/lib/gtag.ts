export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export interface GAItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
}

export interface GAEcommercePayload {
  currency?: string;
  value?: number;
  transaction_id?: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  item_list_id?: string;
  item_list_name?: string;
  payment_type?: string;
  items?: GAItem[];
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Low-level gtag call with safety check.
 * Appends to window.dataLayer or calls window.gtag.
 */
export function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
  }
}

/**
 * Tracks generic custom event in GA4.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (!GA_MEASUREMENT_ID) return;
  gtag('event', eventName, params);
}

/**
 * Tracks page view in GA4 without causing duplicate hits.
 */
export function trackPageView(url: string, title?: string): void {
  if (!GA_MEASUREMENT_ID) return;
  gtag('event', 'page_view', {
    page_location: url,
    page_path: typeof window !== 'undefined' ? window.location.pathname : url,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  });
}

/**
 * Tracks standard GA4 E-commerce events with currency defaults to INR.
 * Strictly sanitizes payload to ensure NO PII (name, email, address, phone, payment details) is sent.
 */
export function trackEcommerce(eventName: string, payload: GAEcommercePayload = {}): void {
  if (!GA_MEASUREMENT_ID) return;

  const sanitizedPayload: GAEcommercePayload = {
    currency: payload.currency || 'INR',
    ...payload,
  };

  gtag('event', eventName, sanitizedPayload);
}

