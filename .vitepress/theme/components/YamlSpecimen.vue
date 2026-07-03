<script setup lang="ts">
// The specimen is a thin adapter: it owns the YAML string and the
// presentation; tokenization lives in lib/yaml-tokenizer.ts so it
// can be reused by any future YAML-heavy page (parse-yaml docs,
// blog posts, etc.).
import { highlight } from '../lib/yaml-tokenizer'

const specimenYaml = `identifier:
  - prefix: ACME
    number: "2026-Q1-Board"
urn: urn:acme:board:meeting:2026-q1
type: board_meeting
status: completed
visibility: confidential

date_range:
  start: 2026-03-15
  end:   2026-03-15

venues:
  - kind: physical
    name: Acme Boardroom
    unlocode: USNYC
    country_code: US
  - kind: virtual
    name: Video Conference
    uri: https://teams.microsoft.com/l/meetup-join/acme-board
    features: [audio, video, screen]

officers:
  - role: chair
    person: { name: Ms. Eleanor Vance }

motions:
  - identifier: motion-dividend-2026-q1
    text: |
      I move that the Board declare a quarterly dividend of $0.45
      per share, payable on April 15, 2026.
    status: carried
    resulting_decision: urn:acme:board:decision:2026-q1-dividend

votings:
  - on_motion: urn:acme:board:motion:2026-q1-dividend
    status: decided
    voting_method: roll_call
    result: passed
    counts: { ayes: 4, noes: 2 }

decisions:
  - identifier:
      - prefix: ACME
        number: "2026-Q1-001"
    kind: order
    status: decided
    urn: urn:acme:board:decision:2026-q1-dividend
    localizations:
      - language_code: eng
        title: Board Order Declaring Q1 2026 Dividend
        actions:
          - type: orders
            message: |
              The Board orders a quarterly dividend of $0.45
              per share, payable April 15, 2026.`

const highlighted = highlight(specimenYaml)
</script>

<template>
  <figure class="specimen">
    <figcaption class="specimen-head">
      <span class="specimen-tag">SPECIMEN</span>
      <span class="specimen-meta">
        <code>acme-board-2026-q1.yaml</code>
        <span class="dot">·</span>
        <span>Meeting</span>
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
    0 30px 60px -20px var(--edoxen-cyan-glow-soft),
    0 12px 24px -12px rgba(0, 0, 0, 0.08);
  font-family: var(--edoxen-font-mono);
  /* position:relative so the ::after fade can anchor to the card. */
  position: relative;
}

.dark .specimen {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 30px 60px -20px var(--edoxen-cyan-300-glow),
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
  .specimen {
    border-radius: 12px;
  }
  .specimen-head {
    padding: 0.55rem 0.85rem;
    font-size: 0.72rem;
    gap: 0.5rem;
  }
  .specimen-tag {
    font-size: 0.62rem;
    padding: 0.12rem 0.4rem;
    letter-spacing: 0.12em;
  }
  .specimen-code {
    font-size: 0.68rem;
    padding: 0.85rem 0.9rem;
    line-height: 1.55;
  }
  /* Right-edge fade — communicates "swipe to see more" without a
     page-level scrollbar. Anchored to the card, not the <pre>, so
     it stays fixed while the YAML scrolls underneath. */
  .specimen::after {
    content: '';
    position: absolute;
    top: 2.1rem;
    right: 0;
    bottom: 2.4rem;
    width: 28px;
    background: linear-gradient(to right, transparent 0%, var(--vp-c-bg-alt) 85%);
    pointer-events: none;
    z-index: 1;
    border-bottom-right-radius: 12px;
  }
}

/* Very narrow phones (≤380px) — shrink further so a typical YAML
   line has a fighting chance of fitting without scroll. */
@media (max-width: 380px) {
  .specimen-code {
    font-size: 0.62rem;
    padding: 0.75rem 0.8rem;
    line-height: 1.5;
  }
  .specimen::after {
    width: 22px;
  }
}

/* Slim, unobtrusive scrollbar inside the specimen — the default
   chunky scrollbar dominates the card on mobile. */
.specimen-code {
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}
.specimen-code::-webkit-scrollbar {
  height: 6px;
}
.specimen-code::-webkit-scrollbar-track {
  background: transparent;
}
.specimen-code::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}
.specimen-code::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-3);
}
</style>
