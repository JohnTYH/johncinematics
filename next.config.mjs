/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      // YouTube poster frames for the click-to-load video facades.
      { protocol: 'https', hostname: 'i.ytimg.com' },
      // When you move photos to a CDN, add its hostname here too:
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Next 16 requires non-default quality values to be declared up front.
    qualities: [75, 82],
  },
};

export default nextConfig;
