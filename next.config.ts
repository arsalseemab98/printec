import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eofjaizkkxqxbynnvemi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Old WordPress/WooCommerce product pages → homepage
      { source: "/product/:path*", destination: "/", permanent: true },
      { source: "/product-category/:path*", destination: "/", permanent: true },
      // Old WordPress tag/category pages → blog
      { source: "/tag/:path*", destination: "/blog", permanent: true },
      { source: "/category/:path*", destination: "/blog", permanent: true },
      // Old WordPress pages
      { source: "/shop/:path*", destination: "/", permanent: true },
      { source: "/cart", destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/my-account/:path*", destination: "/", permanent: true },
      // Old WordPress uploads (images) — 404 is fine but redirect pattern pages
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      // Old WordPress feed
      { source: "/feed/:path*", destination: "/blog", permanent: true },
      // Old WordPress author pages
      { source: "/author/:path*", destination: "/team", permanent: true },
      // Old WordPress pagination
      { source: "/page/:path*", destination: "/", permanent: true },
      // Out-of-area location pages (doorway-page risk under Sept 2025 QRG) → Virginia
      { source: "/locations/seattle", destination: "/locations/virginia", permanent: true },
      { source: "/locations/new-york", destination: "/locations/virginia", permanent: true },
      { source: "/locations/los-angeles", destination: "/locations/virginia", permanent: true },
      { source: "/locations/chicago", destination: "/locations/virginia", permanent: true },
      { source: "/locations/dallas", destination: "/locations/virginia", permanent: true },
      { source: "/locations/houston", destination: "/locations/virginia", permanent: true },
    ];
  },
};

export default nextConfig;
