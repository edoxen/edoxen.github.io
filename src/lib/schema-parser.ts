// Schema parser — turns JSON Schema $defs into a renderable tree.
// Runs at build time in Astro frontmatter.

export interface SchemaField {
  name: string
  types: string[]
  required: boolean
  isArray: boolean
  enum?: string[]
  pattern?: string
  description?: string
  refTarget?: string
  format?: string
}

export interface SchemaEntity {
  name: string
  description?: string
  fields: SchemaField[]
}

interface JsonSchema {
  $defs?: Record<string, unknown>
  properties?: Record<string, unknown>
  required?: string[]
  type?: string
  description?: string
  enum?: unknown[]
  pattern?: string
  format?: string
  $ref?: string
  items?: JsonSchema
  additionalProperties?: unknown
}

export function resolveRef(ref: string | undefined): string {
  if (!ref) return ''
  const match = ref?.match(/#\/\$defs\/(.+)/)
  return match ? match[1] : ''
}

export function extractTypes(prop: JsonSchema): { types: string[]; isArray: boolean; refTarget?: string } {
  if (prop.$ref) {
    return { types: ['object'], isArray: false, refTarget: resolveRef(prop.$ref) }
  }

  let typeSource = prop.type
  let isArray = false
  let inner = prop

  if (prop.type === 'array' && prop.items) {
    isArray = true
    inner = prop.items
    typeSource = inner.type
    if (inner.$ref) {
      return { types: [resolveRef(inner.$ref) || 'object'], isArray: true, refTarget: resolveRef(inner.$ref) }
    }
  }

  const types = Array.isArray(typeSource) ? typeSource : typeSource ? [typeSource] : []
  if (inner.$ref) {
    return { types, isArray, refTarget: resolveRef(inner.$ref) }
  }

  return { types, isArray }
}

const DEFAULT_EXCLUDE_SUFFIXES = ['Type', 'Kind', 'Status', 'Degree']

export interface ParseSchemaOptions {
  excludeSuffixes?: string[]
}

export function parseSchema(schema: JsonSchema, options: ParseSchemaOptions = {}): SchemaEntity[] {
  const defs = schema.$defs
  if (!defs) return []

  const exclude = options.excludeSuffixes ?? DEFAULT_EXCLUDE_SUFFIXES

  return Object.entries(defs)
    .filter(([name]) => !exclude.some(suffix => name.endsWith(suffix)))
    .filter(([, def]) => {
      const d = def as JsonSchema
      return d.type === 'object' && d.properties
    })
    .map(([name, def]) => {
      const d = def as JsonSchema
      const properties = d.properties || {}
      const required = d.required || []

      const fields: SchemaField[] = Object.entries(properties).map(([fieldName, fieldDef]) => {
        const f = fieldDef as JsonSchema
        const { types, isArray, refTarget } = extractTypes(f)
        return {
          name: fieldName,
          types,
          required: required.includes(fieldName),
          isArray,
          enum: Array.isArray(f.enum) ? f.enum.map(String) : undefined,
          pattern: f.pattern,
          description: typeof f.description === 'string' ? f.description : undefined,
          refTarget,
          format: f.format,
        }
      })

      return {
        name,
        description: typeof d.description === 'string' ? d.description.trim() : undefined,
        fields,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}
