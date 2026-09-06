import Photo from "./Photo";
import Reveal from "./Reveal";
import type { WorkItem } from "@/lib/content";

/**
 * The gallery grid, shared by flat collections and grouped ones.
 *
 * Mobile is 2 columns: portraits pair up, landscapes span both and stay
 * full-bleed. Every portrait is the same ratio at the same width, so paired
 * rows come out exactly the same height. `auto-flow-dense` backfills the hole
 * a wide item leaves when it wraps, so the packing stays tight whatever order
 * the photos are in.
 *
 * `fillHeight` keeps mixed rows flush: a 3:2 landscape is shorter than a 2:3
 * portrait at the same row width, so without it the grid stretches the cell
 * and leaves dead space underneath.
 */
export default function PhotoGrid({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-6 md:gap-6">
      {items.map((item, i) => {
        const narrow = item.ratio === "portrait" || item.ratio === "square";

        return (
          <Reveal
            key={item.id}
            delay={(i % 3) * 80}
            as="figure"
            className={
              narrow ? "col-span-1 md:col-span-2" : "col-span-2 md:col-span-4"
            }
          >
            <Photo
              item={item}
              fillHeight
              sizes={
                narrow
                  ? "(min-width: 1400px) 430px, (min-width: 768px) 31vw, calc(50vw - 26px)"
                  : "(min-width: 1400px) 890px, (min-width: 768px) 63vw, calc(100vw - 40px)"
              }
            />
          </Reveal>
        );
      })}
    </div>
  );
}
