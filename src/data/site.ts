export interface NavItem {
  text: string
  link?: string
  items?: NavItem[]
  collapsed?: boolean
}

export const nav: NavItem[] = [
  { text: 'Introduction', link: '/docs/introduction' },
  {
    text: 'Model',
    items: [
      { text: 'Architecture', link: '/docs/architecture' },
      { text: 'Meetings', link: '/docs/meeting-collection' },
      { text: 'Decisions', link: '/docs/decision-collection' },
      { text: 'Procedural (Motion/Voting)', link: '/docs/motion' },
      { text: 'Topics', link: '/docs/topic' },
      { text: 'Identity & Contact', link: '/docs/contact' },
      { text: 'Venues', link: '/docs/venue' },
      { text: 'Localization', link: '/docs/localization' },
      { text: 'Building blocks', link: '/docs/structured-identifier' },
    ],
  },
  { text: 'Schema', link: '/docs/schema' },
  { text: 'Blog', link: '/blog/' },
  { text: 'About', link: '/about' },
  {
    text: 'Repos',
    items: [
      { text: 'Ruby gem', link: 'https://github.com/edoxen/edoxen' },
      { text: 'LutaML models', link: 'https://github.com/edoxen/edoxen-model' },
      { text: 'JS packages', link: 'https://github.com/edoxen/edoxen-js' },
    ],
  },
]

export const sidebar: NavItem[] = [
  {
    text: 'Getting started',
    items: [
      { text: 'Introduction', link: '/docs/introduction' },
      { text: 'Architecture', link: '/docs/architecture' },
      { text: 'Origin', link: '/docs/origin' },
      { text: 'Installation', link: '/docs/installation' },
      { text: 'Migration to 1.0', link: '/docs/migration' },
    ],
  },
  {
    text: 'Meetings',
    collapsed: false,
    items: [
      { text: 'Meeting Collection', link: '/docs/meeting-collection' },
      { text: 'Meeting Series', link: '/docs/meeting-series' },
      { text: 'Meeting Component', link: '/docs/meeting-component' },
      { text: 'Venue', link: '/docs/venue' },
      { text: 'Venue Collection', link: '/docs/venue-collection' },
      { text: 'Agenda', link: '/docs/agenda' },
      { text: 'Minutes', link: '/docs/minutes' },
      { text: 'BS 0:2006 Minutes', link: '/docs/bs0-minutes' },
      { text: 'Attendance & Votes', link: '/docs/attendance' },
      { text: 'Recurrence', link: '/docs/recurrence' },
      { text: 'DateTimeRange', link: '/docs/date-time-range' },
    ],
  },
  {
    text: 'Identity & Contact',
    collapsed: false,
    items: [
      { text: 'Contact', link: '/docs/contact' },
      { text: 'Contact Collection', link: '/docs/contact-collection' },
      { text: 'Officer', link: '/docs/officer' },
    ],
  },
  {
    text: 'Procedural',
    collapsed: false,
    items: [
      { text: 'Motion', link: '/docs/motion' },
      { text: 'Voting', link: '/docs/voting' },
    ],
  },
  {
    text: 'Decisions',
    collapsed: false,
    items: [
      { text: 'Decision Collection', link: '/docs/decision-collection' },
      { text: 'Decision', link: '/docs/decision' },
      { text: 'Decision Metadata', link: '/docs/decision-metadata' },
      { text: 'Dates', link: '/docs/dates' },
      { text: 'Actions', link: '/docs/actions' },
      { text: 'Considerations', link: '/docs/considerations' },
      { text: 'Approvals', link: '/docs/approvals' },
    ],
  },
  {
    text: 'Topics',
    collapsed: false,
    items: [
      { text: 'Topic', link: '/docs/topic' },
      { text: 'Statement (BS 0:2006)', link: '/docs/statement' },
      { text: 'Declaration (BS 0:2006)', link: '/docs/declaration' },
    ],
  },
  {
    text: 'Profile mechanism',
    collapsed: false,
    items: [
      { text: 'Meeting Extension', link: '/docs/extension' },
    ],
  },
  {
    text: 'Building blocks',
    collapsed: false,
    items: [
      { text: 'Structured Identifier', link: '/docs/structured-identifier' },
      { text: 'EntityRef', link: '/docs/entity-ref' },
      { text: 'Body Vocabulary', link: '/docs/body-vocabulary' },
      { text: 'Source URL', link: '/docs/source-url' },
    ],
  },
  {
    text: 'Localization',
    collapsed: false,
    items: [
      { text: 'Overview (1.0 per-field)', link: '/docs/localization' },
      { text: 'Sync flow (legacy deep-dive)', link: '/docs/localization-sync' },
    ],
  },
  {
    text: 'Reference',
    items: [
      { text: 'Schema', link: '/docs/schema' },
      { text: 'CLI', link: '/docs/cli' },
      { text: 'LutaML models', link: 'https://github.com/edoxen/edoxen-model' },
    ],
  },
  {
    text: 'Usage',
    items: [
      { text: 'Parsing YAML', link: '/docs/parse-yaml' },
      { text: 'Creating decisions', link: '/docs/create-decisions' },
      { text: 'Validation', link: '/docs/validation' },
    ],
  },
]

export const siteConfig = {
  title: 'Edoxen',
  description: 'A generic meeting, agenda, motion, voting, and decision model. Profile-based customization for any domain.',
  logoLight: '/edoxen-logo.svg',
  logoDark: '/edoxen-logo-dark.svg',
  githubUrl: 'https://github.com/edoxen/edoxen',
  footerMessage: 'An open source project of Ribose · 2-Clause BSD',
  footerCopyright: 'Copyright © 2026 Ribose',
  fonts: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap',
}
