/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

const { NODE_ENV } = process.env;

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/global.scss'),
      ],
    });
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: '8088',
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: {
      poll: true,
    },
    historyApiFallback: true,
  },
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
      }),
    ],
  },
  css: {
    sourceMap: NODE_ENV !== 'production',
  },

  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss')
      .oneOf(type)));

    config.optimization.delete('splitChunks'); // single chunk
  },
};
