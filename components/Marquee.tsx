type Props = {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
};

/**
 * Infinite text band. The item list is rendered twice and the track is
 * translated -50%, so the loop point is seamless at any width.
 */
export default function Marquee({
  items,
  direction = "left",
  duration = 42,
  className = "",
}: Props) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
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
    <div
      className={`overflow-hidden border-y border-ink-3 py-8 ${className}`}
      aria-label={items.join(", ")}
    >
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="shrink-0">{row}</div>
        <div className="shrink-0" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
