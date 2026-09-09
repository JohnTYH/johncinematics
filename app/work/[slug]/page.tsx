import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Aurora from "@/components/Aurora";
import Photo from "@/components/Photo";
import PhotoGrid from "@/components/PhotoGrid";
import GroupHeader, { slugify } from "@/components/GroupHeader";
import VideoEmbed from "@/components/VideoEmbed";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { collections } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, abs, absFile } from "@/lib/site";
import { images } from "@/lib/generated-images";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};

  return {
    /* The layout template appends the brand. seoTitle carries the service
       and the location, which the display heading is too short to say. */
    title: collection.seoTitle ?? collection.name,
    description: collection.seoDescription ?? collection.blurb,
    alternates: { canonical: abs(`/work/${slug}`) },
    openGraph: {
      title: `${collection.seoTitle ?? collection.name} — ${SITE_NAME}`,
      description: collection.seoDescription ?? collection.blurb,
      url: abs(`/work/${slug}`),
      images: collection.images[0]?.src
        ? [absFile(collection.images[0].src.replace(".jpg", "-1440.webp"))]
        : undefined,
    },
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

  /* An ImageGallery listing the actual photographs, with their real
     dimensions from the manifest. This is what lets image search and answer
     engines treat the page as a body of work rather than a page that
     happens to contain <img> tags. */
  const gallery = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${collection.name} — ${SITE_NAME}`,
    description: collection.blurb,
    url: abs(`/work/${collection.slug}`),
    author: { "@type": "ProfessionalService", name: SITE_NAME, url: abs("/") },
    associatedMedia: collection.images
      .filter((i) => i.src)
      .slice(0, 25)
      .map((i) => {
        const g = images[i.src!];
        return {
          "@type": "ImageObject",
          contentUrl: absFile(i.src!.replace(".jpg", "-1440.webp")),
          ...(g ? { width: g.width, height: g.height } : {}),
          caption: i.title ? `${i.title} — ${i.category}` : i.category,
          creator: { "@type": "Person", name: "John Tan" },
        };
      }),
  };

  return (
    <main>
      <JsonLd data={gallery} />
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

          {collection.seoTitle && (
            <Reveal delay={120}>
              <p className="mt-5 text-[13px] uppercase tracking-[0.2em] text-ember">
                {collection.seoTitle}
              </p>
            </Reveal>
          )}

          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ash md:text-base">
              {collection.blurb}
            </p>
          </Reveal>

          {collection.details && (
            <Reveal delay={200} className="mt-10 md:mt-12">
              {/* Native <details> on purpose: everything inside stays in the
                  HTML while collapsed, so the copy and the prices are still
                  indexed and still quotable by answer engines. Conditional
                  rendering would strip them from the page entirely.

                  The <details> is itself the desktop grid: the toggle keeps
                  column one, where it has always sat under the blurb, and
                  the panel opens into column two — the empty space beside
                  the title. Both share row one, so the panel rises next to
                  the copy instead of hanging below the button. */}
              <details className="group md:grid md:grid-cols-[minmax(0,1fr)_46%] md:items-start md:gap-12">
                <summary className="glass glass-hover inline-flex cursor-pointer list-none items-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] uppercase tracking-[0.15em] text-bone [&::-webkit-details-marker]:hidden md:col-start-1 md:row-start-1 md:justify-self-start">
                  Pricing
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden
                    className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.75] transition-transform duration-300 group-open:rotate-180"
                  >
                    <path
                      d="M3.5 6 8 10.5 12.5 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>

                {/* The lift pulls the panel up alongside the blurb. It is a
                    margin rather than a translate so the grid row still
                    accounts for it — the cover photograph below moves down
                    by exactly what the panel needs and nothing overlaps.
                    Bounded well under the gap to the title, which is never
                    less than ~160px however short the blurb runs. */}
                <div className="details-panel glass mt-5 rounded-[2rem] p-6 md:col-start-2 md:row-start-1 md:-mt-[7.5rem] md:p-10">
                  <p className="max-w-3xl text-pretty text-[15px] leading-relaxed text-bone/70 md:text-base">
                    {collection.details.intro}
                  </p>

                  <dl className="mt-7 max-w-2xl">
                    {collection.details.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-ink-3 py-3"
                      >
                        <dt className="text-[13px] uppercase tracking-[0.15em] text-ash">
                          {spec.label}
                        </dt>
                        <dd className="text-[14px] text-bone">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </details>
            </Reveal>
          )}


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
              <section
                key={group.title}
                id={slugify(group.title)}
                /* Clears the fixed nav when jumped to */
                className={`scroll-mt-28 ${gi > 0 ? "mt-24" : ""}`}
              >
                <GroupHeader
                  title={group.title}
                  blurb={group.blurb}
                  next={groups[gi + 1]}
                />

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

            return shown.map((group, gi) => (
              <section
                key={group.title}
                id={slugify(group.title)}
                className={`scroll-mt-28 ${gi > 0 ? "mt-24" : ""}`}
              >
                <GroupHeader
                  title={group.title}
                  blurb={group.blurb}
                  next={shown[gi + 1]}
                />

                <PhotoGrid items={group.images} />
              </section>
            ));
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
