"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* Route-qualified so these work from any page. A bare "#work" would look
   for that anchor on whatever route you happen to be on. */
const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
      {/* Floating glass pill. It only carries the glass treatment once the
          page has scrolled — over the hero it stays invisible so the
          wordmark reads clean.

          .glass takes all of its opacity from backdrop-filter, so on a
          browser without it this bar goes fully transparent and the hero's
          white "See the work" button reads straight through the wordmark.
          The @supports fallback beside .glass in globals.css covers that
          without tinting the bar for anyone else. */}
      <nav
        className={`relative mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full px-4 transition-all duration-700 md:px-6 ${
          scrolled ? "glass" : "border border-transparent bg-transparent"
        }`}
      >
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[13px] tracking-wide text-bone/80 transition-colors hover:text-bone"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="display text-lg tracking-[0.08em] text-bone md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          John<span className="text-ember">.</span>Cinematics
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/enquire"
            className="rounded-full bg-bone px-4 py-2 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-ember"
          >
            Book a shoot
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-full text-bone md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
        {/* Anchored under the toggle rather than spanning the header, so it
            reads as that button's menu. ink-2 rather than ink keeps it a
            shade lighter than the page while still dark enough to carry
            text over a pale photograph. */}
        {open && (
          <ul className="glass absolute right-4 top-full mt-2 w-44 rounded-2xl bg-ink-2/85 px-4 py-2 md:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-[14px] text-bone/90 transition-colors hover:text-ember"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
