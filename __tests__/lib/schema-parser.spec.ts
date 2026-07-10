import { describe, it, expect } from 'vitest'
import { parseSchema, resolveRef, extractTypes } from '../../src/lib/schema-parser'
import type { JsonSchema } from '../../src/lib/schema-parser'

const minimalSchema: JsonSchema = {
  $defs: {
    Meeting: {
      type: 'object',
      description: 'A meeting event.',
      properties: {
        identifier: { type: 'string', description: 'Meeting ID.' },
        urn: { type: 'string', description: 'Canonical URN.' },
        ordinal: { type: 'integer' },
        venues: {
          type: 'array',
          items: { $ref: '#/$defs/Venue' },
        },
      },
      required: ['identifier'],
    },
    Venue: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        kind: { type: 'string', enum: ['physical', 'virtual'] },
      },
    },
    MeetingType: {
      type: 'string',
      enum: ['plenary', 'working_group'],
    },
    MeetingStatus: {
      type: 'string',
      enum: ['upcoming', 'completed'],
    },
  },
}

describe('parseSchema', () => {
  it('returns entities from $defs', () => {
    const entities = parseSchema(minimalSchema)
    const names = entities.map(e => e.name)
    expect(names).toContain('Meeting')
    expect(names).toContain('Venue')
  })

  it('excludes enum-like definitions by suffix', () => {
    const entities = parseSchema(minimalSchema)
    const names = entities.map(e => e.name)
    expect(names).not.toContain('MeetingType')
    expect(names).not.toContain('MeetingStatus')
  })

  it('respects custom excludeSuffixes', () => {
    const entities = parseSchema(minimalSchema, { excludeSuffixes: [] })
    const names = entities.map(e => e.name)
    // With no exclusions, all object-typed defs appear
    expect(names.length).toBeGreaterThanOrEqual(2)
  })

  it('returns empty array for schema without $defs', () => {
    expect(parseSchema({})).toEqual([])
  })

  it('extracts fields with correct types', () => {
    const entities = parseSchema(minimalSchema)
    const meeting = entities.find(e => e.name === 'Meeting')!
    const idField = meeting.fields.find(f => f.name === 'identifier')
    expect(idField).toBeTruthy()
    expect(idField!.types).toContain('string')
    expect(idField!.required).toBe(true)
  })

  it('marks optional fields as not required', () => {
    const entities = parseSchema(minimalSchema)
    const meeting = entities.find(e => e.name === 'Meeting')!
    const urnField = meeting.fields.find(f => f.name === 'urn')
    expect(urnField!.required).toBe(false)
  })

  it('resolves $ref to target entity name', () => {
    const entities = parseSchema(minimalSchema)
    const meeting = entities.find(e => e.name === 'Meeting')!
    const venuesField = meeting.fields.find(f => f.name === 'venues')
    expect(venuesField!.isArray).toBe(true)
    expect(venuesField!.refTarget).toBe('Venue')
  })

  it('extracts enum values', () => {
    const entities = parseSchema(minimalSchema)
    const venue = entities.find(e => e.name === 'Venue')!
    const kindField = venue.fields.find(f => f.name === 'kind')
    expect(kindField!.enum).toEqual(['physical', 'virtual'])
  })

  it('extracts integer types', () => {
    const entities = parseSchema(minimalSchema)
    const meeting = entities.find(e => e.name === 'Meeting')!
    const ordinal = meeting.fields.find(f => f.name === 'ordinal')
    expect(ordinal!.types).toContain('integer')
  })

  it('extracts descriptions', () => {
    const entities = parseSchema(minimalSchema)
    const meeting = entities.find(e => e.name === 'Meeting')!
    expect(meeting.description).toContain('meeting event')
    const idField = meeting.fields.find(f => f.name === 'identifier')
    expect(idField!.description).toBe('Meeting ID.')
  })

  it('sorts entities alphabetically', () => {
    const entities = parseSchema(minimalSchema)
    const names = entities.map(e => e.name)
    const sorted = [...names].sort()
    expect(names).toEqual(sorted)
  })

  it('handles fields with patterns', () => {
    const schema: JsonSchema = {
      $defs: {
        Entity: {
          type: 'object',
          properties: {
            code: { type: 'string', pattern: '^[a-z]{3}$' },
          },
        },
      },
    }
    const entities = parseSchema(schema)
    const field = entities[0].fields[0]
    expect(field.pattern).toBe('^[a-z]{3}$')
  })
})

describe('resolveRef', () => {
  it('extracts entity name from $ref', () => {
    expect(resolveRef('#/$defs/Meeting')).toBe('Meeting')
    expect(resolveRef('#/$defs/Venue')).toBe('Venue')
  })

  it('returns empty string for non-$defs refs', () => {
    expect(resolveRef('#/properties/foo')).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(resolveRef(undefined as unknown as string)).toBe('')
  })
})

describe('extractTypes', () => {
  it('handles plain string type', () => {
    const result = extractTypes({ type: 'string' })
    expect(result.types).toEqual(['string'])
    expect(result.isArray).toBe(false)
  })

  it('handles integer type', () => {
    const result = extractTypes({ type: 'integer' })
    expect(result.types).toEqual(['integer'])
  })

  it('handles array of $ref', () => {
    const result = extractTypes({ type: 'array', items: { $ref: '#/$defs/Venue' } })
    expect(result.isArray).toBe(true)
    expect(result.refTarget).toBe('Venue')
  })

  it('handles direct $ref', () => {
    const result = extractTypes({ $ref: '#/$defs/Meeting' })
    expect(result.isArray).toBe(false)
    expect(result.refTarget).toBe('Meeting')
  })

  it('handles type as array (union types)', () => {
    const result = extractTypes({ type: ['string', 'null'] })
    expect(result.types).toEqual(['string', 'null'])
  })
})
