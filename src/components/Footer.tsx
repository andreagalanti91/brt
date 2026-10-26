import { company, sectionIds, type Content } from '../content/site'
import { asset } from '../lib/asset'
import { Logo } from './Logo'
import { ArrowUpIcon } from './Icons'

export function Footer({ t }: { t: Content }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Logo className="site-footer__logo" />
          <p>
            {company.legal}
            <br />
            {t.ui.vatLabel}: {company.vat}
            <br />
            {company.street}, {company.city}
          </p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          {sectionIds.map((id, i) => (
            <a key={id} href={`#${id}`}>
              {t.nav[i]}
            </a>
          ))}
        </nav>
        <div className="site-footer__side">
          <a href={asset(t.otherLang.href)}>{t.otherLang.label}</a>
          <a href="#home" className="button button--glass button--small">
            <ArrowUpIcon /> {t.ui.backToTop}
          </a>
        </div>
      </div>
      <div className="container site-footer__base">
        <span>
          © {__BUILD_YEAR__} BRT Industrial Service srl
        </span>
      </div>
    </footer>
  )
}
