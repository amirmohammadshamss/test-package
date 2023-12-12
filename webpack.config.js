// webpack.config.js
const path = require('path');

module.exports = {
  // ...other configuration
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match .ts or .tsx files
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Include .tsx, .ts, and .js extensions
  },
  // ...other configuration
};
