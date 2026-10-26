import { useEffect, useState } from 'react'
import { company, sectionIds, type Content, type SectionId } from '../content/site'
import { asset } from '../lib/asset'
import { Logo } from './Logo'
import { PhoneIcon, PinIcon } from './Icons'

type Props = { t: Content; active: SectionId }

export function Header({ t, active }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const activeIndex = sectionIds.indexOf(active)

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <a className="site-header__logo" href="#home" aria-label="BRT Industrial Service – Home">
            <Logo />
          </a>

          <nav className="nav-pill" aria-label="Sezioni" style={{ ['--i' as string]: activeIndex }}>
            <span className="nav-pill__indicator" aria-hidden="true" />
            {sectionIds.map((id, i) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : undefined} aria-current={active === id ? 'true' : undefined}>
                {t.nav[i]}
              </a>
            ))}
          </nav>

          <div className="site-header__tools">
            <a className="icon-button" href={company.maps} target="_blank" rel="noopener noreferrer" aria-label={t.ui.directions}>
              <PinIcon />
            </a>
            <a className="icon-button" href={company.phoneHref} aria-label={`${t.ui.call} ${company.phone}`}>
              <PhoneIcon />
            </a>
            <a className="lang-switch" href={asset(t.otherLang.href)} hrefLang={t.otherLang.code.toLowerCase()} aria-label={t.otherLang.label}>
              {t.otherLang.code}
            </a>
            <a className="button button--small button--light site-header__cta" href="#contatti">
              {t.ui.contactCta}
            </a>
            <button
              type="button"
              className={`burger${open ? ' is-open' : ''}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.ui.close : t.ui.menu}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Menu">
          {sectionIds.map((id, i) => (
            <a key={id} href={`#${id}`} style={{ ['--d' as string]: `${i * 55 + 80}ms` }} onClick={() => setOpen(false)}>
              {t.nav[i]}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer" style={{ ['--d' as string]: '400ms' }}>
          <a href={company.phoneHref}>
            <PhoneIcon /> {company.phone}
          </a>
          <a href={asset(t.otherLang.href)}>{t.otherLang.label}</a>
        </div>
      </div>

      {/* Indice laterale delle sezioni, come nel sito originale */}
      <nav className="section-rail" aria-label="Indice">
        {sectionIds.map((id, i) => (
          <a key={id} href={`#${id}`} className={active === id ? 'is-active' : undefined}>
            <span className="section-rail__dot" aria-hidden="true" />
            <span className="section-rail__label">{t.nav[i]}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
