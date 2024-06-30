import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  compilerOptions:{
    types:['element-plus/global']
  },
  server:{
    host: 'localhost',//ip地址
    port: 5173, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
  },
  base:'./',
  build:{
    rollupOptions:{
      output:{
        entryFileNames:'js/[name].[hash].js',
        chunkFileNames:'js/[name].[hash].js',
        assetFileNames:'[ext]/[name].[hash].[ext]'
      }
    }
  }
})
