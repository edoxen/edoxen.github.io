<script setup lang="ts">
// Canonical Parse → Decode → Validate diagram.
// Used by HomePage and by docs/architecture.md + docs/localization-sync.md.
// One source of truth — marker IDs, font tokens, and stage labels all
// live here.
//
// Optional `caption` prop lets each call site choose whether to show
// the trailing CLI one-liner. Default: show.
withDefaults(defineProps<{ caption?: boolean }>(), { caption: true })
</script>

<template>
  <svg viewBox="0 0 1080 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Round-trip pipeline">
    <defs>
      <marker id="pipeline-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="currentColor"/>
      </marker>
    </defs>

    <!-- Stage 1: Parse -->
    <g transform="translate(20, 50)">
      <rect width="220" height="110" rx="12" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
      <text x="20" y="34" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-3)" letter-spacing="1">01</text>
      <text x="20" y="58" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Parse</text>
      <text x="20" y="80" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">YAML.safe_load</text>
      <text x="20" y="96" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">→ Ruby Hash</text>
    </g>

    <line x1="250" y1="105" x2="310" y2="105" stroke="var(--vp-c-brand-1)" stroke-width="2" marker-end="url(#pipeline-arrow)"/>

    <!-- Stage 2: Decode (the deep one) -->
    <g transform="translate(320, 50)">
      <rect width="260" height="110" rx="12" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2"/>
      <text x="20" y="34" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-brand-1)" letter-spacing="1">02</text>
      <text x="20" y="58" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Decode</text>
      <text x="20" y="80" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">ResolutionCollection.from_yaml</text>
      <text x="20" y="96" font-family="var(--edoxen-font-body)" font-size="10" fill="var(--vp-c-text-3)" font-style="italic">→ typed object tree (lutaml-model)</text>
    </g>

    <line x1="590" y1="105" x2="650" y2="105" stroke="var(--vp-c-brand-1)" stroke-width="2" marker-end="url(#pipeline-arrow)"/>

    <!-- Stage 3: Validate -->
    <g transform="translate(660, 50)">
      <rect width="220" height="110" rx="12" fill="var(--vp-c-bg)" stroke="var(--vp-c-gold)" stroke-width="1.5"/>
      <text x="20" y="34" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-gold)" letter-spacing="1">03</text>
      <text x="20" y="58" font-family="var(--edoxen-font-display)" font-size="17" font-weight="500" fill="var(--vp-c-text-1)">Validate</text>
      <text x="20" y="80" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">JSONSchemer.schema(</text>
      <text x="20" y="94" font-family="var(--edoxen-font-mono)" font-size="11" fill="var(--vp-c-text-2)">  schema/edoxen.yaml)</text>
    </g>

    <line x1="890" y1="105" x2="950" y2="105" stroke="var(--vp-c-text-3)" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#pipeline-arrow)"/>

    <!-- Stage 4: outcome -->
    <g transform="translate(960, 50)">
      <rect width="100" height="110" rx="12" fill="var(--vp-c-bg)" stroke="var(--vp-c-divider)" stroke-width="1.5"/>
      <text x="50" y="38" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-1)" text-anchor="middle">Pass</text>
      <text x="50" y="60" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="var(--vp-c-text-3)" text-anchor="middle">|</text>
      <text x="50" y="82" font-family="var(--edoxen-font-display)" font-size="14" font-weight="500" fill="#b91c1c" text-anchor="middle">Error[]</text>
      <text x="50" y="100" font-family="var(--edoxen-font-body)" font-size="9" fill="var(--vp-c-text-3)" text-anchor="middle" font-style="italic">with pointer</text>
    </g>

    <text v-if="caption" x="20" y="200" font-family="var(--edoxen-font-body)" font-size="12" fill="var(--vp-c-text-3)">
      One CLI command: <tspan font-family="var(--edoxen-font-mono)" fill="var(--vp-c-brand-1)" font-weight="600">edoxen validate resolutions/*.yaml</tspan>. No bespoke parsers, no bespoke serializers.
    </text>
  </svg>
</template>
