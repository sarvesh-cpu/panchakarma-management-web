/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Disable native pg bindings to prevent addon.node errors
      config.externals = [...(config.externals || []), 'pg-native']
    }
    return config
  },
}

export default nextConfig
