import { company, type Content } from '../content/site'
import { asset } from '../lib/asset'
import { BG_WIDTHS, Picture } from './Picture'

/**
 * Apertura: la foto dell'impianto si vede solo attraverso la scritta "BRT";
 * scorrendo, le lettere si ingrandiscono finché la foto riempie lo schermo e compare il titolo.
 */
export function Hero({ t }: { t: Content }) {
  return (
    <div className="hero" data-scene="pin">
      <div className="hero__stage">
        <div className="hero__media">
          <Picture name="home" widths={BG_WIDTHS} sizes="100vw" alt="" width={1920} height={1080} priority className="hero__photo" />
          <div className="hero__tint" />
        </div>

        <svg className="hero__mask" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <mask id="brt-mask" maskUnits="userSpaceOnUse" x="-8000" y="-8000" width="17600" height="16900">
              <rect x="-8000" y="-8000" width="17600" height="16900" fill="#fff" />
              <text x="800" y="640" textAnchor="middle" className="hero__mask-text">
                BRT
              </text>
            </mask>
          </defs>
          <rect x="-8000" y="-8000" width="17600" height="16900" fill="#000" mask="url(#brt-mask)" />
        </svg>

        <div className="hero__content">
          <h1 className="hero__title">
            {t.home.title.map((line, i) => (
              <span key={line} className="hero__line" style={{ ['--i' as string]: i }}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <div className="hero__actions">
            <a className="button button--light" href="#servizi">
              {t.ui.discover}
            </a>
            <a className="button button--glass" href="#contatti">
              {t.ui.contactCta}
            </a>
          </div>
        </div>

        <div className="hero__meta">
          <span>{company.legal}</span>
          <span>
            {t.ui.vatLabel}: {company.vat}
          </span>
        </div>
        <img className="hero__rina" src={asset('images/rina-en1090.png')} alt={t.ui.rinaAlt} width={500} height={425} />

        <div className="hero__hint" aria-hidden="true">
          <span>{t.ui.scroll}</span>
          <i />
        </div>
      </div>
    </div>
  )
}
