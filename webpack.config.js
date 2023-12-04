const path = require('path');

module.exports = {
  entry: './src/V3-Latest.js', // Adjust the entry point based on your project
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
