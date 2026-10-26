import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import type { Lang } from './content/site'
import './styles'

const root = document.getElementById('root')!
const lang: Lang = document.documentElement.lang === 'en' || /\/en\/?$/.test(location.pathname) ? 'en' : 'it'
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
)

// In produzione l'HTML è pre-renderizzato (scripts/prerender.mjs): si idrata; in sviluppo si monta da zero.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
