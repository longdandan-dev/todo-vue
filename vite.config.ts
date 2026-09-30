import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/todo-vue',
  build: { outDir: 'docs' },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      // 编辑器"安全写入"会先生成 .xxx.tmpdir 临时目录，
      // 文件监听器抓到它就会 EBUSY 崩溃（本项目今天崩了 3 次），直接忽略掉
      ignored: ['**/*.tmpdir/**', '**/.*.tmpdir/**'],
    },
  },
})
