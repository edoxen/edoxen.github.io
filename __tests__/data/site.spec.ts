import { describe, it, expect } from 'vitest'
import { nav, sidebar, siteConfig } from '../../src/data/site'
import type { NavItem } from '../../src/data/site'

function isInternal(link: string): boolean {
  return link.startsWith('/')
}

function isExternal(link: string): boolean {
  return link.startsWith('https://') || link.startsWith('http://')
}

function collectLinks(items: NavItem[]): string[] {
  const links: string[] = []
  for (const item of items) {
    if (item.link) links.push(item.link)
    if (item.items) links.push(...collectLinks(item.items))
  }
  return links
}

function collectLeaves(items: NavItem[]): NavItem[] {
  const leaves: NavItem[] = []
  for (const item of items) {
    if (item.items) leaves.push(...collectLeaves(item.items))
    else leaves.push(item)
  }
  return leaves
}

describe('nav', () => {
  it('every top-level item has text', () => {
    nav.forEach((item, i) => {
      expect(item.text, `nav[${i}].text`).toBeTruthy()
    })
  })

  it('every leaf item has a non-empty link', () => {
    collectLeaves(nav).forEach((item, i) => {
      expect(item.link, `nav leaf[${i}] "${item.text}".link`).toBeTruthy()
      expect(item.link!.length).toBeGreaterThan(0)
    })
  })

  it('every link is internal or https external', () => {
    for (const link of collectLinks(nav)) {
      expect(
        isInternal(link) || isExternal(link),
        `"${link}" must start with / or https://`
      ).toBe(true)
    }
  })

  it('has no duplicate leaf links', () => {
    const links = collectLinks(nav)
    const unique = new Set(links)
    expect(unique.size).toBe(links.length)
  })
})

describe('sidebar', () => {
  it('every group has text and items', () => {
    sidebar.forEach((group, i) => {
      expect(group.text, `sidebar[${i}].text`).toBeTruthy()
      expect(group.items, `sidebar[${i}].items must exist`).toBeDefined()
      expect(group.items!.length, `sidebar[${i}].items must be non-empty`).toBeGreaterThan(0)
    })
  })

  it('every leaf item has a non-empty link', () => {
    collectLeaves(sidebar).forEach((item, i) => {
      expect(item.link, `sidebar leaf[${i}] "${item.text}".link`).toBeTruthy()
      expect(item.link!.length).toBeGreaterThan(0)
    })
  })

  it('every link is internal or https external', () => {
    for (const link of collectLinks(sidebar)) {
      expect(
        isInternal(link) || isExternal(link),
        `"${link}" must start with / or https://`
      ).toBe(true)
    }
  })

  it('has no duplicate leaf links', () => {
    const links = collectLinks(sidebar)
    const unique = new Set(links)
    expect(unique.size).toBe(links.length)
  })

  it('has no duplicate group titles', () => {
    const titles = sidebar.map(g => g.text)
    const unique = new Set(titles)
    expect(unique.size).toBe(titles.length)
  })
})

describe('siteConfig', () => {
  it('has required string fields', () => {
    expect(siteConfig.title).toBeTruthy()
    expect(siteConfig.description).toBeTruthy()
    expect(siteConfig.logoLight).toBeTruthy()
    expect(siteConfig.logoDark).toBeTruthy()
    expect(siteConfig.githubUrl).toBeTruthy()
    expect(siteConfig.footerMessage).toBeTruthy()
    expect(siteConfig.footerCopyright).toBeTruthy()
  })

  it('githubUrl is a valid HTTPS URL', () => {
    expect(isExternal(siteConfig.githubUrl)).toBe(true)
  })

  it('logo paths are internal', () => {
    expect(isInternal(siteConfig.logoLight)).toBe(true)
    expect(isInternal(siteConfig.logoDark)).toBe(true)
  })
})
