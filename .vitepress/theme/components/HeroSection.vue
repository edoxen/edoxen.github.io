<script setup lang="ts">
import YamlSpecimen from './YamlSpecimen.vue'
import { stats } from '../data/home'
</script>

<template>
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-prose">
        <div class="eyebrow">
          <span class="eyebrow-greek">ἔδοξεν</span>
          <span class="eyebrow-rule"></span>
          <span class="eyebrow-label">Information model · v1.0</span>
        </div>

        <h1 class="hero-title">
          Proceedings,<br>
          <em>structured.</em>
        </h1>

        <p class="hero-lede">
          Edoxen is the common substrate for formal proceedings across
          ISO, IEC, ITU, BIPM, OIML, and ILO — meetings, agendas,
          minutes, attendance, votes, and the resolutions adopted, in
          one YAML shape, multilingual by default.
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
</template>

<style scoped>
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
    /* minmax(0, 1fr) — NOT plain 1fr — so the column can shrink below
       the <pre>'s intrinsic width. Plain 1fr expands to min-content,
       which on a 375px viewport forces the column past the edge and
       creates a page-level horizontal scrollbar. */
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem 2.25rem;
  }
  .hero-title {
    font-size: clamp(2.4rem, 11vw, 3.4rem);
  }
  .hero-lede {
    font-size: 1.05rem;
  }
}

@media (max-width: 420px) {
  .hero {
    padding: 2.5rem 0.85rem 2rem;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
