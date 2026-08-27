import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
const djangoOrigin = process.env.DJANGO_BACKEND_URL?.replace(/\/api\/?$/, '');

const nextConfig: NextConfig = {
  async rewrites() {
    if (!djangoOrigin) {
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `${djangoOrigin}/api/:path*`,
      },
      {
        source: '/admin/:path*',
        destination: `${djangoOrigin}/admin/:path*`,
      },
      {
        source: '/static/:path*',
        destination: `${djangoOrigin}/static/:path*`,
      },
      {
        source: '/media/:path*',
        destination: `${djangoOrigin}/media/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
