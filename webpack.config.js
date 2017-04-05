module.exports = {
  entry: './lib/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    library: 'ReactResponsiveMasonry',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
};
