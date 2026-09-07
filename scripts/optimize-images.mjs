/**
 * assets/<collection>/**  →  public/work/<collection>/**
 *
 * Masters stay in assets/ (git-ignored, never deployed). This writes the
 * web-sized derivatives the site actually serves, plus a generated manifest
 * carrying each image's dimensions and a blur placeholder.
 *
 *   node scripts/optimize-images.mjs
 *
 * Emits one WebP per width in WIDTHS. GitHub Pages serves static files with
 * no image optimizer, so the responsive variants have to exist on disk —
 * lib/image-loader.ts points next/image at them, which keeps real srcsets
 * rather than shipping one large file to every device.
 *
 * Incremental: a photo is re-encoded only when its master is newer than the
 * derivatives, so adding one image costs one image. Outputs whose master has
 * gone are deleted, keeping public/work an exact mirror of assets/.
 */
import sharp from "sharp";
import {
  readdir,
  mkdir,
  writeFile,
  readFile,
  stat,
  rm,
  unlink,
} from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "assets";
const OUT = path.join("public", "work");

/* The widest slot renders at 890px CSS, so 1920 covers it at 2x. These must
   match `deviceSizes` in next.config.mjs — the loader is only ever asked for
   widths Next knows about. */
const WIDTHS = [480, 960, 1440, 1920];
const QUALITY = 80;

const isImage = (f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f);

async function collectDirs(dir, base = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const here = entries.some((e) => e.isFile() && isImage(e.name)) ? [base] : [];
  const nested = await Promise.all(
    entries
      .filter((e) => e.isDirectory())
      .map((e) => collectDirs(path.join(dir, e.name), path.join(base, e.name))),
  );
  return [...here, ...nested.flat()];
}

const categories = (await collectDirs(SRC)).filter(Boolean);

/* Reuse manifest entries for anything we skip — dimensions and the blur
   placeholder are derived from the master, so they can't be recovered from
   the derivatives alone. */
let previous = {};
const manifestPath = path.join("lib", "generated-images.ts");
if (existsSync(manifestPath)) {
  const raw = await readFile(manifestPath, "utf8");
  /* Start at the data object, not the `export type … = {` above it. */
  const marker = raw.indexOf("GeneratedImage> =");
  const json =
    marker === -1
      ? "{}"
      : raw.slice(raw.indexOf("{", marker), raw.lastIndexOf("}") + 1);
  try {
    previous = JSON.parse(json);
  } catch {
    previous = {};
  }
}

const manifest = {};
const expected = new Set();
let skipped = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const category of categories) {
  const inDir = path.join(SRC, category);
  const outDir = path.join(OUT, category);
  await mkdir(outDir, { recursive: true });

  for (const file of (await readdir(inDir)).filter(isImage).sort()) {
    const from = path.join(inDir, file);
    const name = path.parse(file).name;
    /* The manifest key stays a .jpg path so content.ts reads naturally; the
       loader swaps in the width and the .webp extension at request time. */
    const key = `/work/${category}/${name}.jpg`;

    const meta = await sharp(from).rotate().metadata();
    const widths = WIDTHS.filter((w) => w <= meta.width);
    if (widths.length === 0) widths.push(meta.width);

    const outputs = widths.map((w) => path.join(outDir, `${name}-${w}.webp`));
    outputs.forEach((o) => expected.add(o));

    const srcMtime = (await stat(from)).mtimeMs;
    const upToDate =
      previous[key] !== undefined &&
      (await Promise.all(
        outputs.map(async (o) => {
          if (!existsSync(o)) return false;
          return (await stat(o)).mtimeMs >= srcMtime;
        }),
      ).then((r) => r.every(Boolean)));

    if (upToDate) {
      manifest[key] = previous[key];
      for (const o of outputs) bytesOut += (await stat(o)).size;
      bytesIn += (await stat(from)).size;
      skipped += 1;
      continue;
    }

    for (const w of widths) {
      const to = path.join(outDir, `${name}-${w}.webp`);
      // Metadata is stripped by default — that drops GPS, which for wedding
      // work means venue and home addresses.
      await sharp(from)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .toColourspace("srgb")
        .webp({ quality: QUALITY })
        .toFile(to);
      bytesOut += (await stat(to)).size;
    }

    const largest = await sharp(
      path.join(outDir, `${name}-${widths[widths.length - 1]}.webp`),
    ).metadata();

    const blur = await sharp(from).rotate().resize(16).webp({ quality: 45 }).toBuffer();

    manifest[key] = {
      src: key,
      width: largest.width,
      height: largest.height,
      widths,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };

    bytesIn += (await stat(from)).size;
    console.log(`${category}/${file}  →  ${widths.join(", ")}`);
  }
}

/* Anything left in public/work whose master has gone. */
async function prune(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await prune(full);
    else if (!expected.has(full)) {
      await unlink(full);
      console.log(`removed orphan  ${full}`);
    }
  }
}
if (existsSync(OUT)) await prune(OUT);

const banner = `/* GENERATED by scripts/optimize-images.mjs — do not edit by hand. */\n`;
const type = `export type GeneratedImage = {
  src: string;
  width: number;
  height: number;
  /** Widths actually written to disk, ascending. */
  widths: number[];
  blurDataURL: string;
};\n\n`;
await writeFile(
  path.join("lib", "generated-images.ts"),
  `${banner}\n${type}export const images: Record<string, GeneratedImage> = ${JSON.stringify(
    manifest,
    null,
    2,
  )};\n`,
);

console.log(
  `\n${Object.keys(manifest).length} images  ${(bytesIn / 1e6).toFixed(0)}MB → ${(
    bytesOut / 1e6
  ).toFixed(1)}MB  (${skipped} already up to date, ${
    Object.keys(manifest).length - skipped
  } encoded)`,
);
