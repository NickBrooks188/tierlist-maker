/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['jello-bucket.s3.us-west-1.amazonaws.com', 'tierforge.s3.us-west-1.amazonaws.com']
    },
    reactStrictMode: false,
    output: "standalone",
    future: {
        webpack5: false,
    },
};

export default nextConfig;