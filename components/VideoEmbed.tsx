"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/lib/content";

type Props = {
  video: Video;
  orientation?: "landscape" | "vertical";
  sizes?: string;
};

/**
 * Click-to-load YouTube facade.
 *
 * A real <iframe> costs roughly 500KB–1MB per video on page load even if
 * nobody presses play, which on a page of films would dwarf every photo on
 * the site. This shows the poster frame and swaps in the player only on
 * intent, so the cost is paid by people who actually watch.
 */
export default function VideoEmbed({
  video,
  orientation = "landscape",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: Props) {
  const [playing, setPlaying] = useState(false);
  // maxres doesn't exist for every upload; hq always does.
  const [poster, setPoster] = useState(
    `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
  );

  const hq = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;

  /* When a video has no maxres frame, YouTube doesn't fail the request — it
     answers 404 with a decodable 40x30 grey placeholder. The browser calls
     that a successful load, so onError alone never catches it. Checking the
     decoded width is the only reliable signal. */
  const fallBackIfPlaceholder = (img: HTMLImageElement) => {
    if (img.naturalWidth > 0 && img.naturalWidth <= 120) setPoster(hq);
  };

  const ratio = orientation === "vertical" ? "aspect-[9/16]" : "aspect-video";

  return (
    <figure>
      <div
        className={`relative overflow-hidden rounded-xl bg-ink-2 ring-1 ring-white/[0.06] ${ratio}`}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title ?? "Film"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title ?? "film"}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes={sizes}
              onError={() => setPoster(hq)}
              onLoad={(e) => fallBackIfPlaceholder(e.currentTarget)}
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />

            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent to-60%"
            />

            <span
              aria-hidden
              className="glass glass-hover absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-bone">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {(video.title || video.note) && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          {video.title && (
            <span className="text-[15px] text-bone">{video.title}</span>
          )}
          {video.note && (
            <span className="text-[13px] text-ash">{video.note}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
