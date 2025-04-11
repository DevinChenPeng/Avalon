import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
	AutoImport ({
		imports: ["vue", "vue-router", "pinia"], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
		dts: './auto-imports.d.ts',
	}),
	Components({
		resolvers: [NaiveUiResolver()]
	  })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
