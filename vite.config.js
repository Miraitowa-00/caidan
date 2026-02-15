import { defineConfig } from 'vite'

export default defineConfig({
  base: '/caidan/',  // 确保相对路径以 /caidan/ 为基础
  build: {
    outDir: 'dist',  // 输出目录
    assetsDir: 'assets', // 静态资源目录
  }
})
