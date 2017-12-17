const path = require('path');

module.exports = {
  entry: './client-ts/webrtc.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'webrtc.js',
    path: path.resolve(__dirname, 'dist-client')
  }
};