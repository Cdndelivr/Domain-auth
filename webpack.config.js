const path = require('path');

module.exports = {
  entry: './src/V3-Latest.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
  },
};
