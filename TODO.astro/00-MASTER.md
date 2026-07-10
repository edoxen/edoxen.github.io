# Astro Migration — Master Plan

## Context

Migrate the Edoxen documentation site from VitePress to Astro.
Vite is the build tool in both stacks — only the framework layer
changes.

## Current state

- VitePress 1.6.4 on Vite
- 9 Vue components (all static — no client-side reactivity needed)
- 40+ Markdown docs pages
- 2 blog posts
- 133 Vitest tests (11 spec files)
- Custom CSS with Fraunces/IBM Plex/JetBrains Mono typography
- VitePress sidebar/nav config in .vitepress/config.ts
- Blog content loader via createContentLoader

## Target state

- Astro 5 on Vite
- .astro components (zero JS shipped — islands architecture)
- Same Markdown content via Astro Content Collections
- Same Vitest tests (pure-function specs unchanged; component specs adapted)
- Same CSS (moved to src/styles/global.css)
- Custom sidebar/nav (Astro has no built-in sidebar)
- Blog via Content Collections API (replaces createContentLoader)

## What stays unchanged

- All Markdown content (docs/, blog/)
- public/ assets
- lib/yaml-tokenizer.ts, composables/usePostFormat.ts, data/home.ts
- CLAUDE.md, CONTEXT.md, README.md
- vitest.config.ts (with updated alias)
- Favicon pack, CNAME, schemas/

## What gets created

- astro.config.mjs
- src/layouts/ (BaseLayout, DocsLayout)
- src/components/ (9 .astro components + Nav + Sidebar + Footer)
- src/content/config.ts (collection schemas)
- src/pages/ (index, about, docs/[...slug], blog/index, blog/[...slug])
- src/styles/global.css
- src/data/site.ts (nav + sidebar config extracted from VitePress)
- TODO.astro/00-MASTER.md + per-phase TODO files

## What gets removed

- .vitepress/ directory
- vitepress dependency
- @vitejs/plugin-vue (if no Vue islands needed)

## Phase sequencing

**Phase 1** — TODO 01: Astro scaffolding + config
**Phase 2** — TODO 02: Layouts (BaseLayout + DocsLayout with sidebar)
**Phase 3** — TODO 03: Site config extraction (nav + sidebar → src/data/site.ts)
**Phase 4** — TODO 04: Components (convert 9 Vue → .astro)
**Phase 5** — TODO 05: Content collections + routing
**Phase 6** — TODO 06: Pages (index, about, blog)
**Phase 7** — TODO 07: Styles (move custom.css → src/styles/global.css)
**Phase 8** — TODO 08: Test adaptation
**Phase 9** — TODO 09: CI + build + deploy
**Phase 10** — TODO 10: Cleanup (remove VitePress)

## Execution discipline

- Commit after each phase
- Build + test after each phase
- Push at the end
- One PR, squash-merged
