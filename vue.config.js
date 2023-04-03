module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: require("./webpack.config").resolve,
    externals: {
      "better-sqlite3": "commonjs better-sqlite3",
    },
  },
  pluginOptions: {
    electronBuilder: {
      externals: ["better-sqlite3"],
      preload: "src/preload.js",
    },
  },
};
