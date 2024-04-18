import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
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
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: true,
        resolvers: [ElementPlusResolver()],
        dirs: ['./src/composables'],
        vueTemplate: true,
      }),
      Components({
        dts: true,
        dirs: ['src/components', 'src/pages', 'src/layouts'],
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus({}),
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
