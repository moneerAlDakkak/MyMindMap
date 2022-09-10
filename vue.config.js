const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/MyMindMap/" : "/",
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "mairs/sass" as *;`,
      },
    },
  },
});
