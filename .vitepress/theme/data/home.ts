// Home-page data — features and stats live here so the FeatureGrid and
// HeroSection components are pure presentation. Editing copy does not
// require touching component templates.

export interface Feature {
  title: string
  body: string
  href: string
  glyph: string
}

export interface Stat {
  value: string
  label: string
}

export const features: Feature[] = [
  {
    title: 'One model, every body',
    body: 'A single Resolution shape captures what ISO, IEC, ITU, BIPM, OIML, and ILO have in common. Per-body quirks live in enum extensions, not in per-body schemas.',
    href: '/docs/introduction',
    glyph: '□',
  },
  {
    title: 'Multilingual by default',
    body: "EN + FR (or any ISO 639-3 pair) live as siblings inside one file. Drift shows up on git diff, not on a translator's spreadsheet.",
    href: '/docs/multilingual',
    glyph: '⇄',
  },
  {
    title: 'Schema-validated wire format',
    body: 'A JSON Schema (Draft 7) locks the YAML. edoxen validate catches typos, regex mismatches, and enum drift before they ship.',
    href: '/docs/schema',
    glyph: '✓',
  },
  {
    title: 'No hand-rolled serialization',
    body: 'Built on lutaml-model. Round-trip YAML → Ruby → YAML is a property of the framework, not of bespoke to_yaml code that drifts.',
    href: 'https://github.com/lutaml/lutaml-model',
    glyph: '↻',
  },
  {
    title: 'CLI for batch pipelines',
    body: 'edoxen validate and edoxen normalize across globs. Drop into CI; one command checks every resolution in the repo.',
    href: '/docs/cli',
    glyph: '▶',
  },
  {
    title: 'Real-world tested',
    body: 'Validated against 1,640 OIML resolutions across 28 meetings in EN + FR — 3,280 Localization entries exercising every code path.',
    href: 'https://github.com/oimlsmart/resolutions-data',
    glyph: 'στα',
  },
]

export const stats: Stat[] = [
  { value: '1,640', label: 'OIML resolutions encoded' },
  { value: '28', label: 'meetings, EN + FR' },
  { value: '6', label: 'standards bodies modelled' },
  { value: '0', label: 'hand-rolled serializers' },
]
