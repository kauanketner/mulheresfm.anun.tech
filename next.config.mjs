/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    remotePatterns: [],
  },
  async rewrites() {
    return [
      {
        // URLs antigas /uploads/* redirecionam para a rota API /api/uploads/*
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
