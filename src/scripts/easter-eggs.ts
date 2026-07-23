// Edoxen WAAPI Easter Eggs — Hidden Inscriptions
// ================================================
// Every egg ties back to Athenian democracy, inscription culture, or
// parliamentary procedure — the thematic core of the Edoxen project.
// All animations use the Web Animations API (element.animate()).
// Respects prefers-reduced-motion.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const discovered = new Set<string>()
const ALL_EGGS = ['stoichedon', 'assembly', 'gavel', 'resolve', 'lottery', 'ostracize', 'logo-chisel', 'eklesia', 'decree', 'boule', 'sacredfire', 'scribe', 'marathon', 'symposium', 'prophecy'] as const

function discover(name: typeof ALL_EGGS[number]) {
  discovered.add(name)
  if (discovered.size === ALL_EGGS.length) {
    setTimeout(finalInscription, 1500)
  }
}

function overlay(z = 99999): HTMLDivElement {
  const div = document.createElement('div')
  div.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:${z};overflow:hidden;`
  document.body.appendChild(div)
  return div
}

function chipBurst(container: HTMLElement, x: number, y: number, color: string, count = 8) {
  for (let i = 0; i < count; i++) {
    const chip = document.createElement('div')
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
    const dist = 40 + Math.random() * 60
    chip.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${3+Math.random()*4}px;height:${3+Math.random()*4}px;background:${color};border-radius:1px;`
    container.appendChild(chip)
    chip.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist + 40}px) rotate(${Math.random()*360}deg)`, opacity: 0 },
    ], { duration: 600 + Math.random() * 300, easing: 'ease-out', fill: 'forwards' })
  }
}

// ================================================================
// 1. Stoichedon Cascade  — type "edoxen"
// The six letters Ε Δ Ο Ξ Ε Ν fall and chisel into a 3×2 grid.
// ================================================================
function stoichedonCascade() {
  const ov = overlay()
  const letters = ['Ε', 'Δ', 'Ο', 'Ξ', 'Ε', 'Ν']
  const cell = 130
  const cols = [0, 1, 2, 0, 1, 2]
  const rows = [0, 0, 0, 1, 1, 1]

  letters.forEach((letter, i) => {
    const el = document.createElement('div')
    el.textContent = letter
    el.style.cssText = `
      position:absolute;
      font-family:'Fraunces',Georgia,serif;
      font-size:6.5rem;font-weight:300;
      color:#e0b04a;
      text-shadow:0 0 40px rgba(224,176,74,0.6),0 2px 0 rgba(0,0,0,0.3);
      width:${cell}px;height:${cell}px;
      display:flex;align-items:center;justify-content:center;
      left:calc(50% + ${(cols[i]-1)*cell}px);
      top:calc(50% + ${(rows[i]-0.5)*cell}px - ${cell/2}px);
      transform:translateY(-50vh) scale(0.6);
      opacity:0;
    `
    ov.appendChild(el)

    const landDelay = i * 100
    el.animate([
      { transform: 'translateY(-50vh) scale(0.6)', opacity: 0 },
      { transform: `translateY(0) scale(1.25)`, opacity: 1, offset: 0.75 },
      { transform: 'translateY(0) scale(1)', opacity: 1 },
    ], {
      duration: reducedMotion ? 1 : 550,
      delay: reducedMotion ? i * 10 : landDelay,
      easing: 'cubic-bezier(0.55,0.085,0.68,0.53)',
      fill: 'forwards',
    }).onfinish = () => {
      el.animate([
        { filter: 'brightness(1)' },
        { filter: 'brightness(3)', offset: 0.3 },
        { filter: 'brightness(1)' },
      ], { duration: 500, fill: 'forwards' })
      chipBurst(ov, el.offsetLeft + cell/2, el.offsetTop + cell/2, '#d4a017', 6)
    }
  })

  setTimeout(() => {
    ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, fill: 'forwards' })
    setTimeout(() => ov.remove(), 800)
  }, letters.length * 100 + 1800)

  discover('stoichedon')
}

// ================================================================
// 2. The Assembly Convokes  — Konami code (↑↑↓↓←→←→BA)
// Tiny decree-stele silhouettes march across the screen.
// ================================================================
function assemblyMarch() {
  const ov = overlay()
  const count = 16
  const steleHTML = `<svg width="18" height="36" viewBox="0 0 18 36">
    <path d="M4 36 L3 8 Q3 3 9 2 Q15 3 15 8 L14 36 Z" fill="currentColor"/>
    <circle cx="9" cy="6" r="2" fill="currentColor" opacity="0.7"/>
  </svg>`

  const banner = document.createElement('div')
  banner.textContent = 'ἔδοξεν — the Assembly convokes'
  banner.style.cssText = `
    position:absolute;bottom:60px;left:-400px;
    font-family:'Fraunces',Georgia,serif;
    font-size:1.4rem;font-style:italic;
    color:#e0b04a;text-shadow:0 0 20px rgba(224,176,74,0.4);
    white-space:nowrap;
  `
  ov.appendChild(banner)

  for (let i = 0; i < count; i++) {
    const stele = document.createElement('div')
    stele.innerHTML = steleHTML
    const y = 80 + (i % 3) * 12
    stele.style.cssText = `position:absolute;bottom:${y}px;left:-30px;color:#c0a050;opacity:0.85;`
    ov.appendChild(stele)

    const startDelay = reducedMotion ? 0 : i * 180
    const duration = reducedMotion ? 1 : 4000
    const march = stele.animate([
      { transform: `translateX(0) translateY(0)` },
      { transform: `translateX(calc(100vw + 60px)) translateY(0)` },
    ], { duration, delay: startDelay, easing: 'linear', fill: 'forwards' })

    if (!reducedMotion) {
      stele.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-4px)' },
        { transform: 'translateY(0)' },
      ], { duration: 600, delay: startDelay, iterations: Math.ceil(duration / 600), easing: 'ease-in-out' })
    }
  }

  banner.animate([
    { transform: 'translateX(0)', opacity: 0 },
    { transform: 'translateX(50px)', opacity: 1, offset: 0.2 },
    { transform: 'translateX(calc(100vw - 300px))', opacity: 1, offset: 0.8 },
    { transform: 'translateX(calc(100vw + 100px))', opacity: 0 },
  ], { duration: reducedMotion ? 1 : 5000, easing: 'linear', fill: 'forwards' })

  setTimeout(() => ov.remove(), reducedMotion ? 500 : 8000)
  discover('assembly')
}

// ================================================================
// 3. Gavel Bang  — console: gavel()
// A parliamentary gavel slams down demanding order.
// ================================================================
function gavelBang() {
  const ov = overlay()

  const gavelWrap = document.createElement('div')
  gavelWrap.style.cssText = `position:absolute;top:-120px;left:50%;transform:translateX(-50%);`
  gavelWrap.innerHTML = `<svg width="80" height="80" viewBox="0 0 100 100">
    <g transform="rotate(-35 50 50)">
      <rect x="48" y="40" width="56" height="12" rx="3" fill="#8B6914" transform="translate(-10 10)"/>
      <rect x="2" y="2" width="36" height="28" rx="5" fill="#A0762D" stroke="#6B4C1A" stroke-width="2"/>
      <line x1="6" y1="2" x2="6" y2="30" stroke="#6B4C1A" stroke-width="1.5"/>
      <line x1="34" y1="2" x2="34" y2="30" stroke="#6B4C1A" stroke-width="1.5"/>
    </g>
  </svg>`
  ov.appendChild(gavelWrap)

  gavelWrap.animate([
    { transform: 'translateX(-50%) translateY(-120px) rotate(0deg)' },
    { transform: 'translateX(-50%) translateY(30vh) rotate(35deg)' },
  ], { duration: reducedMotion ? 1 : 350, easing: 'cubic-bezier(0.4,0,1,1)', fill: 'forwards' })
  .onfinish = () => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2 + 30

    chipBurst(ov, cx, cy, '#c0962d', 12)

    document.body.animate([
      { transform: 'translate(0,0)' },
      { transform: 'translate(-4px,2px)' },
      { transform: 'translate(3px,-1px)' },
      { transform: 'translate(-2px,1px)' },
      { transform: 'translate(0,0)' },
    ], { duration: reducedMotion ? 1 : 200, easing: 'ease-out' })

    const order = document.createElement('div')
    order.textContent = 'ORDER!'
    order.style.cssText = `
      position:absolute;left:50%;top:55%;transform:translate(-50%,-50%);
      font-family:'Fraunces',Georgia,serif;
      font-size:5rem;font-weight:700;
      color:#b91c1c;letter-spacing:0.05em;
      text-shadow:0 0 30px rgba(185,28,28,0.4);
    `
    ov.appendChild(order)
    order.animate([
      { transform: 'translate(-50%,-50%) scale(3)', opacity: 0 },
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: 0.3 },
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: 0.7 },
      { transform: 'translate(-50%,-50%) scale(1.1)', opacity: 0 },
    ], { duration: reducedMotion ? 1 : 1200, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' })

    gavelWrap.animate([
      { transform: 'translateX(-50%) translateY(30vh) rotate(35deg)', opacity: 1 },
      { transform: 'translateX(-50%) translateY(-120px) rotate(0deg)', opacity: 0 },
    ], { duration: reducedMotion ? 1 : 400, delay: 600, easing: 'ease-in', fill: 'forwards' })
  }

  setTimeout(() => ov.remove(), reducedMotion ? 200 : 2200)
  discover('gavel')
}

// ================================================================
// 4. Resolution Stamp  — console: resolve()
// A wax-seal stamp slams down: ἔδοξεν — IT WAS RESOLVED.
// ================================================================
function resolutionStamp() {
  const ov = overlay()

  const stamp = document.createElement('div')
  stamp.innerHTML = `<svg width="200" height="200" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="92" fill="#8B0000" stroke="#5c0000" stroke-width="2"/>
    <circle cx="100" cy="100" r="80" fill="none" stroke="#e0b04a" stroke-width="1.5" stroke-dasharray="5 3"/>
    <text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="34" fill="#e0b04a" font-weight="bold">ἔδοξεν</text>
    <text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#e0b04a" letter-spacing="3">RESOLVED</text>
    <line x1="50" y1="95" x2="150" y2="95" stroke="#e0b04a" stroke-width="0.5" opacity="0.5"/>
  </svg>`
  stamp.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(3);opacity:0;`
  ov.appendChild(stamp)

  stamp.animate([
    { transform: 'translate(-50%,-50%) scale(3) rotate(-15deg)', opacity: 0 },
    { transform: 'translate(-50%,-50%) scale(1.3) rotate(-5deg)', opacity: 1, offset: 0.6 },
    { transform: 'translate(-50%,-50%) scale(1) rotate(-5deg)', opacity: 1 },
  ], { duration: reducedMotion ? 1 : 300, easing: 'cubic-bezier(0.4,0,0.9,1)', fill: 'forwards' })
  .onfinish = () => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2

    chipBurst(ov, cx, cy, '#8B0000', 12)
    chipBurst(ov, cx, cy, '#e0b04a', 8)

    const ring = document.createElement('div')
    ring.style.cssText = `position:absolute;left:50%;top:50%;width:200px;height:200px;border:3px solid rgba(224,176,74,0.5);border-radius:50%;transform:translate(-50%,-50%);`
    ov.appendChild(ring)
    ring.animate([
      { width: '200px', height: '200px', opacity: 0.8, borderWidth: '3px' },
      { width: '500px', height: '500px', opacity: 0, borderWidth: '0px' },
    ], { duration: reducedMotion ? 1 : 600, easing: 'ease-out', fill: 'forwards' })

    const text = document.createElement('div')
    text.textContent = 'IT WAS RESOLVED'
    text.style.cssText = `
      position:absolute;left:50%;top:calc(50% + 130px);transform:translateX(-50%);
      font-family:'Fraunces',Georgia,serif;
      font-size:1.5rem;font-weight:600;
      color:#e0b04a;letter-spacing:0.15em;
      text-transform:uppercase;
      opacity:0;
    `
    ov.appendChild(text)
    text.animate([
      { opacity: 0, transform: 'translateX(-50%) translateY(10px)' },
      { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
    ], { duration: reducedMotion ? 1 : 400, delay: 200, fill: 'forwards' })
  }

  setTimeout(() => {
    ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' })
    setTimeout(() => ov.remove(), 600)
  }, reducedMotion ? 500 : 2800)
  discover('resolve')
}

// ================================================================
// 5. Sortition  — console: lottery()
// Athenian democracy's sortition: random selection by lot.
// ================================================================
function sortition() {
  const ov = overlay()
  const colors = ['#c0392b', '#2980b9', '#27ae60', '#8e44ad', '#e67e22', '#1abc9c', '#f39c12', '#2c3e50']
  const count = 10
  const balls: HTMLDivElement[] = []

  const arena = document.createElement('div')
  arena.style.cssText = `position:absolute;left:50%;top:50%;width:320px;height:200px;transform:translate(-50%,-50%);border:2px solid rgba(224,176,74,0.3);border-radius:12px;background:rgba(0,0,0,0.15);`
  ov.appendChild(arena)

  const label = document.createElement('div')
  label.textContent = 'ΚΛΗΡΩΣΙΣ — SORTITION'
  label.style.cssText = `
    position:absolute;left:50%;top:calc(50% - 130px);transform:translateX(-50%);
    font-family:'Fraunces',Georgia,serif;
    font-size:1rem;color:#e0b04a;letter-spacing:0.2em;font-style:italic;
  `
  ov.appendChild(label)

  for (let i = 0; i < count; i++) {
    const ball = document.createElement('div')
    ball.style.cssText = `
      position:absolute;width:28px;height:28px;border-radius:50%;
      background:${colors[i % colors.length]};
      left:${20 + Math.random() * 260}px;
      top:${20 + Math.random() * 140}px;
      box-shadow:inset -4px -4px 8px rgba(0,0,0,0.3);
    `
    arena.appendChild(ball)
    balls.push(ball)

    if (!reducedMotion) {
      const dx = (Math.random() - 0.5) * 200
      const dy = (Math.random() - 0.5) * 100
      ball.animate([
        { transform: 'translate(0,0)' },
        { transform: `translate(${dx}px,${dy}px)` },
        { transform: `translate(${-dx * 0.7}px,${dy * 0.5}px)` },
        { transform: `translate(${dx * 0.3}px,${-dy * 0.8}px)` },
        { transform: `translate(${-dx * 0.2}px,${dy * 0.3}px)` },
      ], { duration: 2000, iterations: Infinity, easing: 'ease-in-out', direction: 'alternate' })
    }
  }

  setTimeout(() => {
    const winnerIdx = Math.floor(Math.random() * count)
    balls.forEach((b, i) => {
      if (i !== winnerIdx) {
        b.animate([{ opacity: 1 }, { opacity: 0.15 }], { duration: 400, fill: 'forwards' })
      }
    })

    const winner = balls[winnerIdx]
    winner.style.zIndex = '10'
    winner.animate([
      { transform: 'scale(1)', filter: 'brightness(1)' },
      { transform: 'scale(1.6)', filter: 'brightness(1.5) drop-shadow(0 0 20px gold)' },
    ], { duration: reducedMotion ? 1 : 500, fill: 'forwards' })

    const chosen = document.createElement('div')
    chosen.textContent = 'ΛΗΧΘΕΙΣ — CHOSEN BY LOT'
    chosen.style.cssText = `
      position:absolute;left:50%;top:calc(50% + 120px);transform:translateX(-50%);
      font-family:'Fraunces',Georgia,serif;
      font-size:1.2rem;color:#e0b04a;font-style:italic;
      opacity:0;
    `
    ov.appendChild(chosen)
    chosen.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' })
  }, reducedMotion ? 100 : 2200)

  setTimeout(() => {
    ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' })
    setTimeout(() => ov.remove(), 600)
  }, reducedMotion ? 500 : 5500)
  discover('lottery')
}

// ================================================================
// 6. Ostracism  — console: ostracize()
// An ostracon flies across the screen — banishment!
// ================================================================
function ostracism() {
  const ov = overlay()
  const names = ['Themistocles', 'Aristides', 'Cimon', 'Thucydides', 'Hyperbolus', 'Alcibiades']
  const victim = names[Math.floor(Math.random() * names.length)]

  const sherd = document.createElement('div')
  sherd.innerHTML = `<svg width="100" height="80" viewBox="0 0 100 80">
    <path d="M5 50 Q0 25 15 10 Q35 0 55 5 Q80 12 92 30 Q100 50 88 68 Q70 78 45 75 Q20 72 5 50 Z"
          fill="#d4a373" stroke="#8b6914" stroke-width="1.5"/>
    <text x="50" y="35" text-anchor="middle" font-family="Georgia,serif" font-size="11"
          fill="#5c3d1a" font-weight="bold" transform="rotate(-8 50 40)">${victim.toUpperCase()}</text>
    <text x="50" y="55" text-anchor="middle" font-family="Georgia,serif" font-size="8"
          fill="#8b6914" transform="rotate(-8 50 50)">ΟΣΤΡΑΚΟΝ</text>
  </svg>`
  sherd.style.cssText = `position:absolute;left:-150px;top:30%;transform:rotate(-15deg);`
  ov.appendChild(sherd)

  sherd.animate([
    { left: '-150px', transform: 'rotate(-15deg) translateY(0)' },
    { left: 'calc(100vw + 50px)', transform: 'rotate(380deg) translateY(-50px)' },
  ], {
    duration: reducedMotion ? 1 : 1800,
    easing: 'cubic-bezier(0.4,0,0.2,1)',
    fill: 'forwards',
  })

  const begone = document.createElement('div')
  begone.innerHTML = `ΒΕΓΟΝΕ! — <span style="font-style:italic">${victim}</span> ostracized for 10 years`
  begone.style.cssText = `
    position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0);
    font-family:'Fraunces',Georgia,serif;
    font-size:2rem;color:#b91c1c;font-weight:600;
    text-shadow:0 0 20px rgba(185,28,28,0.3);
    text-align:center;
  `
  ov.appendChild(begone)

  begone.animate([
    { transform: 'translate(-50%,-50%) scale(0)', opacity: 0 },
    { transform: 'translate(-50%,-50%) scale(1.1)', opacity: 1, offset: 0.4 },
    { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: 0.6 },
    { transform: 'translate(-50%,-50%) scale(1)', opacity: 0 },
  ], { duration: reducedMotion ? 1 : 2000, delay: reducedMotion ? 0 : 700, easing: 'ease-out', fill: 'forwards' })

  setTimeout(() => ov.remove(), reducedMotion ? 200 : 3000)
  discover('ostracize')
}

// ================================================================
// 7. Logo Chisel  — click the nav logo 5 times
// ================================================================
function logoChisel(logoEl: HTMLElement) {
  const rect = logoEl.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  const ov = overlay()
  logoEl.style.zIndex = '100000'
  logoEl.style.position = 'relative'

  logoEl.animate([
    { transform: 'rotate(0deg) scale(1)' },
    { transform: 'rotate(180deg) scale(1.3)', offset: 0.5 },
    { transform: 'rotate(360deg) scale(1)' },
  ], { duration: reducedMotion ? 1 : 700, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' })

  chipBurst(ov, cx, cy, '#e0b04a', 10)
  chipBurst(ov, cx, cy, '#ffffff', 6)

  logoEl.animate([
    { filter: 'drop-shadow(0 0 0 rgba(224,176,74,0))' },
    { filter: 'drop-shadow(0 0 25px rgba(224,176,74,0.8))', offset: 0.5 },
    { filter: 'drop-shadow(0 0 0 rgba(224,176,74,0))' },
  ], { duration: reducedMotion ? 1 : 700, fill: 'forwards' })

  const chiselled = document.createElement('div')
  chiselled.textContent = 'ΧΕΔΟΝ — chiselled'
  chiselled.style.cssText = `
    position:absolute;left:${cx}px;top:${cy + 35}px;transform:translateX(-50%);
    font-family:'Fraunces',Georgia,serif;
    font-size:0.85rem;color:#e0b04a;font-style:italic;
    opacity:0;white-space:nowrap;
  `
  ov.appendChild(chiselled)
  chiselled.animate([
    { opacity: 0, transform: 'translateX(-50%) translateY(5px)' },
    { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
  ], { duration: 300, delay: 400, fill: 'forwards' })

  setTimeout(() => ov.remove(), reducedMotion ? 100 : 2000)
  discover('logo-chisel')
}

// ================================================================
// 8. Interactive Ekklesia  — console: assembly()
// Full voting simulation: propose a decree, put the question, see the vote.
// ================================================================
function interactiveAssembly() {
  const existing = document.getElementById('eklesia-modal')
  if (existing) { existing.remove(); return }

  const backdrop = document.createElement('div')
  backdrop.id = 'eklesia-modal'
  backdrop.style.cssText = `position:fixed;inset:0;z-index:100000;background:rgba(8,12,20,0.92);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:2rem;`
  document.body.appendChild(backdrop)

  const modal = document.createElement('div')
  modal.style.cssText = `
    max-width:600px;width:100%;
    background:linear-gradient(135deg,#1a1f2e 0%,#141b26 100%);
    border:1px solid rgba(224,176,74,0.3);
    border-radius:16px;padding:2.5rem;
    box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 80px rgba(224,176,74,0.08);
    font-family:'Fraunces',Georgia,serif;color:#e0b04a;
  `
  backdrop.appendChild(modal)

  const close = document.createElement('button')
  close.innerHTML = '×'
  close.style.cssText = `position:absolute;top:1rem;right:1.5rem;background:none;border:none;color:rgba(224,176,74,0.5);font-size:2rem;cursor:pointer;font-family:serif;`
  close.onclick = () => backdrop.remove()
  modal.appendChild(close)

  const header = document.createElement('div')
  header.innerHTML = `
    <div style="font-size:0.8rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(224,176,74,0.5);font-family:'JetBrains Mono',monospace;">The Ekklesia of Edoxen</div>
    <div style="font-size:1.8rem;font-weight:500;margin:0.3rem 0 0.2rem;">Ἐκκλησία</div>
    <div style="font-size:0.9rem;color:rgba(224,176,74,0.6);font-style:italic;">The sovereign assembly has convened. Quorum: 6000 citizens.</div>
  `
  modal.appendChild(header)

  const citizenGrid = document.createElement('div')
  citizenGrid.style.cssText = `display:flex;flex-wrap:wrap;gap:3px;margin:1.5rem 0;max-width:400px;`
  modal.appendChild(citizenGrid)

  const citizens: HTMLDivElement[] = []
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement('div')
    dot.style.cssText = `width:10px;height:10px;border-radius:50%;background:rgba(224,176,74,0.2);border:1px solid rgba(224,176,74,0.3);transition:background 0.3s,transform 0.3s;`
    citizenGrid.appendChild(dot)
    citizens.push(dot)
  }

  const inputWrap = document.createElement('div')
  inputWrap.style.cssText = `margin:1.5rem 0;`
  modal.appendChild(inputWrap)

  const label = document.createElement('label')
  label.textContent = 'What is your proposal?'
  label.style.cssText = `display:block;font-size:0.85rem;color:rgba(224,176,74,0.7);margin-bottom:0.5rem;font-family:'IBM Plex Sans',sans-serif;`
  inputWrap.appendChild(label)

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'e.g. the harbor shall be expanded...'
  input.style.cssText = `width:100%;box-sizing:border-box;padding:0.75rem 1rem;background:rgba(0,0,0,0.3);border:1px solid rgba(224,176,74,0.2);border-radius:8px;color:#e0b04a;font-size:1rem;font-family:'IBM Plex Sans',sans-serif;outline:none;`
  inputWrap.appendChild(input)

  const btn = document.createElement('button')
  btn.textContent = 'ἐπιψηφίζειν — Put the Question'
  btn.style.cssText = `margin-top:1rem;padding:0.75rem 1.5rem;background:linear-gradient(135deg,#d4a017,#b45309);color:#1a1f2e;border:none;border-radius:8px;font-size:0.9rem;font-weight:600;cursor:pointer;font-family:'IBM Plex Sans',sans-serif;letter-spacing:0.03em;transition:transform 0.15s,box-shadow 0.15s;`
  inputWrap.appendChild(btn)

  const resultArea = document.createElement('div')
  resultArea.style.cssText = `margin-top:1.5rem;min-height:60px;`
  modal.appendChild(resultArea)

  btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px)'; btn.style.boxShadow = '0 4px 20px rgba(212,160,23,0.3)' }
  btn.onmouseleave = () => { btn.style.transform = ''; btn.style.boxShadow = '' }

  function putQuestion() {
    const proposal = input.value.trim() || 'the matter before the assembly'
    btn.disabled = true
    btn.style.opacity = '0.5'
    input.disabled = true

    const ayes: HTMLDivElement[] = []
    const noes: HTMLDivElement[] = []
    citizens.forEach(dot => {
      if (Math.random() > 0.35) ayes.push(dot)
      else noes.push(dot)
    })

    resultArea.innerHTML = ''
    const voteBars = document.createElement('div')
    voteBars.style.cssText = `font-family:'IBM Plex Sans',sans-serif;`
    resultArea.appendChild(voteBars)

    const ayesBar = document.createElement('div')
    ayesBar.style.cssText = `margin:0.5rem 0;`
    voteBars.appendChild(ayesBar)

    const ayesLabel = document.createElement('span')
    ayesLabel.textContent = 'Ayes'
    ayesLabel.style.cssText = `display:inline-block;width:50px;color:#4ade80;font-weight:600;`
    ayesBar.appendChild(ayesLabel)

    const ayesTrack = document.createElement('span')
    ayesTrack.style.cssText = `display:inline-block;width:300px;height:20px;background:rgba(0,0,0,0.3);border-radius:4px;vertical-align:middle;overflow:hidden;`
    ayesBar.appendChild(ayesTrack)

    const ayesFill = document.createElement('span')
    ayesFill.style.cssText = `display:block;height:100%;width:0;background:#4ade80;transition:width 0.05s;`
    ayesTrack.appendChild(ayesFill)

    const ayesNum = document.createElement('span')
    ayesNum.textContent = '0'
    ayesNum.style.cssText = `margin-left:0.5rem;color:#4ade80;`
    ayesBar.appendChild(ayesNum)

    const noesBar = document.createElement('div')
    noesBar.style.cssText = `margin:0.5rem 0;`
    voteBars.appendChild(noesBar)

    const noesLabel = document.createElement('span')
    noesLabel.textContent = 'Noes'
    noesLabel.style.cssText = `display:inline-block;width:50px;color:#f87171;font-weight:600;`
    noesBar.appendChild(noesLabel)

    const noesTrack = document.createElement('span')
    noesTrack.style.cssText = `display:inline-block;width:300px;height:20px;background:rgba(0,0,0,0.3);border-radius:4px;vertical-align:middle;overflow:hidden;`
    noesBar.appendChild(noesTrack)

    const noesFill = document.createElement('span')
    noesFill.style.cssText = `display:block;height:100%;width:0;background:#f87171;transition:width 0.05s;`
    noesTrack.appendChild(noesFill)

    const noesNum = document.createElement('span')
    noesNum.textContent = '0'
    noesNum.style.cssText = `margin-left:0.5rem;color:#f87171;`
    noesBar.appendChild(noesNum)

    let voteIdx = 0
    const interval = setInterval(() => {
      if (voteIdx >= citizens.length) {
        clearInterval(interval)
        const passed = ayes.length > noes.length
        const result = document.createElement('div')
        result.style.cssText = `margin-top:1.5rem;text-align:center;`
        result.innerHTML = passed
          ? `<div style="font-size:2rem;font-weight:600;color:#4ade80;">ἔδοξεν</div><div style="font-size:0.85rem;color:rgba(74,222,128,0.6);font-style:italic;margin-top:0.3rem;">It was resolved.</div>`
          : `<div style="font-size:2rem;font-weight:600;color:#f87171;">ἀπέδοξε</div><div style="font-size:0.85rem;color:rgba(248,113,113,0.6);font-style:italic;margin-top:0.3rem;">The motion failed.</div>`
        resultArea.appendChild(result)

        if (passed) {
          setTimeout(() => {
            const inscription = document.createElement('div')
            inscription.style.cssText = `margin-top:1.5rem;padding:1.5rem;background:rgba(0,0,0,0.25);border-left:3px solid #d4a017;border-radius:0 8px 8px 0;font-style:italic;`
            inscription.innerHTML = `
              <div style="font-size:0.95rem;color:#e0b04a;margin-bottom:0.5rem;">ἔδοξεν τῇ βουλῇ καὶ τῷ δήμῳ —</div>
              <div style="font-size:1rem;color:rgba(224,176,74,0.9);line-height:1.6;">The People resolved that ${proposal}.</div>
              <div style="font-size:0.8rem;color:rgba(224,176,74,0.5);margin-top:0.5rem;font-family:'JetBrains Mono',monospace;">Decree inscribed · ${ayes.length} ayes · ${noes.length} noes</div>
            `
            resultArea.appendChild(inscription)
          }, 800)
        }

        btn.textContent = 'Propose Another'
        btn.disabled = false
        btn.style.opacity = '1'
        input.disabled = false
        input.value = ''
        citizens.forEach(d => { d.style.background = 'rgba(224,176,74,0.2)'; d.style.transform = '' })
        btn.onclick = putQuestion
        return
      }

      const dot = citizens[voteIdx]
      if (ayes.includes(dot)) {
        dot.style.background = '#4ade80'
        dot.style.transform = 'translateX(-4px) scale(1.2)'
        const current = parseInt(ayesNum.textContent!)
        ayesNum.textContent = String(current + 1)
        ayesFill.style.width = `${((current + 1) / citizens.length) * 100}%`
      } else {
        dot.style.background = '#f87171'
        dot.style.transform = 'translateX(4px) scale(1.2)'
        const current = parseInt(noesNum.textContent!)
        noesNum.textContent = String(current + 1)
        noesFill.style.width = `${((current + 1) / citizens.length) * 100}%`
      }
      voteIdx++
    }, reducedMotion ? 1 : 30)
  }

  btn.onclick = putQuestion
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') putQuestion() })

  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.remove() })
  const escHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') { backdrop.remove(); document.removeEventListener('keydown', escHandler) } }
  document.addEventListener('keydown', escHandler)

  backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' })
  modal.animate([{ transform: 'scale(0.9) translateY(20px)', opacity: 0 }, { transform: 'scale(1) translateY(0)', opacity: 1 }], { duration: 300, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' })

  discover('assembly')
}

// ================================================================
// 9. Decree Generator  — console: decree()
// Generates a random Athenian-style decree from template parts.
// ================================================================
function decreeGenerator() {
  const ov = overlay()

  const actions = [
    'the harbor of Piraeus shall be expanded',
    'a statue shall be erected in the agora in honor of the benefactor',
    'grain shall be distributed to all citizens from the public stores',
    'a new temple shall be dedicated to Athena on the acropolis',
    'the tribute of the allied cities shall be reassessed',
    'three triremes shall be constructed for the defense of the coast',
    'the annual festival of the Panathenaia shall be extended by two days',
    'ambassadors shall be sent to Sparta to negotiate peace',
    'a public inscription of this decree shall be erected on the acropolis',
    'the weights and measures of the marketplace shall be standardized',
    'all public records shall be inscribed in both Attic and Ionic scripts',
    'the proceedings of this assembly shall be recorded for posterity',
  ]
  const reasons = [
    'for the prosperity of the city',
    'by the will of the gods and the counsel of the wise',
    'for the preservation of democracy and the common good',
    'to ensure that justice is visible to all citizens',
    'as was done by our ancestors and is pleasing to the gods',
    'for the honor of the city and the fear of her enemies',
    'so that no citizen may claim ignorance of the law',
  ]
  const officials = [
    'the Council of Five Hundred',
    'the Prytaneis of the presiding tribe',
    'the nine Archons',
    'the Strategoi in command',
    'the Epistates of the prytany',
  ]

  const action = actions[Math.floor(Math.random() * actions.length)]
  const reason = reasons[Math.floor(Math.random() * reasons.length)]
  const official = officials[Math.floor(Math.random() * officials.length)]

  const card = document.createElement('div')
  card.innerHTML = `
    <div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(224,176,74,0.5);text-align:center;margin-bottom:0.5rem;">Δόγμα — Decree of the Day</div>
    <div style="font-family:'Fraunces',Georgia,serif;font-size:1.4rem;color:#e0b04a;text-align:center;margin-bottom:1rem;border-bottom:1px solid rgba(224,176,74,0.2);padding-bottom:1rem;">ἔδοξεν τῇ βουλῇ καὶ τῷ δήμῳ</div>
    <div style="font-family:'Fraunces',Georgia,serif;font-size:1.15rem;color:rgba(224,176,74,0.9);line-height:1.7;font-style:italic;">
      The People resolved that <strong style="font-style:normal;color:#e0b04a;">${action}</strong>,
      ${reason}, and this was approved by ${official}.
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:rgba(224,176,74,0.3);text-align:center;margin-top:1.5rem;">Inscribed in the archonship of ${['Kallias','Kimon','Perikles','Nikias','Alkibiades'][Math.floor(Math.random()*5)]}</div>
  `
  card.style.cssText = `
    position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0.8);
    max-width:500px;width:90%;
    background:linear-gradient(135deg,#1a1f2e,#141b26);
    border:1px solid rgba(224,176,74,0.25);
    border-radius:16px;padding:2.5rem;
    box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 80px rgba(224,176,74,0.08);
    opacity:0;
  `
  ov.appendChild(card)

  card.animate([
    { transform: 'translate(-50%,-50%) scale(0.8) rotate(-2deg)', opacity: 0 },
    { transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1 },
  ], { duration: reducedMotion ? 1 : 500, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' })

  const hint = document.createElement('div')
  hint.textContent = 'Press decree() again for another · click to dismiss'
  hint.style.cssText = `position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-family:'IBM Plex Sans',sans-serif;font-size:0.75rem;color:rgba(224,176,74,0.4);cursor:pointer;`
  ov.appendChild(hint)
  hint.onclick = () => { ov.animate([{opacity:1},{opacity:0}], {duration:300,fill:'forwards'}); setTimeout(()=>ov.remove(), 350) }
  ov.onclick = (e) => { if (e.target === ov) { ov.remove() } }

  discover('decree')
}

// ================================================================
// 10. Council of 500  — console: boule()
// The ten tribes each cast their block vote.
// ================================================================
function bouleVote() {
  const ov = overlay()

  const tribes = [
    ['Erechtheis', '#e74c3c'], ['Aigeis', '#3498db'], ['Pandionis', '#2ecc71'],
    ['Leontis', '#9b59b6'], ['Acamantis', '#f39c12'], ['Oeneis', '#1abc9c'],
    ['Cecropis', '#e67e22'], ['Hippothontis', '#34495e'], ['Aiantis', '#e91e63'], ['Antiochis', '#00bcd4'],
  ]

  const arena = document.createElement('div')
  arena.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;`
  ov.appendChild(arena)

  const title = document.createElement('div')
  title.innerHTML = `<span style="font-family:'Fraunces',Georgia,serif;font-size:1.6rem;color:#e0b04a;">Βουλή</span><span style="font-family:'IBM Plex Sans',sans-serif;font-size:0.85rem;color:rgba(224,176,74,0.5);margin-left:0.5rem;">The Council of Five Hundred</span>`
  arena.appendChild(title)

  const grid = document.createElement('div')
  grid.style.cssText = `display:grid;grid-template-columns:repeat(5,1fr);gap:0.75rem;margin:1.5rem 0;max-width:500px;`
  arena.appendChild(grid)

  const tribeEls: { el: HTMLDivElement; dot: HTMLDivElement; label: HTMLDivElement }[] = []
  tribes.forEach(([name, color]) => {
    const card = document.createElement('div')
    card.style.cssText = `background:rgba(0,0,0,0.25);border:1px solid rgba(224,176,74,0.15);border-radius:10px;padding:0.75rem;text-align:center;`
    grid.appendChild(card)

    const dot = document.createElement('div')
    dot.style.cssText = `width:32px;height:32px;border-radius:50%;background:${color};margin:0 auto 0.5rem;opacity:0.3;transition:all 0.3s;`
    card.appendChild(dot)

    const label = document.createElement('div')
    label.textContent = name
    label.style.cssText = `font-family:'Fraunces',Georgia,serif;font-size:0.72rem;color:rgba(224,176,74,0.5);`
    card.appendChild(label)

    tribeEls.push({ el: card, dot, label })
  })

  const tally = document.createElement('div')
  tally.style.cssText = `font-family:'IBM Plex Sans',sans-serif;font-size:0.9rem;color:rgba(224,176,74,0.7);margin-top:0.5rem;`
  arena.appendChild(tally)

  const motion = document.createElement('div')
  const motions = [
    'Shall the decree be inscribed?',
    'Shall war be declared?',
    'Shall the alliance be renewed?',
    'Shall the budget be approved?',
    'Shall the standard be adopted?',
  ]
  motion.textContent = motions[Math.floor(Math.random() * motions.length)]
  motion.style.cssText = `font-family:'Fraunces',Georgia,serif;font-size:1.1rem;font-style:italic;color:#e0b04a;margin-bottom:1rem;`
  arena.insertBefore(motion, grid)

  let ayes = 0, noes = 0
  tribeEls.forEach(({ dot, label }, i) => {
    setTimeout(() => {
      const vote = Math.random() > 0.35
      dot.animate([
        { transform: 'scale(1)', opacity: 0.3 },
        { transform: 'scale(1.5)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 },
      ], { duration: 400, fill: 'forwards' })
      if (vote) {
        dot.style.background = '#4ade80'
        dot.style.boxShadow = '0 0 12px rgba(74,222,128,0.5)'
        label.style.color = '#4ade80'
        ayes++
      } else {
        dot.style.background = '#f87171'
        dot.style.boxShadow = '0 0 12px rgba(248,113,113,0.5)'
        label.style.color = '#f87171'
        noes++
      }
      tally.textContent = `${ayes} tribes in favor · ${noes} against`
    }, reducedMotion ? 0 : i * 200 + 500)
  })

  setTimeout(() => {
    const passed = ayes > noes
    const result = document.createElement('div')
    result.innerHTML = passed
      ? `<span style="color:#4ade80;font-size:1.3rem;">ἔδοξεν</span> <span style="color:rgba(224,176,74,0.5);">— carried</span>`
      : `<span style="color:#f87171;font-size:1.3rem;">ἀπέδοξε</span> <span style="color:rgba(224,176,74,0.5);">— defeated</span>`
    result.style.cssText = `margin-top:1rem;font-family:'Fraunces',Georgia,serif;font-weight:600;`
    arena.appendChild(result)
  }, reducedMotion ? 100 : tribes.length * 200 + 1200)

  setTimeout(() => {
    ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' })
    setTimeout(() => ov.remove(), 700)
  }, reducedMotion ? 300 : tribes.length * 200 + 3500)
  discover('boule')
}

// ================================================================
// 11. Eternal Flame of Hestia  — console: sacredfire()
// A persistent corner flame that responds to clicks.
// ================================================================
let flameEl: HTMLDivElement | null = null
let flameState = 0

function sacredFire() {
  if (flameEl) { flameEl.remove(); flameEl = null; flameState = 0; return }

  flameEl = document.createElement('div')
  flameEl.style.cssText = `position:fixed;bottom:20px;right:20px;z-index:99998;cursor:pointer;user-select:none;`
  document.body.appendChild(flameEl)

  const flameSvg = `<svg width="40" height="56" viewBox="0 0 40 56">
    <ellipse cx="20" cy="52" rx="14" ry="3" fill="rgba(0,0,0,0.3)"/>
    <path d="M20 50 Q10 40 12 28 Q14 16 20 8 Q26 16 28 28 Q30 40 20 50 Z"
          fill="url(#flame-grad)" id="flame-body"/>
    <path d="M20 46 Q14 38 16 30 Q18 22 20 16 Q22 22 24 30 Q26 38 20 46 Z"
          fill="#ffeb3b" opacity="0.7" id="flame-inner"/>
    <defs>
      <linearGradient id="flame-grad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#d84315"/>
        <stop offset="0.4" stop-color="#ff6f00"/>
        <stop offset="0.7" stop-color="#ffb74d"/>
        <stop offset="1" stop-color="#fff9c4"/>
      </linearGradient>
    </defs>
  </svg>`
  flameEl.innerHTML = flameSvg

  const label = document.createElement('div')
  label.textContent = 'Ἑστία'
  label.style.cssText = `font-family:'Fraunces',Georgia,serif;font-size:0.65rem;color:rgba(224,176,74,0.4);text-align:center;margin-top:-4px;`
  flameEl.appendChild(label)

  const states = [
    { scale: 0.8, opacity: 0.6, text: 'The flame of Hestia burns steadily.' },
    { scale: 1.2, opacity: 0.85, text: 'The flame grows warmer. The hearth glows.' },
    { scale: 1.6, opacity: 1, text: 'The sacred fire blazes! The polis is blessed.' },
  ]
  const sayings = [
    'The hearth is the heart of the polis.',
    'Where the flame burns, there is home.',
    'Hestia tends the fire while the assembly debates.',
    'A city without a hearth is a city without a soul.',
  ]

  function applyState() {
    if (!flameEl) return
    if (flameState >= states.length) {
      flameEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' })
      setTimeout(() => { flameEl?.remove(); flameEl = null; flameState = 0 }, 700)
      return
    }
    const s = states[flameState]
    flameEl.style.transform = `scale(${s.scale})`
    flameEl.style.opacity = String(s.opacity)
    flameState++

    const body = flameEl.querySelector('#flame-body') as SVGPathElement
    const inner = flameEl.querySelector('#flame-inner') as SVGPathElement
    if (body && !reducedMotion) {
      body.animate([
        { transform: 'scaleY(1) scaleX(1)' },
        { transform: 'scaleY(1.1) scaleX(0.9)' },
        { transform: 'scaleY(0.95) scaleX(1.05)' },
        { transform: 'scaleY(1) scaleX(1)' },
      ], { duration: 400 + Math.random() * 200, iterations: Infinity, easing: 'ease-in-out' })
      inner.animate([
        { transform: 'scaleY(1)' },
        { transform: 'scaleY(1.15)' },
        { transform: 'scaleY(0.9)' },
        { transform: 'scaleY(1)' },
      ], { duration: 300 + Math.random() * 150, iterations: Infinity, easing: 'ease-in-out' })
    }

    const msg = document.createElement('div')
    msg.textContent = s.text
    msg.style.cssText = `position:fixed;bottom:90px;right:20px;max-width:220px;font-family:'Fraunces',Georgia,serif;font-size:0.8rem;font-style:italic;color:#e0b04a;background:rgba(8,12,20,0.9);padding:0.6rem 1rem;border-radius:8px;border:1px solid rgba(224,176,74,0.2);pointer-events:none;`
    document.body.appendChild(msg)
    msg.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, fill: 'forwards' })
    setTimeout(() => { msg.animate([{opacity:1},{opacity:0}], {duration:400,fill:'forwards'}); setTimeout(()=>msg.remove(), 500) }, 2500)
  }

  flameEl.onclick = applyState
  applyState()
  discover('sacredfire')
}

// ================================================================
// 12. Chisel Mode  — console: scribe()
// Transforms the entire page into marble-inscription styling.
// ================================================================
let scribeStyle: HTMLStyleElement | null = null

function scribeMode() {
  if (scribeStyle) {
    scribeStyle.remove()
    scribeStyle = null
    document.body.classList.remove('edoxen-scribe')
    const notice = document.createElement('div')
    notice.textContent = 'The chisel rests.'
    notice.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%);font-family:'Fraunces',Georgia,serif;font-size:0.9rem;color:#8b6914;background:rgba(255,255,255,0.95);padding:0.5rem 1.5rem;border-radius:20px;z-index:99999;border:1px solid rgba(139,105,20,0.3);`
    document.body.appendChild(notice)
    notice.animate([{opacity:0,transform:'translateX(-50%) translateY(-10px)'},{opacity:1,transform:'translateX(-50%) translateY(0)'}],{duration:300,fill:'forwards'})
    setTimeout(() => { notice.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'}); setTimeout(()=>notice.remove(),400) }, 1500)
    return
  }

  scribeStyle = document.createElement('style')
  scribeStyle.textContent = `
    .edoxen-scribe {
      background: linear-gradient(135deg, #f5efe0 0%, #ede4d0 30%, #f2ebda 60%, #e8dcc8 100%) !important;
    }
    .edoxen-scribe::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 30%, rgba(180,160,130,0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 60%, rgba(160,140,110,0.06) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 80%, rgba(200,180,140,0.05) 0%, transparent 40%);
      pointer-events: none;
      z-index: 0;
    }
    .edoxen-scribe .prose {
      text-shadow: 1px 1px 0 rgba(255,255,255,0.6), -1px -1px 0 rgba(0,0,0,0.08) !important;
      color: #3a3020 !important;
    }
    .edoxen-scribe .prose h1, .edoxen-scribe .prose h2, .edoxen-scribe .prose h3,
    .edoxen-scribe .prose h4 {
      color: #8b6914 !important;
      text-shadow: 1px 1px 0 rgba(255,255,255,0.7), 0 2px 4px rgba(139,105,20,0.1) !important;
    }
    .edoxen-scribe .prose a {
      color: #b45309 !important;
      border-bottom: 1px solid rgba(180,83,9,0.3);
    }
    .edoxen-scribe .prose code {
      background: rgba(139,105,20,0.1) !important;
      color: #5c3d1a !important;
      border-color: rgba(139,105,20,0.2) !important;
    }
    .edoxen-scribe .prose pre {
      background: #2a2318 !important;
      border-color: #5c3d1a !important;
    }
    .edoxen-scribe .prose pre code {
      color: #e0d0b0 !important;
      background: none !important;
      border: none !important;
    }
    .edoxen-scribe .prose blockquote {
      background: rgba(139,105,20,0.06) !important;
      border-left-color: #8b6914 !important;
      color: #4a3c20 !important;
    }
    .edoxen-scribe .prose table {
      border-color: rgba(139,105,20,0.3) !important;
    }
    .edoxen-scribe .prose th {
      background: rgba(139,105,20,0.08) !important;
      color: #5c3d1a !important;
    }
    .edoxen-scribe .prose td {
      border-color: rgba(139,105,20,0.15) !important;
    }
    .edoxen-scribe .prose strong {
      color: #5c3d1a !important;
    }
    .edoxen-scribe main, .edoxen-scribe .about-hero {
      position: relative;
      z-index: 1;
    }
  `
  document.head.appendChild(scribeStyle)
  document.body.classList.add('edoxen-scribe')

  const notice = document.createElement('div')
  notice.innerHTML = '🏛️ <strong>Chisel Mode</strong> — the page is now inscribed in marble. Type <code style="background:rgba(139,105,20,0.15);padding:2px 6px;border-radius:3px;">scribe()</code> to restore.'
  notice.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%);font-family:'IBM Plex Sans',sans-serif;font-size:0.85rem;color:#3a3020;background:linear-gradient(135deg,#f5efe0,#ede4d0);padding:0.6rem 1.5rem;border-radius:20px;z-index:99999;border:1px solid rgba(139,105,20,0.3);box-shadow:0 4px 20px rgba(139,105,20,0.15);`
  document.body.appendChild(notice)
  notice.animate([{opacity:0,transform:'translateX(-50%) translateY(-10px)'},{opacity:1,transform:'translateX(-50%) translateY(0)'}],{duration:400,fill:'forwards'})
  setTimeout(() => { notice.animate([{opacity:1},{opacity:0}],{duration:500,fill:'forwards'}); setTimeout(()=>notice.remove(),600) }, 4000)

  discover('scribe')
}

// ================================================================
// 13. Marathon Runner  — console: marathon()
// Pheidippides runs across the screen: νενίκηκαμεν!
// ================================================================
function marathonRunner() {
  const ov = overlay()

  const runner = document.createElement('div')
  runner.innerHTML = `<svg width="30" height="50" viewBox="0 0 30 50">
    <circle cx="15" cy="8" r="5" fill="#d4a373"/>
    <line x1="15" y1="13" x2="15" y2="30" stroke="#d4a373" stroke-width="3" stroke-linecap="round"/>
    <line x1="15" y1="18" x2="8" y2="26" stroke="#d4a373" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="15" y1="18" x2="22" y2="24" stroke="#d4a373" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="15" y1="30" x2="10" y2="44" stroke="#d4a373" stroke-width="3" stroke-linecap="round"/>
    <line x1="15" y1="30" x2="20" y2="44" stroke="#d4a373" stroke-width="3" stroke-linecap="round"/>
  </svg>`
  runner.style.cssText = `position:absolute;bottom:30px;left:-50px;`
  ov.appendChild(runner)

  const runAnim = runner.animate([
    { left: '-50px' },
    { left: 'calc(100vw + 50px)' },
  ], { duration: reducedMotion ? 1 : 3000, easing: 'cubic-bezier(0.4,0,0.4,1)', fill: 'forwards' })

  if (!reducedMotion) {
    runner.animate([
      { transform: 'translateY(0) rotate(-5deg)' },
      { transform: 'translateY(-8px) rotate(5deg)' },
      { transform: 'translateY(0) rotate(-5deg)' },
    ], { duration: 200, iterations: 15, easing: 'ease-in-out' })

    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const dust = document.createElement('div')
        dust.style.cssText = `position:absolute;bottom:35px;width:6px;height:6px;border-radius:50%;background:rgba(212,163,115,0.4);`
        const x = 30 + i * ((window.innerWidth + 100) / 15)
        dust.style.left = `${x}px`
        ov.appendChild(dust)
        dust.animate([
          { opacity: 0.6, transform: 'translateY(0) scale(1)' },
          { opacity: 0, transform: 'translateY(-20px) translateX(-10px) scale(2)' },
        ], { duration: 600, fill: 'forwards' })
        setTimeout(() => dust.remove(), 700)
      }, i * 200)
    }
  }

  runAnim.onfinish = () => {
    const victory = document.createElement('div')
    victory.innerHTML = `<span style="color:#e0b04a;font-size:2rem;">νενίκηκαμεν!</span><br><span style="color:rgba(224,176,74,0.5);font-size:0.85rem;">— We have won!</span>`
    victory.style.cssText = `position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);text-align:center;font-family:'Fraunces',Georgia,serif;font-weight:600;opacity:0;`
    ov.appendChild(victory)
    victory.animate([
      { opacity: 0, transform: 'translate(-50%,-50%) scale(0.5)' },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
    ], { duration: reducedMotion ? 1 : 400, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' })
  }

  setTimeout(() => ov.remove(), reducedMotion ? 200 : 5000)
  discover('marathon')
}

// ================================================================
// 14. Philosophical Quote  — console: symposium()
// A wisdom quote relevant to governance and decisions.
// ================================================================
function symposiumQuote() {
  const ov = overlay()

  const quotes = [
    { text: 'The unexamined meeting is not worth attending.', attr: 'Socrates (paraphrased)' },
    { text: 'In a democracy, the poor will have more power than the rich, because there are more of them.', attr: 'Aristotle, Politics' },
    { text: 'He who has learned to obey will know how to command.', attr: 'Solon' },
    { text: 'The root of education is bitter, but its fruit is sweet.', attr: 'Aristotle' },
    { text: 'Know thyself.', attr: 'Inscription at Delphi' },
    { text: 'Nothing in excess.', attr: 'Inscription at Delphi' },
    { text: 'The measure of a man is what he does with power.', attr: 'Pittacus of Mytilene' },
    { text: 'Time is the most valuable thing a man can spend.', attr: 'Theophrastus' },
    { text: 'Wisdom begins in wonder.', attr: 'Socrates' },
    { text: 'A decision is only as good as the record of it.', attr: 'Edoxen, probably' },
  ]
  const q = quotes[Math.floor(Math.random() * quotes.length)]

  const card = document.createElement('div')
  card.innerHTML = `
    <div style="font-family:'Fraunces',Georgia,serif;font-size:1.5rem;font-style:italic;color:#e0b04a;line-height:1.5;text-align:center;max-width:500px;">
      "${q.text}"
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:rgba(224,176,74,0.4);margin-top:1.2rem;letter-spacing:0.05em;">— ${q.attr}</div>
  `
  card.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;opacity:0;padding:2rem;`
  ov.appendChild(card)

  card.animate([
    { opacity: 0, transform: 'translate(-50%,-50%) scale(0.9)' },
    { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
  ], { duration: reducedMotion ? 1 : 600, easing: 'ease-out', fill: 'forwards' })

  const glow = document.createElement('div')
  glow.style.cssText = `position:absolute;left:50%;top:50%;width:400px;height:400px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(224,176,74,0.06),transparent 70%);pointer-events:none;`
  ov.insertBefore(glow, card)
  if (!reducedMotion) {
    glow.animate([
      { width: '200px', height: '200px', opacity: 0 },
      { width: '500px', height: '500px', opacity: 1, offset: 0.5 },
      { width: '600px', height: '600px', opacity: 0 },
    ], { duration: 3000, fill: 'forwards' })
  }

  setTimeout(() => {
    card.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' })
    setTimeout(() => ov.remove(), 600)
  }, reducedMotion ? 500 : 4000)
  discover('symposium')
}

// ================================================================
// 15. Oracle of Delphi  — console: prophecy()
// The Pythia speaks — enigmatic and smoky.
// ================================================================
function oracleProphecy() {
  const ov = overlay()
  ov.style.background = 'rgba(8,6,12,0.7)'

  const prophecies = [
    'You shall find what you seek where three roads meet.',
    'The eagle has spoken; the serpent has yielded. Your decree is nigh.',
    'When the owl flies at noon, the assembly shall favor your cause.',
    'Trust not the one who speaks first, but the one who speaks last.',
    'The stone that rolls gathers no moss, but the stele that stands outlasts the city.',
    'Your motion shall pass when the count is even and the moon is waning.',
    'Beware the ides of the next meeting — a vote shall surprise you.',
    'The god says: yes. Also no. Also maybe. The omens are mixed.',
    'A stranger shall bring a motion you did not expect. Vote wisely.',
    'The Pythia sees... a second coffee in your future. Also victory.',
  ]
  const prophecy = prophecies[Math.floor(Math.random() * prophecies.length)]

  for (let i = 0; i < 20; i++) {
    const smoke = document.createElement('div')
    smoke.style.cssText = `
      position:absolute;width:${20+Math.random()*40}px;height:${20+Math.random()*40}px;
      border-radius:50%;background:rgba(180,160,200,${0.03+Math.random()*0.05});
      left:${30+Math.random()*40}%;top:50%;filter:blur(8px);
    `
    ov.appendChild(smoke)
    if (!reducedMotion) {
      smoke.animate([
        { transform: 'translateY(0) scale(0.5)', opacity: 0 },
        { transform: `translateY(-${100+Math.random()*200}px) scale(${1.5+Math.random()} )`, opacity: 0.6, offset: 0.5 },
        { transform: `translateY(-${200+Math.random()*300}px) scale(${2+Math.random()} )`, opacity: 0 },
      ], { duration: 2000 + Math.random() * 2000, delay: i * 100, fill: 'forwards', easing: 'ease-out' })
    }
  }

  const text = document.createElement('div')
  text.innerHTML = `
    <div style="font-family:'Fraunces',Georgia,serif;font-size:0.7rem;letter-spacing:0.3em;text-transform:uppercase;color:rgba(180,160,200,0.4);margin-bottom:1rem;">μαντεῖον Δελφικόν</div>
    <div style="font-family:'Fraunces',Georgia,serif;font-size:1.3rem;font-style:italic;color:rgba(220,200,240,0.85);line-height:1.6;text-align:center;max-width:450px;">"${prophecy}"</div>
    <div style="font-family:'Fraunces',Georgia,serif;font-size:0.8rem;color:rgba(180,160,200,0.3);margin-top:1.5rem;font-style:italic;">The Pythia has spoken.</div>
  `
  text.style.cssText += `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;opacity:0;`
  ov.appendChild(text)
  text.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reducedMotion ? 1 : 800, delay: reducedMotion ? 0 : 600, fill: 'forwards' })

  setTimeout(() => {
    ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800, fill: 'forwards' })
    setTimeout(() => ov.remove(), 900)
  }, reducedMotion ? 500 : 5500)
  discover('prophecy')
}

// ================================================================
// Discovery Complete — all eggs found
// ================================================================
function finalInscription() {
  const ov = overlay()
  const msg = document.createElement('div')
  msg.innerHTML = `
    <div style="font-family:'Fraunces',Georgia,serif;font-size:3rem;color:#e0b04a;text-shadow:0 0 40px rgba(224,176,74,0.5);margin-bottom:0.5rem;">🏛️</div>
    <div style="font-family:'Fraunces',Georgia,serif;font-size:1.8rem;font-style:italic;color:#e0b04a;">πᾶσαι αἱ ἐπιγραφαὶ εὑρημέναι</div>
    <div style="font-family:'IBM Plex Sans',sans-serif;font-size:1rem;color:rgba(224,176,74,0.7);margin-top:0.5rem;">All hidden inscriptions discovered. The Assembly salutes you.</div>
  `
  msg.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;opacity:0;`
  ov.appendChild(msg)
  msg.animate([
    { opacity: 0, transform: 'translate(-50%,-50%) scale(0.9)' },
    { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
  ], { duration: reducedMotion ? 1 : 600, easing: 'ease-out', fill: 'forwards' })

  setTimeout(() => {
    ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800, fill: 'forwards' })
    setTimeout(() => ov.remove(), 900)
  }, 5000)
}

// ================================================================
// Owl of Athena — accessible discovery UI
// A blinking owl in the corner opens a panel listing all easter eggs
// with one-click invoke buttons. No console required.
// ================================================================

interface EggMeta {
  id: string
  name: string
  desc: string
  icon: string
  trigger: () => void
  command: string
  category: 'Interactive' | 'Visual' | 'Mode'
}

const EGG_CATALOG: EggMeta[] = [
  { id: 'eklesia', name: 'Interactive Ekklesia', desc: 'Propose a decree and put it to the vote of 60 citizens.', icon: '⚖️', trigger: interactiveAssembly, command: 'assembly()', category: 'Interactive' },
  { id: 'boule', name: 'Council of 500', desc: 'The ten tribes each cast their block votes.', icon: '🏛️', trigger: bouleVote, command: 'boule()', category: 'Interactive' },
  { id: 'decree', name: 'Decree of the Day', desc: 'A randomly generated Athenian decree.', icon: '📜', trigger: decreeGenerator, command: 'decree()', category: 'Interactive' },
  { id: 'scribe', name: 'Chisel Mode', desc: 'Transform the page into marble inscription.', icon: '✒️', trigger: scribeMode, command: 'scribe()', category: 'Mode' },
  { id: 'sacredfire', name: 'Sacred Fire', desc: 'Light the eternal flame of Hestia.', icon: '🔥', trigger: sacredFire, command: 'sacredfire()', category: 'Mode' },
  { id: 'stoichedon', name: 'Stoichedon Cascade', desc: 'Six Greek letters ΕΔΟΞΕΝ fall and chisel into a grid.', icon: 'ΕΔ', trigger: stoichedonCascade, command: 'type "edoxen"', category: 'Visual' },
  { id: 'assembly', name: 'The Assembly Convokes', desc: 'Stele silhouettes march across the screen.', icon: '🗿', trigger: assemblyMarch, command: '↑↑↓↓←→←→BA', category: 'Visual' },
  { id: 'gavel', name: 'Gavel Bang', desc: 'A parliamentary gavel demands ORDER!', icon: '🔨', trigger: gavelBang, command: 'gavel()', category: 'Visual' },
  { id: 'resolve', name: 'Resolution Stamp', desc: 'A wax-seal stamp slams down: ἔδοξεν.', icon: '🔖', trigger: resolutionStamp, command: 'resolve()', category: 'Visual' },
  { id: 'lottery', name: 'Sortition', desc: 'Athenian random selection by lot.', icon: '🎲', trigger: sortition, command: 'lottery()', category: 'Visual' },
  { id: 'ostracize', name: 'Ostracism', desc: 'Banish someone by pottery shard!', icon: '🏺', trigger: ostracism, command: 'ostracize()', category: 'Visual' },
  { id: 'marathon', name: 'Marathon Runner', desc: 'Pheidippides brings news of victory.', icon: '🏃', trigger: marathonRunner, command: 'marathon()', category: 'Visual' },
  { id: 'symposium', name: "Philosopher's Quote", desc: 'Wisdom from Socrates, Aristotle, and the ancients.', icon: '📖', trigger: symposiumQuote, command: 'symposium()', category: 'Visual' },
  { id: 'prophecy', name: 'Oracle of Delphi', desc: 'The Pythia speaks — enigmatically and smokily.', icon: '🔮', trigger: oracleProphecy, command: 'prophecy()', category: 'Visual' },
]

let owlEl: HTMLButtonElement | null = null
let panelEl: HTMLDivElement | null = null

function createOwlButton() {
  if (owlEl) return

  owlEl = document.createElement('button')
  owlEl.setAttribute('aria-label', 'Open Hidden Inscriptions — discover easter eggs')
  owlEl.title = 'The Owl of Athena'
  owlEl.style.cssText = `
    position:fixed;bottom:20px;left:20px;z-index:99998;
    width:52px;height:60px;border:none;background:transparent;
    cursor:pointer;padding:0;opacity:0.7;
    transition:opacity 0.3s,transform 0.3s;
    filter:drop-shadow(0 2px 8px rgba(0,0,0,0.3));
  `
  owlEl.innerHTML = `<svg width="52" height="60" viewBox="0 0 60 70" style="overflow:visible;">
    <ellipse cx="30" cy="44" rx="18" ry="22" fill="#c9a84c"/>
    <ellipse cx="30" cy="28" rx="20" ry="18" fill="#d4b25e"/>
    <path d="M14 16 L10 6 L20 18 Z" fill="#b89a3e"/>
    <path d="M46 16 L50 6 L40 18 Z" fill="#b89a3e"/>
    <ellipse cx="22" cy="25" rx="8" ry="8" fill="#1a1a14"/>
    <ellipse cx="38" cy="25" rx="8" ry="8" fill="#1a1a14"/>
    <circle cx="24" cy="23" r="3" fill="#e0b04a"/>
    <circle cx="40" cy="23" r="3" fill="#e0b04a"/>
    <path d="M30 32 L27 37 L33 37 Z" fill="#e0b04a"/>
    <path d="M20 42 Q30 48 40 42" stroke="#8b6914" stroke-width="1.5" fill="none"/>
    <line x1="24" y1="66" x2="24" y2="70" stroke="#e0b04a" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="66" x2="36" y2="70" stroke="#e0b04a" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`

  document.body.appendChild(owlEl)

  owlEl.onmouseenter = () => { owlEl!.style.opacity = '1'; owlEl!.style.transform = 'translateY(-2px)' }
  owlEl.onmouseleave = () => { owlEl!.style.opacity = '0.7'; owlEl!.style.transform = '' }
  owlEl.onclick = openDiscoveryPanel

  const eyes = [owlEl.querySelectorAll('ellipse')[2], owlEl.querySelectorAll('ellipse')[3]]
  function blink() {
    if (!owlEl || document.hidden) return
    eyes.forEach(eye => {
      if (eye) eye.animate([
        { transform: 'scaleY(1)' },
        { transform: 'scaleY(0.1)' },
        { transform: 'scaleY(1)' },
      ], { duration: 150, easing: 'ease-in-out' })
    })
    setTimeout(blink, 3000 + Math.random() * 4000)
  }
  setTimeout(blink, 2000 + Math.random() * 3000)

  owlEl.animate([
    { opacity: 0, transform: 'translateY(20px) scale(0.5)' },
    { opacity: 0.7, transform: 'translateY(0) scale(1)' },
  ], { duration: 600, delay: 1500, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' })
}

function openDiscoveryPanel() {
  if (panelEl) { closeDiscoveryPanel(); return }

  panelEl = document.createElement('div')
  panelEl.setAttribute('role', 'dialog')
  panelEl.setAttribute('aria-modal', 'true')
  panelEl.setAttribute('aria-labelledby', 'owl-panel-title')
  panelEl.style.cssText = `position:fixed;inset:0;z-index:100000;background:rgba(8,12,20,0.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:1.5rem;overflow-y:auto;`
  document.body.appendChild(panelEl)

  const modal = document.createElement('div')
  modal.style.cssText = `
    max-width:580px;width:100%;max-height:85vh;overflow-y:auto;
    background:linear-gradient(135deg,#1a1f2e 0%,#141b26 100%);
    border:1px solid rgba(224,176,74,0.3);
    border-radius:16px;padding:2rem;
    box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 80px rgba(224,176,74,0.08);
    font-family:'IBM Plex Sans',sans-serif;color:#e0b04a;
  `
  panelEl.appendChild(modal)

  const close = document.createElement('button')
  close.innerHTML = '×'
  close.setAttribute('aria-label', 'Close')
  close.style.cssText = `position:absolute;top:0.5rem;right:1rem;background:none;border:none;color:rgba(224,176,74,0.5);font-size:1.8rem;cursor:pointer;line-height:1;`
  close.onclick = closeDiscoveryPanel
  modal.appendChild(close)

  const header = document.createElement('div')
  header.innerHTML = `
    <div id="owl-panel-title" style="font-family:'Fraunces',Georgia,serif;font-size:1.5rem;font-weight:500;">🦉 Hidden Inscriptions</div>
    <div style="font-size:0.82rem;color:rgba(224,176,74,0.5);margin-top:0.2rem;font-style:italic;font-family:'Fraunces',Georgia,serif;">The Owl of Athena guards these secrets</div>
  `
  modal.appendChild(header)

  const progress = document.createElement('div')
  const pct = Math.round((discovered.size / ALL_EGGS.length) * 100)
  progress.innerHTML = `
    <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:rgba(224,176,74,0.5);margin:1rem 0 0.3rem;">
      <span>Discovered</span><span>${discovered.size}/${ALL_EGGS.length}</span>
    </div>
    <div style="width:100%;height:6px;background:rgba(0,0,0,0.3);border-radius:3px;overflow:hidden;">
      <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#d4a017,#e0b04a);border-radius:3px;transition:width 0.4s;"></div>
    </div>
  `
  modal.appendChild(progress)

  const categories: EggMeta['category'][] = ['Interactive', 'Mode', 'Visual']
  categories.forEach(cat => {
    const eggs = EGG_CATALOG.filter(e => e.category === cat)
    if (eggs.length === 0) return

    const catHeader = document.createElement('div')
    catHeader.textContent = cat
    catHeader.style.cssText = `font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(224,176,74,0.35);margin:1.5rem 0 0.5rem;`
    modal.appendChild(catHeader)

    eggs.forEach(egg => {
      const isFound = discovered.has(egg.id)
      const card = document.createElement('div')
      card.style.cssText = `
        display:flex;align-items:center;gap:0.75rem;
        padding:0.75rem;margin-bottom:0.5rem;
        background:rgba(0,0,0,${isFound ? '0.2' : '0.15'});
        border:1px solid rgba(224,176,74,${isFound ? '0.15' : '0.06'});
        border-radius:10px;transition:border-color 0.2s;
      `

      const icon = document.createElement('div')
      icon.textContent = egg.icon
      icon.style.cssText = `font-size:1.5rem;width:2rem;text-align:center;flex-shrink:0;font-family:'Fraunces',Georgia,serif;`
      card.appendChild(icon)

      const info = document.createElement('div')
      info.style.cssText = `flex:1;min-width:0;`
      info.innerHTML = `
        <div style="font-family:'Fraunces',Georgia,serif;font-size:0.95rem;font-weight:500;color:${isFound ? '#e0b04a' : 'rgba(224,176,74,0.7)'};">
          ${egg.name}${isFound ? ' <span style="color:#4ade80;font-size:0.7rem;">✓</span>' : ''}
        </div>
        <div style="font-size:0.78rem;color:rgba(224,176,74,0.4);margin-top:0.1rem;line-height:1.3;">${egg.desc}</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:rgba(224,176,74,0.25);margin-top:0.2rem;">${egg.command}</div>
      `
      card.appendChild(info)

      const btn = document.createElement('button')
      btn.textContent = '✦'
      btn.setAttribute('aria-label', `Invoke ${egg.name}`)
      btn.style.cssText = `
        flex-shrink:0;width:36px;height:36px;
        background:rgba(224,176,74,0.1);border:1px solid rgba(224,176,74,0.2);
        border-radius:8px;color:#e0b04a;font-size:1rem;cursor:pointer;
        transition:all 0.2s;
      `
      btn.onmouseenter = () => { btn.style.background = 'rgba(224,176,74,0.25)'; btn.style.borderColor = 'rgba(224,176,74,0.5)'; card.style.borderColor = 'rgba(224,176,74,0.25)' }
      btn.onmouseleave = () => { btn.style.background = 'rgba(224,176,74,0.1)'; btn.style.borderColor = 'rgba(224,176,74,0.2)'; card.style.borderColor = 'rgba(224,176,74,0.06)' }
      btn.onclick = () => {
        closeDiscoveryPanel()
        setTimeout(() => egg.trigger(), 300)
      }
      card.appendChild(btn)

      modal.appendChild(card)
    })
  })

  const tips = document.createElement('div')
  tips.innerHTML = `
    <div style="margin:1.5rem 0 0.5rem;padding-top:1rem;border-top:1px solid rgba(224,176,74,0.1);font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(224,176,74,0.3);">Also try</div>
    <div style="font-size:0.8rem;color:rgba(224,176,74,0.5);line-height:1.6;">
      Click the nav logo 5× for a surprise.<br>
      Open browser console (F12) and type <code style="background:rgba(224,176,74,0.1);padding:1px 4px;border-radius:3px;">help()</code> for command access.
    </div>
  `
  modal.appendChild(tips)

  panelEl.onclick = (e) => { if (e.target === panelEl) closeDiscoveryPanel() }
  const escHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') { closeDiscoveryPanel(); document.removeEventListener('keydown', escHandler) } }
  document.addEventListener('keydown', escHandler)

  panelEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' })
  modal.animate([{ transform: 'scale(0.9) translateY(20px)', opacity: 0 }, { transform: 'scale(1) translateY(0)', opacity: 1 }], { duration: 300, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' })
}

function closeDiscoveryPanel() {
  if (!panelEl) return
  const p = panelEl
  panelEl = null
  p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' })
  setTimeout(() => p.remove(), 250)
}

// ================================================================
// Console: help() — lists all easter eggs
// ================================================================
function printHelp() {
  const header = 'font-size:18px;font-weight:bold;color:#e0b04a;background:#1a1a2e;padding:4px 12px;border-radius:4px;'
  const section = 'font-size:13px;font-weight:bold;color:#e0b04a;margin-top:8px;'
  const item = 'font-size:12px;color:#c8c0ab;'
  const dim = 'font-size:12px;color:#6b7280;font-style:italic;'

  console.log('%c🏛️  Edoxen — Hidden Inscriptions', header)
  console.log('%c\nKeyboard sequences:', section)
  console.log('%c  edoxen        Stoichedon letter cascade (ΕΔΟΞΕΝ)', item)
  console.log('%c  ↑↑↓↓←→←→ B A  The Assembly convokes', item)
  console.log('%c\nConsole commands:', section)
  console.log('%c  gavel()       Order in the court!', item)
  console.log('%c  resolve()     Stamp a resolution (ἔδοξεν)', item)
  console.log('%c  lottery()     Sortition — Athenian random selection', item)
  console.log('%c  ostracize()   Banish someone by ostracism', item)
  console.log('%c  edoxen()      Trigger the stoichedon cascade manually', item)
  console.log('%c  assembly()    ⚡ Interactive Ekklesia — propose & vote!', item)
  console.log('%c  boule()       The Council of 500 — tribes cast their votes', item)
  console.log('%c  decree()      Generate a random Athenian decree', item)
  console.log('%c  scribe()      Toggle Chisel Mode — page becomes marble', item)
  console.log('%c  sacredfire()  Light the eternal flame of Hestia', item)
  console.log('%c  marathon()    Pheidippides runs: νενίκηκαμεν!', item)
  console.log('%c  symposium()   A philosophical quote for governance', item)
  console.log('%c  prophecy()    The Oracle of Delphi speaks', item)
  console.log('%c\nHidden interactions:', section)
  console.log('%c  Click the nav logo 5×  ??? ', item)
  console.log(`%c\n  Discovered: ${discovered.size}/${ALL_EGGS.length}`, dim)
  console.log('%c  Type help() again to see this list.\n', dim)
}

// ================================================================
// Setup
// ================================================================
function matchSequence(target: string[], onMatch: () => void) {
  let buffer: string[] = []
  window.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    buffer.push(e.key.toLowerCase())
    if (buffer.length > target.length) buffer.shift()
    if (buffer.join(',') === target.join(',')) {
      onMatch()
      buffer = []
    }
  })
}

function setupKeyboard() {
  matchSequence(['e','d','o','x','e','n'], stoichedonCascade)
  matchSequence(['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'], assemblyMarch)
  matchSequence(['b','o','u','l','e'], bouleVote)
  matchSequence(['s','c','r','i','b','e'], scribeMode)
}

function setupConsole() {
  Object.assign(window, {
    help: printHelp,
    edoxen: stoichedonCascade,
    gavel: gavelBang,
    resolve: resolutionStamp,
    lottery: sortition,
    ostracize: ostracism,
    assembly: interactiveAssembly,
    boule: bouleVote,
    decree: decreeGenerator,
    scribe: scribeMode,
    sacredfire: sacredFire,
    marathon: marathonRunner,
    symposium: symposiumQuote,
    prophecy: oracleProphecy,
  })
}

function setupLogoClick() {
  const logos = document.querySelectorAll<HTMLElement>('.nav-logo')
  let clicks = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  logos.forEach(logo => {
    logo.addEventListener('click', (e) => {
      clicks++
      clearTimeout(timer)
      timer = setTimeout(() => { clicks = 0 }, 2500)
      if (clicks >= 5) {
        clicks = 0
        logoChisel(logo)
      }
    })
  })
}

function printTeaser() {
  const style = 'font-size:14px;font-weight:bold;color:#e0b04a;'
  const sub = 'font-size:11px;color:#6b7280;'
  console.log('%c🦙  Edoxen', style)
  console.log('%cClick the owl in the corner (or type help()) to discover hidden inscriptions.', sub)
}

export function initEasterEggs() {
  if (typeof window === 'undefined') return
  setupKeyboard()
  setupConsole()
  setupLogoClick()
  createOwlButton()
  printTeaser()
}
