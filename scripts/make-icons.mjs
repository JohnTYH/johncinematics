/**
 * Generates the favicon set from one vector source.
 *
 * The mark is the wordmark compressed to a single glyph: a heavy J in bone
 * with the ember period that sits between "John" and "Cinematics". A bare
 * J would read as any J; the dot is the part that is actually ours.
 *
 * Run with `npm run icons`. Output lands in app/, where Next picks the
 * files up by name and emits the <link> tags itself — nothing to wire up
 * in layout.tsx, and the hrefs get the basePath for free.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "app");

const INK = "#191920";
const BONE = "#f6f5f2";
const EMBER = "#e8b04b";

/* Stroked rather than filled so the weight is one number to tune. The arc
   is a half circle hanging off the stem — that is the whole letter. */
const mark = `
  <g transform="translate(256,256) scale(1.14) translate(-266,-266)">
    <path d="M310 132 V290 A72 72 0 0 1 166 290"
          fill="none" stroke="${BONE}" stroke-width="78" stroke-linecap="butt"/>
    <circle cx="374" cy="352" r="32" fill="${EMBER}"/>
  </g>`;

/* rounded: the browser tab draws the icon as-is, so it carries its own
   corners. iOS masks the touch icon itself, and rounding twice leaves
   pale slivers in the corners — so that one stays square. */
const svg = (rounded) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
     <rect width="512" height="512" rx="${rounded ? 112 : 0}" fill="${INK}"/>
     ${mark}
   </svg>`,
);

const targets = [
  { file: "icon.png", size: 512, rounded: true },
  { file: "apple-icon.png", size: 180, rounded: false },
];

for (const { file, size, rounded } of targets) {
  await sharp(svg(rounded)).resize(size, size).png().toFile(path.join(OUT, file));
  console.log(`${file}  ${size}x${size}`);
}

/* A tab-sized render, to check the mark still reads when it is 16px wide. */
await sharp(svg(true)).resize(32, 32).png().toFile("/tmp/icon-32.png");
await sharp(svg(true)).resize(16, 16).png().toFile("/tmp/icon-16.png");
