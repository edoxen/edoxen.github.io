// YAML syntax-highlighting tokenizer.
// Single-pass walker — never re-processes its own output.
// Used by <YamlSpecimen> on the home page; available to any future
// page that wants to render YAML with the same highlighting.
//
// The interface is intentionally string-in-string-out so this module
// can be tested without mounting any Vue component.

export type TokenType = 'k' | 's' | 'n' | 'c' | 'p' | 't' | 'ws'
export type Token = [TokenType, string]

export function tokenize(yaml: string): Token[] {
  const tokens: Token[] = []
  const n = yaml.length
  let i = 0

  while (i < n) {
    const rest = yaml.slice(i)

    const ws = rest.match(/^[ \t]+/)
    if (ws) {
      tokens.push(['ws', ws[0]])
      i += ws[0].length
      continue
    }

    if (rest[0] === '\n') {
      tokens.push(['ws', '\n'])
      i++
      continue
    }

    const comment = rest.match(/^#[^\n]*/)
    if (comment) {
      tokens.push(['c', comment[0]])
      i += comment[0].length
      continue
    }

    // Key — identifier followed by ':' then whitespace or EOL
    const keyMatch = rest.match(/^([A-Za-z_][A-Za-z0-9_]*):(?=[\s]|$)/)
    if (keyMatch) {
      tokens.push(['k', keyMatch[1]])
      tokens.push(['p', ':'])
      i += keyMatch[1].length + 1
      continue
    }

    const strD = rest.match(/^"(?:[^"\\]|\\.)*"/)
    if (strD) {
      tokens.push(['s', strD[0]])
      i += strD[0].length
      continue
    }

    const strS = rest.match(/^'(?:[^'\\]|\\.)*'/)
    if (strS) {
      tokens.push(['s', strS[0]])
      i += strS[0].length
      continue
    }

    const num = rest.match(/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/)
    if (num) {
      tokens.push(['n', num[0]])
      i += num[0].length
      continue
    }

    if (rest[0] === '|' || rest[0] === '>') {
      tokens.push(['p', rest[0]])
      i++
      continue
    }

    if (rest[0] && '{}[],:-'.includes(rest[0])) {
      tokens.push(['p', rest[0]])
      i++
      continue
    }

    // Plain scalar run — maximal sequence of chars that aren't special.
    // Catches unquoted values like 'Berlin, Germany' or 'CIML/2004/1'
    // as a single text token (so numbers inside them aren't单独 highlighted).
    const scalar = rest.match(/^[^{}\[\],:\s#"'|>][^{}\[\],:\s#"'|>]*/)
    if (scalar) {
      tokens.push(['t', scalar[0]])
      i += scalar[0].length
      continue
    }

    tokens.push(['t', rest[0]])
    i++
  }

  return tokens
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// String → highlighted HTML. Each non-whitespace, non-text token is
// wrapped in <span class="y-<type>">. Token-type → class mapping lives
// here, not in CSS, so the render is testable end-to-end.
export function render(tokens: Token[]): string {
  return tokens
    .map(([type, value]) => {
      const esc = escapeHtml(value)
      if (type === 'ws' || type === 't' || type === 'p') return esc
      return `<span class="y-${type}">${esc}</span>`
    })
    .join('')
}

// Convenience — tokenize + render in one call.
export function highlight(yaml: string): string {
  return render(tokenize(yaml))
}
