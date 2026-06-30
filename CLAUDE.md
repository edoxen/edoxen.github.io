# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Source for **edoxen.github.io**, the public documentation site for the
[Edoxen](https://github.com/metanorma/edoxen) information model. Built with
[VitePress](https://vitepress.dev), deployed to GitHub Pages.

This repo does **not** contain the gem, the LutaML models, or any
resolution data. It only documents them. The neighbouring repos are:

| Repo | Purpose |
|---|---|
| `metanorma/edoxen` | Ruby gem, JSON Schema, CLI |
| `metanorma/edoxen-model` | LutaML/UML information-model definition |
| `oimlsmart/resolutions-data` | Reference YAML corpus (CIML/OIML) |
| `isotc154/resolutions-data` | Reference YAML corpus (ISO/TC 154) |
| `isotc184sc4/resolutions` | Reference YAML corpus (ISO/TC 184/SC 4) |

## Commands

```sh
npm install          # one-time
npm run dev          # local dev server at http://localhost:5173
npm run build        # production build to .vitepress/dist/
npm run preview      # serve the production build locally
```

There are no tests, linters, or formatters configured for this site. CI
runs `npm ci && npm run build` on every push to `main` (see
`.github/workflows/deploy.yml`).

## Repository layout

```
.vitepress/
  config.ts                VitePress config: nav, sidebar, theme options
  posts.data.ts            Blog content loader (add new file → auto-loaded)
  theme/
    index.ts               Vue component registration (BlogIndex, BlogByline)
    custom.css             Brand colour overrides (cyan/teal gradient)
public/                    Static assets served at /
  edoxen-logo.svg          Logo used in the navbar
  edoxen-logo-dark.svg     Dark-mode variant of the navbar logo
docs/                      One .md per topic. Filenames drive the sidebar slug.
blog/                      Posts (one .md each). Loaded by posts.data.ts.
  index.md                 Blog landing page — renders <BlogIndex />
index.md                   VitePress "home" layout (hero + features)
about.md                   About page (etymology, logo breakdown)
```

## How the blog works

The blog is a hand-rolled pattern shared with `lutaml.github.io` — **no
extra plugin** is required. It is built from three pieces:

1. **`blog/*.md`** — each post has frontmatter:
   ```yaml
   ---
   title: Edoxen 1.0.0 released
   description: One-line teaser shown on the index card.
   authors: [Ribose]
   date: 2026-06-30
   ---
   ```
   Posts are sorted newest-first automatically (see
   `.vitepress/posts.data.ts`).

2. **`.vitepress/posts.data.ts`** — uses `vitepress`'s built-in
   `createContentLoader("blog/*.md")` to produce a typed array the
   `<BlogIndex />` component consumes.

3. **`.vitepress/theme/components/BlogIndex.vue`** + **`BlogByline.vue`** —
   Vue 3 components registered globally in `theme/index.ts`.
   `BlogIndex.vue` is a list of cards; `BlogByline.vue` is the
   author/date strip shown at the top of each post.

To add a post: drop a Markdown file in `blog/`. That's it. The sidebar
and `posts.data.ts` pick it up on the next build.

To add `<BlogByline />` inside a post, place the tag right under the
H1 (see any existing post for the pattern).

## Content conventions

- **Language codes** — ISO 639-3, three lowercase letters
  (`eng`, `fra`, `deu`). See `docs/multilingual.md`.
- **Script codes** — ISO 15924, four letters with title-case initial
  (`Latn`, `Cyrl`, `Hant`). See `docs/localization.md`.
- **Country codes** — ISO 3166-1 alpha-2 (`FR`, `DE`, `JP`).
- **City codes** — IATA three-letter (`PAR`, `BER`, `TYO`).
- **Doc IDs** — when a doc names a specific object, link to the gem:
  `https://github.com/metanorma/edoxen`. When it points at the model,
  use `https://github.com/metanorma/edoxen-model`.
- **Sidebar order** — controlled in `.vitepress/config.ts` under
  `themeConfig.sidebar['/docs/']`. Add a new entry whenever you add a
  new file under `docs/`.

## Brand assets

- Primary brand colour: `#0e7490` (cyan-700). Defined as
  `--vp-c-brand-1` in `.vitepress/theme/custom.css`.
- Logo files live in `public/`. The navbar uses the SVG file referenced
  in `.vitepress/config.ts` under `themeConfig.logo` (set to an object
  with `light`/`dark` keys if both modes are needed).
- When redesigning the logo, follow the **name → motif** rule: the mark
  must visually derive from the project's etymology, not from generic
  design tropes. See `about.md` for the Edoxen-specific framing.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` and uploads
`.vitepress/dist` to GitHub Pages. There is **no staging branch** — every
commit on `main` is live within ~60 seconds.

## Common pitfalls

- **The `BlogIndex` import path** — `posts.data.ts` exposes a `data`
  export that `.vitepress/theme/components/BlogIndex.vue` imports as
  `posts`. If you change either filename, the import breaks silently and
  the blog landing page renders empty.

- **Sidebar slugs** — VitePress maps sidebar entries to URLs literally.
  The blog's `index.md` does *not* appear in `themeConfig.sidebar['/docs/']`
  (it lives under `/blog/`, not `/docs/`).

- **`posts.data.ts` filter** — the loader skips the page whose URL ends
  with `/blog/`, so the index page itself isn't double-rendered as a
  post. Don't remove that filter.

- **Logos and `currentColor`** — the navbar logo SVG uses
  `fill="currentColor"` so it inherits colour from
  `.VPNavBarTitle`. If you replace the SVG, preserve this — otherwise
  the logo will be invisible in dark mode.

- **No tests** — validation happens in the gem repo (`metanorma/edoxen`),
  not here. This site is content; the gem is behaviour.
