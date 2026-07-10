# 02 — Tailwind 4 via @tailwindcss/vite

## Goal
Install Tailwind CSS v4 with the official Vite plugin. No
tailwind.config.js needed (v4 uses CSS-based config via @theme).

## Steps
1. `npm install tailwindcss @tailwindcss/vite`
2. Add `@tailwindcss/vite` to `vite.plugins` in astro.config.mjs
3. Add `@import "tailwindcss"` to src/styles/global.css
4. Add `@theme { ... }` block with brand tokens (cyan, fonts, etc.)
5. Build and verify Tailwind utilities work alongside existing CSS
