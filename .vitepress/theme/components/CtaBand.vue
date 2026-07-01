<script setup lang="ts">
// The closing CTA — gradient band with the gem install snippet.
// Static content; no props.
</script>

<template>
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
</template>

<style scoped>
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
</style>
