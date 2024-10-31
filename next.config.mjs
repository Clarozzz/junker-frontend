/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'wgsthklptjwlberpnsqy.supabase.co',
        },
      ],
    },
  };
  
  export default nextConfig;
  