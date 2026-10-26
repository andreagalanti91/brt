import { useState, type FormEvent } from 'react'
import { company, telHref, type Content } from '../content/site'
import { BG_WIDTHS, Picture } from './Picture'
import { MailIcon, PhoneIcon, PinIcon } from './Icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contacts({ t }: { t: Content }) {
  const c = t.contacts
  const f = c.form
  const [errors, setErrors] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const missing: string[] = []
    if (!String(data.get('nome') ?? '').trim()) missing.push(f.required.nome)
    if (!String(data.get('email') ?? '').trim()) missing.push(f.required.email)
    if (!String(data.get('messaggio') ?? '').trim()) missing.push(f.required.messaggio)
    if (!data.get('privacy')) missing.push(f.required.privacy)
    setErrors(missing)
    if (missing.length) return

    data.delete('privacy')
    setStatus('sending')
    try {
      const res = await fetch(company.formEndpoint, { method: 'POST', body: data })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contatti" className="contacts" aria-labelledby="contatti-title">
      <Picture name="contacts" widths={BG_WIDTHS} sizes="100vw" alt="" width={1920} height={1080} className="contacts__photo" />
      <div className="container contacts__grid">
        <div className="contacts__info">
          <h2 id="contatti-title" className="display reveal">
            {c.title}
          </h2>

          <address className="contacts__company reveal">
            <strong>{company.legal}</strong>
            <span>{c.vat}</span>
            <a href={company.maps} target="_blank" rel="noopener noreferrer" className="contacts__line">
              <PinIcon />
              <span>
                {company.street}
                <br />
                {company.city}
                <br />
                {c.country}
              </span>
            </a>
            <a href={company.phoneHref} className="contacts__line">
              <PhoneIcon />
              <span>
                {c.phoneLabel}: {company.phone}
              </span>
            </a>
          </address>

          <ul className="people">
            {c.people.map((p, i) => (
              <li key={p.name} className="people__card reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
                <span className="people__role">{p.role}</span>
                <span className="people__name">{p.name}</span>
                <a href={telHref(p.mob)}>
                  <PhoneIcon /> Mob: {p.mob}
                </a>
                <a href={`mailto:${p.email}`}>
                  <MailIcon /> {p.email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
          <div className="contact-form__row">
            <Field name="nome" label={f.nome} autoComplete="given-name" />
            <Field name="cognome" label={f.cognome} autoComplete="family-name" />
          </div>
          <div className="contact-form__row">
            <Field name="email" label={f.email} type="email" autoComplete="email" />
            <Field name="telefono" label={f.telefono} type="tel" autoComplete="tel" />
          </div>
          <label className="field">
            <textarea name="messaggio" rows={5} placeholder=" " />
            <span>{f.messaggio}</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" name="privacy" value="1" />
            <span>{f.privacy}</span>
          </label>

          <div className="contact-form__footer">
            <button type="submit" className="button button--light" disabled={status === 'sending'}>
              {status === 'sending' ? f.sending : f.submit}
            </button>
            <div className="contact-form__status" role="status" aria-live="polite">
              {errors.length > 0 && (
                <ul className="contact-form__errors">
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
              {errors.length === 0 && status === 'sent' && <p className="is-ok">{f.sent}</p>}
              {errors.length === 0 && status === 'error' && <p className="is-error">{f.error}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ name, label, type = 'text', autoComplete }: { name: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <label className="field">
      <input name={name} type={type} placeholder=" " autoComplete={autoComplete} />
      <span>{label}</span>
    </label>
  )
}
