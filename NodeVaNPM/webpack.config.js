const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = (env) => {
  const isDevelopment = Boolean(env.development)

  return {
    mode: isDevelopment ? "development" : "production",
    entry: {
      app: path.resolve("src/index.js"),
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true, //Clean thư mục dist trước khi build
    },
    devtool: isDevelopment ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss|css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack app",
        filename: "index.html",
        template: "src/template.html",
        content: "Học webpack",
        menu: `
        <li>Dashboard</li>
        <li>Product</li>
        <li>About</li>
        <li>Login/Signin</li>
      `,
      }),
      new MiniCssExtractPlugin({
        filename: "styles.[contenthash].css",
      }),
    ],
    devServer: {
      static: {
        directory: "dist", // Đường dẫn tương đối đên với thư mục index.html
      },
      port: 5000, // Set port cho localhost (mặc định 8080)
      open: true, // mở trang webpack khi chạy terminal
      hot: false, // Bật tính năng reload nhanh Hot Module Replacement
      liveReload: true, // Bật tự đông reload trang webpack khi file change
      compress: true, // Bật gzip cho các tài nguyên (mặc định true)
      historyApiFallback: true, // Set true nếu bạn dùng cho các SPA và sử dụng History API của HTML5
    },
  };
};

module.exports = config;
