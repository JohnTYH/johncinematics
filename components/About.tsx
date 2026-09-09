import Aurora from "./Aurora";
import Frame from "./Frame";
import Reveal from "./Reveal";
import { portrait, timeline } from "@/lib/content";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-ink-3"
    >
      <Aurora intensity="mid" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <Reveal className="glass rounded-[2rem] p-6 md:p-10 lg:p-12">
          {/* Text comes first in the DOM so mobile reads copy → photo.
              On desktop `md:order-first` pulls the photo back to the left,
              which keeps the visual order without duplicating markup. */}
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            <div className="md:order-2 md:flex-1">
              <p className="text-[13px] uppercase tracking-[0.2em] text-ash">
                Hi, I&rsquo;m John
              </p>

              <h2 className="display mt-6 text-[11vw] leading-[0.94] text-bone md:mt-8 md:text-[3.4vw]">
                An interest that
                <br />
                turned into
                <br />
                the work.
              </h2>

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-bone/60 md:mt-10">
                <p>
                  I started photography in 2018 as an interest, which gradually
                  grew into a strong passion. I picked up videography in 2019,
                  and by 2021 I made the leap into freelancing &mdash; working
                  across weddings, corporate shoots, events and special projects
                  with NUS.
                </p>
                <p>
                  My style is clean, sharp and natural, especially for weddings.
                  I also enjoy exploring film-inspired visuals when it suits the
                  couple&rsquo;s story.
                </p>
                <p className="text-bone">
                  Based in Singapore. Shooting since 2018.
                </p>
              </div>
            </div>

            <div className="md:order-1 md:w-[38%] md:shrink-0">
              <Frame
                item={portrait}
                className="rounded-xl"
                sizes="(min-width: 1400px) 500px, (min-width: 768px) 36vw, calc(100vw - 88px)"
              />
            </div>
          </div>
        </Reveal>

        {/* Timeline — the real dates, in place of the invented stats strip */}
        <ol className="mt-4 grid gap-4 md:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal
              key={t.year}
              as="li"
              delay={i * 80}
              className="glass glass-hover rounded-3xl p-6 md:p-7"
            >
              <p className="display text-[9vw] leading-none text-ember md:text-[2.4vw]">
                {t.year}
              </p>
              <p className="mt-4 text-[15px] text-bone">{t.label}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-bone/55">
                {t.note}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
