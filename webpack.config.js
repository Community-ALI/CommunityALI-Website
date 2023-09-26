const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const ModuleResolver = require("babel-plugin-module-resolver");

module.exports = {
  devtool: "source-map",

  entry: "./src/index.js",

  mode: "production",

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@Photos": path.resolve(__dirname, "./public/Photos"),
    },
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      publicPath: "/",
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "" }],
    }),

    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "Googlebot",
          allow: "/",
          disallow: ["/search"],
          crawlDelay: 2,
        },
        {
          userAgent: "OtherBot",
          allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
          disallow: ["/admin", "/login"],
          crawlDelay: 2,
        },
        {
          userAgent: "*",
          allow: "/",
          disallow: "/search",
          crawlDelay: 10,
          cleanParam: "ref /articles/",
        },
      ],
      sitemap: "https://www.communityali.org/sitemap.xml",
      host: "https://www.communityali.org",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["macros"],
          },
        },
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "video",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};
