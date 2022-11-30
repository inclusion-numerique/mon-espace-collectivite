const nextConfig = {
  // output: 'standalone',
  reactStrictMode: true,
  experimental: {
    appDir: true,
    transpilePackages: ['@mec/api', '@mec/auth', '@mec/db', '@mec/email'],
    // swcPlugins: [
    //   [
    //     'next-superjson-plugin',
    //     {
    //       excluded: [],
    //     },
    //   ],
    // ],
  },
}

module.exports = nextConfig
