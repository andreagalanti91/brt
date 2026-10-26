import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Variabili di build (usate dal workflow di GitHub Pages):
 * - BASE_PATH: sottopercorso di pubblicazione, es. "/brt/"
 * - SITE_URL:  URL pubblico completo, per rendere assoluti og:image / og:url
 * - NOINDEX:   "true" per le anteprime da non indicizzare
 */
const base = process.env.BASE_PATH ?? '/'
const siteUrl = process.env.SITE_URL?.replace(/\/?$/, '/')
const noindex = process.env.NOINDEX === 'true'

function publishMeta(): Plugin {
  return {
    name: 'publish-meta',
    transformIndexHtml(html) {
      let out = html.replaceAll('__BASE__', base)
      if (siteUrl) {
        out = out
          .replaceAll(`content="${base}images/`, `content="${siteUrl}images/`)
          .replaceAll(`"image": "${base}images/`, `"image": "${siteUrl}images/`)
          .replace('<meta property="og:type"', `<meta property="og:url" content="${siteUrl}" />\n    <meta property="og:type"`)
      }
      if (noindex) {
        out = out.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex, nofollow" />')
      }
      return out
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), publishMeta()],
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
})
