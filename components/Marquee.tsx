type Props = {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
};

/* The track holds two copies and slides by -50%, one copy's width. At the
   end of that slide the second copy's right edge is exactly where the
   first one started, so anything past it is empty: a copy narrower than
   the screen leaves a band of nothing sweeping through on every loop.
   Measured at 1440 that was 294px on Stills/Motion/Story.

   Type is sized in vw, so a copy's share of the screen is the same at
   every width and a repeat count fixes it once, with nothing measured at
   runtime and no client component. The per-character figure understates
   an Anton glyph at 8vw, so the rounding errs toward one repeat too many
   rather than one too few. */
const CHAR_VW = 0.028;
const DOT_VW = 0.03;

export default function Marquee({
  items,
  direction = "left",
  duration = 42,
  className = "",
}: Props) {
  const coverage = items.reduce(
    (sum, item) => sum + item.length * CHAR_VW + DOT_VW,
    0,
  );
  const repeat = Math.min(8, Math.max(1, Math.ceil(1 / coverage)));
  const filled = Array.from({ length: repeat }, () => items).flat();

  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {filled.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="display px-6 text-[8vw] leading-none md:px-10">
            {item}
          </span>
          <span aria-hidden className="text-ember text-[3vw]">
            &#9679;
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden border-y border-ink-3 py-8 ${className}`}>
      {/* Both tracks are hidden from assistive tech and the words are
          given once here instead — otherwise the repeat reads the band
          out several times over. */}
      <span className="sr-only">{items.join(", ")}</span>
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="shrink-0">{row}</div>
        <div className="shrink-0">{row}</div>
      </div>
    </div>
  );
}
