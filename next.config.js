module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/filesend", // Proxy to your API codebase
      },
    ];
  },
};
