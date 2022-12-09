const nextConfig = {
  // FIXME standalone does not support app directory for now
  // output: 'standalone',
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
