/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.animal.go.kr",
      "www.canva.com",
      "localhost",
      "cmzibiapbpoyfptuyewn.supabase.co",
    ],
  },
};

export default nextConfig;
