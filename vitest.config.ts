import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['__tests__/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: [
        '.vitepress/theme/lib/**',
        '.vitepress/theme/composables/**',
        '.vitepress/theme/data/**',
      ],
    },
  },
  resolve: {
    alias: {
      '~': new URL('./', import.meta.url).pathname,
    },
  },
})
