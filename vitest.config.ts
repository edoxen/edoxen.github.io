import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'src/lib/**',
        'src/composables/**',
        'src/data/**',
      ],
    },
  },
  resolve: {
    alias: {
      '~': new URL('./', import.meta.url).pathname,
    },
  },
})
