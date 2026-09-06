/* GitHub Pages serves this repo at johntyh.github.io/johncinematics, so the
   site lives under a subpath. basePath/assetPrefix are read from an env var
   set by the deploy workflow, which keeps local dev at the root. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — Pages has no Node server.
  output: 'export',
  basePath,
  assetPrefix: basePath,
  // Emits about/index.html rather than about.html, which is what Pages
  // needs to resolve /about without a trailing-slash redirect.
  trailingSlash: true,
  devIndicators: false,
  images: {
    /* A custom loader is what lets next/image keep working under `export`.
       These widths must match WIDTHS in lib/image-loader.ts and the script. */
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    deviceSizes: [480, 960, 1440, 1920],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
