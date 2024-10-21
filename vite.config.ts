import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       includePaths: ['node_modules/bootstrap/scss']
  //     }
  //   }
  // },
  plugins: [vue()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: 'ws',
        host,
        port: 1421
      }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**']
    }
  }
}))
