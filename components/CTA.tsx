import Link from "next/link";
import Aurora from "./Aurora";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-ink-3"
    >
      <Aurora intensity="high" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-28 md:px-8 md:py-40">
        <Reveal className="glass mx-auto max-w-5xl rounded-[2.5rem] px-6 py-20 text-center md:px-16 md:py-28">
          <h2 className="display text-[12vw] leading-[0.92] text-bone md:text-[5vw]">
            If you felt
            <br />
            a little something,
            <br />
            <span className="text-ember">get in touch.</span>
          </h2>

          <p className="mx-auto mt-10 max-w-md text-[15px] leading-relaxed text-bone/60">
            Tell me the date, the place and roughly what you have in mind, and
            I&rsquo;ll come back with a plan and a number.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/enquire"
              className="rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ember"
            >
              Start an enquiry
            </Link>
            {/* Route-qualified: CTA renders on every page, but #work only
                exists on the home page. */}
            <Link
              href="/#work"
              className="glass glass-hover rounded-full px-7 py-3.5 text-sm text-bone"
            >
              See the work
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
