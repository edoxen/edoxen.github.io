import { describe, it, expect } from 'vitest'
import { tokenize, escapeHtml, render, highlight } from '../../.vitepress/theme/lib/yaml-tokenizer'

describe('tokenize', () => {
  it('tokenizes a simple key-value pair', () => {
    const tokens = tokenize('title: hello')
    expect(tokens).toEqual([
      ['k', 'title'], ['p', ':'],
      ['ws', ' '],
      ['t', 'hello'],
    ])
  })

  it('tokenizes a key with a double-quoted string', () => {
    const tokens = tokenize('title: "hello world"')
    expect(tokens).toContainEqual(['s', '"hello world"'])
  })

  it('tokenizes a key with a single-quoted string', () => {
    const tokens = tokenize("title: 'hello world'")
    expect(tokens).toContainEqual(['s', "'hello world'"])
  })

  it('tokenizes a number value', () => {
    const tokens = tokenize('ordinal: 56')
    expect(tokens).toContainEqual(['n', '56'])
  })

  it('tokenizes a negative number', () => {
    const tokens = tokenize('value: -42')
    expect(tokens).toContainEqual(['n', '-42'])
  })

  it('tokenizes a decimal number', () => {
    const tokens = tokenize('lat: 48.8842')
    expect(tokens).toContainEqual(['n', '48.8842'])
  })

  it('tokenizes a comment', () => {
    const tokens = tokenize('# this is a comment')
    expect(tokens).toContainEqual(['c', '# this is a comment'])
  })

  it('tokenizes a block scalar marker', () => {
    const tokens = tokenize('message: |')
    expect(tokens).toContainEqual(['p', '|'])
  })

  it('tokenizes a folded scalar marker', () => {
    const tokens = tokenize('message: >')
    expect(tokens).toContainEqual(['p', '>'])
  })

  it('tokenizes flow punctuation', () => {
    const tokens = tokenize('{ key: value }')
    const types = tokens.map(([t]) => t)
    expect(types).toContain('p')
    const puncts = tokens.filter(([t]) => t === 'p').map(([, v]) => v)
    expect(puncts).toContain('{')
    expect(puncts).toContain('}')
  })

  it('tokenizes a list dash', () => {
    const tokens = tokenize('- item')
    expect(tokens).toContainEqual(['p', '-'])
  })

  it('captures plain scalar runs as a single text token', () => {
    const tokens = tokenize('venue: Berlin, Germany')
    const textTokens = tokens.filter(([t]) => t === 't').map(([, v]) => v)
    expect(textTokens).toContain('Berlin')
    expect(textTokens).toContain('Germany')
  })

  it('does not highlight numbers inside plain scalar identifiers', () => {
    const tokens = tokenize('ref: CIML/2004/1')
    const types = tokens.filter(([t]) => t === 'n')
    expect(types).toHaveLength(0)
  })

  it('handles empty input', () => {
    expect(tokenize('')).toEqual([])
  })

  it('handles whitespace-only input', () => {
    const tokens = tokenize('   \n\t  \n')
    expect(tokens.every(([t]) => t === 'ws')).toBe(true)
  })

  it('handles multi-line YAML with indentation', () => {
    const yaml = 'metadata:\n  title: Test\n  year: 2026'
    const tokens = tokenize(yaml)
    const keys = tokens.filter(([t]) => t === 'k').map(([, v]) => v)
    expect(keys).toEqual(['metadata', 'title', 'year'])
  })

  it('handles inline flow table keys', () => {
    const tokens = tokenize("{ start: '2025-10-13', end: '2025-10-17' }")
    const keys = tokens.filter(([t]) => t === 'k').map(([, v]) => v)
    expect(keys).toContain('start')
    expect(keys).toContain('end')
  })
})

describe('escapeHtml', () => {
  it('escapes ampersands', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b')
  })

  it('escapes less-than', () => {
    expect(escapeHtml('a < b')).toBe('a &lt; b')
  })

  it('escapes greater-than', () => {
    expect(escapeHtml('a > b')).toBe('a &gt; b')
  })

  it('escapes all three together', () => {
    expect(escapeHtml('<a>&')).toBe('&lt;a&gt;&amp;')
  })

  it('passes through strings with no special chars', () => {
    expect(escapeHtml('hello world')).toBe('hello world')
  })

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('')
  })
})

describe('render', () => {
  it('wraps key tokens in span.y-k', () => {
    const html = render([['k', 'title']])
    expect(html).toBe('<span class="y-k">title</span>')
  })

  it('wraps string tokens in span.y-s', () => {
    const html = render([['s', '"hello"']])
    expect(html).toBe('<span class="y-s">"hello"</span>')
  })

  it('wraps number tokens in span.y-n', () => {
    const html = render([['n', '42']])
    expect(html).toBe('<span class="y-n">42</span>')
  })

  it('wraps comment tokens in span.y-c', () => {
    const html = render([['c', '# comment']])
    expect(html).toBe('<span class="y-c"># comment</span>')
  })

  it('does not wrap whitespace tokens', () => {
    const html = render([['ws', '  ']])
    expect(html).toBe('  ')
  })

  it('does not wrap text tokens', () => {
    const html = render([['t', 'hello']])
    expect(html).toBe('hello')
  })

  it('does not wrap punctuation tokens', () => {
    const html = render([['p', ':']])
    expect(html).toBe(':')
  })

  it('escapes HTML entities in token values', () => {
    const html = render([['t', '<script>']])
    expect(html).toBe('&lt;script&gt;')
  })
})

describe('highlight (end-to-end)', () => {
  it('tokenizes and renders a full YAML snippet', () => {
    const yaml = 'title: "Hello"\nyear: 2026'
    const html = highlight(yaml)
    expect(html).toContain('<span class="y-k">title</span>')
    expect(html).toContain('<span class="y-s">"Hello"</span>')
    expect(html).toContain('<span class="y-k">year</span>')
    expect(html).toContain('<span class="y-n">2026</span>')
  })

  it('does not produce self-referencing span artifacts', () => {
    const yaml = 'key: value'
    const html = highlight(yaml)
    expect(html).not.toContain('class="y-s">"y-')
    expect(html).not.toContain('class=<span')
  })

  it('preserves newlines', () => {
    const html = highlight('a: 1\nb: 2')
    expect(html).toContain('\n')
  })
})
