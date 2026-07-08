# CONTEXT — edoxen.github.io

Domain vocabulary for the Edoxen documentation site. Code in
`.vitepress/` should use these terms when naming modules and talking
about behaviour. Future architecture reviews anchor to this file.

## The model being documented

Edoxen is a generic information model for **formal proceedings** — the
published record of any deliberative body: meetings, agendas, minutes,
attendance rolls, votes, motions, and the decisions they adopt, in any
language and script per ISO 24229.

These terms come from the Edoxen information model itself — the site
documents them, it does not own them. Canonical definitions live in
[`edoxen/edoxen-model`](https://github.com/edoxen/edoxen-model).

### Top-level containers

The model has four top-level container roots, used depending on what
you want to capture:

- **MeetingCollection** — meeting-grain. Holds meetings with agendas,
  components, officers, deadlines, and the decisions each meeting
  adopted.
- **DecisionCollection** — decision-grain. Holds the decisions
  themselves with their admin fields and per-language renderings.
- **ContactCollection** (v3.0) — registry of Contacts indexed by scoped
  URN. Referenced from Meetings, Components, HostRefs via `ref:`.
- **VenueCollection** (v3.0) — registry of Venues indexed by scoped URN.

### Decision-grain entities

- **Decision** — a single formal outcome (the atomic unit). Has a
  `StructuredIdentifier` (one or more), `doi`, `urn`, `meeting`
  (a `MeetingIdentifier` back-reference), `dates`, and per-field
  localized content (`title`, `subject`, `message`, `considering`).
- **Action / Consideration / Approval** — leaf content nodes inside a
  Decision. Each carries its own per-field localized `message`.
- **DecisionMetadata** — collection-level header (title, dates, venue,
  source_urls).
- **SourceUrl** — a per-spelling PDF/HTML reference attached to
  DecisionMetadata. Uses ISO 24229 `spelling` codes.
- **StructuredIdentifier** — `{prefix, number}` composite. Replaces
  bare string identifiers across the model so queries can filter by
  body (CIML, OIML, ISO/TC 154, …).
- **EntityRef** — typed cross-reference between entities
  (`{urn, identifier, local_ref, kind, role, note}`). Used wherever
  inline data could be replaced by a URN reference.

### Meeting-grain entities

- **Meeting** — one sitting: when, where, who chaired, what was on the
  agenda, who was there, how they voted, what was said, what came out.
- **Agenda** — the forward-looking business order. Sliced into
  `AgendaItem`s (enum-typed: `numbered`, `header`, `opening`,
  `closing`).
- **MeetingComponent** — flat sub-event of a Meeting (replaces v0.x
  `ScheduleItem`). Kinds include both substantive (track, session,
  debate, breakout, keynote) and procedural (opening, closing, break,
  reception, registration). Carries its own `officers[]` (role-
  discriminated, mirrors Meeting.officers).
- **Minutes** — backward-looking narrative record. Sliced into
  `MinutesSection`s.
- **Attendance** — who was at the meeting (`present`, `absent`,
  `apologies`, `observer`, `excused`); supports proxy voting via
  `proxy_for`.
- **VoteRecord** — how each person voted on each Decision.
- **MeetingRelation** — `source → destination` link between meetings.
- **Deadline** — submission / response deadlines tied to a meeting.
- **MeetingSeries** — parent of recurring Meeting instances.

### Identity & contact (VCARD-style, v2.2+)

- **Contact** — VCARD-like abstract contact. Generalises Person for
  cases where the contact may be a person, an organisation, a
  department, or a role. Carries `urn` (registry identity) and `ref`
  (when used as a URN reference).
- **Person** — inherits from Contact. An individual human; no extra
  fields beyond Contact.
- **Name** — structured personal/organisational name (VCARD N + FN):
  `formatted`, `family`, `given`, `additional`, `prefix`, `suffix`.
- **ContactMethod** — polymorphic communication channel (phone,
  mobile, fax, email, url, mail, pager, message, other).
- **ContactIdentifier** — polymorphic external identifier (ORCID,
  ISNI, Wikidata QID, ROR, Ringgold, GitHub handle, other).
- **Officer** — role-binding (NOT an entity): binds a Contact to a
  Meeting or MeetingComponent with a structural role (chair,
  secretary, treasurer, etc.). Carries optional term.
- **HostRef** — typed reference to a hosting organization
  (`national_body`, `liaison`, `associate`, `organizer`).

### Venues

- **Venue** — polymorphic by `kind` discriminator (physical or
  virtual); all physical-specific and virtual-specific fields live on
  one class as optional siblings. Validators enforce that fields
  match `kind`. Carries `urn` and `ref` for registry pattern.

### Localization (per-field, ISO 24229)

> **Every translatable field is `Localized<String/Name>[0..*]` —
> one entry per ISO 24229 spelling/conversion system code.**

- **LocalizedString** — `{ spelling, value: String, extensions }`.
- **LocalizedName** — `{ spelling, value: Name, extensions }`.
- **`spelling`** is an ISO 24229 code: either a *spelling system*
  (`{lang}-{script}[-{country}][-{extension}]`, e.g. `zho-Hans`,
  `ind-Latn-pre1972`) or a *conversion system*
  (`{authority}:{source-spelling}:{target-spelling}:{identifying}`,
  e.g. `acadsin:zho-Hani:Latn:2002`).
- Always verbose — single-language data uses the same
  `[{ spelling, value }]` shape as multi-language data. No scalar
  shorthand.

### URN registry pattern

URN format: `urn:edoxen:{entity}:{scope}:{local-id}`.

- `entity`: `contact`, `venue`, `meeting`, `decision`, etc.
- `scope`: the dataset/registry name (e.g. `isotc154`, `oiml`).
- `local-id`: local identifier within that scope.

Any entity-typed field accepts either **inline data** (full object) or
**a URN reference** (`{ ref: urn:edoxen:contact:... }`). Both patterns
are valid; the discriminator is presence of `ref`.

## Site-level presentation terms

Terms the *site code* uses to describe its own content. These belong
to the docs site, not to the underlying model.

- **Pipeline** — the Parse → Decode → Validate flow that turns a YAML
  file into a typed object tree. Drawn in `HomePage`, `architecture.md`,
  and `localization-sync.md`. The `<PipelineDiagram>` Vue component is
  the canonical rendering.
- **Specimen** — a real YAML example shown on the home page inside the
  `<YamlSpecimen>` card.
- **Anatomy** — the three-card strip on the home page.
- **Feature grid** — the "why Edoxen" cards on the home page.
- **CTA band** — the gradient-backed call-to-action section at the
  bottom of the home page.
- **Byline** — the author/date strip shown at the top of each blog
  post (`<BlogByline>`).

## Brand vocabulary

- **Brand cyan** — the primary brand color (`#0e7490` in light mode,
  `#67e8f9` in dark mode). All derived alpha variants live in
  `custom.css` and reference this token, never raw `rgba()` literals.
- **Stoichedon** — the logo mark style; 3×2 grid of Greek capitals
  ΕΔΟΞΕΝ. See `public/edoxen-logo.svg`.

## Module-level seams

These are the load-bearing interfaces in the site's own code. Each
appears in exactly one place; the rest of the code consumes it.

- **`usePostFormat`** (composable) — pure functions for turning a
  blog-post frontmatter into display strings (`formatDate`,
  `formatAuthors`, `formatLastUpdated`). Shared by `BlogIndex` and
  `BlogByline`.
- **`tokenize` / `render`** (in `lib/yaml-tokenizer.ts`) — YAML →
  highlighted HTML. Used by `YamlSpecimen`.
- **`PipelineDiagram`** (Vue component) — the canonical Parse → Decode
  → Validate diagram. Accepts a `caption` prop.

## Brand assets

The repo carries designer-master brand assets in `public/`:

- `edoxen-logo.svg` — designer master of the stoichedon mark (96×96).
- `edoxen-logo-dark.svg` — light-tinted variant for dark mode.
- `edoxen-logo.png`, `edoxen-logo.pdf` — designer masters at raster
  and print formats.

These are **source files**. The navbar renders the mark via `<img>`
plus a sibling HTML text node in Fraunces display serif.
