const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = (dev) => {
  const isDevelopment = Boolean(dev.development)

  return {
    mode: isDevelopment ? "developlment" : "production",
    entry: {
      app: "./src/index.js",
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        // {
        //   test: /\.(png)$/i,
        //   type: "asset/resource"
        // }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        title: "Học Webpack",
        favicon: "src/icons/webpack.png",
        meta: {
          viewport: "width=device-width, initial-scale=1.0",
          author: "HoHoangSang"
        },
        template: "src/template.html",
        headerContent: `
          <nav>
            <ul>
              <li>Home</li>
              <li>Product</li>
              <li>About</li>
              <li>Mission</li>
              <li>Cart</li>
            </ul>
          </nav>
        `,
        mainContent: `
          <h1>Học Webpack</h1>
        `
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
      })
    ],
    devServer: {
      static: {
        directory: "dist"
      },
      port: 8000,
      compress: true, //enable gzip compression for everything serve
      historyApiFallback: true,
      hot: true, //exchanges, adds, or removes modules while an application is running, without a full reload.
      open: true, //open browser immediately when running terminal 
    }
  };
};

module.exports = config;
