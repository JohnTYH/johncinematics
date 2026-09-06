import Reveal from "./Reveal";

export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

type Props = {
  title: string;
  blurb?: string;
  /** The group below this one, if any. Renders the jump link. */
  next?: { title: string; jumpLabel?: string };
};

/**
 * Heading for one subsection, shared by photo and video collections, with a
 * link down to whatever comes next. Driven by position rather than hardcoded
 * targets, so adding a subsection wires its own link and the last one
 * correctly shows none.
 */
export default function GroupHeader({ title, blurb, next }: Props) {
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 border-t border-ink-3 pt-8">
      <div>
        <h2 className="display text-[9vw] leading-[0.92] text-bone md:text-[3vw]">
          {title}
        </h2>
        {blurb && (
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash">
            {blurb}
          </p>
        )}
      </div>

      {next && (
        <a
          href={`#${slugify(next.title)}`}
          className="glass glass-hover group flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 text-[13px] uppercase tracking-[0.15em] text-bone"
        >
          {next.jumpLabel ?? next.title}
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
  );
}
