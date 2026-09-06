import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  title: "John Cinematics — Photography & Motion",
  description:
    "Cinematic stills and motion for brands, weddings and stories that stay with you.",
  openGraph: {
    title: "John Cinematics — Photography & Motion",
    description:
      "Cinematic stills and motion for brands, weddings and stories that stay with you.",
    type: "website",
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
