const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in all environments for testing
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/newsapi\.org\/v2\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'news-api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|png|gif|webp|svg)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add empty turbopack config to silence the warning
  turbopack: {},
};

module.exports = withPWA(nextConfig);
