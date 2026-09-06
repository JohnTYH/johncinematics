import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Aurora from "@/components/Aurora";
import Photo from "@/components/Photo";
import PhotoGrid from "@/components/PhotoGrid";
import VideoEmbed from "@/components/VideoEmbed";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { collections } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};

  return {
    title: `${collection.name} — John Cinematics`,
    description: collection.blurb,
  };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const [cover, ...rest] = collection.images;

  /* Groups marked `hidden` are skipped entirely — they exist in the data so
     they can be published later without restructuring anything. Empty groups
     drop out too, so a half-filled page never shows a bare heading. */
  const groups = (collection.videoGroups ?? []).filter(
    (g) => !g.hidden && g.videos.length > 0,
  );

  return (
    <main>
      <section className="relative overflow-hidden">
        <Aurora intensity="low" />

        <div className="relative mx-auto max-w-[1400px] px-5 pt-28 md:px-8 md:pt-32">
          <Reveal>
            {/* -my-2 keeps the layout identical while py-2 grows the tap
                target from 16px to a thumb-sized 32px. `relative z-10` puts
                it above the headline, whose glyphs overhang their line box
                at this size and were crowding the link. */}
            <Link
              href="/#work"
              className="relative z-10 -my-2 inline-flex items-center gap-2 py-2 text-[13px] uppercase tracking-[0.2em] text-ash transition-colors hover:text-ember"
            >
              &larr; What I shoot
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-8 text-[17vw] leading-[0.86] text-bone md:text-[8.5vw]">
              {collection.name}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-ash md:text-base">
              {collection.blurb}
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-10 block md:mt-12">
            <Photo
              item={cover}
              priority
              sizes="(min-width: 1400px) 1336px, calc(100vw - 40px)"
            />
          </Reveal>
        </div>
      </section>

      {collection.videoGroups ? (
        /* Films, grouped */
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          {groups.map((group, gi) => {
            const vertical = group.orientation === "vertical";

            return (
              <section key={group.title} className={gi > 0 ? "mt-24" : ""}>
                <Reveal className="mb-10 border-t border-ink-3 pt-8">
                  <h2 className="display text-[9vw] leading-[0.92] text-bone md:text-[3vw]">
                    {group.title}
                  </h2>
                  {group.blurb && (
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash">
                      {group.blurb}
                    </p>
                  )}
                </Reveal>

                <div
                  className={`grid gap-6 ${
                    vertical
                      ? "grid-cols-2 md:grid-cols-4"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {group.videos.map((video, i) => (
                    <Reveal key={video.id} delay={(i % 2) * 90}>
                      <VideoEmbed
                        video={video}
                        orientation={group.orientation}
                        sizes={
                          vertical
                            ? "(min-width: 768px) 24vw, 48vw"
                            : "(min-width: 768px) 47vw, calc(100vw - 40px)"
                        }
                      />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : collection.photoGroups ? (
        /* Photographs, in labelled subsections */
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          {(() => {
            const shown = collection.photoGroups.filter(
              (g) => g.images.length > 0,
            );

            return shown.map((group, gi) => {
              /* Each group links to the one after it, so a third subsection
                 gets its own jump link with no extra wiring. The last group
                 has nothing below it and shows none. */
              const next = shown[gi + 1];

              return (
                <section
                  key={group.title}
                  id={slugify(group.title)}
                  /* Clears the fixed nav when jumped to */
                  className={`scroll-mt-28 ${gi > 0 ? "mt-24" : ""}`}
                >
                  <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 border-t border-ink-3 pt-8">
                    <div>
                      <h2 className="display text-[9vw] leading-[0.92] text-bone md:text-[3vw]">
                        {group.title}
                      </h2>
                      {group.blurb && (
                        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash">
                          {group.blurb}
                        </p>
                      )}
                    </div>

                    {next && (
                      <a
                        href={`#${slugify(next.title)}`}
                        className="glass glass-hover group flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 text-[13px] uppercase tracking-[0.15em] text-bone"
                      >
                        {next.title} {collection.name.toLowerCase()}
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden
                          className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.75] transition-transform duration-300 group-hover:translate-y-0.5"
                        >
                          <path
                            d="M8 3v10M3.5 8.5 8 13l4.5-4.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </Reveal>

                  <PhotoGrid items={group.images} />
                </section>
              );
            });
          })()}
        </div>
      ) : (
        <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <PhotoGrid items={rest} />
        </section>
      )}

      <CTA />
    </main>
  );
}
