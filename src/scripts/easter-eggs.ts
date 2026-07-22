// Edoxen WAAPI Easter Eggs — Hidden Inscriptions
// ================================================
// Every egg ties back to Athenian democracy, inscription culture, or
// parliamentary procedure — the thematic core of the Edoxen project.
// All animations use the Web Animations API (element.animate()).
// Respects prefers-reduced-motion.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const discovered = new Set<string>()
const ALL_EGGS = ['stoichedon', 'assembly', 'gavel', 'resolve', 'lottery', 'ostracize', 'logo-chisel'] as const

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
}

function setupConsole() {
  Object.assign(window, {
    help: printHelp,
    edoxen: stoichedonCascade,
    gavel: gavelBang,
    resolve: resolutionStamp,
    lottery: sortition,
    ostracize: ostracism,
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
  console.log('%c🏛️  Edoxen', style)
  console.log('%cType help() to discover hidden inscriptions.', sub)
}

export function initEasterEggs() {
  if (typeof window === 'undefined') return
  setupKeyboard()
  setupConsole()
  setupLogoClick()
  printTeaser()
}
