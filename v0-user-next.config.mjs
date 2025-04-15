/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['v0.blob.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Simplified config for better compatibility
  experimental: {
    // Disable experimental features that might cause issues
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
  // Improve performance
  poweredByHeader: false,
  // Handle potential routing issues
  trailingSlash: false,
};

export default nextConfig;
