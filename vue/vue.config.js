const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // 真实的后端服务器地址
        target: `http://localhost:3000`,
        // 控制请求头中的host
        changeOrigin: true,
        // 将代理前缀名称替换为后端的真实前缀名称
        pathRewrite: {
          '^/api': ``
        }
      },
    }
  },
})
