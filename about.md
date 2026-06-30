# About Edoxen

**Edoxen** is a set of information models used for representing
resolution and decision information. It gives every formal
resolution — from ISO technical committees to Athenian inscriptions
— the same shape, the same vocabulary, and the same multilingual
plumbing, so a single YAML file can travel untouched from one
standards body to another.

## The Name & Logo

### The Name

The name comes straight out of the Athenian decree-stele tradition.
Every surviving resolution of the Athenian *dēmos* opens with the
same stock phrase — **ἔδοξεν** (*edoxen*), the aorist of the verb
**ἐδόκεω** (*edokeō*), "it seemed good to":

> *"It was the opinion of the People and the Council that…"*

That single formula is the parent of every modern phrase that
begins "il a été décidé", "es wurde beschlossen", "it was resolved",
"se ha decidido". Edoxen the project is named after the formula,
because that formula is the *least common ancestor* of every
resolution we model.

The full phrase appears on **IG II² 1368** (Athens, 336/5 BC, the
honorific decree for Demosthenes), on **IG I³ 71** (the Athenian
Tribute Lists), and on the hundreds of other fragments catalogued
under the corpus inscriptionum Atticarum. Every one of those
inscriptions begins with *ἔδοξεν τῇ βουλῇ καὶ τῷ δήμῳ* — and
every one of those inscriptions is the same act: a body of people
recorded a decision they had agreed upon.

We picked the name because the model is the same act: a body of
standards committees sharing a *substrate*, recorded in a
machine-tractable way.

### The Logo

The mark is a **stoichedon** (στοιχηδόν, "in rows") — the formal
inscription style in which every Greek letter sits in its own
square cell. The cells contain the six letters **Ε Δ Ο / Ξ Ε Ν**,
spelling out the project name *Edoxen* in Greek capitals:

<div class="logo-showcase">
  <div class="logo-card light-card">
    <div class="logo-card-header">Light mode</div>
    <img src="/edoxen-logo-full.svg" alt="Edoxen wordmark (light)" class="logo-display logo-display-wide" />
  </div>
  <div class="logo-card dark-card">
    <div class="logo-card-header">Dark mode</div>
    <img src="/edoxen-logo-full-dark.svg" alt="Edoxen wordmark (dark)" class="logo-display logo-display-wide" />
  </div>
</div>

Three design choices come straight out of the etymology:

- **The 3×2 grid.** Stoichedon is the inscription technique used
  on every surviving Athenian decree-stele. Each letter in its own
  cell — a row-and-column structure — also happens to be the
  cleanest visual metaphor for *structured data*: a parent field,
  a column of languages, and sibling entries inside a
  `localizations[]` array.
- **The serif.** The wordmark uses a transitional serif
  (Iowan Old Style → Palatino → Georgia fallback). Slab and
  transitional serifs are the family of letterforms that come
  closest to the chiselled capitals of an inscription; the
  gradient is the Edoxen cyan-teal brand, applied only to the
  wordmark so the stoichedon mark stays a neutral glyph the
  palette can adapt.
- **The mark spells the name.** The letters in the cells are not
  decoration — they are the name, in the alphabet of the body
  whose resolutions we are trying to model. *E*dox*en* =
  **ΕΔΟΞΕΝ**.

<style scoped>
.logo-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.logo-card {
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
}

.logo-card-header {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
}

.light-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.dark-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

.dark-card .logo-card-header {
  color: #94a3b8;
}

.logo-display {
  max-width: 220px;
  height: auto;
}

.logo-display-wide {
  max-width: 240px;
}

@media (max-width: 640px) {
  .logo-showcase {
    grid-template-columns: 1fr;
  }
}
</style>

### Mark only

The stoichedon mark is also published as a square glyph
for use in social cards, OG embeds, and favicons:

<div class="mark-row">
  <img src="/edoxen-mark.svg" alt="Edoxen mark" class="mark-display" />
</div>

<style scoped>
.mark-row {
  padding: 2rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  margin: 1.5rem 0;
  text-align: center;
}
.mark-display {
  width: 96px;
  height: 96px;
  display: inline-block;
}
</style>

### The Colors

The Edoxen palette is built around **Attic sky-blue and sea-blue** —
the colour of the Aegean horizon over the Piraeus, and the colour
of the cyanotypes used by 19th-century epigraphers to publish the
*Inscriptiones Graecae*.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--vp-c-brand-1` | `#0e7490` (cyan-700) | `#67e8f9` (cyan-300) | Hero name, links, accents |
| `--vp-c-brand-2` | `#035a8f` (sky-700) | `#38bdf8` (sky-400) | Gradient end, hover |
| `--vp-c-brand-3` | `#013a5e` (sky-900) | `#0ea5e9` (sky-500) | Active/pressed |
| `--vp-c-brand-soft` | `rgba(14,116,144,.14)` | `rgba(103,232,249,.14)` | Card backgrounds |

The contrast stays WCAG AA against either background — the only
case where a project brand ever sees an inversion is the navbar
logo, which is shipped in two files (`edoxen-logo-full.svg` and
`edoxen-logo-full-dark.svg`) so the mark on light and the mark on
dark are each tuned for their backdrop.

## Origin Story

Modern standards organizations publish thousands of resolutions
every year. ISO, IEC, ITU, BIPM, OIML, ILO — each has its own
document convention, its own publication workflow, its own data
model. Even within one organization the format drifts over the
years: a 1980 resolution carries a different heading than a
2020 resolution, and PDFs are the only canonical artefact,
which is to say *there is no canonical artefact*.

Edoxen starts from one observation: every one of those
resolutions has the same shape — *who, when, considering what,
deciding what, approved by whom*. The shape is universal; the
*layout* is per-body. So the project is the layer that captures
the shape once, in a YAML format humans can edit and a Ruby
parser can round-trip, and leaves the layout to each body.

The first reference corpus was the **OIML Resolutions archive** —
1,640 resolutions across 28 CIML and Conference meetings, half in
English and half in French. ISO/TC 154 and ISO/TC 184/SC 4 came
later. Three independent bodies, three independent publication
conventions, one common model.

## Mission Statement

Edoxen's mission is to give every formal resolution — past,
present, and future — a **single canonical representation** that
is human-readable, machine-roundtrippable, multilingual by
default, and free at the point of use.

Concretely:

- **One model, one YAML, one schema**, validated by `edoxen validate`.
- **One library** to parse and serialize — built on
  [lutaml-model](https://github.com/lutaml/lutaml-model), so
  round-trip parity is a property of the framework, not of
  hand-rolled code.
- **One locale-neutral parent** for every per-language
  rendering, so EN↔FR translation drift becomes visible on
  `git diff` rather than invisible across files.

## The Ecosystem

| Project | Description | Category |
|---|---|---|
| [`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model) | LutaML/UML information-model definition (class diagrams, attribute types) | Core |
| [`metanorma/edoxen`](https://github.com/metanorma/edoxen) | Ruby gem, JSON Schema, CLI (`edoxen validate`, `edoxen normalize`) | Core |
| [`metanorma/edoxen.github.io`](https://github.com/metanorma/edoxen.github.io) | This site — user-facing documentation | Core |
| [`oimlsmart/resolutions-data`](https://github.com/oimlsmart/resolutions-data) | Reference corpus: 1,640 OIML resolutions × EN+FR | Reference data |
| [`isotc154/resolutions-data`](https://github.com/isotc154/resolutions-data) | Reference corpus: ISO/TC 154 resolutions | Reference data |
| [`isotc184sc4/resolutions`](https://github.com/isotc184sc4/resolutions) | Reference corpus: ISO/TC 184/SC 4 resolutions | Reference data |
| [lutaml-model](https://github.com/lutaml/lutaml-model) | Underlying serialization framework | Upstream |

Round-trip serialization (YAML → Ruby → YAML) flows through
`lutaml-model`. There is **no hand-rolled `to_yaml` / `from_yaml`
anywhere** in Edoxen; wire-format drift would be a framework bug
and lives upstream.

## Use Cases

<div class="use-cases-grid">
  <div class="use-case-card">
    <h4>📋 Standards-body archival</h4>
    <p>Convert decades of PDF resolutions into a single searchable, version-controllable YAML corpus.</p>
  </div>
  <div class="use-case-card">
    <h4>🌐 Multilingual by default</h4>
    <p>EN + FR (or any ISO 639-3 pair) live in the same file. Translators see both blocks side by side; drift shows up on `git diff`.</p>
  </div>
  <div class="use-case-card">
    <h4>✅ Schema-validated pipelines</h4>
    <p>Run <code>edoxen validate</code> on every commit. Wire format is locked; typos surface as <code>data_pointer</code> errors, not silent ignores.</p>
  </div>
  <div class="use-case-card">
    <h4>🔁 Cross-body interop</h4>
    <p>Same `Resolution` shape across ISO, IEC, ITU, BIPM, OIML, ILO. Per-body quirks captured in enum extensions, not in per-body schemas.</p>
  </div>
  <div class="use-case-card">
    <h4>📚 Linked-data archival</h4>
    <p>Assign DOIs and URNs to every resolution at creation time, so the canonical record is citable from day one.</p>
  </div>
  <div class="use-case-card">
    <h4>🧩 Custom extensions</h4>
    <p>Fork the schema to add a new action-verb, date kind, or metadata field — no upstream PR required.</p>
  </div>
</div>

<style scoped>
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.use-case-card {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
.use-case-card h4 {
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}
.use-case-card p {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>

## Standards Support

Edoxen is the common substrate across the resolution
conventions of:

| Body | Resolutions | Locale |
|---|---|---|
| **ISO, ISO/TMB** | Council, TMB, TCs | EN+FR |
| **IEC** | Council, SMB, TCs | EN+FR |
| **ITU-T, ITU-D, WTSA** | Plenary, study groups | EN+FR+ES+RU+AR+ZH |
| **BIPM / CGPM** | Conférence générale, CIPM | EN+FR |
| **OIML** | CIML, Conferences | EN+FR |
| **ILO** | Conference, Governing Body | EN+FR+ES |

A `Resolution` model that satisfies one body satisfies them all,
because per-body quirks (numbering prefixes, agenda-item
references, date kinds, action-verb vocabularies) are expressible
inside Edoxen's enums and extension points rather than baked into
the schema.

The wire format itself draws on four ISO standards:

- **ISO 639-3** — three-letter language codes (`eng`, `fra`, `deu`).
- **ISO 15924** — four-letter script codes (`Latn`, `Cyrl`, `Hant`).
- **ISO 3166-1 alpha-2** — country codes (`FR`, `DE`, `JP`).
- **ISO 8601** — date syntax (`2025-10-14`, `2025-10-14/15`).

## Open Source

Edoxen is an open source project of [Ribose](https://www.ribose.com),
released under the [2-Clause BSD License](https://opensource.org/licenses/BSD-2-Clause).

- **GitHub organization** — [github.com/metanorma](https://github.com/metanorma)
- **Gem** — [`metanorma/edoxen`](https://github.com/metanorma/edoxen)
- **Models** — [`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model)
- **Site** — [`metanorma/edoxen.github.io`](https://github.com/metanorma/edoxen.github.io)
- **License** — 2-Clause BSD
- **Issues** — on each individual repo

We welcome contributions: schema extensions, new reference
corpora, CLI improvements, and localization help for non-EN/FR
languages are all good first-PR territory. Open an issue on the
relevant repo to discuss the change before sending the PR.

## Get Started

Ready to model resolutions? Three commands:

```sh
gem install edoxen
edoxen validate resolutions/*.yaml
edoxen normalize resolutions/*.yaml --output normalized/
```

Then read the docs in this order:

1. **[Introduction](/docs/introduction)** — what Edoxen is, what
   problem it solves, a working YAML.
2. **[Schema](/docs/schema)** — the JSON Schema, including every
   invariant and extension point.
3. **[Multilingual support](/docs/multilingual)** — the
   `localizations[]` rationale.
4. **[Localization sync flow](/docs/localization-sync)** — the
   deep-dive on EN+FR alignment inside a single file.
5. **[CLI](/docs/cli)** — `validate` and `normalize`, batch and
   per-file.
6. **[Parsing YAML](/docs/parse-yaml)** /
   **[Creating resolutions](/docs/create-resolutions)** — the
   Ruby API, with a small round-trip example.

Or step outside the docs and read the **[LutaML model
files](https://github.com/metanorma/edoxen-model)** — that's the
formal definition of every class, every attribute, every enum
value, in the LutaML/UML notation. The YAML schema and the Ruby
classes are both generated from those models. The docs are the
introduction; the models are the ground truth.

---

*Open source project of [Ribose](https://www.ribose.com) ·
maintained alongside [lutaml](https://lutaml.org).*
