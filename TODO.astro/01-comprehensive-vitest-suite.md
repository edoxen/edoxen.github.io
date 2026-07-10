# 01 — Comprehensive Vitest Suite

## Goal
Add build-integrity, content, and regression tests beyond the existing
67 pure-function tests. Tests verify the `astro build` output.

## Specs to add
- `__tests__/build/pages.spec.ts` — all expected pages exist in dist/
- `__tests__/build/home.spec.ts` — home page has all 12 sections
- `__tests__/build/docs.spec.ts` — docs pages have sidebar + nav + content
- `__tests__/build/blog.spec.ts` — blog index + post pages render
- `__tests__/build/assets.spec.ts` — favicons, logos, schemas, CSS exist
- `__tests__/build/sitemap.spec.ts` — sitemap-index.xml exists with URLs
