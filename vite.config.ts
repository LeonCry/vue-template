import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import tailwindcss from 'tailwindcss';
export default defineConfig(({ mode }) => {
  //command = 'serve' | 'build'
  const env = loadEnv(mode, process.cwd());
  return {
    base: `/${env.VITE_APP_ROUTER_PREFIX}`,
    resolve: {
      alias: {
        '@': `${path.resolve(__dirname, 'src')}`,
      },
    },
    plugins: [
      Vue(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: true,
        // resolvers: [],
      }),
      Components({
        dts: true,
        dirs: ['src/components', 'src/views', 'src/layouts'],
        // resolvers: [],
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
      port: 3333,
    },
  };
});
