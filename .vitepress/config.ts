import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Edoxen',
  description: 'A generic meeting, agenda, motion, voting, and decision model. Profile-based customization for any domain.',
  lang: 'en-US',
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#0e7490' }],
    // Favicon pack (RealFaviconGenerator).
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    // Fraunces — expressive variable serif for display.
    // IBM Plex Sans — engineered sans for body.
    // JetBrains Mono — code & YAML.
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap',
    }],
  ],

  themeConfig: {
    logo: {
      light: '/edoxen-logo.svg',
      dark: '/edoxen-logo-dark.svg',
    },
    siteTitle: 'Edoxen',

    nav: [
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/edoxen/edoxen' },
    ],

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a> · 2-Clause BSD',
      copyright: 'Copyright © 2026 Ribose',
    },

    sidebar: {
      '/docs/': [
        {
          text: 'Getting started',
          items: [
            { text: 'Introduction', link: '/docs/introduction' },
            { text: 'Architecture', link: '/docs/architecture' },
            { text: 'Origin', link: '/docs/origin' },
            { text: 'Installation', link: '/docs/installation' },
            { text: 'Migration to v2', link: '/docs/migration-v2' },
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
            { text: 'Attendance & Votes', link: '/docs/attendance' },
            { text: 'Recurrence', link: '/docs/recurrence' },
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
      ],
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
    },
  },
})
