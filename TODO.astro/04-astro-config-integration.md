# 04 — Final astro.config.mjs Integration

## Goal
Wire all integrations into one clean config:
- Astro 7 (existing)
- Vite 8 (bundled with Astro — no action needed)
- @tailwindcss/vite (Tailwind 4)
- @astrojs/vue (Vue islands)
- @astrojs/sitemap (existing)
- @astrojs/mdx (existing)

## Final config shape
```js
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://edoxen.org',
  vite: { plugins: [tailwindcss()] },
  integrations: [vue(), sitemap(), mdx()],
})
```
