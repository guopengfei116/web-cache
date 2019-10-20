const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = (filename) => path.resolve(__dirname, filename);

const webpackConfig = {
  mode: 'development',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = resolve(dir);
    let entry;
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync((entry = resolve(`${dir}/app.js`)))) {
      entries[dir] = ['webpack-hot-middleware/client', entry];
    }
    return entries;
  }, {}),

  output: {
    path: resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__dist__/',
  },

  devtool: 'inline-source-map',

  resolve: {
    alias: {
      'web-cache$': resolve('../src/index.js'),
      '@': resolve('./'),
    },
    extensions: ['.js', '.vue', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'shared',
          filename: 'shared.js',
          chunks: 'initial',
        },
      },
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

};

module.exports = webpackConfig;