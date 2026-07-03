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
    title: 'Any meeting, one model',
    body: 'Standards bodies, parliaments, technical communities, academic conferences, corporate boards — all share the same Meeting, Agenda, Motion, Voting, and Decision types. Domain specifics live in profile extensions.',
    href: '/docs/architecture',
    glyph: '▣',
  },
  {
    title: 'Procedural core: Motion → Voting → Decision',
    body: 'A Motion is introduced, seconded, debated, put to a vote. The Voting state machine captures method (voice, division, roll_call) and counts. A carried Motion results in a Decision. State machines are first-class, not afterthoughts.',
    href: '/docs/motion',
    glyph: '§',
  },
  {
    title: 'Polymorphic Venue',
    body: 'Physical venues carry UN/LOCODE + IATA + address + geo-coordinates. Virtual venues carry URI + iCalendar features + access details. Hybrid meetings have both. Validated against the canonical unlocodes + iata gems.',
    href: '/docs/venue',
    glyph: '◉',
  },
  {
    title: 'Profile-extensible (ISO 8601-2 §15)',
    body: 'Every core entity carries an extensions[] slot. Adopters register a profile namespace (legco, us-congress, ietf, oiml) and define their own extension kinds. The generic core stays generic.',
    href: '/docs/extension',
    glyph: '⊕',
  },
  {
    title: 'Multilingual by default',
    body: "EN + FR (or any ISO 639-3 pair) live as siblings inside one file. Drift shows up on git diff, not on a translator's spreadsheet.",
    href: '/docs/multilingual',
    glyph: '⇄',
  },
  {
    title: 'Schema-validated wire format',
    body: 'A JSON Schema (Draft 7) locks the YAML. edoxen validate catches typos, regex mismatches, and enum drift before they ship. Schema ↔ Ruby sync specs fail CI on any drift.',
    href: '/docs/schema',
    glyph: '✓',
  },
]

export const stats: Stat[] = [
  { value: '30+', label: 'Core entity types' },
  { value: '6', label: 'Meeting domains covered' },
  { value: '∞', label: 'Profile extensions' },
  { value: '0', label: 'Hand-rolled serializers' },
]
