import type { Metadata } from "next";
import Aurora from "@/components/Aurora";
import About from "@/components/About";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "About — John Cinematics",
  description:
    "Photography since 2018, videography since 2019, freelance since 2021. Weddings, corporate shoots and events across Singapore.",
};

export default function AboutPage() {
  return (
    <main>
      {/* This route has no hero, so the header carries the top padding
          that clears the fixed nav. */}
      <section className="relative overflow-hidden">
        <Aurora intensity="low" />

        <div className="relative mx-auto max-w-[1400px] px-5 pb-8 pt-36 md:px-8 md:pb-14 md:pt-48">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.2em] text-ash">
              Est. 2021 &middot; Singapore
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display mt-6 text-[26vw] leading-[0.82] text-bone md:text-[13vw]">
              About
            </h1>
          </Reveal>
        </div>
      </section>

      <About />
      <CTA />
    </main>
  );
}
