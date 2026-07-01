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
    title: 'Meetings, end to end',
    body: 'One model covers the full lifecycle: identifier and venue, agenda items, schedule slots, the narrative minutes, attendance rolls, recorded votes, and the resolutions adopted.',
    href: '/docs/meeting-collection',
    glyph: '▣',
  },
  {
    title: 'Resolutions, decided',
    body: 'A Resolution carries its identifier, DOI, URN, dates, and one or more localizations. Considerations, actions, and approvals sit underneath, enum-restricted and per-language.',
    href: '/docs/resolution',
    glyph: '§',
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
    title: 'Real-world tested',
    body: 'Validated against 1,640 OIML resolutions across 28 meetings in EN + FR — 3,280 Localization entries exercising every code path.',
    href: 'https://github.com/oimlsmart/resolutions-data',
    glyph: 'στα',
  },
]

export const stats: Stat[] = [
  { value: '1,640', label: 'Resolutions encoded' },
  { value: '28', label: 'Meetings, EN + FR' },
  { value: '6', label: 'Standards bodies modelled' },
  { value: '0', label: 'Hand-rolled serializers' },
]
