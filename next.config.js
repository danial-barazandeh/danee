/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  source: "/_next/:path*",
  headers: [
    { key: "Access-Control-Allow-Origin", value: "https://rest.payamak-panel.com/" },
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
    ],
  },

}

module.exports = nextConfig