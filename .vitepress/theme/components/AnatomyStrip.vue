<script setup lang="ts">
// Three primary entity concepts the homepage anchors on.
// Order: Meeting (the event itself), then the procedural core
// (Motion → Voting → Decision), then MeetingExtension (the profile
// mechanism that lets adopters extend the generic core).
</script>

<template>
  <section class="band">
    <header class="band-head">
      <span class="band-eyebrow">01 · The model</span>
      <h2>Generic core, profile-extensible</h2>
      <p class="band-lede">
        Three layers — a <code>Meeting</code> carries its <code>Venues</code>,
        <code>Officers</code>, <code>Agenda</code>, <code>Components</code>;
        a procedural core of <code>Motion</code> → <code>Voting</code> →
        <code>Decision</code> captures how the meeting decides; and a
        <code>MeetingExtension</code> slot on every entity lets adopters
        add domain-specific fields without modifying the core.
      </p>
    </header>

    <div class="anatomy">
      <article class="anatomy-card">
        <div class="anatomy-num">1</div>
        <h3>Meeting</h3>
        <p class="anatomy-mono">identifier · venues[] · officers[] · agenda · components[]</p>
        <p class="anatomy-body">
          The event. Polymorphic <code>Venue</code>s (physical with
          UN/LOCODE + IATA, virtual with URI + features),
          <code>Officer</code>s by role, an <code>Agenda</code> of
          business, flat <code>MeetingComponent</code>s (sessions,
          breakouts, keynotes), <code>Attendance</code>, and
          <code>Minutes</code>. See
          <a href="/docs/meeting-collection">Meeting Collection</a>.
        </p>
      </article>

      <article class="anatomy-card">
        <div class="anatomy-num">2</div>
        <h3>Motion → Voting → Decision</h3>
        <p class="anatomy-mono">procedural state machines</p>
        <p class="anatomy-body">
          A <code>Motion</code> is introduced and seconded; a
          <code>Voting</code> captures method and counts; if carried,
          the motion's <code>resulting_decision</code> URN points to the
          <code>Decision</code>. Multiple votings on the same motion
          (voice → division) are first-class. See
          <a href="/docs/motion">Motion</a> / <a href="/docs/voting">Voting</a>.
        </p>
      </article>

      <article class="anatomy-card">
        <div class="anatomy-num">3</div>
        <h3>MeetingExtension</h3>
        <p class="anatomy-mono">profile · kind · attributes[]</p>
        <p class="anatomy-body">
          The ISO 8601-2 §15 profile mechanism. Every core entity has an
          <code>extensions[]</code> slot. Adopters register a profile
          namespace (legco, ietf, us-congress) and define extension
          kinds within it. Consumers ignore profiles they don't
          understand. See <a href="/docs/extension">Meeting Extension</a>.
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
