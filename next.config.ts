import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "expenseliy.com",
          },
        ],
        destination: "https://www.expenseliy.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
