---
title: Architecture
---

# Architecture

Edoxen is an information model for **formal proceedings** — the
umbrella term standards bodies use for the published record of a
meeting (agenda, minutes, attendance rolls, votes, and the
resolutions adopted). The model has **two parallel top-level
containers** — one for meetings, one for resolutions — both sharing
the same multilingual plumbing. This page walks the model first,
then the pipeline, then the multilingual plumbing.

## Which file root?

Your first decision: which grain do you need?

<div class="root-choice">
  <a class="root-card" href="/docs/meeting-collection">
    <div class="root-tag">file root · meeting-grain</div>
    <h3>MeetingCollection</h3>
    <p class="root-lede">
      Use when you need <strong>meeting-level detail</strong> —
      agendas, minutes, attendance, votes, schedule, chairs, deadlines.
    </p>
    <ul>
      <li>One <code>Meeting</code> per sitting</li>
      <li>Nested <code>Agenda</code>, <code>Minutes</code>, <code>Attendance</code>, <code>VoteRecord</code></li>
      <li><code>resolution_refs[]</code> link out to the resolutions adopted</li>
    </ul>
  </a>
  <a class="root-card" href="/docs/resolution-set">
    <div class="root-tag">file root · resolution-grain</div>
    <h3>ResolutionCollection</h3>
    <p class="root-lede">
      Use when you have a <strong>flat batch of decisions</strong> and
      the meeting-level metadata is out of scope or published
      elsewhere.
    </p>
    <ul>
      <li>One <code>Resolution</code> per decision</li>
      <li>Nested <code>Localization[]</code> (per-language)</li>
      <li><code>meeting: MeetingIdentifier</code> back-references the originating meeting</li>
    </ul>
  </a>
</div>

<style scoped>
.root-choice {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;
  margin: 1.75rem 0;
}
.root-card {
  display: block;
  padding: 1.5rem 1.5rem 1.25rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}
.root-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--vp-c-brand-1);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.25s ease;
}
.root-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -10px var(--edoxen-cyan-glow-card);
}
.root-card:hover::before { transform: scaleY(1); }
.root-tag {
  display: inline-block;
  font-family: var(--edoxen-font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}
.root-card h3 {
  font-family: var(--edoxen-font-display);
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-1);
}
.root-lede {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0 0 0.85rem;
}
.root-card ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
.root-card ul code {
  font-family: var(--edoxen-font-mono);
  font-size: 0.85em;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1em 0.35em;
  border-radius: 3px;
}
</style>

The two views capture the same events from opposite directions: a
`Meeting` points to its Resolutions via `resolution_refs[]`; a
`Resolution` points back to its Meeting via `meeting:
MeetingIdentifier`. You can use one, the other, or both — they're
not mutually exclusive.

## Layer 1 — The information model

Both collections share the same shape in miniature: an outer container
with `metadata` plus an array of children, where each child carries
admin fields once and `localizations[]` for per-language content. The
full model has more — `Meeting` has agendas, schedules, relations;
`Resolution` has considerations, actions, approvals — but the
**shape** is the same in both.

### Resolution tree

This is the resolution-grain view — one file, many resolutions, each
in one or more languages:

<div class="diagram">
<svg viewBox="0 0 1080 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ResolutionCollection tree">
<defs>
<marker id="arch-tree" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<!-- ResolutionCollection (root) -->
<g transform="translate(380, 20)">
<rect width="320" height="100" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="34" font-family="var(--edoxen-font-display)" font-size="20" font-weight="500" fill="var(--vp-c-text-1)">ResolutionCollection</text>
<text x="20" y="58" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">metadata     : ResolutionMetadata</text>
<text x="20" y="76" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">resolutions  : Resolution[1..*]</text>
</g>

<path d="M540,120 L540,150 L200,150 L200,180" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,120 L540,150 L880,150 L880,180" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,120 L540,180" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>

<!-- ResolutionMetadata (left) -->
<g transform="translate(40, 180)">
<rect width="320" height="120" rx="10" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">ResolutionMetadata</text>
<text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">title, dates, venue,</text>
<text x="20" y="72" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">city, country_code,</text>
<text x="20" y="88" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">source_urls[1..*]</text>
<text x="20" y="106" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">language-agnostic</text>
</g>

<!-- Resolution (center) -->
<g transform="translate(380, 180)">
<rect width="320" height="200" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="20" font-weight="500" fill="var(--vp-c-text-1)">Resolution</text>
<text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">identifier   : StructuredIdentifier[1..*]</text>
<text x="20" y="72" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">type, doi, urn</text>
<text x="20" y="88" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">dates        : ResolutionDate[]</text>
<text x="20" y="104" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">meeting     : MeetingIdentifier</text>
<text x="20" y="120" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">categories  : String[0..*]</text>
<text x="20" y="148" font-family="var(--edoxen-font-mono)" font-size="11" font-weight="600" fill="var(--vp-c-brand-1)">localizations: Localization[1..*]</text>
<text x="20" y="180" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">admin fields declared once</text>
</g>

<!-- SourceUrl (right) -->
<g transform="translate(720, 180)">
<rect width="320" height="120" rx="10" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">SourceUrl</text>
<text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">ref           : string</text>
<text x="20" y="72" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">format        : pdf | html</text>
<text x="20" y="88" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">language_code : ISO 639-3</text>
<text x="20" y="106" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">one per source PDF</text>
</g>

<path d="M540,380 L540,410" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>

<!-- Localization (center, second row) -->
<g transform="translate(380, 410)">
<rect width="320" height="80" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="18" font-weight="500" fill="var(--vp-c-text-1)">Localization</text>
<text x="20" y="54" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">language_code, script,</text>
<text x="20" y="70" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">title, subject, message</text>
</g>

<path d="M540,490 L540,508 L180,508 L180,520" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,490 L540,520" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>
<path d="M540,490 L540,508 L890,508 L890,520" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree)"/>

<g transform="translate(40, 520)">
<rect width="280" height="42" rx="8" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="26" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)">Consideration</text>
<text x="160" y="26" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">type, message</text>
</g>

<g transform="translate(400, 520)">
<rect width="280" height="42" rx="8" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="26" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)">Action</text>
<text x="100" y="26" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">type (enum), message</text>
</g>

<g transform="translate(760, 520)">
<rect width="280" height="42" rx="8" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="26" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)">Approval</text>
<text x="120" y="26" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">type, degree, message</text>
</g>
</svg>
</div>

### Meeting tree

This is the meeting-grain view — one file, many meetings, each with
agenda items and the resolutions they adopted:

<div class="diagram">
<svg viewBox="0 0 1080 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MeetingCollection tree">
<defs>
<marker id="arch-tree-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<g transform="translate(380, 20)">
<rect width="320" height="100" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="34" font-family="var(--edoxen-font-display)" font-size="20" font-weight="500" fill="var(--vp-c-text-1)">MeetingCollection</text>
<text x="20" y="58" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">metadata   : MeetingCollectionMetadata</text>
<text x="20" y="76" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">meetings   : Meeting[0..*]</text>
</g>

<path d="M540,120 L540,180" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree-2)"/>

<g transform="translate(280, 180)">
<rect width="520" height="220" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="20" font-weight="500" fill="var(--vp-c-text-1)">Meeting</text>
<text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">identifier : StructuredIdentifier[1..*]</text>
<text x="20" y="72" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">type, status, year, date_range</text>
<text x="20" y="88" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">venue, city, country_code, chair</text>
<text x="20" y="104" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">relations : MeetingRelation[]</text>
<text x="20" y="120" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">resolution_refs[] : string</text>
<text x="20" y="148" font-family="var(--edoxen-font-mono)" font-size="11" font-weight="600" fill="var(--vp-c-brand-1)">agenda : Agenda</text>
<text x="20" y="164" font-family="var(--edoxen-font-mono)" font-size="11" font-weight="600" fill="var(--vp-c-brand-1)">attendance[] : Attendance</text>
<text x="20" y="180" font-family="var(--edoxen-font-mono)" font-size="11" font-weight="600" fill="var(--vp-c-brand-1)">vote_records[] : VoteRecord</text>
<text x="20" y="196" font-family="var(--edoxen-font-mono)" font-size="11" font-weight="600" fill="var(--vp-c-brand-1)">minutes[] : Minutes</text>
<text x="20" y="212" font-family="var(--edoxen-font-mono)" font-size="11" font-weight="600" fill="var(--vp-c-brand-1)">localizations : MeetingLocalization[]</text>
</g>

<path d="M540,400 L540,430" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree-2)"/>

<g transform="translate(380, 430)">
<rect width="320" height="80" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="18" font-weight="500" fill="var(--vp-c-text-1)">Agenda</text>
<text x="20" y="54" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">status, source_doc,</text>
<text x="20" y="70" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">items : AgendaItem[0..*]</text>
</g>

<path d="M540,510 L540,540" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-tree-2)"/>

<g transform="translate(280, 540)">
<rect width="520" height="38" rx="8" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
<text x="20" y="24" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)">AgendaItem</text>
<text x="150" y="24" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">label · kind (enum) · title · outcome · resolution_ref</text>
</g>
</svg>
</div>

**Read the trees top-down:**

- **`ResolutionCollection`** is the file root for the resolution-grain
  view. It carries `ResolutionMetadata` (the publication's title,
  dates, venue) and a list of `Resolution` children.
- **`Resolution`** is one decision. Admin fields (`identifier`,
  `type`, `doi`, `urn`, `dates`, `meeting`, `categories`) live here
  and are declared **once**, never per-language. Holds a
  `localizations[]` array of monolingual renderings.
- **`MeetingCollection`** is the file root for the meeting-grain view
  — one or many `Meeting` children, each with their own agendas,
  schedules, chairs, and adopted resolutions.
- **`Meeting`** is one sitting: when, where, who chaired, what was on
  the agenda, who was in the room, how they voted, and what was said.
  Admin fields declared once; `MeetingLocalization[]` carries
  per-language content.
- **`Agenda`** is the ordered list of items the meeting worked
  through. Each `AgendaItem` is enum-typed (`numbered`, `header`,
  `opening`, `closing`) and may carry a `resolution_ref` to the
  resolution the meeting adopted on that item.
- **`Attendance`** + **`VoteRecord`** capture who was in the room
  and how they voted. See [Attendance & Votes](/docs/attendance).
- **`Minutes`** is the narrative record of the meeting — the
  running text of what was said, sliced by agenda item. Each
  `MinutesSection` carries a `number` field that joins to
  `AgendaItem.label`. See [Minutes](/docs/minutes).
- **Across the grain**: a `Resolution.meeting` field carries a
  `MeetingIdentifier` back to the meeting that adopted it. A
  `Meeting.resolution_refs[]` carries the strings the other way.
  And `VoteRecord.resolution_ref` joins votes to `Resolution.identifier`.

**Localization, the multilingual plumbing:**

- **`Localization`** (under `Resolution`) is one monolingual rendering
  of a `Resolution`. ISO 639-3 + ISO 15924.
- **`MeetingLocalization`** (under `Meeting`) is one monolingual
  rendering of a `Meeting`. Carries the localized title, general
  area, and practical info.
- **`Action`, `Consideration`, `Approval`** are the leaf content nodes
  inside a `Resolution`'s `Localization`. They never live directly on
  the resolution — anything translatable lives below a `Localization`.

The hard rule: **anything translatable lives below a `Localization`
or `MeetingLocalization`.** Anything administrative lives above it.
That separation is what makes the multilingual model work — and what
makes EN↔FR drift visible on `git diff`.

The full LutaML/UML definitions live in
[`edoxen/edoxen-model`](https://github.com/edoxen/edoxen-model).
The Ruby classes are generated from those definitions.

## Layer 2 — The round-trip pipeline

A YAML file flows through three framework stages. None of them is
hand-rolled:

<div class="diagram">
<PipelineDiagram />
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

<rect x="20" y="20" width="1040" height="320" rx="14" fill="var(--vp-c-bg-alt)" stroke="var(--vp-c-divider)" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="40" y="48" font-family="var(--edoxen-font-mono)" font-size="12" fill="var(--vp-c-text-3)">resolutions/ciml-39-decisions.yaml</text>
<text x="40" y="64" font-family="var(--edoxen-font-body)" font-size="11" fill="var(--vp-c-text-3)" font-style="italic">one file · both languages · git diff sees both blocks together</text>

<g transform="translate(380, 90)">
<rect width="320" height="80" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
<text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Resolution · OIML/2016/1</text>
<text x="20" y="54" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">identifier, doi, urn, dates</text>
<text x="20" y="70" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">declared once · language-agnostic</text>
</g>

<path d="M460,170 L460,200 L200,200 L200,230" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-sync)"/>
<path d="M620,170 L620,200 L880,200 L880,230" fill="none" stroke="var(--vp-c-text-3)" stroke-width="1.5" marker-end="url(#arch-sync)"/>

<g transform="translate(60, 230)">
<rect width="280" height="100" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
<rect x="0" y="0" width="280" height="26" rx="10" fill="var(--vp-c-brand-1)"/>
<rect x="0" y="16" width="280" height="10" fill="var(--vp-c-brand-1)"/>
<text x="20" y="18" font-family="var(--edoxen-font-display)" font-size="13" font-weight="600" fill="#fff">LOCALIZATION · eng / Latn</text>
<text x="20" y="50" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">title:    "Approval of the agenda"</text>
<text x="20" y="68" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">actions: [{ type: approves,</text>
<text x="20" y="82" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">            message: "Approves…" }]</text>
</g>

<g transform="translate(740, 230)">
<rect width="280" height="100" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-2)" stroke-width="1.5"/>
<rect x="0" y="0" width="280" height="26" rx="10" fill="var(--vp-c-brand-2)"/>
<rect x="0" y="16" width="280" height="10" fill="var(--vp-c-brand-2)"/>
<text x="20" y="18" font-family="var(--edoxen-font-display)" font-size="13" font-weight="600" fill="#fff">LOCALIZATION · fra / Latn</text>
<text x="20" y="50" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">title:    "Approbation de l'ordre"</text>
<text x="20" y="68" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">actions: [{ type: approves,</text>
<text x="20" y="82" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-2)">            message: "Approuve…" }]</text>
</g>

<g transform="translate(440, 250)">
<rect width="200" height="60" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1" stroke-dasharray="3 2"/>
<text x="100" y="24" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" text-anchor="middle" letter-spacing="0.1em" text-transform="uppercase">Shared admin</text>
<text x="100" y="44" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-2)" text-anchor="middle" font-style="italic">identifier · doi · urn · dates</text>
</g>
</svg>
</div>

Three properties fall out of this shape:

1. **One file per meeting, not per language.** A `git diff` always
   shows the EN line and the FR-line that changed together. Drift
   is visible in review, not invisible across files.
2. **The action verb is canonical.** `type: approves` lives once per
   `Action`, regardless of language. The French block reuses it; only
   the `message` differs.
3. **Adding a third language is one new entry.** No schema change,
   no new file convention, no migration. Drop a `language_code: deu`
   block next to the existing two.

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
  gem so `edoxen validate` works offline. (Currently scoped to
  `ResolutionCollection`; the `MeetingCollection` schema is in
  progress.)
- **`exe/edoxen`** — the CLI. Wraps `validate` and `normalize` as
  Thor commands; designed for CI pipelines.

The schema and the Ruby classes are both derived from the same
LutaML/UML source in
[`edoxen/edoxen-model`](https://github.com/edoxen/edoxen-model).
The docs you are reading are the introduction; the model files are
the ground truth.

## Where to next

- [Introduction](/docs/introduction) — a one-page tour of the model
  with a working YAML.
- [Schema](/docs/schema) — the JSON Schema reference, every
  invariant and extension point.
- [Meeting Collection](/docs/meeting-collection) — the meeting-level
  container.
- [Agenda](/docs/agenda) — agenda items, schedule slots, deadlines.
- [Structured Identifier](/docs/structured-identifier) — the
  `{prefix, number}` identifier type.
- [Localization sync](/docs/localization-sync) — the EN+FR deep-dive.
- [CLI](/docs/cli) — `validate` and `normalize` from the command line.
- [`edoxen/edoxen-model`](https://github.com/edoxen/edoxen-model) —
  the LutaML/UML source of truth.
