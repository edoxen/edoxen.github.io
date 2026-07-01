<script setup lang="ts">
import { features } from '../data/home'
</script>

<template>
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
</template>

<style scoped>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 1rem;
}

@media (max-width: 540px) {
  .features {
    grid-template-columns: minmax(0, 1fr);
  }
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
  box-shadow: 0 10px 24px -10px var(--edoxen-cyan-glow-soft);
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
</style>
