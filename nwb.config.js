const extraWebpackConfig = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: "html-loader!markdown-loader",
        exclude: /node_modules/,
      },
    ],
  },
}

// eslint-disable-next-line
module.exports = {
  type: "react-component",
  npm: {
    cjs: true,
    esModules: true,
    umd: {
      global: "ReactResponsiveMasonry",
      externals: {
        react: "React",
        "prop-types": "PropTypes",
      },
    },
  },
  webpack: {
    extra: extraWebpackConfig,
  },
}
