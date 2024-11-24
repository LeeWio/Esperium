/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Check if the environment is development
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/users/:path*', // Match all paths starting with /user
          destination: 'http://127.0.0.1:8080/users/:path*', // API URL for development environment (local)
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
