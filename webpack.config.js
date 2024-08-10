import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

/**
 * @type {import("webpack/types").Configuration}
 */
const baseConfig = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": resolve(dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
  output: {
    path: resolve(dirname(fileURLToPath(import.meta.url)), "dist"),
    filename: "index.js",
  },
};

/**
 * @type {import("webpack/types").Configuration}
 */
const devConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};

/**
 * @type {import("webpack/types").Configuration}
 */
const prodConfig = {
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./tsconfig.prod.json",
          to: "./tsconfig.json",
        },
      ],
    }),
  ],
};

export default (env, args) => {
  if (args.mode === "production") {
    return { ...baseConfig, ...prodConfig };
  }
  return { ...baseConfig, ...devConfig };
};
