import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Edoxen',
  description: 'Structured resolution and decision information models',
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
      { text: 'Architecture', link: '/docs/architecture' },
      { text: 'Schema', link: '/docs/schema' },
      { text: 'Multilingual', link: '/docs/multilingual' },
      { text: 'Blog', link: '/blog/' },
      { text: 'About', link: '/about' },
      {
        text: 'Repos',
        items: [
          { text: 'Ruby gem', link: 'https://github.com/metanorma/edoxen' },
          { text: 'LutaML models', link: 'https://github.com/metanorma/edoxen-model' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/metanorma/edoxen' },
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
          ],
        },
        {
          text: 'Data model',
          items: [
            { text: 'Meeting Collection', link: '/docs/meeting-collection' },
            { text: 'Agenda', link: '/docs/agenda' },
            { text: 'Minutes', link: '/docs/minutes' },
            { text: 'Attendance & Votes', link: '/docs/attendance' },
            { text: 'Structured Identifier', link: '/docs/structured-identifier' },
            { text: 'Resolution Collection', link: '/docs/resolution-set' },
            { text: 'Resolution', link: '/docs/resolution' },
            { text: 'Resolution Metadata', link: '/docs/metadata' },
            { text: 'Dates', link: '/docs/dates' },
            { text: 'Actions', link: '/docs/actions' },
            { text: 'Considerations', link: '/docs/considerations' },
            { text: 'Approvals', link: '/docs/approvals' },
          ],
        },
        {
          text: 'Multilingual support',
          items: [
            { text: 'Overview', link: '/docs/multilingual' },
            { text: 'Localization', link: '/docs/localization' },
            { text: 'Sync flow (deep-dive)', link: '/docs/localization-sync' },
            { text: 'Source URL', link: '/docs/source-url' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Schema', link: '/docs/schema' },
            { text: 'CLI', link: '/docs/cli' },
            { text: 'LutaML models', link: 'https://github.com/metanorma/edoxen-model' },
          ],
        },
        {
          text: 'Usage',
          items: [
            { text: 'Parsing YAML', link: '/docs/parse-yaml' },
            { text: 'Creating resolutions', link: '/docs/create-resolutions' },
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
