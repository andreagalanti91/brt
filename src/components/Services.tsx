import type { Content } from '../content/site'
import { asset } from '../lib/asset'
import { BG_WIDTHS, Picture } from './Picture'
import { Spotlight } from './Spotlight'

export function Services({ t }: { t: Content }) {
  const s = t.services
  return (
    <section id="servizi" className="services" aria-labelledby="servizi-title">
      <div className="services__banner" data-scene="pass">
        <Picture name="services" widths={BG_WIDTHS} sizes="100vw" alt="" width={1920} height={1080} className="services__photo" />
        <div className="container services__intro">
          <h2 id="servizi-title" className="display reveal">
            {s.title[0]}
            <br />
            <span className="headline__soft">{s.title[1]}</span>
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="services__text">
          {s.paragraphs.map((p, i) => (
            <p key={i} className="lead reveal" style={{ ['--delay' as string]: `${i * 80}ms` }}>
              {p}
            </p>
          ))}
        </div>

        <div className="bento">
          <Spotlight className="bento__card bento__card--cert reveal">
            <img src={asset('images/rina-en1090.png')} alt={t.ui.rinaAlt} width={500} height={425} loading="lazy" />
            <p>{s.cert}</p>
          </Spotlight>

          <Spotlight className="bento__card bento__card--license reveal" style={{ ['--delay' as string]: '80ms' }}>
            <p className="bento__intro">{s.licenseIntro}</p>
            <ul className="licenses">
              {s.licenses.map((l) => (
                <li key={l.letter}>
                  <span className="licenses__letter" aria-hidden="true">
                    {l.letter}
                  </span>
                  <span>
                    {l.label} <span className="licenses__ref">({s.letterWord} {l.letter})</span>
                  </span>
                </li>
              ))}
            </ul>
          </Spotlight>

          <Spotlight className="bento__card bento__card--training reveal" style={{ ['--delay' as string]: '160ms' }}>
            <p>{s.training}</p>
          </Spotlight>
        </div>
      </div>
    </section>
  )
}
