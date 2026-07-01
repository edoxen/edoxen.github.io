# CONTEXT — edoxen.github.io

Domain vocabulary for the Edoxen documentation site. Code in
`.vitepress/` should use these terms when naming modules and talking
about behaviour. Future architecture reviews anchor to this file.

## The model being documented

These terms come from the Edoxen information model itself — the site
documents them, it does not own them. Canonical definitions live in
[`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model).

- **Resolution** — a single formal decision (the atomic unit). Has an
  `identifier`, `doi`, `urn`, and per-language content.
- **ResolutionSet** — a collection of `Resolution`s for one meeting.
  One YAML file per meeting.
- **Localization** — a monolingual rendering of a `Resolution`. Each
  `Resolution` has 1..* localizations (typically `eng` + `fra`).
- **Action / Consideration / Approval** — leaf content nodes inside a
  `Localization`.
- **SourceUrl** — a per-language PDF/HTML reference attached to
  `Metadata`.

## Site-level presentation terms

Terms the *site code* uses to describe its own content. These belong
to the docs site, not to the underlying model.

- **Pipeline** — the Parse → Decode → Validate flow that turns a YAML
  file into a typed object tree. Drawn in `HomePage`, `architecture.md`,
  and `localization-sync.md`. The `<PipelineDiagram>` Vue component is
  the canonical rendering.
- **Specimen** — a real YAML example shown on the home page inside the
  `<YamlSpecimen>` card. Not a synthetic snippet — it's a fragment of
  a real `ciml-39-decisions.yaml`.
- **Anatomy** — the three-card strip (`ResolutionSet` → `Resolution` →
  `Localization`) shown on the home page. Distinct from full
  architecture diagrams.
- **Feature grid** — the six "why Edoxen" cards on the home page.
- **CTA band** — the gradient-backed call-to-action section at the
  bottom of the home page.
- **Byline** — the author/date strip shown at the top of each blog
  post (`<BlogByline>`).

## Brand vocabulary

- **Brand cyan** — the primary brand color (`#0e7490` in light mode,
  `#67e8f9` in dark mode). All derived alpha variants
  (`--edoxen-cyan-glow-soft`, `--edoxen-cyan-shadow`, etc.) live in
  `custom.css` and reference this token, never raw `rgba()` literals.
- **Stoichedon** — the logo mark style; 3×2 grid of Greek capitals
  ΕΔΟΞΕΝ. See `public/edoxen-mark.svg`.

## Module-level seams

These are the load-bearing interfaces in the site's own code. Each
appears in exactly one place; the rest of the code consumes it.

- **`usePostFormat`** (composable) — pure functions for turning a
  blog-post frontmatter into display strings (`formatDate`,
  `formatAuthors`, `formatLastUpdated`). Shared by `BlogIndex` and
  `BlogByline`. Tests target this module directly, not the components.
- **`tokenize` / `render`** (in `lib/yaml-tokenizer.ts`) — YAML →
  highlighted HTML. Used by `YamlSpecimen`; available to any future
  page that wants to render YAML with the same highlighting.
- **`PipelineDiagram`** (Vue component) — the canonical Parse → Decode
  → Validate diagram. Accepts a `variant` prop for context-specific
  labels (`'home' | 'arch' | 'sync'`).
