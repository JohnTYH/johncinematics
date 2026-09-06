/**
 * Custom image loader.
 *
 * GitHub Pages serves static files with no image optimizer, so next/image
 * can't resize on demand. Rather than falling back to `unoptimized` — which
 * ships one full-size file to every device — this maps each requested width
 * onto a variant that scripts/optimize-images.mjs already wrote to disk.
 * next/image still builds a real srcset; only the URLs change.
 *
 * Keep WIDTHS in sync with the script and with `deviceSizes` in
 * next.config.mjs.
 */
const WIDTHS = [480, 960, 1440, 1920];

/* Set at build time for GitHub Pages, empty locally. The default loader
   prefixes basePath automatically; a custom one has to do it itself. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Remote images (YouTube poster frames) have no local variants.
  if (/^https?:\/\//.test(src)) return src;

  const chosen = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  const withoutExt = src.replace(/\.(jpe?g|png|webp)$/i, "");

  return `${BASE}${withoutExt}-${chosen}.webp`;
}
