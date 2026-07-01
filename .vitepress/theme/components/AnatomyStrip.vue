<script setup lang="ts">
// Three primary entity concepts the homepage anchors on.
// Order: outermost file root (MeetingCollection, the new container
// for meeting-level data), then Resolution (the YAML specimen's
// subject), then Localization (the multilingual plumbing).
</script>

<template>
  <section class="band">
    <header class="band-head">
      <span class="band-eyebrow">01 · The model</span>
      <h2>Three layers, no surprises</h2>
      <p class="band-lede">
        Admin fields live on the parent; per-language content lives on
        the children; verbs and dates are enum-restricted. The same
        shape applies whether you model a
        <code>MeetingCollection</code> or a
        <code>ResolutionCollection</code>.
      </p>
    </header>

    <div class="anatomy">
      <article class="anatomy-card">
        <div class="anatomy-num">1</div>
        <h3>MeetingCollection</h3>
        <p class="anatomy-mono">metadata + meetings[]</p>
        <p class="anatomy-body">
          The meeting-grain container. Each <code>Meeting</code> owns
          its <code>Agenda</code>, <code>Minutes</code>,
          <code>Attendance</code>, <code>VoteRecord[]</code>, and the
          identifiers of the resolutions it adopted. See
          <a href="/docs/meeting-collection">Meeting Collection</a>.
        </p>
      </article>

      <article class="anatomy-card">
        <div class="anatomy-num">2</div>
        <h3>Resolution</h3>
        <p class="anatomy-mono">identifier · meeting · dates · localizations[]</p>
        <p class="anatomy-body">
          One decision. Admin fields (<code>identifier</code>, <code>doi</code>,
          <code>urn</code>, <code>meeting</code>, <code>dates</code>) are
          declared <em>once</em> — they don't change between
          languages. Holds a <code>localizations[]</code> array of
          monolingual renderings.
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
</template>

<style scoped>
.anatomy {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

@media (max-width: 540px) {
  .anatomy {
    grid-template-columns: minmax(0, 1fr);
  }
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
  box-shadow: 0 10px 24px -10px var(--edoxen-cyan-glow-card);
}

.anatomy-num {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  font-family: var(--edoxen-font-display);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--edoxen-cyan-glow-soft);
  line-height: 1;
}

.dark .anatomy-num {
  color: var(--edoxen-cyan-rim-bright);
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
</style>
