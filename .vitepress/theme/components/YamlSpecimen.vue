<script setup lang="ts">
// Tiny YAML syntax highlighter — wraps tokens in spans.
// Deliberately minimal: keys, strings, numbers, comments, punctuation.
// Anything more sophisticated belongs in Shiki, but Shiki inside a Vue
// template requires async loading; this is good enough for a hero specimen.

function highlight(yaml: string): string {
  // Escape HTML first
  let s = yaml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments
  s = s.replace(/(^|\s)(#.*)$/gm, '$1<span class="y-c">$2</span>')

  // Keys (word: at start of line or after dash-space)
  s = s.replace(
    /^(\s*-?\s*)([A-Za-z_][A-Za-z0-9_]*)(:)/gm,
    '$1<span class="y-k">$2</span>$3'
  )

  // Inline-table keys { key: ... }
  s = s.replace(
    /(\{|,\s*)([A-Za-z_][A-Za-z0-9_]*)(:)/g,
    '$1<span class="y-k">$2</span>$3'
  )

  // Strings — double-quoted
  s = s.replace(/"([^"]*)"/g, '<span class="y-s">"$1"</span>')
  // Strings — single-quoted
  s = s.replace(/'([^']*)'/g, "<span class=\"y-s\">'$1'</span>")

  // Numbers
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="y-n">$1</span>')

  // Block scalars (|)
  s = s.replace(/(\|)(\s*)$/gm, '<span class="y-p">$1</span>$2')

  return s
}

const specimenYaml = `metadata:
  title: 39th CIML Meeting — Decisions
  dates:
    - { start: '2004-10-26', end: '2004-10-29', kind: meeting }
  venue: Berlin, Germany
  city: BER
  country_code: DE

resolutions:
  - identifier: CIML/2004/1
    doi: 10.63493/resolutions/ciml200401
    urn:  urn:oiml:doc:ciml:resolution:2004-1
    dates:
      - { start: '2004-10-26', kind: decision }
    localizations:
      - language_code: eng
        script: Latn
        title: Approval of the minutes of the 38th CIML Meeting
        actions:
          - type: approves
            message: |
              The Committee approved the minutes of its 38th Meeting
              without modification.
      - language_code: fra
        script: Latn
        title: Approbation du procès-verbal de la 38e réunion du CIML
        actions:
          - type: approves
            message: |
              Le Comité a approuvé le procès-verbal de sa 38e réunion
              sans modification.`

const highlighted = highlight(specimenYaml)
</script>

<template>
  <figure class="specimen">
    <figcaption class="specimen-head">
      <span class="specimen-tag">SPECIMEN</span>
      <span class="specimen-meta">
        <code>ciml-39-decisions.yaml</code>
        <span class="dot">·</span>
        <span>EN + FR</span>
      </span>
      <span class="specimen-valid" title="Schema-validated">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        valid
      </span>
    </figcaption>
    <pre class="specimen-code"><code v-html="highlighted"></code></pre>
    <div class="specimen-footer">
      <a href="/docs/schema" class="specimen-link">
        Read the schema
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  </figure>
</template>

<style scoped>
.specimen {
  margin: 0;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.6) inset,
    0 30px 60px -20px rgba(14, 116, 144, 0.18),
    0 12px 24px -12px rgba(0, 0, 0, 0.08);
  font-family: var(--edoxen-font-mono);
}

.dark .specimen {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 30px 60px -20px rgba(103, 232, 249, 0.18),
    0 12px 24px -12px rgba(0, 0, 0, 0.4);
}

.specimen-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--edoxen-font-body);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-3);
}

.specimen-tag {
  font-family: var(--edoxen-font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

.specimen-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
}

.specimen-meta code {
  font-family: var(--edoxen-font-mono);
  color: var(--vp-c-text-2);
}

.specimen-meta .dot {
  color: var(--vp-c-text-3);
}

.specimen-valid {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #16a34a;
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: 0.04em;
}

.dark .specimen-valid {
  color: #4ade80;
}

.specimen-code {
  margin: 0;
  padding: 1.1rem 1.25rem;
  overflow-x: auto;
  font-family: var(--edoxen-font-mono);
  font-size: 0.78rem;
  line-height: 1.65;
  background: transparent;
  color: var(--vp-c-text-1);
}

.specimen-code code {
  font-family: inherit;
  white-space: pre;
}

/* YAML token colours */
:deep(.y-k) {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
:deep(.y-s) {
  color: var(--vp-c-gold);
}
:deep(.y-n) {
  color: #7c3aed;
}
.dark :deep(.y-n) {
  color: #c084fc;
}
:deep(.y-c) {
  color: var(--vp-c-text-3);
  font-style: italic;
}
:deep(.y-p) {
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.specimen-footer {
  padding: 0.5rem 1rem 0.75rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--vp-c-divider-light);
  background: var(--vp-c-bg-soft);
}

.specimen-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--edoxen-font-body);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.specimen-link:hover {
  background: var(--vp-c-brand-soft);
}

@media (max-width: 768px) {
  .specimen-code {
    font-size: 0.72rem;
    padding: 0.9rem 1rem;
  }
}
</style>
