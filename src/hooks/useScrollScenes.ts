import { useEffect } from 'react'

/**
 * Motore delle animazioni legate allo scroll.
 * Ogni elemento con `data-scene` riceve la variabile CSS `--p` (0 → 1):
 * - `data-scene="pin"`: avanzamento all'interno di un contenitore alto con figlio sticky
 *   (0 quando il contenitore tocca la cima del viewport, 1 quando il suo fondo arriva in fondo);
 * - `data-scene="pass"`: avanzamento mentre l'elemento attraversa il viewport
 *   (0 quando il suo bordo superiore entra dal basso, 1 quando il bordo inferiore esce in alto).
 *
 * Lo scroll resta quello nativo; è `--p` a inseguire la posizione con un'interpolazione,
 * così le animazioni restano fluide anche con la rotella del mouse (scatti da ~100px, tipici di Windows).
 * Un solo listener passivo e un solo requestAnimationFrame per tutta la pagina.
 */
const EASE = 0.2
const EPSILON = 0.0005

/**
 * Ingrandimento della scritta "BRT" dell'apertura. È scritto come attributo SVG (non con CSS):
 * Chrome non ridisegna in modo affidabile una maschera SVG trasformata via CSS e,
 * tornando su o dopo un salto, mostrerebbe la maschera vecchia.
 */
function zoomGlyphs(scene: HTMLElement, p: number) {
  const glyphs = scene.querySelector('[data-glyphs]')
  if (!glyphs) return
  const zoom = Math.min(1, p / 0.6)
  const base = window.matchMedia('(max-width: 640px)').matches ? 1.38 : 1
  const s = (base * (1 + zoom ** 3 * 26)).toFixed(4)
  glyphs.setAttribute('transform', `translate(800 450) scale(${s}) translate(-800 -450)`)
}

export function useScrollScenes() {
  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('reduced-motion')
      return
    }

    const current = new WeakMap<HTMLElement, number>()
    let frame = 0

    const target = (el: HTMLElement, vh: number) => {
      const rect = el.getBoundingClientRect()
      const p = el.dataset.scene === 'pin' ? -rect.top / Math.max(1, rect.height - vh) : (vh - rect.top) / (vh + rect.height)
      return Math.min(1, Math.max(0, p))
    }

    const tick = (snap: boolean) => {
      frame = 0
      const vh = window.innerHeight
      let moving = false
      document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
        // Anche le scene fuori schermo vengono aggiornate: un salto con l'ancora o "Torna su"
        // non deve lasciare valori vecchi che si vedrebbero tornando indietro.
        const goal = target(el, vh)
        const prev = current.get(el)
        let next = goal
        if (!snap && prev !== undefined) {
          const delta = goal - prev
          // Grandi salti (link del menu) si applicano subito, i piccoli passi vengono ammorbiditi
          if (Math.abs(delta) < 0.35 && Math.abs(delta) > EPSILON) {
            next = prev + delta * EASE
            moving = true
          }
        }
        if (next !== prev) {
          current.set(el, next)
          el.style.setProperty('--p', next.toFixed(4))
          zoomGlyphs(el, next)
        }
      })
      if (moving) frame = requestAnimationFrame(() => tick(false))
    }

    const request = () => {
      if (!frame) frame = requestAnimationFrame(() => tick(false))
    }
    const snap = () => {
      cancelAnimationFrame(frame)
      tick(true)
    }

    snap()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', snap)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', snap)
    }
  }, [])
}
