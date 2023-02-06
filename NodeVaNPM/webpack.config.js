const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = (env) => {
  const isDevelopment = Boolean(env.development);

  const basePlugins = [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/template.html",
      title: "Webpack app",
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
  ];

  const plugins = isDevelopment
    ? basePlugins
    : [...basePlugins, new BundleAnalyzerPlugin()];

  return {
    mode: isDevelopment ? "development" : "production",
    entry: {
      app: path.resolve("src/index.js"),
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true, //Clean thư mục dist trước khi build,
      assetModuleFilename: "[file]",
    },
    devtool: isDevelopment ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss|css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: true,
                    useBuiltIns: "entry", // set option này bạn phải tự tay import các tính năng cần dùng.
                    // useBuiltIns: "usage", // set option này thì sẽ đơn giản nhất, không cần import core-js vào code
                    corejs: "3.27.2", // nên quy định verson core-js để babel-preset-env nó hoạt động tối ưu
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins,
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
