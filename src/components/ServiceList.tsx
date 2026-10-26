import type { Content } from '../content/site'

export function ServiceList({ t }: { t: Content }) {
  return (
    <div className="container service-list">
      {t.home.services.map((group, g) => (
        <ul key={g} className="service-list__group reveal" style={{ ['--delay' as string]: `${g * 90}ms` }}>
          {group.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ))}
    </div>
  )
}
