---
title: Localization Sync — EN + FR deep-dive
---

# Localization sync — EN+FR deep-dive

This is the deep-dive into how Edoxen keeps English and French
renderings of the same `Resolution` aligned inside a single YAML file.
For the field reference, see [Localization](/docs/localization). For
the *why* of the `localizations[]` pattern, see
[Multilingual support](/docs/multilingual).

## The shape of a Resolution

Every `Resolution` carries its language-agnostic admin fields
exactly once, then a `localizations[]` array with one entry per
language. The EN and FR entries share the same identifier, the same
dates, the same DOI — only the per-language content differs.

<div class="diagram">
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Resolution anatomy diagram">
<defs>
<marker id="rs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<rect x="240" y="20" width="240" height="120" rx="8" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
<text x="260" y="44" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="600" fill="var(--vp-c-text-1)">Resolution</text>
<text x="260" y="68" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">identifier: CIML/2004/1</text>
<text x="260" y="86" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">doi:       10.63493/...</text>
<text x="260" y="104" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">urn:       urn:oiml:...</text>
<text x="260" y="122" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">dates:     [...decision, ...meeting]</text>

<path d="M300,140 L120,210" stroke="var(--vp-c-text-3)" stroke-width="1.5" fill="none" marker-end="url(#rs-arrow)"/>
<path d="M420,140 L600,210" stroke="var(--vp-c-text-3)" stroke-width="1.5" fill="none" marker-end="url(#rs-arrow)"/>

<rect x="40" y="210" width="240" height="130" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
<rect x="40" y="210" width="240" height="24" rx="8" fill="var(--vp-c-brand-1)"/>
<text x="50" y="227" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="white">Localization — eng / Latn</text>
<text x="50" y="258" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">title:     "Approval of the agenda"</text>
<text x="50" y="276" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">actions:</text>
<text x="50" y="294" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">  - type: approves</text>
<text x="50" y="312" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">    message: "Approves the agenda..."</text>

<rect x="440" y="210" width="240" height="130" rx="8" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-2)" stroke-width="1.5"/>
<rect x="440" y="210" width="240" height="24" rx="8" fill="var(--vp-c-brand-2)"/>
<text x="450" y="227" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="white">Localization — fra / Latn</text>
<text x="450" y="258" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">title:     "Approbation de l'ordre"</text>
<text x="450" y="276" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">actions:</text>
<text x="450" y="294" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">  - type: approves</text>
<text x="450" y="312" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-2)">    message: "Approuve l'ordre du jour..."</text>
</svg>
</div>

**Read this as:** the parent `Resolution` owns the admin fields.
`localizations[]` is its children, one per language. EN and FR are
siblings — neither knows the other; both know the parent.

## Why one file, not two

The natural alternative is one file per language (`resolutions.en.yaml`,
`resolutions.fr.yaml`) and a join key (`CIML/2004/1`). Edoxen rejects
that because EN+FR pairs drift invisibly the moment a translator
edits one file but not the other. One single file, with both
languages nested, means a `git diff` and `git blame` show exactly the
EN line and the FR line that changed together.

<div class="diagram">
<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Single-file EN+FR workflow">
<rect x="20" y="20" width="680" height="240" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-divider)" stroke-width="1"/>
<text x="36" y="42" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" fill="var(--vp-c-text-1)">resolutions/ciml-39-decisions.yaml   ·   single file, both languages</text>

<rect x="40" y="60" width="640" height="50" rx="4" fill="none" stroke="var(--vp-c-text-3)" stroke-dasharray="4 3"/>
<text x="56" y="80" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-3)">metadata: { title, dates, venue, city, country_code, source_urls: [...] }</text>
<text x="56" y="98" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-3)">resolutions: [ { identifier, doi, urn, dates, localizations: [...] } ]</text>

<rect x="40" y="125" width="640" height="55" rx="4" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
<text x="56" y="148" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" fill="var(--vp-c-brand-1)">language_code: eng</text>
<text x="56" y="168" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-3)">- title: "Approval of the agenda for the 39th CIML Meeting"</text>

<rect x="40" y="190" width="640" height="55" rx="4" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-2)" stroke-width="1.5"/>
<text x="56" y="213" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="600" fill="var(--vp-c-brand-2)">language_code: fra</text>
<text x="56" y="233" font-family="ui-monospace, 'JetBrains Mono', Menlo, monospace" font-size="12" fill="var(--vp-c-text-3)">- title: "Approbation de l'ordre du jour de la 39e réunion du CIML"</text>
</svg>
</div>

**Result:** translators see EN and FR side by side in any editor.
A pull request that updates both blocks sits as one diff. A pull
request that updates only one block is *visibly suspicious* — easy
to spot in review.

## Validation pipeline

Every `.yaml` file flows through the same three-stage pipeline.
Neither translation drift, nor schema typos, nor model mis-attribution
survives all three.

<div class="diagram">
<PipelineDiagram :caption="false" />
</div>

- **Stage 1** confirms the file is well-formed YAML — no tabs-as-indent,
  no duplicated keys.
- **Stage 2** walks the hash into `ResolutionSet` /
  `Resolution` / `Localization` via [lutaml-model](/docs/schema)'s
  declared attributes. Anything lutaml can't bind raises an
  `UnknownAttribute` or a `KeyError`.
- **Stage 3** runs the JSON Schema. `language_code` must match
  `^[a-z]{3}$`, `script` must match `^[A-Z][a-z]{3}$`,
  `Action.type` must be in the enum, `additionalProperties: false`
  on every object catches typos at the wire level.

The CLI runs all three:

```sh
edoxen validate resolutions/*.yaml
```

## Translator workflow, end-to-end

<div class="diagram">
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Translator workflow sequence diagram">
<defs>
<marker id="tw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
</marker>
</defs>

<text x="90"  y="20" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="500" fill="var(--vp-c-text-3)" text-anchor="middle">Translator</text>
<text x="270" y="20" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="500" fill="var(--vp-c-text-3)" text-anchor="middle">Repo</text>
<text x="450" y="20" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="500" fill="var(--vp-c-text-3)" text-anchor="middle">CI (edoxen validate)</text>
<text x="630" y="20" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" font-weight="500" fill="var(--vp-c-text-3)" text-anchor="middle">Docs site</text>
<line x1="90"  y1="30" x2="90"  y2="220" stroke="var(--vp-c-divider)" stroke-width="1" stroke-dasharray="4 3"/>
<line x1="270" y1="30" x2="270" y2="220" stroke="var(--vp-c-divider)" stroke-width="1" stroke-dasharray="4 3"/>
<line x1="450" y1="30" x2="450" y2="220" stroke="var(--vp-c-divider)" stroke-width="1" stroke-dasharray="4 3"/>
<line x1="630" y1="30" x2="630" y2="220" stroke="var(--vp-c-divider)" stroke-width="1" stroke-dasharray="4 3"/>

<rect x="40"  y="40"  width="100" height="40" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.2"/>
<text x="90" y="58" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">EN + FR</text>
<text x="90" y="74" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">edit (1 PR)</text>
<line x1="140" y1="60" x2="220" y2="60" stroke="var(--vp-c-text-2)" stroke-width="1.5" fill="none" marker-end="url(#tw-arrow)"/>

<rect x="220" y="40"  width="100" height="40" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.2"/>
<text x="270" y="64" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">open PR</text>
<line x1="320" y1="60" x2="400" y2="60" stroke="var(--vp-c-text-2)" stroke-width="1.5" fill="none" marker-end="url(#tw-arrow)"/>

<rect x="400" y="40"  width="100" height="40" rx="6" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.2"/>
<text x="450" y="64" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">parse + schema</text>

<rect x="400" y="100" width="100" height="36" rx="6" fill="#fee2e2" stroke="#b91c1c" stroke-width="1.2"/>
<text x="450" y="122" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">list errors</text>
<line x1="400" y1="80" x2="180" y2="100" stroke="var(--vp-c-text-2)" stroke-width="1.5" fill="none" marker-end="url(#tw-arrow)"/>
<line x1="180" y1="118" x2="90"  y2="118" stroke="var(--vp-c-text-2)" stroke-width="1.5" fill="none" marker-end="url(#tw-arrow)"/>

<rect x="400" y="160" width="100" height="36" rx="6" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.2"/>
<text x="450" y="182" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">merge</text>
<line x1="500" y1="178" x2="580" y2="178" stroke="var(--vp-c-text-2)" stroke-width="1.5" fill="none" marker-end="url(#tw-arrow)"/>
<rect x="580" y="160" width="100" height="36" rx="6" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.2"/>
<text x="630" y="182" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">site rebuild</text>
</svg>
</div>

> The translator never has to know which file holds which language.
> Both languages live in the same file; one PR carries both; one CI
> run checks both.

## Where to next

- [`docs/localization`](/docs/localization) — the field reference.
- [`docs/multilingual`](/docs/multilingual) — the model-level
  rationale for `localizations[]`.
- [`docs/source-url`](/docs/source-url) — how each resolution
  remembers where it came from.
- [`docs/schema`](/docs/schema) — the JSON Schema, including the
  per-language regex invariants.
