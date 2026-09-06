import Link from "next/link";
import Frame from "./Frame";
import Reveal from "./Reveal";
import { publishedCollections } from "@/lib/content";

/** Home grid: one card per collection, showing its cover. */
export default function WorkGrid() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[13vw] leading-[0.92] text-bone md:text-[6vw]">
          What I
          <br />
          shoot
        </h2>
        {/* Deliberately says nothing about which categories — the tiles below
            already name those, and they change as collections are added. This
            carries the one thing a tile can't show: how the work is shot. */}
        <p className="max-w-xs text-[15px] leading-relaxed text-ash">
          <span className="text-bone">Clean, sharp and natural.</span> With room
          for something more filmic when the story calls for it.
        </p>
      </Reveal>

      {/* Collection tiles, not a photo gallery — so they're uniform rather
          than sized by each cover's own ratio. Half-width on desktop means any
          even number of collections tiles perfectly, and the tiles stay
          equal-weight as a menu should. */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
        {publishedCollections.map((collection, i) => {
          const cover = collection.images[0];

          /* For grouped collections `images` holds only the cover, so the
             real count lives in the groups. Films and photographs are counted
             separately because they get different nouns; hidden video groups
             are excluded since they aren't reachable. */
          const films = collection.videoGroups
            ?.filter((g) => !g.hidden)
            .reduce((n, g) => n + g.videos.length, 0);

          const grouped = (collection.photoGroups ?? []).reduce(
            (n, g) => n + g.images.length,
            0,
          );

          const count = films ?? collection.images.length + grouped;
          const noun = films !== undefined ? "film" : "photo";
          const label = `${count} ${noun}${count === 1 ? "" : "s"}`;

          return (
            <Reveal
              key={collection.slug}
              delay={(i % 2) * 110}
              as="article"
              className="group md:col-span-3"
            >
              <Link
                href={`/work/${collection.slug}`}
                className="edge block h-full rounded-2xl"
                style={
                  { "--edge-delay": `${-i * 2.4}s` } as React.CSSProperties
                }
              >
                <Frame
                  item={cover}
                  ratio="landscape"
                  priority={i === 0}
                  className="h-full rounded-[15px]"
                  sizes="(min-width: 1400px) 655px, (min-width: 768px) 47vw, calc(100vw - 40px)"
                />

                <div className="glass glass-hover absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5">
                  <h3 className="text-[15px] text-bone">{collection.name}</h3>
                  <p className="text-[13px] text-bone/70">{label}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

    </section>
  );
}
