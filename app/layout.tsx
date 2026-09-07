import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, abs, absFile, OG_IMAGE } from "@/lib/site";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "Wedding, proposal and event photography and videography in Singapore. Clean, sharp and natural, with room for something more filmic when the story calls for it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "John Cinematics — Wedding Photographer & Videographer, Singapore",
    /* Page titles get the brand appended rather than repeating it by hand. */
    template: "%s — John Cinematics",
  },
  description: DESCRIPTION,
  alternates: { canonical: abs("/") },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_SG",
    url: abs("/"),
    title: "John Cinematics — Wedding Photographer & Videographer, Singapore",
    description: DESCRIPTION,
    images: [
      {
        url: absFile(OG_IMAGE),
        width: 1440,
        height: 960,
        alt: "A proposal captured by John Cinematics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Cinematics — Wedding Photographer & Videographer, Singapore",
    description: DESCRIPTION,
    images: [absFile(OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="grain">
        {/* Shared chrome — every route gets the same nav and footer. */}
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
