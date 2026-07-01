# CONTEXT — edoxen.github.io

Domain vocabulary for the Edoxen documentation site. Code in
`.vitepress/` should use these terms when naming modules and talking
about behaviour. Future architecture reviews anchor to this file.

## The model being documented

These terms come from the Edoxen information model itself — the site
documents them, it does not own them. Canonical definitions live in
[`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model).

### Two parallel top-level containers

The model has two file roots, used depending on what you want to
capture:

- **MeetingCollection** — meeting-grain. Holds meetings with agendas,
  schedules, chairs, deadlines, and the resolutions each meeting
  adopted. Use when agenda items, schedules, and chair-person
  assignments are part of the story.
- **ResolutionCollection** — resolution-grain. Holds the resolutions
  themselves with their admin fields and per-language renderings.
  Use for a flat file of decisions without meeting-level detail.

Both containers share the same shape in miniature: `metadata` plus an
array of children, where each child carries admin fields once and
`localizations[]` for per-language content.

### Resolution-grain entities

- **Resolution** — a single formal decision (the atomic unit). Has a
  `StructuredIdentifier` (one or more), `doi`, `urn`, `meeting`
  (a `MeetingIdentifier` back-reference), `dates`, and per-language
  content.
- **Localization** — a monolingual rendering of a `Resolution`. Each
  `Resolution` has 1..* localizations (typically `eng` + `fra`).
- **Action / Consideration / Approval** — leaf content nodes inside a
  `Localization`.
- **ResolutionMetadata** — collection-level header (title, dates,
  venue, source_urls).
- **SourceUrl** — a per-language PDF/HTML reference attached to
  `ResolutionMetadata`.
- **StructuredIdentifier** — `{prefix, number}` composite. Replaces
  bare string identifiers across the model so queries can filter by
  body (CIML, OIML, ISO/TC 154, …).

### Meeting-grain entities

- **Meeting** — one sitting: when, where, who chaired, what was on
  the agenda, what came out.
- **MeetingLocalization** — per-language rendering of a `Meeting`
  (title, general area, practical info).
- **MeetingCollectionMetadata** — collection-level header (title,
  source).
- **MeetingRelation** — `source → destination` link between meetings
  (`precedes`, `supersedes`, `parallel_to`, `child_of`, …).
- **Agenda** — the ordered list of items the meeting worked through.
- **AgendaItem** — one entry; enum-typed (`numbered`, `header`,
  `opening`, `closing`), with `outcome` and optional `resolution_ref`.
- **AgendaItemOutcome** — `adopted`, `amended`, `deferred`,
  `deferred_to_subcommittee`, `noted`, `rejected`, `withdrawn`.
- **AgendaStatus** — `draft`, `final`, `amended`, `cancelled`,
  `superseded`.
- **ScheduleItem** — a time-of-day entry on a sitting day (date, time,
  event, room). Distinct from `AgendaItem`: agenda is *what*, schedule
  is *when*.
- **Deadline** — submission / response deadlines tied to a meeting.
- **HostRef / Person / Location** — supporting types for meeting
  host, chair, secretary, venue.
- **MeetingIdentifier** — a reference from a `Resolution` back to its
  originating `Meeting`.

### The multilingual rule

> **Anything translatable lives below a `Localization` or
> `MeetingLocalization`.** Anything administrative and
> language-agnostic lives above it. This separation is what makes the
> multilingual model work.

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
- **Anatomy** — the three-card strip on the home page. Currently
  MeetingCollection / Resolution / Localization — chosen so the cards
  cover both top-level containers and the multilingual leaf.
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
  ΕΔΟΞΕΝ. See `public/edoxen-logo.svg`.

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
  → Validate diagram. Accepts a `caption` prop for context-specific
  labels.

## Brand assets

The repo carries designer-master brand assets in `public/`:

- `edoxen-logo.svg` — designer master of the stoichedon mark (96×96).
  Used in the navbar (light mode).
- `edoxen-logo-dark.svg` — light-tinted variant for the navbar in
  dark mode (`#0c4a6e` → `#bae6fd` swap; same geometry).
- `edoxen-logo.png`, `edoxen-logo.pdf` — designer masters at raster
  and print formats.

These are **source files**. The navbar renders the mark via `<img>`
plus a sibling HTML text node (`<span>Edoxen</span>`) in Fraunces
display serif, so the wordmark inherits theme colours crisply at any
size.
