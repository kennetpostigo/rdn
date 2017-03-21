const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const markdown = require('./src/swm.js');

const ENV = process.env.NODE_ENV || 'development';

let config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-markdown',
      'rad-codehighlighter',
      'rad-navbar',
      'prismjs',
      'typeface-montserrat'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  stats: {
    colors: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.md$/,
        use: ['raw-loader']
      },
      {
        test: /\.png$/,
        use: ['url-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + '/src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      title: 'RDN'
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'assets', to: 'assets' }
    ]),
    new webpack.DefinePlugin({
      process: {},
      'process.env': {},
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      children: true,
      async: false,
      filename: 'vendor.js'
    })
  ].concat(
    ENV === 'production'
      ? [
          new OfflinePlugin({
            version: '[hash]',
            responseStrategy: 'cache-first',
            safeToUseOptionalCaches: true,
            caches: {
              main: [
                'index.html',
                'vendor.js',
                'main.js',
                'vendor.css',
                'main.css'
              ],
              additional: ['*.chunk.js', ':externals:'],
              optional: [':rest:']
            },
            externals: markdown.markdown,
            cacheMaps: [
              {
                match: /.*/,
                to: '/',
                requestTypes: ['navigate']
              }
            ],
            ServiceWorker: {
              events: true
            },
            AppCache: {
              FALLBACK: { '/': '/' }
            }
          }),
          new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
          }),
          new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: true,
            compress: {
              screw_ie8: true
            },
            comments: false
          })
        ]
      : []
  )
};

module.exports = config;
