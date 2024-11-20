/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Check if the environment is development
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/user/:path*', // Match all paths starting with /user
          destination: 'http://localhost:8080/user/:path*', // API URL for development environment (local)
        },
      ];
    }
    
    // Configuration for production environment
    return [
      {
        source: '/user/:path*', // Match all paths starting with /user
        destination: 'https://your-production-api.com/user/:path*', // API URL for production environment (live)
      },
    ];
  },
};

export default nextConfig;
