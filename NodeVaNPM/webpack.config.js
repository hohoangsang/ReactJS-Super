const path = require("path")

const config = {
  mode: "production",
  entry: {
    app: path.resolve("src/index.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss|css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

module.exports = config