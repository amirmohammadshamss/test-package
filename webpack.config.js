// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts', // Assuming your entry point is in the 'src' directory
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'], // Include '.ts' extension
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match .ts files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
