module.exports = {
  entry: './src/V3-Latest.js',
  output: {
    filename: 'V3-Latest.js', // Specify the desired output file name
    path: path.resolve(__dirname, 'functions'),
  },
  optimization: {
    minimize: true,
  },
};
