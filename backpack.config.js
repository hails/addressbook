module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [
      './src/server.ts',
    ]

    config.devtool = "source-map"

    config.resolve = {
      extensions: [".ts", ".js", ".json"],
    }

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      }
    )

    config.module.rules.push(
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      }
    )

    return config
  }
}
