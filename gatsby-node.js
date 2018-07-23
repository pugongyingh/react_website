/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require('path');

exports.modifyWebpackConfig = function({config, env}) {
  config.merge({
    resolve: {
      root: path.resolve(__dirname, './src'),
      extensions: ['', '.js', '.jsx', '.json'],
    }
  });
  return config;
}


