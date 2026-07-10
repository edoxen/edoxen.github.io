import { describe, it, expect } from 'vitest'
import { isActiveLink } from '../../src/lib/isActiveLink'

describe('isActiveLink', () => {
  it('matches exact path', () => {
    expect(isActiveLink('/docs/schema', '/docs/schema')).toBe(true)
  })

  it('matches path with trailing slash', () => {
    expect(isActiveLink('/docs/schema/', '/docs/schema')).toBe(true)
  })

  it('matches child path', () => {
    expect(isActiveLink('/docs/schema/fields', '/docs/schema')).toBe(true)
  })

  it('does NOT match partial segment (boundary check)', () => {
    expect(isActiveLink('/docs/motional', '/docs/motion')).toBe(false)
  })

  it('handles root link', () => {
    expect(isActiveLink('/', '/')).toBe(true)
    expect(isActiveLink('/docs', '/')).toBe(false)
  })

  it('returns false for undefined link', () => {
    expect(isActiveLink('/docs/schema', undefined)).toBe(false)
  })

  it('returns false for empty link', () => {
    expect(isActiveLink('/docs/schema', '')).toBe(false)
  })

  it('handles external links (no match)', () => {
    expect(isActiveLink('/docs/schema', 'https://github.com')).toBe(false)
  })
})
