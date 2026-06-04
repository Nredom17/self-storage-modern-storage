/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Supabase storage holds every image uploaded via the /admin/blog
    // editor. Without this allowlist, <Image src="https://...supabase
    // .co/storage/v1/object/public/storage-tips-images/...">  routes
    // through /_next/image and returns 400 ("hostname not configured"),
    // which renders as a gray placeholder on the page. Pattern is
    // scoped to the public/ object path so we never proxy private
    // buckets accidentally.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jdkyslbaxpfokrxztxhm.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      // Old slug → new slug. statusCode 301 (not Next's default `permanent: true` 308)
      // so search engines update bookmarks the way the SEO brief asked for.
      { source: '/boat-rv-storage', destination: '/rv-boat-vehicle', statusCode: 301 },
      // Camel-case route renamed to SEO-friendly kebab-case.
      { source: '/AIStorageSizeFinder', destination: '/ai-storage-size-finder', statusCode: 301 },
      // Renamed away from trademark-targeting URL to geographic commercial intent.
      { source: '/storage-for-walmart-vendors', destination: '/business-storage-bentonville', statusCode: 301 },
    ]
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico)',
        locale: false,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
