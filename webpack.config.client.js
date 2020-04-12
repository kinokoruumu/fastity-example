const path = require('path');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs();
const DIST_PUBLIC = abs('./dist/public');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  target: 'web',
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: IS_PRODUCTION ? false : '#source-map',
  entry: {
    bootstrap: abs('client/index.tsx'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].js.map',
    path: DIST_PUBLIC,
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [SRC_ROOT, 'node_modules'],
    mainFields: ['browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: abs('node_modules/.cache/cache-loader'),
            },
          },
          {
            loader: 'babel-loader',
            options: {
              envName: 'browser',
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'local'),
      },
      'process.title': JSON.stringify('browser'),
    }),

    new CopyPlugin([{ from: abs('assets') }]),

    new LoadablePlugin({
      filename: '../loadable-stats.json',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 1,
      minChunks: 1,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            warnings: false,
          },
        },
      }),
    ],
    concatenateModules: true,
  },
  stats: {
    warningsFilter: [
      /export '\w+'(?: \(reexported as '\w+'\))? was not found in/,
    ],
  },
};
