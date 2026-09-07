/**
 * Absolute-URL helpers for metadata.
 *
 * The site lives on a subpath (johntyh.github.io/johncinematics), which makes
 * relative metadata URLs a trap: `new URL("/x", "https://host/johncinematics")`
 * resolves to `https://host/x`, dropping the basePath. So every canonical,
 * sitemap entry and og:image is built as an absolute string instead.
 *
 * Point NEXT_PUBLIC_SITE_URL at a custom domain when you have one — that's
 * the only value that needs to change.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://johntyh.github.io/johncinematics";

export const SITE_NAME = "John Cinematics";

export const INSTAGRAM = "https://www.instagram.com/johncinematics/";

/** Absolute URL for a site-relative path. Keeps the trailing slash Next emits. */
export const abs = (path = "/") =>
  `${SITE_URL}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;

/** Absolute URL for a file in public/ (no trailing slash). */
export const absFile = (path: string) => `${SITE_URL}${path}`;

/* A landscape frame — portrait crops badly in link previews. */
export const OG_IMAGE = "/work/proposals/John-09442-1440.webp";
