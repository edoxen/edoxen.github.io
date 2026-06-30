import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Edoxen',
  description: 'Structured resolution and decision information models',
  lang: 'en-US',
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#0e7490' }],
  ],

  themeConfig: {
    logo: '/edoxen-logo.svg',

    nav: [
      { text: 'Introduction', link: '/docs/introduction' },
      { text: 'Schema', link: '/docs/schema' },
      { text: 'Multilingual', link: '/docs/multilingual' },
      { text: 'Ruby gem', link: 'https://github.com/metanorma/edoxen' },
      { text: 'Models', link: 'https://github.com/metanorma/edoxen-model' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/metanorma/edoxen' },
    ],

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a>',
      copyright: 'Copyright © 2026 Ribose',
    },

    sidebar: {
      '/docs/': [
        {
          text: 'Getting started',
          items: [
            { text: 'Introduction', link: '/docs/introduction' },
            { text: 'Origin', link: '/docs/origin' },
            { text: 'Installation', link: '/docs/installation' },
          ],
        },
        {
          text: 'Data model',
          items: [
            { text: 'Resolution Set', link: '/docs/resolution-set' },
            { text: 'Resolution', link: '/docs/resolution' },
            { text: 'Metadata', link: '/docs/metadata' },
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
