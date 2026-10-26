import { useEffect, useRef, useState } from 'react'
import { works, type Content } from '../content/site'
import { asset } from '../lib/asset'
import { BG_WIDTHS, Picture, WORK_WIDTHS } from './Picture'
import { Lightbox } from './Lightbox'

export function Projects({ t }: { t: Content }) {
  const p = t.projects
  const allClients = p.sectors.flatMap((s) => s.clients)
  const [photo, setPhoto] = useState<number | null>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  // Galleria orizzontale "agganciata" su desktop: l'altezza del contenitore determina la durata dello scorrimento.
  useEffect(() => {
    const scene = sceneRef.current
    const track = trackRef.current
    if (!scene || !track) return
    const desktop = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    const measure = () => {
      if (!desktop.matches) {
        scene.style.removeProperty('height')
        return
      }
      // clientWidth esclude la barra di scorrimento (presente su Windows), così l'ultima foto non resta tagliata
      const shift = Math.max(0, track.scrollWidth - document.documentElement.clientWidth)
      scene.style.setProperty('--shift', String(shift))
      // La galleria scorre più veloce dello scroll verticale, così la sezione non risulta troppo lunga
      scene.style.height = `${shift * 0.6 + window.innerHeight}px`
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    desktop.addEventListener('change', measure)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      desktop.removeEventListener('change', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section id="progetti" className="projects" aria-labelledby="progetti-title">
      <div className="projects__head">
        <Picture name="projects" widths={BG_WIDTHS} sizes="100vw" alt="" width={1920} height={1080} className="projects__photo" />
        <div className="container">
          <h2 id="progetti-title" className="display reveal">
            {p.title[0]}
            <br />
            <span className="headline__soft">{p.title[1]}</span>
          </h2>
        </div>
      </div>

      <div className="container">
        <dl className="sectors">
          {p.sectors.map((sector, i) => (
            <div key={sector.name} className="sectors__row reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
              <dt>{sector.name}</dt>
              <dd>{sector.clients.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <span key={copy} className="marquee__group">
              {allClients.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div ref={sceneRef} className="gallery" data-scene="pin">
        <div className="gallery__sticky">
          <ul ref={trackRef} className="gallery__track" aria-label={t.ui.gallery}>
            {works.map((w, i) => (
              <li key={w.n} className={`gallery__item gallery__item--${w.ratio}`}>
                <button type="button" onClick={() => setPhoto(i)} aria-label={`${t.ui.openPhoto} ${i + 1} / ${works.length}`}>
                  <Picture
                    name={`work-${w.n}`}
                    widths={WORK_WIDTHS}
                    sizes="(min-width: 900px) 42vw, 82vw"
                    alt={t.ui.workAlt}
                    width={1000}
                    height={w.ratio === 'portrait' ? 1333 : w.ratio === 'four-three' ? 750 : 620}
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="gallery__progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>

      <Lightbox
        t={t}
        index={photo}
        count={works.length}
        src={(i) => asset(`images/work-${works[i].n}-1000.webp`)}
        onChange={setPhoto}
      />
    </section>
  )
}
