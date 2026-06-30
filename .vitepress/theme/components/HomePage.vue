<script setup lang="ts">
import YamlSpecimen from './YamlSpecimen.vue'

const features = [
  {
    title: 'One model, every body',
    body: 'A single Resolution shape captures what ISO, IEC, ITU, BIPM, OIML, and ILO have in common. Per-body quirks live in enum extensions, not in per-body schemas.',
    href: '/docs/introduction',
    glyph: '□',
  },
  {
    title: 'Multilingual by default',
    body: 'EN + FR (or any ISO 639-3 pair) live as siblings inside one file. Drift shows up on git diff, not on a translator\'s spreadsheet.',
    href: '/docs/multilingual',
    glyph: '⇄',
  },
  {
    title: 'Schema-validated wire format',
    body: 'A JSON Schema (Draft 7) locks the YAML. edoxen validate catches typos, regex mismatches, and enum drift before they ship.',
    href: '/docs/schema',
    glyph: '✓',
  },
  {
    title: 'No hand-rolled serialization',
    body: 'Built on lutaml-model. Round-trip YAML → Ruby → YAML is a property of the framework, not of bespoke to_yaml code that drifts.',
    href: 'https://github.com/lutaml/lutaml-model',
    glyph: '↻',
  },
  {
    title: 'CLI for batch pipelines',
    body: 'edoxen validate and edoxen normalize across globs. Drop into CI; one command checks every resolution in the repo.',
    href: '/docs/cli',
    glyph: '▶',
  },
  {
    title: 'Real-world tested',
    body: 'Validated against 1,640 OIML resolutions across 28 meetings in EN + FR — 3,280 Localization entries exercising every code path.',
    href: 'https://github.com/oimlsmart/resolutions-data',
    glyph: 'στα',
  },
]

const stats = [
  { value: '1,640', label: 'OIML resolutions encoded' },
  { value: '28', label: 'meetings, EN + FR' },
  { value: '6', label: 'standards bodies modelled' },
  { value: '0', label: 'hand-rolled serializers' },
]
</script>

<template>
  <div class="home">

    <!-- ── Hero ──────────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-prose">
          <div class="eyebrow">
            <span class="eyebrow-greek">ἔδοξεν</span>
            <span class="eyebrow-rule"></span>
            <span class="eyebrow-label">Information model · v1.0</span>
          </div>

          <h1 class="hero-title">
            Resolutions,<br>
            <em>structured.</em>
          </h1>

          <p class="hero-lede">
            Edoxen is the common substrate for formal resolutions across
            ISO, IEC, ITU, BIPM, OIML, and ILO — one YAML shape, one
            schema, one round-trip pipeline, multilingual by default.
          </p>

          <div class="hero-actions">
            <a class="btn btn-primary" href="/docs/introduction">
              Read the introduction
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a class="btn btn-ghost" href="/docs/architecture">
              See the architecture
            </a>
          </div>

          <dl class="stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <dt>{{ s.value }}</dt>
              <dd>{{ s.label }}</dd>
            </div>
          </dl>
        </div>

        <div class="hero-specimen">
          <YamlSpecimen />
          <p class="specimen-caption">
            A single <code>.yaml</code> file. One <code>Resolution</code>,
            two <code>Localization</code> entries. Schema-valid.
          </p>
        </div>
      </div>
    </section>

    <!-- ── Anatomy ───────────────────────────────────────────────────── -->
    <section class="band">
      <header class="band-head">
        <span class="band-eyebrow">01 · The model</span>
        <h2>Three layers, no surprises</h2>
        <p class="band-lede">
          Every Edoxen file is built from the same three layers.
          Admin fields live on the parent; per-language content lives
          on the children; verbs and dates are enum-restricted.
        </p>
      </header>

      <div class="anatomy">
        <article class="anatomy-card">
          <div class="anatomy-num">1</div>
          <h3>ResolutionSet</h3>
          <p class="anatomy-mono">metadata + resolutions[]</p>
          <p class="anatomy-body">
            The container. Carries the meeting metadata (title, dates,
            venue, city, country) and an array of <code>Resolution</code>
            children. One file per meeting.
          </p>
        </article>

        <article class="anatomy-card">
          <div class="anatomy-num">2</div>
          <h3>Resolution</h3>
          <p class="anatomy-mono">identifier · doi · urn · dates · localizations[]</p>
          <p class="anatomy-body">
            The decision itself. Admin fields (id, DOI, URN, dates) are
            declared <em>once</em> — they don't change between languages.
            Holds a <code>localizations[]</code> array of monolingual
            renderings.
          </p>
        </article>

        <article class="anatomy-card">
          <div class="anatomy-num">3</div>
          <h3>Localization</h3>
          <p class="anatomy-mono">language_code · script · title · actions[]</p>
          <p class="anatomy-body">
            One per language. ISO 639-3 + ISO 15924. Carries the title,
            subject, considerations, actions, approvals — everything a
            translator touches, in one block.
          </p>
        </article>
      </div>

      <p class="band-cta">
        <a href="/docs/architecture">→ Walk through the architecture</a>
      </p>
    </section>

    <!-- ── Round-trip diagram ────────────────────────────────────────── -->
    <section class="band band-alt">
      <header class="band-head">
        <span class="band-eyebrow">02 · The pipeline</span>
        <h2>YAML in, YAML out — no drift</h2>
        <p class="band-lede">
          Parse, decode, validate, re-serialize. Every step is a
          framework call, not hand-rolled code. The wire format is
          locked at the schema layer.
        </p>
      </header>

      <div class="pipeline-diagram">
        <svg viewBox="0 0 1100 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="YAML round-trip pipeline">
          <defs>
            <marker id="pipe-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
            </marker>
          </defs>

          <!-- Stage 1: YAML file -->
          <g transform="translate(20, 50)">
            <rect width="200" height="100" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
            <text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="14" font-weight="600" fill="var(--vp-c-text-1)">YAML on disk</text>
            <text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">*.yaml</text>
            <text x="20" y="78" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">text · utf-8 · indented</text>
          </g>

          <line x1="230" y1="100" x2="290" y2="100" stroke="var(--vp-c-text-3)" stroke-width="2" marker-end="url(#pipe-arrow)"/>

          <!-- Stage 2: Parse -->
          <g transform="translate(300, 50)">
            <rect width="200" height="100" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-brand-1)" stroke-width="1.5"/>
            <text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="14" font-weight="600" fill="var(--vp-c-text-1)">1. Parse</text>
            <text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">Psych.safe_load</text>
            <text x="20" y="78" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">→ Ruby Hash</text>
          </g>

          <line x1="510" y1="100" x2="570" y2="100" stroke="var(--vp-c-text-3)" stroke-width="2" marker-end="url(#pipe-arrow)"/>

          <!-- Stage 3: Decode -->
          <g transform="translate(580, 50)">
            <rect width="220" height="100" rx="10" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
            <text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="14" font-weight="600" fill="var(--vp-c-text-1)">2. Decode</text>
            <text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">ResolutionSet</text>
            <text x="20" y="74" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">.from_yaml(hash)</text>
            <text x="20" y="92" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">lutaml-model</text>
          </g>

          <line x1="810" y1="100" x2="870" y2="100" stroke="var(--vp-c-text-3)" stroke-width="2" marker-end="url(#pipe-arrow)"/>

          <!-- Stage 4: Validate -->
          <g transform="translate(880, 50)">
            <rect width="200" height="100" rx="10" fill="var(--vp-c-bg)" stroke="var(--vp-c-gold)" stroke-width="1.5"/>
            <text x="20" y="32" font-family="var(--edoxen-font-display)" font-size="14" font-weight="600" fill="var(--vp-c-text-1)">3. Validate</text>
            <text x="20" y="56" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">JSONSchemer.schema(</text>
            <text x="20" y="74" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">schema/edoxen.yaml)</text>
            <text x="20" y="92" font-family="var(--edoxen-font-mono)" font-size="10" fill="var(--vp-c-text-3)">pass | SchemaError[]</text>
          </g>

          <!-- Legend -->
          <text x="20" y="180" font-family="var(--edoxen-font-body)" font-size="11" fill="var(--vp-c-text-3)">
            One CLI command runs all three: <tspan font-family="var(--edoxen-font-mono)" fill="var(--vp-c-brand-1)" font-weight="600">edoxen validate resolutions/*.yaml</tspan>
          </text>
        </svg>
      </div>
    </section>

    <!-- ── Features ──────────────────────────────────────────────────── -->
    <section class="band">
      <header class="band-head">
        <span class="band-eyebrow">03 · Why Edoxen</span>
        <h2>Six things it gets right</h2>
      </header>

      <div class="features">
        <a v-for="f in features" :key="f.title" :href="f.href" class="feature">
          <div class="feature-glyph">{{ f.glyph }}</div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.body }}</p>
          <span class="feature-arrow">→</span>
        </a>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────────────── -->
    <section class="cta">
      <div class="cta-inner">
        <p class="cta-eyebrow">Get started</p>
        <h2>Model your first resolution in five minutes.</h2>
        <pre class="cta-cli"><code>gem install edoxen
edoxen validate resolutions/*.yaml</code></pre>
        <div class="cta-actions">
          <a class="btn btn-primary" href="/docs/installation">Install the gem</a>
          <a class="btn btn-ghost" href="https://github.com/metanorma/edoxen">View on GitHub</a>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home {
  font-family: var(--edoxen-font-body);
  color: var(--vp-c-text-1);
}

/* ── Hero ──────────────────────────────────────────────────────────── */
.hero {
  max-width: 1180px;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 3.5rem;
  align-items: center;
}

@media (max-width: 980px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  animation: fadeUp 0.6s ease both;
}

.eyebrow-greek {
  font-family: var(--edoxen-font-display);
  font-size: 1rem;
  font-style: italic;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.eyebrow-rule {
  flex: 0 0 28px;
  height: 1px;
  background: var(--vp-c-divider);
}

.eyebrow-label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.hero-title {
  font-family: var(--edoxen-font-display);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: var(--vp-c-text-1);
  margin: 0 0 1.5rem;
  animation: fadeUp 0.7s 0.1s ease both;
}

.hero-title em {
  font-style: italic;
  font-weight: 300;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-lede {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 38ch;
  margin: 0 0 2rem;
  animation: fadeUp 0.7s 0.2s ease both;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  animation: fadeUp 0.7s 0.3s ease both;
}

/* (.btn, .btn-primary, .btn-ghost live in custom.css so they're
   reusable across pages — about, blog CTAs, etc.) */

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  animation: fadeUp 0.7s 0.4s ease both;
}

@media (max-width: 540px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat dt {
  font-family: var(--edoxen-font-display);
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat dd {
  margin: 0.3rem 0 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.35;
}

.hero-specimen {
  animation: fadeUp 0.8s 0.25s ease both;
}

.specimen-caption {
  margin: 0.85rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  text-align: right;
}

.specimen-caption code {
  font-family: var(--edoxen-font-mono);
  color: var(--vp-c-brand-1);
  font-size: 0.85em;
}

@media (max-width: 980px) {
  .specimen-caption {
    text-align: left;
  }
}

/* ── Band layout ───────────────────────────────────────────────────── */
.band {
  max-width: 1180px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

.band-alt {
  background: var(--vp-c-bg-soft);
  max-width: none;
  padding: 4rem 0;
}

.band-alt > * {
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.band-head {
  margin-bottom: 2.5rem;
  max-width: 60ch;
}

.band-eyebrow {
  display: inline-block;
  font-family: var(--edoxen-font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.6rem;
  font-weight: 500;
}

.band-head h2 {
  font-family: var(--edoxen-font-display);
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 0.85rem;
  color: var(--vp-c-text-1);
}

.band-lede {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin: 0;
}

.band-cta {
  margin: 2rem 0 0;
  font-family: var(--edoxen-font-body);
  font-size: 0.95rem;
}

.band-cta a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.band-cta a:hover {
  text-decoration: underline;
}

/* ── Anatomy ───────────────────────────────────────────────────────── */
.anatomy {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.anatomy-card {
  position: relative;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.6rem 1.5rem 1.4rem;
  transition: all 0.25s ease;
}

.anatomy-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -10px rgba(14, 116, 144, 0.25);
}

.anatomy-num {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  font-family: var(--edoxen-font-display);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--vp-c-brand-soft);
  color: rgba(14, 116, 144, 0.18);
  line-height: 1;
}

.dark .anatomy-num {
  color: rgba(103, 232, 249, 0.18);
}

.anatomy-card h3 {
  font-family: var(--edoxen-font-display);
  font-size: 1.35rem;
  font-weight: 500;
  margin: 0 0 0.4rem;
  color: var(--vp-c-text-1);
}

.anatomy-mono {
  font-family: var(--edoxen-font-mono);
  font-size: 0.78rem;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.85rem;
  letter-spacing: -0.01em;
}

.anatomy-body {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
}

.anatomy-body code {
  font-family: var(--edoxen-font-mono);
  font-size: 0.85em;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.1em 0.35em;
  border-radius: 3px;
}

/* ── Pipeline diagram ──────────────────────────────────────────────── */
.pipeline-diagram {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.25rem;
  color: var(--vp-c-text-2);
}

.pipeline-diagram svg {
  width: 100%;
  height: auto;
  display: block;
}

/* ── Features ──────────────────────────────────────────────────────── */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 1rem;
}

.feature {
  position: relative;
  display: block;
  padding: 1.5rem 1.5rem 1.4rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
  overflow: hidden;
}

.feature::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--vp-c-brand-1);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.25s ease;
}

.feature:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -10px rgba(14, 116, 144, 0.18);
}

.feature:hover::before {
  transform: scaleY(1);
}

.feature-glyph {
  font-family: var(--edoxen-font-display);
  font-size: 1.6rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.6rem;
  line-height: 1;
}

.feature h3 {
  font-family: var(--edoxen-font-display);
  font-size: 1.15rem;
  font-weight: 500;
  margin: 0 0 0.45rem;
  color: var(--vp-c-text-1);
}

.feature p {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
}

.feature-arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.4rem;
  color: var(--vp-c-text-3);
  font-size: 1.1rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s ease;
}

.feature:hover .feature-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--vp-c-brand-1);
}

/* ── CTA ───────────────────────────────────────────────────────────── */
.cta {
  background:
    radial-gradient(circle at 20% 50%, var(--vp-c-brand-soft), transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(180, 83, 9, 0.06), transparent 50%),
    var(--vp-c-bg-soft);
  padding: 5rem 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  margin-top: 2rem;
}

.cta-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.cta-eyebrow {
  font-family: var(--edoxen-font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin: 0 0 0.75rem;
}

.cta h2 {
  font-family: var(--edoxen-font-display);
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 1.5rem;
  color: var(--vp-c-text-1);
}

.cta-cli {
  display: inline-block;
  font-family: var(--edoxen-font-mono);
  font-size: 0.85rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem 1.4rem;
  text-align: left;
  color: var(--vp-c-text-1);
  margin: 0 0 1.5rem;
  line-height: 1.7;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
