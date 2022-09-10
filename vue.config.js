const { defineConfig } = require('@vue/cli-service');

module.exports = {
  chainWebpack: config => {
    config.optimization.delete('splitChunks') // no vendor chunks
    config.plugins.delete('prefetch')         // no prefetch chunks
    config.plugins.delete('preload')          // no preload chunks
  }
}
