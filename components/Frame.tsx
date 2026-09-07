import Image from "next/image";
import { ratioClass, type Ratio, type WorkItem } from "@/lib/content";
import { images } from "@/lib/generated-images";

type Props = {
  item: WorkItem;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Override the item's own ratio — used to keep a row of tiles uniform. */
  ratio?: Ratio;
};

/* Radius is deliberately NOT set here — inside an `.edge` wrapper the
   artwork must sit exactly 1px tighter than the wrapper's radius, so the
   call site owns it. */

/**
 * Renders a work item at its native ratio.
 * Falls back to a graded placeholder while `src` is unset, so the layout is
 * final before a single real photo exists.
 */
export default function Frame({
  item,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  ratio,
}: Props) {
  const [from, to] = item.tone ?? ["#1a1a1e", "#0a0a0b"];
  // Present for anything run through scripts/optimize-images.mjs
  const generated = item.src ? images[item.src] : undefined;

  return (
    <div
      /* max-w-full guards the same trap as in <Photo />: when a caller adds
         h-full, a definite height makes the browser derive width from the
         aspect ratio and overflow the grid cell. */
      className={`relative max-w-full overflow-hidden bg-ink-2 ${
        ratioClass[ratio ?? item.ratio]
      } ${className}`}
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
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          style={{
            background: `radial-gradient(120% 90% at 30% 15%, ${from} 0%, ${to} 72%)`,
          }}
        />
      )}

      {/* Vignette — only enough to keep the glass caption legible on a bright
          image. The glass panel already supplies most of the contrast, so this
          stays light; anything heavier washes out the bottom of the photo.
          Gallery pages use <Photo /> instead, which has no scrim at all. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent to-45%"
      />
    </div>
  );
}
