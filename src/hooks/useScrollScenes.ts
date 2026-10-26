import { useEffect } from 'react'

/**
 * Motore delle animazioni legate allo scroll.
 * Ogni elemento con `data-scene` riceve la variabile CSS `--p` (0 → 1):
 * - `data-scene="pin"`: avanzamento all'interno di un contenitore alto con figlio sticky
 *   (0 quando il contenitore tocca la cima del viewport, 1 quando il suo fondo arriva in fondo);
 * - `data-scene="pass"`: avanzamento mentre l'elemento attraversa il viewport
 *   (0 quando il suo bordo superiore entra dal basso, 1 quando il bordo inferiore esce in alto).
 * Un solo listener passivo e un solo requestAnimationFrame per tutta la pagina.
 */
export function useScrollScenes() {
  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('reduced-motion')
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      root.style.setProperty('--scroll-y', String(window.scrollY))
      document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -vh || rect.top > vh * 2) return
        const p =
          el.dataset.scene === 'pin'
            ? -rect.top / Math.max(1, rect.height - vh)
            : (vh - rect.top) / (vh + rect.height)
        el.style.setProperty('--p', Math.min(1, Math.max(0, p)).toFixed(4))
      })
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])
}
