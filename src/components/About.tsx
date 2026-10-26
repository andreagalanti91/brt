import type { Content } from '../content/site'
import { BG_WIDTHS, Picture } from './Picture'

/** La foto si espande da riquadro a tutto schermo; i due testi scorrono sopra in vetro smerigliato. */
export function About({ t }: { t: Content }) {
  return (
    <section id="about" className="about" aria-label={t.nav[1]}>
      <div className="about__scene" data-scene="pin">
        <div className="about__sticky">
          <div className="about__frame">
            <Picture name="about" widths={BG_WIDTHS} sizes="100vw" alt="" width={1920} height={1080} className="about__photo" />
          </div>
        </div>
        <div className="about__panels">
          {t.about.map((block) => (
            <article key={block.title[0]} className="glass-panel reveal">
              <h2 className="headline">
                {block.title[0]}
                <br />
                <span className="headline__soft">{block.title[1]}</span>
              </h2>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
