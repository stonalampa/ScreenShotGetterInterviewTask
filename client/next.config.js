const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:4000/:path*", // Proxy to Backend
      basePath: false,
    },
  ],
};

module.exports = nextConfig;
