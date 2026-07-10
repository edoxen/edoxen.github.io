import { describe, it, expect } from 'vitest'
import { formatDate, formatLastUpdated, formatAuthors } from '../../src/composables/usePostFormat'
import type { Post } from '../../src/composables/usePostFormat'

describe('formatDate', () => {
  it('formats a standard ISO date string', () => {
    const result = formatDate('2026-06-30')
    expect(result).toMatch(/June 30, 2026/)
  })

  it('formats a date with time component', () => {
    const result = formatDate('2026-07-04T12:00:00Z')
    expect(result).toMatch(/July/)
    expect(result).toMatch(/2026/)
  })

  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('')
  })

  it('returns empty string for null', () => {
    expect(formatDate(null as unknown as string)).toBe('')
  })

  it('returns empty string for empty string', () => {
    expect(formatDate('')).toBe('')
  })

  it('produces a month + day + year in the output', () => {
    const result = formatDate('2025-01-15')
    expect(result).toMatch(/\w+ \d+, \d{4}/)
  })
})

describe('formatLastUpdated', () => {
  it('formats a valid Unix timestamp', () => {
    const ts = new Date('2026-06-15T10:00:00Z').getTime()
    const result = formatLastUpdated(ts)
    expect(result).toMatch(/2026/)
  })

  it('returns empty string for undefined', () => {
    expect(formatLastUpdated(undefined)).toBe('')
  })

  it('returns empty string for zero', () => {
    expect(formatLastUpdated(0)).toBe('')
  })

  it('produces a short month + day + year', () => {
    const ts = new Date('2025-03-20T00:00:00Z').getTime()
    const result = formatLastUpdated(ts)
    expect(result).toMatch(/^\w{3,} \d+, \d{4}$/)
  })
})

describe('formatAuthors', () => {
  it('returns empty string for undefined', () => {
    expect(formatAuthors(undefined)).toBe('')
  })

  it('returns empty string for empty array', () => {
    expect(formatAuthors([])).toBe('')
  })

  it('returns the single author for a one-element array', () => {
    expect(formatAuthors(['Ribose'])).toBe('Ribose')
  })

  it('joins two authors with & (no comma)', () => {
    expect(formatAuthors(['Alice', 'Bob'])).toBe('Alice & Bob')
  })

  it('uses Oxford comma for three authors', () => {
    expect(formatAuthors(['Alice', 'Bob', 'Charlie'])).toBe('Alice, Bob & Charlie')
  })

  it('uses Oxford comma for four authors', () => {
    expect(formatAuthors(['A', 'B', 'C', 'D'])).toBe('A, B, C & D')
  })

  it('uses Oxford comma for five authors', () => {
    expect(formatAuthors(['A', 'B', 'C', 'D', 'E'])).toBe('A, B, C, D & E')
  })

  it('handles author names with spaces', () => {
    expect(formatAuthors(['Ronald Tse', 'John Doe'])).toBe('Ronald Tse & John Doe')
  })

  it('handles author names with special characters', () => {
    expect(formatAuthors(["O'Brien", "Smith-Jones"])).toBe("O'Brien & Smith-Jones")
  })
})

describe('Post interface (type-level contract)', () => {
  it('accepts a well-formed Post object', () => {
    const post: Post = {
      date: '2026-07-04',
      authors: ['Ribose'],
      lastUpdated: Date.now(),
    }
    expect(post.date).toBe('2026-07-04')
    expect(post.authors).toEqual(['Ribose'])
    expect(post.lastUpdated).toBeGreaterThan(0)
  })

  it('accepts a Post with minimal data', () => {
    const post: Post = {}
    expect(post.date).toBeUndefined()
    expect(post.authors).toBeUndefined()
    expect(post.lastUpdated).toBeUndefined()
  })
})
