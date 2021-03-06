const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssOptions = require('./postcssOptions');
const getLocalIdent = require('./getLocalIdent');
const StatsWebpackPlugin = require('stats-webpack-plugin');

const { filter } = require('lodash');
const { configureCommon, getEnvironment } = require('./common');

const reStyle = /\.(css|scss)$/;
const reImage = /\.(bmp|gif|jpe?g|png|svg)$/;

const configure = options => {
  const { entryPoint, publicDir, proxy } = options;

  options.isNode = false;

  const { isDevelopment, isProduction } = getEnvironment();

  const common = configureCommon(options);

  const config = merge(common, {
    name: 'client',
    target: 'web',
    entry: isDevelopment
      ? [
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
          entryPoint
        ]
      : [entryPoint],
    devtool: isDevelopment && 'cheap-module-source-map',
    output: {
      filename: `static/js/[name].[${isProduction ? 'chunkhash' : 'hash'}:8].js`,
      chunkFilename: `static/js/[name].[${isProduction ? 'chunkhash' : 'hash'}:8].chunk.js`,
      devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath)
    },
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: isDevelopment
            ? [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    modules: true,
                    getLocalIdent: getLocalIdent
                  }
                },
                { loader: 'postcss-loader', options: postcssOptions },
                { loader: 'sass-loader' }
              ]
            : ExtractCssChunks.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    query: {
                      modules: true,
                      minimize: isProduction,
                      importLoaders: 2,
                      localIdentName: '[name]__[local]',
                      getLocalIdent: getLocalIdent
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: postcssOptions
                  },
                  'sass-loader'
                ]
              })
        }
      ]
    },
    plugins: filter([
      isProduction &&
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebookincubator/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            sequences: true, // join consecutive statemets with the ‚Äúcomma operator‚Äù
            properties: true, // optimize property access: a["foo"] ‚Üí a.foo
            dead_code: true, // discard unreachable code
            drop_debugger: true, // discard ‚Äúdebugger‚Äù statements
            unsafe: false, // some unsafe optimizations (see below)
            conditionals: true, // optimize if-s and conditional expressions
            evaluate: true, // evaluate constant expressions
            booleans: true, // optimize boolean expressions
            loops: true, // optimize loops
            unused: true, // drop unused variables/functions
            hoist_funs: true, // hoist function declarations
            hoist_vars: false, // hoist variable declarations
            if_return: true, // optimize if-s followed by return/continue
            join_vars: true, // join var declarations
            cascade: true, // try to cascade `right` into `left` in sequences
            side_effects: true // drop side-effect-free statements
          },
          output: {
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebookincubator/create-react-app/issues/2488
            ascii_only: true
          },
          sourceMap: false
        }),
      new ExtractCssChunks(isDevelopment ? undefined : 'static/css/[name].[contenthash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
        filename: 'static/js/[name].js',
        minChunks: Infinity
      }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isProduction && new StatsWebpackPlugin('stats.json')
    ]),
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    // https://webpack.js.org/configuration/node/
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  });

  return config;
};

module.exports = { configure };
