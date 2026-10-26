import type { Content } from '../content/site'

/** Il sottotitolo storico del sito, che si "accende" parola per parola durante lo scroll. */
export function Statement({ t }: { t: Content }) {
  const words = t.home.subtitle.split(' ')
  return (
    <div className="statement" data-scene="pin">
      <div className="statement__sticky">
        <p className="statement__text">
          {words.map((word, i) => (
            <span key={i} style={{ ['--w' as string]: (i / words.length).toFixed(3) }}>
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
