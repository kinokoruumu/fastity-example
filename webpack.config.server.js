const path = require('path');
const nodeExternals = require('webpack-node-externals');

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs();
const DIST_ROOT = abs('./dist');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  target: 'node',
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: IS_PRODUCTION ? false : '#source-map',
  entry: {
    server: abs('server/index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: DIST_ROOT,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [SRC_ROOT, 'node_modules'],
    mainFields: ['main', 'module'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: abs('node_modules/.cache/cache-loader-node'),
            },
          },
          {
            loader: 'babel-loader',
            options: {
              envName: 'node',
            },
          },
        ],
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
    setImmediate: false,
    Buffer: false,
  },
  optimization: {
    nodeEnv: false,
  },
  stats: {
    warningsFilter: [
      /export '\w+'(?: \(reexported as '\w+'\))? was not found in/,
    ],
  },
};
