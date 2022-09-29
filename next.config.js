/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://rest.payamak-panel.com/" },
        ],
}

module.exports = nextConfig