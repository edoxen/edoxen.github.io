# 03 — @astrojs/vue Integration

## Goal
Add Vue island support so interactive .vue components can be imported
in .astro pages with client:load, client:visible, etc.

## Steps
1. `npm install @astrojs/vue vue`
2. Add `vue()` to integrations in astro.config.mjs
3. Re-add @vue/test-utils + happy-dom for Vue component testing
4. Create a sample Vue island component to verify the integration
5. Build and verify
