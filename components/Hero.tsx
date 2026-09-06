import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { heroImage } from "@/lib/content";
import { images } from "@/lib/generated-images";

export default function Hero() {
  const generated = heroImage.src ? images[heroImage.src] : undefined;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-12 pt-28 md:justify-center"
    >
      {/* The frame. Bleeds up from the bottom on mobile, in from the right on
          desktop — `.hero-fade` carries the gradient mask for both. */}
      <div className="hero-fade pointer-events-none absolute inset-0 md:left-auto md:right-0 md:w-[64%]">
        {heroImage.src && (
          <Image
            src={heroImage.src}
            alt=""
            fill
            priority
            quality={82}
            sizes="(min-width: 768px) 64vw, 100vw"
            placeholder={generated ? "blur" : "empty"}
            blurDataURL={generated?.blurDataURL}
            className="object-cover"
          />
        )}
      </div>

      {/* Scrim over the type side. The mask alone leaves the wordmark sitting
          on whatever the photo happens to be — fine here, but a bright frame
          would swallow the outlined line. This guarantees contrast for any
          image you swap in later. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/70 to-transparent to-58% md:block"
      />
      {/* Mobile has no "right half" to fade into, so the frame becomes a
          full-bleed backdrop instead — heavily knocked back so it reads as
          atmosphere behind the wordmark rather than an image competing with
          it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50 md:hidden"
      />

      {/* The nav sits transparent over the hero, so a bright frame swallows
          its links. This keeps the top edge dark enough for them whatever
          photo is in place. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/85 via-ink/40 to-transparent"
      />

      {/* Ambient glow, kept on the type side so it doesn't wash the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[12%] h-[60vh] w-[70vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(232,176,75,0.16) 0%, transparent 72%)",
          animation: "drift 14s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 md:px-8">
        {/* Sized to fill the left column rather than the full viewport — the
            photo takes the right 54%, so the wordmark is scaled to what's
            actually left, not simply shrunk by a fixed amount. */}
        <h1 className="w-fit select-none">
          <span className="sr-only">John Cinematics</span>

          <Reveal as="span" aria-hidden className="block">
            <span className="display block text-right text-[34vw] leading-[0.8] text-bone md:text-[min(18vw,255px)]">
              John
            </span>
          </Reveal>

          <Reveal as="span" aria-hidden className="block" delay={120}>
            <span
              className="display block text-[20vw] leading-[0.9] text-transparent md:text-[min(11vw,156px)]"
              style={{
                WebkitTextStroke: "clamp(1px, 0.13vw, 2px) var(--color-bone)",
              }}
            >
              Cinematics
            </span>
          </Reveal>
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-ink-3 pt-8 md:mt-12 md:max-w-[46%]">
          <Reveal delay={240}>
            <p className="text-pretty text-base leading-relaxed text-ash md:text-lg">
              Cinematic stills and motion for brands, weddings and stories that stay with you.{" "}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#work"
                className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ember"
              >
                See the work
              </Link>
              <Link
                href="/enquire"
                className="glass glass-hover rounded-full px-6 py-3 text-sm text-bone"
              >
                Check availability
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
