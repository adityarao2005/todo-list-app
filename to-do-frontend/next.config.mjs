/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/api/:path*',
            },
            {
                source: '/hello',
                destination: 'http://localhost:8080/hello'
            }
        ];
    }
};

export default nextConfig;