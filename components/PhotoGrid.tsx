import Photo from "./Photo";
import Reveal from "./Reveal";
import type { WorkItem } from "@/lib/content";

const isNarrow = (i: WorkItem) =>
  i.ratio === "portrait" || i.ratio === "square";

/** Desktop column span → the classes and sizes that go with it. */
const SPAN = {
  2: {
    className: "md:col-span-2",
    sizes:
      "(min-width: 1400px) 430px, (min-width: 768px) 31vw, calc(50vw - 26px)",
  },
  3: {
    className: "md:col-span-3",
    sizes:
      "(min-width: 1400px) 655px, (min-width: 768px) 47vw, calc(50vw - 26px)",
  },
  4: {
    className: "md:col-span-4",
    sizes:
      "(min-width: 1400px) 890px, (min-width: 768px) 63vw, calc(100vw - 40px)",
  },
  6: {
    className: "md:col-span-6",
    sizes: "(min-width: 1400px) 1336px, (min-width: 768px) 94vw, calc(100vw - 40px)",
  },
} as const;

type Span = keyof typeof SPAN;

/**
 * Packs the photographs into rows that fill all six columns.
 *
 * A landscape is naturally twice a portrait's width, so an alternating mix
 * tiles neatly at 4 + 2. The moment the ratios are lopsided — which they are
 * as soon as photos get added or deleted — that assumption breaks and every
 * unpaired landscape sits alone with two empty columns beside it.
 *
 * So rows are packed by what's actually there: two landscapes share a row at
 * 3 + 3, three portraits at 2 + 2 + 2, a mixed pair at 4 + 2. Only a genuine
 * leftover at the very end is allowed to run short.
 */
function pack(items: WorkItem[]): { item: WorkItem; span: Span }[] {
  const out: { item: WorkItem; span: Span }[] = [];

  for (let i = 0; i < items.length; ) {
    const a = items[i];
    const b = items[i + 1];
    const c = items[i + 2];

    if (!isNarrow(a)) {
      if (b && !isNarrow(b)) {
        out.push({ item: a, span: 3 }, { item: b, span: 3 });
        i += 2;
      } else if (b) {
        out.push({ item: a, span: 4 }, { item: b, span: 2 });
        i += 2;
      } else {
        // Last one, nothing to pair with — let it run full width.
        out.push({ item: a, span: 6 });
        i += 1;
      }
    } else if (b && c && isNarrow(b) && isNarrow(c)) {
      out.push(
        { item: a, span: 2 },
        { item: b, span: 2 },
        { item: c, span: 2 },
      );
      i += 3;
    } else if (b && isNarrow(b)) {
      out.push({ item: a, span: 3 }, { item: b, span: 3 });
      i += 2;
    } else if (b) {
      out.push({ item: a, span: 2 }, { item: b, span: 4 });
      i += 2;
    } else {
      /* A lone trailing portrait: half width. Full width would make a 2:3
         frame taller than the viewport. */
      out.push({ item: a, span: 3 });
      i += 1;
    }
  }

  return out;
}

/**
 * Mobile stays a simple 2-column grid: portraits pair up, landscapes span
 * both. Every portrait is the same ratio at the same width, so paired rows
 * come out exactly the same height.
 *
 * `fillHeight` keeps mixed rows flush — a 3:2 landscape is shorter than a
 * 2:3 portrait at the same row width, so without it the grid stretches the
 * cell and leaves dead space underneath.
 */
export default function PhotoGrid({ items }: { items: WorkItem[] }) {
  return (
    /* `auto-flow-dense` is for mobile: the packer arranges rows for the
       6-column desktop grid, so on a 2-column screen a portrait can end up
       alone in a half-empty row. Dense pulls a later portrait up to fill it.
       On desktop the rows already sum to six exactly, so there is no hole
       for it to fill and it changes nothing. */
    <div className="grid grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-6 md:gap-6">
      {pack(items).map(({ item, span }, i) => (
        <Reveal
          key={item.id}
          delay={(i % 3) * 80}
          as="figure"
          className={`${
            isNarrow(item) ? "col-span-1" : "col-span-2"
          } ${SPAN[span].className}`}
        >
          <Photo item={item} fillHeight sizes={SPAN[span].sizes} />
        </Reveal>
      ))}
    </div>
  );
}
