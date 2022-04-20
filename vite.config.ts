import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      web3: resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
      '@': resolve(__dirname, 'src') // 路径别名
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    host: '0.0.0.0'
  },
  optimizeDeps: {
    include: ['web3']
  }
})
