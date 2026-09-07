import Image from "next/image";
import { ratioClass, type WorkItem } from "@/lib/content";
import { images } from "@/lib/generated-images";

type Props = {
  item: WorkItem;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Stretch to the grid row's height on top of the declared ratio. Needed in
   * a row that mixes orientations, so cells sit flush.
   */
  fillHeight?: boolean;
};

/**
 * Plain photo display. Deliberately NOT <Frame />.
 *
 * Frame paints a bottom vignette so the glass caption stays legible over any
 * image — necessary on the home grid, but on a caption-less gallery page that
 * scrim is just a charcoal wash over the bottom of every photo. This renders
 * the image and nothing else: no overlay, no hover transform, no animated
 * border. The photograph is the whole design.
 */
export default function Photo({
  item,
  className = "",
  sizes = "100vw",
  priority = false,
  fillHeight = false,
}: Props) {
  const generated = item.src ? images[item.src] : undefined;
  const [from, to] = item.tone ?? ["#1a1a1e", "#0a0a0b"];

  return (
    <div
      /* The ratio class always stays: it is what gives the box an intrinsic
         height for the grid row to size itself from. `h-full` only stretches
         that box to the row afterwards — swapping one for the other collapses
         the row to zero, because then no item in it has a height of its own.
         `max-w-full` is load-bearing. With `h-full` the row makes the height
         definite, and the browser then derives WIDTH from the aspect ratio
         rather than filling the cell — a 3:2 box in a 344px row computes to
         516px wide, overflows its 483px column and eats the grid gap. The
         clamp keeps it inside the cell. It cannot be `w-full` instead: that
         would make both dimensions definite, leaving nothing in the row with
         an intrinsic height to size from, and the row collapses. */
      className={`relative overflow-hidden rounded-xl bg-ink-2 ring-1 ring-white/[0.06] ${
        ratioClass[item.ratio]
      } ${fillHeight ? "h-full max-w-full" : ""} ${className}`}
    >
      {item.src ? (
        <Image
          src={item.src}
          alt={item.title ? `${item.title} — ${item.category}` : item.category}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={generated ? "blur" : "empty"}
          blurDataURL={generated?.blurDataURL}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 30% 15%, ${from} 0%, ${to} 72%)`,
          }}
        />
      )}
    </div>
  );
}
