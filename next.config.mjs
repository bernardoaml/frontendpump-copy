/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://frontend-api.pump.fun/:path*',
      },
    ];
  },
};

export default nextConfig;




// import withMDX from '@next/mdx';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Configure `pageExtensions` to include MDX files
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
//   // Optionally, add any other Next.js config below
//   env: {
//     // IMGS_URL: process.env.IMGS_URL,
//     BASE_URL: process.env.BASE_URL,
//     API_URL: process.env.API_URL,
//   },
// };

// export default withMDX()(nextConfig);
