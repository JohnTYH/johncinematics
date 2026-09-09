import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * Read from the environment rather than hardcoded, so it only loads where
 * the variable is set — the deploy workflow sets it, local `npm run dev`
 * does not. That keeps your own development traffic out of the reports
 * without needing a filter in GA. The measurement ID is not a secret; it
 * ships in the client bundle by design.
 *
 * Route changes are handled by GA4's own Enhanced measurement ("Page
 * changes based on browser history events", on by default), which picks up
 * Next's client-side navigation. Sending them by hand here as well would
 * double-count every page after the first.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* afterInteractive, not beforeInteractive: analytics should never
          sit in front of the page painting. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
