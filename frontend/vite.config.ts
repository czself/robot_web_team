import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: {
      // 开发期把 /api/* 转给本地后端，避免浏览器直连 8080 触发跨域预检。
      // 前端请求 /api/sign/submit → http://127.0.0.1:8080/sign/submit
      // 用 127.0.0.1 而非 localhost：Node 侧可能把 localhost 解析成 ::1，
      // 而后端只绑 IPv4 时会直接 ECONNREFUSED。
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
