# Edoxen documentation site

Source for [edoxen.github.io](https://edoxen.github.io).

Built with [VitePress](https://vitepress.dev). Deploys to GitHub Pages
via GitHub Actions on push to `main`.

## Local development

```sh
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Build

```sh
npm run build      # outputs to .vitepress/dist/
npm run preview    # preview the production build locally
```

## Structure

```
.vitepress/
  config.ts        VitePress config (nav, sidebar, theme)
  theme/           Custom CSS + theme overrides
docs/              Documentation pages (one .md per topic)
index.md           Home page (VitePress home layout)
about.md           About page
```

## Adding a doc page

1. Create `docs/my-topic.md` with Markdown content.
2. Add a sidebar entry in `.vitepress/config.ts` under `themeConfig.sidebar['/docs/']`.

## Deploy

Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which:

1. Installs Node deps.
2. Builds the site with `npm run build`.
3. Uploads the `dist/` directory to GitHub Pages.

The site is served at `https://edoxen.github.io/`.
