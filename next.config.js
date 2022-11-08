/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: [
    { key: "Access-Control-Allow-Origin", value: "https://rest.payamak-panel.com/" },
    { key: "Access-Control-Allow-Origin", value: "https://api.idpay.ir/v1.1/payment" },
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