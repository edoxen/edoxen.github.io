<script setup lang="ts">
// Slim orchestrator. Each section owns its own template + scoped styles.
// HomePage just composes them.
import HeroSection from './HeroSection.vue'
import AnatomyStrip from './AnatomyStrip.vue'
import PipelineDiagram from './PipelineDiagram.vue'
import FeatureGrid from './FeatureGrid.vue'
import CtaBand from './CtaBand.vue'
</script>

<template>
  <div class="home">
    <HeroSection />
    <AnatomyStrip />

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
        <PipelineDiagram :caption="false" />
      </div>
    </section>

    <FeatureGrid />
    <CtaBand />
  </div>
</template>

<style scoped>
.home {
  font-family: var(--edoxen-font-body);
  color: var(--vp-c-text-1);
}

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
</style>
