import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: "https://jmv1006-url-short.herokuapp.com/",
        changeOrigin: true
      }
    }
  }
})
