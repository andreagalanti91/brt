# BRT Industrial Service srl — Redesign del sito

Prima bozza del nuovo sito di [www.brt.srl](https://www.brt.srl/): stessa struttura e stessi contenuti
(testi e foto originali, italiano e inglese), con un nuovo look & feel in **dark mode stile Apple**,
ispirato a [terminal-industries.com](https://terminal-industries.com/).

**Stack:** React 19 + TypeScript + Vite 8, CSS con design token (nessun framework CSS), nessuna libreria di animazione.
In fase di build l'HTML viene pre-renderizzato (`/` in italiano, `/en/` in inglese), quindi i contenuti
sono nel sorgente anche senza JavaScript (SEO).

## Struttura (invariata rispetto al sito attuale)

| Sezione  | Contenuto                                                                            |
| -------- | ------------------------------------------------------------------------------------ |
| Home     | BRT Industrial Services, sottotitolo, 15 servizi in tre colonne, marchio RINA        |
| About    | Flessibilità e servizi su misura, Tool chain tecnologica                             |
| Servizi  | Servizi specializzati, certificazione EN 1090-1, abilitazioni L 46/90                 |
| Progetti | Clienti per settore e galleria dei 13 lavori (con visualizzazione a schermo intero)  |
| Contatti | Sede, referenti e modulo di contatto                                                 |

## Design ed effetti

- Nero puro, riquadri grafite, vetro smerigliato su header e pannelli; accento teal → blu preso dal marchio BRT.
- Apertura: la foto dell'impianto si vede attraverso la scritta "BRT", che si ingrandisce allo scroll
  fino ad aprirsi a tutto schermo sul titolo.
- Sottotitolo che si "accende" parola per parola, foto About che si espande da riquadro a tutto schermo,
  parallasse sugli sfondi, galleria orizzontale agganciata allo scroll (desktop) o a scorrimento (mobile),
  nastro dei clienti, menu mobile a tutto schermo, indicatore di sezione nel menu e indice laterale.
- Tutte le animazioni legate allo scroll passano da un solo listener (`src/hooks/useScrollScenes.ts`) che
  scrive la variabile CSS `--p`; con "riduci movimento" attivo o senza JavaScript il sito è statico e completo.

## Comandi

```bash
npm install
npm run dev        # sviluppo su http://localhost:5173 (versione inglese su /en/)
npm run build      # typecheck + build + prerender HTML in dist/
npm run preview    # anteprima della build di produzione
npm run lint       # ESLint (TypeScript, React Hooks, jsx-a11y)
npm run images     # rigenera le immagini AVIF/WebP da assets-src/ (Python 3 + Pillow)
```

## Da verificare prima della messa online

- **Modulo contatti:** invia gli stessi campi del sito attuale (`nome`, `cognome`, `email`, `telefono`,
  `messaggio`) a `https://www.brt.srl/mailSend.php` (`company.formEndpoint` in `src/content/site.ts`).
  Funziona solo se lo script è raggiungibile in HTTPS e, se il sito è su un altro dominio, accetta richieste
  CORS. In caso di errore il modulo mostra l'indirizzo email da usare.
- L'anteprima su GitHub Pages è pubblicata con `noindex`.
