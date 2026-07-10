import { describe, it, expect } from 'vitest'
import { features, stats } from '../../.vitepress/theme/data/home'
import type { Feature, Stat } from '../../.vitepress/theme/data/home'

describe('features data', () => {
  it('has at least 4 features', () => {
    expect(features.length).toBeGreaterThanOrEqual(4)
  })

  it('every feature has a non-empty title', () => {
    features.forEach((f: Feature, i: number) => {
      expect(f.title, `feature[${i}].title`).toBeTruthy()
      expect(f.title.length).toBeGreaterThan(0)
    })
  })

  it('every feature has a non-empty body', () => {
    features.forEach((f: Feature, i: number) => {
      expect(f.body, `feature[${i}].body`).toBeTruthy()
      expect(f.body.length).toBeGreaterThan(20)
    })
  })

  it('every feature has a valid href (internal or external)', () => {
    features.forEach((f: Feature, i: number) => {
      expect(f.href, `feature[${i}].href`).toBeTruthy()
      expect(
        f.href.startsWith('/') || f.href.startsWith('https://'),
        `feature[${i}].href must be /internal or https://external`
      ).toBe(true)
    })
  })

  it('every feature has a glyph', () => {
    features.forEach((f: Feature, i: number) => {
      expect(f.glyph, `feature[${i}].glyph`).toBeTruthy()
    })
  })

  it('has no duplicate titles', () => {
    const titles = features.map(f => f.title)
    const unique = new Set(titles)
    expect(unique.size).toBe(titles.length)
  })

  it('has no duplicate hrefs', () => {
    const hrefs = features.map(f => f.href)
    const unique = new Set(hrefs)
    expect(unique.size).toBe(hrefs.length)
  })
})

describe('stats data', () => {
  it('has exactly 4 stats', () => {
    expect(stats.length).toBe(4)
  })

  it('every stat has a non-empty value', () => {
    stats.forEach((s: Stat, i: number) => {
      expect(s.value, `stats[${i}].value`).toBeTruthy()
      expect(s.value.length).toBeGreaterThan(0)
    })
  })

  it('every stat has a non-empty label', () => {
    stats.forEach((s: Stat, i: number) => {
      expect(s.label, `stats[${i}].label`).toBeTruthy()
      expect(s.label.length).toBeGreaterThan(0)
    })
  })

  it('labels are noun phrases (not sentences)', () => {
    stats.forEach((s: Stat) => {
      expect(s.label.endsWith('.')).toBe(false)
    })
  })

  it('has no duplicate labels', () => {
    const labels = stats.map(s => s.label)
    const unique = new Set(labels)
    expect(unique.size).toBe(labels.length)
  })
})
