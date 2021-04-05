const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "styles")],
              },
            },
          }
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./html/index.html",
      filename: "./index.html",
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};