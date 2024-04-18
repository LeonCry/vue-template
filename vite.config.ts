import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from 'tailwindcss';
export default defineConfig(({ mode }) => {
  //command = 'serve' | 'build'
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_APP_ROUTER_PREFIX,
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),
      Components({
        dts: true,
        dirs: ['src/components', 'src/pages'],
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    build: {
      outDir: env.VITE_APP_OUTPUT,
      sourcemap: Boolean(env.VITE_APP_SOURCEMAP),
    },
    server: {
      host: 'localhost',
      port: 6666,
      proxy: {
        '/api': {
          target: env.VITE_APP_PROXY_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      cors: true,
    },
  }
})
