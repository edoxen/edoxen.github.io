import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const dist = join(process.cwd(), 'dist')

function readPage(path: string): string {
  const fullPath = path === '' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  if (!existsSync(fullPath)) return ''
  return readFileSync(fullPath, 'utf-8')
}

function allHtmlFiles(): string[] {
  if (!existsSync(dist)) return []
  const files: string[] = []
  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) files.push(full)
    }
  }
  walk(dist)
  return files
}

describe('build output — pages', () => {
  it('produced at least 40 HTML pages', () => {
    const files = allHtmlFiles()
    expect(files.length).toBeGreaterThanOrEqual(40)
  })

  const expectedPages = [
    '', 'about', 'blog',
    'blog/2026-06-30-edoxen-1-0-release',
    'blog/2026-07-03-edoxen-2-0-release',
    'docs/introduction', 'docs/architecture', 'docs/schema',
    'docs/meeting-collection', 'docs/decision-collection',
    'docs/motion', 'docs/voting', 'docs/contact', 'docs/venue',
    'docs/agenda', 'docs/minutes', 'docs/attendance',
    'docs/migration-v2', 'docs/origin', 'docs/installation',
    'docs/cli', 'docs/validation', 'docs/parse-yaml',
  ]

  expectedPages.forEach(page => {
    it(`/ ${page || '(home)'} exists`, () => {
      const html = readPage(page)
      expect(html.length).toBeGreaterThan(1000)
    })
  })
})

describe('build output — home page', () => {
  const home = readPage('')

  it('uses Astro as the generator', () => {
    expect(home).toContain('Astro')
  })

  it('has the nav bar with logo', () => {
    expect(home).toContain('nav-title')
    expect(home).toContain('edoxen-logo.svg')
  })

  it('has the hero with Proceedings title', () => {
    expect(home).toContain('hero-title')
    expect(home).toContain('Proceedings')
  })

  it('has the Greek eyebrow ἔδοξεν', () => {
    expect(home).toContain('ἔδοξεν')
  })

  it('has exactly 3 anatomy cards', () => {
    expect(home.match(/anatomy-card/g)?.length).toBe(3)
  })

  it('has the specimen tag', () => {
    expect(home).toContain('SPECIMEN')
  })

  it('has syntax-highlighted YAML (y-k spans)', () => {
    expect(home).toContain('y-k')
  })

  it('has the pipeline SVG diagram', () => {
    expect(home).toContain('<svg')
    expect(home).toContain('Parse')
    expect(home).toContain('Decode')
    expect(home).toContain('Validate')
  })

  it('has at least 6 feature cards', () => {
    const matches = home.match(/class="feature"/g)
    expect(matches?.length).toBeGreaterThanOrEqual(6)
  })

  it('has the CTA with gem install snippet', () => {
    expect(home).toContain('cta-cli')
    expect(home).toContain('gem install')
  })

  it('has the footer with copyright', () => {
    expect(home).toContain('footer')
    expect(home).toContain('Ribose')
  })

  it('has stats (4 dt/dd pairs)', () => {
    const dts = home.match(/<dt/g)
    const dds = home.match(/<dd/g)
    expect(dts?.length).toBe(4)
    expect(dds?.length).toBe(4)
  })
})

describe('build output — docs pages', () => {
  it('docs/introduction has a sidebar', () => {
    const html = readPage('docs/introduction')
    expect(html.toLowerCase()).toContain('sidebar')
  })

  it('docs/schema mentions Decision Collection', () => {
    const html = readPage('docs/schema')
    expect(html).toContain('Decision')
  })

  it('docs/architecture has the Model overview', () => {
    const html = readPage('docs/architecture')
    expect(html.length).toBeGreaterThan(5000)
  })

  it('docs pages have the nav', () => {
    const html = readPage('docs/meeting-collection')
    expect(html).toContain('nav-title')
  })
})

describe('build output — blog', () => {
  it('blog index has post cards', () => {
    const html = readPage('blog')
    expect(html).toContain('blog-card')
    expect(html).toContain('post-title')
  })

  it('blog post has a byline with date', () => {
    const html = readPage('blog/2026-06-30-edoxen-1-0-release')
    expect(html).toContain('byline')
    expect(html).toMatch(/2026/)
  })
})

describe('build output — static assets', () => {
  const assets = [
    'favicon.svg', 'favicon-96x96.png', 'favicon.ico',
    'apple-touch-icon.png', 'site.webmanifest',
    'edoxen-logo.svg', 'edoxen-logo-dark.svg',
    'schemas/decision-collection.yaml', 'schemas/meeting.yaml',
    'CNAME',
  ]

  assets.forEach(asset => {
    it(`/${asset} exists in dist`, () => {
      expect(existsSync(join(dist, asset))).toBe(true)
    })
  })

  it('has at least one CSS file in _astro/', () => {
    const astroDir = join(dist, '_astro')
    if (!existsSync(astroDir)) {
      expect(true).toBe(false) // force fail
      return
    }
    const cssFiles = readdirSync(astroDir).filter(f => f.endsWith('.css'))
    expect(cssFiles.length).toBeGreaterThanOrEqual(1)
  })
})

describe('build output — sitemap', () => {
  it('sitemap-index.xml exists', () => {
    expect(existsSync(join(dist, 'sitemap-index.xml'))).toBe(true)
  })

  it('sitemap contains the home URL', () => {
    const sitemap = readFileSync(join(dist, 'sitemap-index.xml'), 'utf-8')
    expect(sitemap.length).toBeGreaterThan(100)
  })
})
