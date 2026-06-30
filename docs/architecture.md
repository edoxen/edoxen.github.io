---
title: Architecture
---

# Architecture

Edoxen is a three-layer system: a **model** (LutaML/UML definition),
a **wire format** (YAML + JSON Schema), and a **runtime** (Ruby gem +
CLI). This page walks the model first, then the pipeline, then the
multilingual plumbing.

## Layer 1 — The information model

Every Edoxen file is an instance of one tree:

<div class="diagram">
<svg viewBox="0 0 1080 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Class hierarchy diagram">
<defs>
<marker id="arch-tree" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<!-- ResolutionSet (root) -->
<g transform="translate(380, 20)">
<rect width="320" height="90" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="34" font-family="var(--edoxen-font-display)" font-size="20" font-weight="500" fill="var(--vp-c-text-1)">ResolutionSet</text>
<text x="20" y="58" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">metadata    : Metadata</text>
<text x="20" y="76" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">resolutions : Resolution[1..*]</text>
</g>

<!-- Connectors from root -->
<path d="M540,110 L540,150 L200,150 L200,180" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,110 L540,150 L880,150 L880,180" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,110 L540,180" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>

<!-- Metadata (left) -->
<g transform="translate(40, 180)">
<rect width="320" height="110" rx="10" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Metadata</text>
<text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">title, dates, venue,</text>
<text x="20" y="72" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">city, country_code,</text>
<text x="20" y="88" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">source_urls[1..*]</text>
<text x="20" y="103" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">language-agnostic</text>
</g>

<!-- Resolution (center) -->
<g transform="translate(380, 180)">
<rect width="320" height="170" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="20" font-weight="500" fill="var(--vp-c-text-1)">Resolution</text>
<text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">identifier  : string</text>
<text x="20" y="72" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">doi, urn    : string</text>
<text x="20" y="88" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">dates       : ResolutionDate[]</text>
<text x="20" y="104" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">agenda_item : string</text>
<text x="20" y="128" font-family="var(--edoxen-font-mono)" font-size="11" font-weight="600" fill="var(--vp-c-brand-1)">localizations: Localization[1..*]</text>
<text x="20" y="156" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">admin fields declared once</text>
</g>

<!-- SourceUrl (right) -->
<g transform="translate(720, 180)">
<rect width="320" height="110" rx="10" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">SourceUrl</text>
<text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">ref           : string</text>
<text x="20" y="72" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">format        : pdf | html</text>
<text x="20" y="88" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">language_code : ISO 639-3</text>
<text x="20" y="103" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">one per source PDF</text>
</g>

<!-- Connector Resolution -> Localization -->
<path d="M540,350 L540,380" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>

<!-- Localization (center, second row) -->
<g transform="translate(380, 380)">
<rect width="320" height="80" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="18" font-weight="500" fill="var(--vp-c-text-1)">Localization</text>
<text x="20" y="54" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">language_code, script,</text>
<text x="20" y="70" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">title, subject, message</text>
</g>

<!-- Localization -> leaf nodes -->
<path d="M540,460 L540,478 L180,478 L180,490" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,460 L540,490" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,460 L540,478 L890,478 L890,490" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>

<!-- Leaf: Consideration -->
<g transform="translate(40, 490)">
<rect width="280" height="42" rx="8" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="26" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)">Consideration</text>
<text x="160" y="26" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">type, message</text>
</g>

<!-- Leaf: Action -->
<g transform="translate(400, 490)">
<rect width="280" height="42" rx="8" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="26" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)">Action</text>
<text x="100" y="26" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">type (enum), message</text>
</g>

<!-- Leaf: Approval -->
<g transform="translate(760, 490)">
<rect width="280" height="42" rx="8" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="26" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)">Approval</text>
<text x="120" y="26" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">type, degree, message</text>
</g>
</svg>
</div>

**Read the tree top-down:**

- **`ResolutionSet`** is the file root — one per meeting. It carries `Metadata` (the meeting's title, dates, venue) and a list of `Resolution` children.
- **`Resolution`** is one decision. Admin fields (`identifier`, `doi`, `urn`, `dates`, `agenda_item`) live here and are declared **once**, never per-language.
- **`Localization`** is one monolingual rendering. Each `Resolution` has 1..* of these — typically `eng` and `fra` for OIML, but the array is open-ended.
- **`Action`, `Consideration`, `Approval`** are the leaf content nodes. They live inside a `Localization`, never directly on the `Resolution`.

The hard rule: **anything translatable lives below a `Localization`**.
Anything administrative lives above it. That separation is what makes
the multilingual model work — and what makes EN↔FR drift visible on
`git diff`.

The full LutaML/UML definitions live in
[`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model).
The Ruby classes are generated from those definitions.

## Layer 2 — The round-trip pipeline

A YAML file flows through three framework stages. None of them is
hand-rolled:

<div class="diagram">
<svg viewBox="0 0 1080 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Round-trip pipeline">
<defs>
<marker id="arch-pipe" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<!-- Stage 1 -->
<g transform="translate(20, 50)">
<rect width="220" height="110" rx="12" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="34" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-3)" letter-spacing="1">01</text>
<text x="20" y="58" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Parse</text>
<text x="20" y="80" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">YAML.safe_load</text>
<text x="20" y="96" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">→ Ruby Hash</text>
</g>

<line x1="250" y1="105" x2="310" y2="105" stroke="var(--vp-c-brand-1)" stroke-width="2" marker-end="url(#arch-pipe)"/>

<!-- Stage 2 -->
<g transform="translate(320, 50)">
<rect width="260" height="110" rx="12" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="34" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-brand-1)" letter-spacing="1">02</text>
<text x="20" y="58" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Decode</text>
<text x="20" y="80" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">ResolutionSet.from_yaml</text>
<text x="20" y="96" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">→ typed object tree (lutaml-model)</text>
</g>

<line x1="590" y1="105" x2="650" y2="105" stroke="var(--vp-c-brand-1)" stroke-width="2" marker-end="url(#arch-pipe)"/>

<!-- Stage 3 -->
<g transform="translate(660, 50)">
<rect width="220" height="110" rx="12" fill="var(--vp-c-bg)" stroke="var(--vp-c-gold)" stroke-width="1.5"/>
<text x="20" y="34" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-gold)" letter-spacing="1">03</text>
<text x="20" y="58" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Validate</text>
<text x="20" y="80" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">JSONSchemer.schema(</text>
<text x="20" y="94" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">  schema/edoxen.yaml)</text>
</g>

<line x1="890" y1="105" x2="950" y2="105" stroke="var(--vp-c-text-3)" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arch-pipe)"/>

<!-- Stage 4: outcome -->
<g transform="translate(960, 50)">
<rect width="100" height="110" rx="12" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="50" y="38" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)" text-anchor="middle">Pass</text>
<text x="50" y="60" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-3)" text-anchor="middle">|</text>
<text x="50" y="82" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="#b91c1c" text-anchor="middle">Error[]</text>
<text x="50" y="100" font-family="var(--edoxen-font-body)" font-size="9" fill="var(--vp-c-text-3)" text-anchor="middle" font-style="italic">with pointer</text>
</g>

<!-- Caption -->
<text x="20" y="200" font-family="var(--edoxen-font-body)" font-size="12" fill="var(--vp-c-text-3)">
One CLI command: <tspan font-family="var(--edoxen-font-mono)" fill="var(--vp-c-brand-1)" font-weight="600">edoxen validate resolutions/*.yaml</tspan>. No bespoke parsers, no bespoke serializers.
</text>
</svg>
</div>

| Stage | What it catches |
|---|---|
| **1. Parse** | Malformed YAML — tabs-as-indent, duplicated keys, encoding issues. |
| **2. Decode** | Type errors — `language_code: 42` instead of a string, missing required attributes, unknown attribute names (lutaml-model raises `UnknownAttribute`). |
| **3. Validate** | Wire-format drift — regex mismatches (`^[a-z]{3}$` for language codes, `^[A-Z][a-z]{3}$` for scripts), enum violations on `Action.type`, `additionalProperties: false` catches typos at the object level. |

The reverse direction (object → YAML) goes through the same
`lutaml-model` framework. Round-trip parity is therefore a property
of the framework, not of bespoke `to_yaml` code.

## Layer 3 — Multilingual plumbing

EN and FR (or any ISO 639-3 pair) live as siblings inside the same
file, under a single `Resolution`:

<div class="diagram">
<svg viewBox="0 0 1080 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="EN+FR sync diagram">
<defs>
<marker id="arch-sync" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<!-- File frame -->
<rect x="20" y="20" width="1040" height="320" rx="14" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="40" y="48" font-family="var(--edoxen-font-mono)" font-size="12" fill="var(--vp-c-text-3)">resolutions/ciml-39-decisions.yaml</text>
<text x="40" y="64" font-family="var(--edoxen-font-body)" font-size="11" fill="var(--vp-c-text-3)" font-style="italic">one file · both languages · git diff sees both blocks together</text>

<!-- Parent Resolution -->
<g transform="translate(380, 90)">
<rect width="320" height="80" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Resolution · CIML/2004/1</text>
<text x="20" y="54" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">identifier, doi, urn, dates</text>
<text x="20" y="70" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">declared once · language-agnostic</text>
</g>

<!-- Branch lines -->
<path d="M460,170 L460,200 L200,200 L200,230" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-sync)"/>
<path d="M620,170 L620,200 L880,200 L880,230" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-sync)"/>

<!-- EN block -->
<g transform="translate(60, 230)">
<rect width="280" height="100" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
<rect x="0" y="0" width="280" height="26" rx="10" fill="var(--vp-c-brand-1)"/>
<rect x="0" y="16" width="280" height="10" fill="var(--vp-c-brand-1)"/>
<text x="20" y="18" font-family="var(--edoxen-font-display)" font-size="13" font-weight="600" fill="#fff">LOCALIZATION · eng / Latn</text>
<text x="20" y="50" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">title:    "Approval of the agenda"</text>
<text x="20" y="68" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">actions: [{ type: approves,</text>
<text x="20" y="82" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">            message: "Approves…" }]</text>
</g>

<!-- FR block -->
<g transform="translate(740, 230)">
<rect width="280" height="100" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-2)" stroke-width="1.5"/>
<rect x="0" y="0" width="280" height="26" rx="10" fill="var(--vp-c-brand-2)"/>
<rect x="0" y="16" width="280" height="10" fill="var(--vp-c-brand-2)"/>
<text x="20" y="18" font-family="var(--edoxen-font-display)" font-size="13" font-weight="600" fill="#fff">LOCALIZATION · fra / Latn</text>
<text x="20" y="50" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">title:    "Approbation de l'ordre"</text>
<text x="20" y="68" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">actions: [{ type: approves,</text>
<text x="20" y="82" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">            message: "Approuve…" }]</text>
</g>

<!-- Center "shared admin" callout -->
<g transform="translate(440, 250)">
<rect width="200" height="60" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1" stroke-dasharray="3 2"/>
<text x="100" y="24" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" text-anchor="middle" letter-spacing="0.1em" text-transform="uppercase">Shared admin</text>
<text x="100" y="44" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-2)" text-anchor="middle" font-style="italic">identifier · doi · urn · dates</text>
</g>
</svg>
</div>

Three properties fall out of this shape:

1. **One file per meeting, not per language.** A `git diff` always shows the EN line and the FR-line that changed together. Drift is visible in review, not invisible across files.
2. **The action verb is canonical.** `type: approves` lives once per `Action`, regardless of language. The French block reuses it; only the `message` differs.
3. **Adding a third language is one new entry.** No schema change, no new file convention, no migration. Drop a `language_code: deu` block next to the existing two.

For the deep-dive — including the translator workflow and the
validation pipeline that catches drift before it ships — see
[Localization sync](/docs/localization-sync).

## How the gem fits

The Ruby gem is the runtime that drives all three layers:

```
edoxen (gem)
├── lib/edoxen/
│   ├── models/         # lutaml-model classes (Resolution, Action, …)
│   ├── schema_validator.rb
│   └── cli/            # Thor commands: validate, normalize
├── schema/
│   └── edoxen.yaml     # JSON Schema (Draft 7) — the wire-format lock
└── exe/edoxen          # CLI entrypoint
```

- **`lib/edoxen/models/`** — Ruby classes generated from the LutaML
  definitions in `edoxen-model`. Each class declares its attributes
  and mappings; serialization is handled by `lutaml-model`.
- **`schema/edoxen.yaml`** — the JSON Schema. Distributed inside the
  gem so `edoxen validate` works offline.
- **`exe/edoxen`** — the CLI. Wraps `validate` and `normalize` as
  Thor commands; designed for CI pipelines.

The schema and the Ruby classes are both derived from the same
LutaML/UML source in
[`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model).
The docs you are reading are the introduction; the model files are
the ground truth.

## Where to next

- [Introduction](/docs/introduction) — a one-page tour of the model
  with a working YAML.
- [Schema](/docs/schema) — the JSON Schema reference, every invariant
  and extension point.
- [Localization sync](/docs/localization-sync) — the EN+FR deep-dive.
- [CLI](/docs/cli) — `validate` and `normalize` from the command line.
- [`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model) —
  the LutaML/UML source of truth.

<style scoped>
.diagram {
  margin: 1.75rem 0;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
}
.diagram svg {
  width: 100%;
  height: auto;
  display: block;
  color: var(--vp-c-text-2);
}
</style>
