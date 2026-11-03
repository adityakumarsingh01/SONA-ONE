"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

declare global {
    interface Window {
        dataLayer: unknown[][];
        gtag?: (...args: unknown[]) => void;
        __sonaGaInitialized?: boolean;
    }
}

const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function GoogleAnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const [isInitialized, setIsInitialized] = useState(false);

    const initializeGA = () => {
        if (!GA_MEASUREMENT_ID) return;

        window.dataLayer = window.dataLayer || [];

        if (!window.gtag) {
            window.gtag = (...args: unknown[]) => {
                window.dataLayer.push(args);
            };
        }

        if (!window.__sonaGaInitialized) {
            window.gtag("js", new Date());

            window.gtag("config", GA_MEASUREMENT_ID, {
                send_page_view: false,
            });

            window.__sonaGaInitialized = true;
        }

        setIsInitialized(true);
    };

    useEffect(() => {
        if (!isInitialized || !window.gtag) return;

        window.gtag("event", "page_view", {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title,
        });
    }, [pathname, queryString, isInitialized]);

    if (!GA_MEASUREMENT_ID) return null;

    return (
        <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
            onReady={initializeGA}
        />
    );
}

export default function GoogleAnalytics() {
    return (
        <Suspense fallback={null}>
            <GoogleAnalyticsTracker />
        </Suspense>
    );
}