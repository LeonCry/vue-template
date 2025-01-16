import type { ConfigEnv, UserConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import Vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: `/${env.VITE_APP_ROUTER_PREFIX}`,
    resolve: { alias: { '@': `${path.resolve(__dirname, 'src')}` } },
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
      {
        name: 'branch-info',
        closeBundle() {
          const branchFileName = `${env.VITE_ENV_SIGN_ZH}-${env.VITE_APP_TITLE_ZH}.sign`;
          const outputPath = path.join(env.VITE_APP_OUTPUT, branchFileName);
          fs.writeFileSync(outputPath, `Branch: ${env.VITE_ENV_SIGN_ZH}\nProject Name: ${env.VITE_APP_TITLE_ZH}\nBuild Time: ${new Date().toLocaleString()}`);
        },
      },
    ],
    css: { postcss: { plugins: [tailwindcss] } },
    build: {
      outDir: env.VITE_APP_OUTPUT,
      sourcemap: Boolean(env.VITE_APP_SOURCEMAP),
    },
    server: {
      host: 'localhost',
      port: 3333,
    },
  } as UserConfig;
});
