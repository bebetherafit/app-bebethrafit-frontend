/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login', // 원하는 대상 경로로 변경하세요.
          permanent: true, // 영구적인 리다이렉트인 경우 true, 임시적인 경우 false
        },
      ]
    },
  };

export default nextConfig;
