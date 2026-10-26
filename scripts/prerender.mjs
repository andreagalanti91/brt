// Inserisce l'HTML statico generato da React in dist/index.html (italiano) e dist/en/index.html (inglese),
// così i contenuti sono indicizzabili e visibili anche prima (o senza) l'esecuzione di JavaScript.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const placeholder = '<div id="root"></div>'

if (!template.includes(placeholder)) {
  throw new Error('Placeholder #root non trovato in dist/index.html')
}

const itDescription = 'Servizi di progettazione, realizzazione e assistenza post-vendita di Impiantistica Industriale, da oltre 25 anni.'
const enDescription =
  'Over 25 years of experience providing design, construction and maintenance services for industrial plant engineering.'

const pages = [
  { lang: 'it', file: path.join(dist, 'index.html'), html: template },
  {
    lang: 'en',
    file: path.join(dist, 'en', 'index.html'),
    html: template
      .replace('<html lang="it">', '<html lang="en">')
      .replaceAll('BRT Industrial Service srl | Impiantistica industriale', 'BRT Industrial Service srl | Industrial plant engineering')
      .replaceAll(`content="${itDescription}"`, `content="${enDescription}"`)
      .replace('content="it_IT"', 'content="en_GB"'),
  },
]

for (const page of pages) {
  await mkdir(path.dirname(page.file), { recursive: true })
  await writeFile(page.file, page.html.replace(placeholder, `<div id="root">${render(page.lang)}</div>`))
  console.log(`Prerender completato: ${path.relative(root, page.file)}`)
}

await rm(ssrDir, { recursive: true, force: true })
