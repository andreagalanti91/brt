/**
 * Testi del sito, ripresi senza modifiche da www.brt.srl (versione italiana e inglese).
 * Le uniche aggiunte sono etichette d'interfaccia (pulsanti, stati del modulo, testi alternativi).
 */

export type Lang = 'it' | 'en'

export const company = {
  name: 'BRT Industrial Service srl',
  legal: '© BRT INDUSTRIAL SERVICE SRL',
  vat: '01468770522',
  street: 'Strada di Gabbricce, 19',
  city: '53035 Monteriggioni (SI)',
  phone: '+39 0577 304747',
  phoneHref: 'tel:+390577304747',
  maps: 'https://goo.gl/maps/XK17PwC8rLKEqaiK7',
  /** Endpoint del modulo contatti del sito attuale (riceve FormData: nome, cognome, email, telefono, messaggio). */
  formEndpoint: 'https://www.brt.srl/mailSend.php',
}

export const sectionIds = ['home', 'about', 'servizi', 'progetti', 'contatti'] as const
export type SectionId = (typeof sectionIds)[number]

export const works = Array.from({ length: 13 }, (_, i) => {
  // Stesso ordine della galleria originale: la foto 13 apre la serie
  const n = i === 0 ? 13 : i
  const tall = n === 9
  const wide = n >= 6 && n <= 8 ? 'four-three' : 'landscape'
  return { n, ratio: tall ? 'portrait' : wide }
})

const it = {
  lang: 'it' as Lang,
  otherLang: { code: 'EN', href: 'en/', label: 'English version' },
  nav: ['Home', 'About', 'Servizi', 'Progetti', 'Contatti'],
  ui: {
    contactCta: 'Contattaci',
    menu: 'Menu',
    close: 'Chiudi',
    call: 'Chiama',
    directions: 'Indicazioni stradali',
    gallery: 'Galleria lavori',
    openPhoto: 'Apri foto',
    prev: 'Foto precedente',
    next: 'Foto successiva',
    backToTop: 'Torna su',
    discover: 'Scopri i servizi',
    vatLabel: 'P.iva',
    workAlt: 'Impianto realizzato da BRT Industrial Service',
    rinaAlt: 'RINA – Processo certificato EN 1090-1 Strutture Metalliche',
    scroll: 'Scorri',
  },
  home: {
    title: ['BRT', 'Industrial', 'Services'],
    subtitle:
      'Servizi di progettazione, realizzazione e assistenza per impiantistica industriale, da oltre 25 anni; specializzati in impianti per il trattamento rifiuti',
    services: [
      [
        'Soluzioni per impianti Industriali',
        'Macchine di precisione',
        'Passaggi di sicurezza',
        'Progettazione, realizzazione e manutenzione impianti',
        'Nastri trasportatori',
      ],
      ['Integrazione sistemi PLC', 'Recupero calore', 'Reti distribuzione fluidi', 'Impianti di stoccaggio', 'Impianti fumi industriali'],
      [
        'Revisioni e adeguamenti',
        'Movimentazione e traslochi',
        'Manutenzione meccanica, oleodinamica, pneumatica',
        'Progettazione e costruzione carpenterie medio-pesanti',
        'Impianti di cogenerazione / teleriscaldamento',
      ],
    ],
  },
  about: [
    {
      title: ['Flessibilità e servizi', 'su misura per l’industria'],
      text: 'La progettazione e la realizzazione dei nostri prodotti e le nostre soluzioni integrate sono pensate e cucite su misura delle esigenze specifiche del cliente. Un team tecnico strutturato e altamente specializzato è in grado di intervenire h24 in modo rapido per assistenza e manutenzione.',
    },
    {
      title: ['Tool chain tecnologica', 'per prodotti affidabili e duraturi'],
      text: 'BRT Industrial Services utilizza solo materiali e tecnologie certificati, che è in grado di integrare con i sistemi di controllo e gestione più moderni ed efficienti. Infatti, solo la perfetta integrazione di meccanica, elettronica e informatica consente di ottimizzare tempi, spazi e risorse.',
    },
  ],
  services: {
    title: ['Servizi specializzati', 'per l’industria meccanica'],
    paragraphs: [
      'BRT Industrial Service srl lavora inoltre su impianti di stoccaggio e trasporto pneumatico materiali (Reti di metano A.P.B.P., GPL, gas tecnici, vapore, liquidi di raffreddamento acqua industriale, olio diatermico, farine e cereali, caffè, ecc…).',
      'Lo staff di BRT Industrial Service srl è qualificato e certificato per la realizzazione di opere di carpenteria industriale leggera e medio-pesante, per l’adeguamento e revisione di forni industriali, la lavorazione di acciai speciali.',
    ],
    cert: 'BRT Industrial Service srl è una società certificata in conformità con la legge EN 1090-1 (Valutazione di conformità dei componenti strutturali per l’esecuzione di strutture di acciaio e di alluminio - Marcatura CE) presso RINA s.p.a.',
    licenseIntro: 'BRT Industrial Services è abilitata ai sensi della L 46/90 a progettare, realizzare e installare impianti di:',
    licenses: [
      { letter: 'C', label: 'Riscaldamento e climatizzazione' },
      { letter: 'D', label: 'Idrosanitari, trasporto, trattamento ed accumulo acque' },
      { letter: 'E', label: 'Trasporto ed utilizzazione gas' },
      { letter: 'G', label: 'Protezione antincendio' },
    ],
    letterWord: 'lettera',
    training:
      'I tecnici della BRT Industrial Service srl sono tutti altamente specializzati e frequentano periodici Corsi di formazione e aggiornamento professionale',
  },
  projects: {
    title: ['Alcuni clienti', 'che utilizzano i nostri servizi'],
    sectors: [
      { name: 'Settore alimentare', clients: ['Amadori', 'Cantina Colline del Chianti', 'Fiore 1827'] },
      { name: 'Settore Meccanico', clients: ['Fonderie Valdelsane', 'Santarnecchi'] },
      {
        name: 'Settore Ambientale',
        clients: ['Sienambiente', 'Ecostar', 'Alia Servizi Ambientali', 'Revet', 'C.R.C.M', 'Ecostargrenn'],
      },
      { name: 'Altri Settori', clients: ['RCR Cristalleria', 'Proget Impianti', 'PAL', 'Frilli'] },
    ],
  },
  contacts: {
    title: 'Contatti',
    vat: 'P.IVA: 01468770522',
    country: 'ITALIA',
    phoneLabel: 'Tel',
    people: [
      { role: 'Responsabile Tecnico e Progettazione', name: 'Alessio Bartolomeo', mob: '+39 339 8816266', email: 'alessio@brt.srl' },
      { role: 'Responsabile Commerciale Amministrativo', name: 'Andrea Bartolomeo', mob: '+39 349 7320997', email: 'andrea@brt.srl' },
      { role: 'Responsabile Acquisti e Tecnico', name: 'Elio Nesi', mob: '+39 334 1987991', email: 'tecnico@brt.srl' },
      { role: 'Responsabile di cantiere', name: 'Rocco Bartolomeo', mob: '+39 338 6586092', email: 'rocco@brt.srl' },
    ],
    form: {
      nome: 'Nome',
      cognome: 'Cognome',
      email: 'Email',
      telefono: 'Telefono',
      messaggio: 'Messaggio',
      privacy: 'Acconsento al trattamento dei miei dati al fine di ricevere una risposta in seguito a questa richiesta di contatto.',
      submit: 'Invia',
      sending: 'Invio in corso…',
      sent: 'Messaggio inviato. Ti risponderemo al più presto.',
      error: 'Invio non riuscito. Riprova oppure scrivi direttamente a andrea@brt.srl.',
      required: {
        nome: 'Nome Obbligatorio',
        email: 'Email Obbligatoria',
        messaggio: 'Messaggio Obbligatorio',
        privacy: 'Conferma il consenso al trattamento dei dati per inviare il messaggio.',
      },
    },
  },
}

export type Content = typeof it

const en: Content = {
  lang: 'en',
  otherLang: { code: 'IT', href: '', label: 'Versione italiana' },
  nav: ['Home', 'About', 'Services', 'Projects', 'Contacts'],
  ui: {
    contactCta: 'Contact us',
    menu: 'Menu',
    close: 'Close',
    call: 'Call',
    directions: 'Get directions',
    gallery: 'Project gallery',
    openPhoto: 'Open photo',
    prev: 'Previous photo',
    next: 'Next photo',
    backToTop: 'Back to top',
    discover: 'Discover our services',
    vatLabel: 'VAT',
    workAlt: 'Plant built by BRT Industrial Service',
    rinaAlt: 'RINA – Certified process EN 1090-1 Metal Structures',
    scroll: 'Scroll',
  },
  home: {
    title: ['BRT', 'Industrial', 'Services'],
    subtitle:
      'Over 25 years of experience providing design, construction and maintenance services for industrial plant engineering; specialized in waste treatment plants',
    services: [
      ['Industrial plant solutions', 'Precision machinery', 'Safety certifications', 'Plant design, construction and maintenance', 'Conveyors'],
      ['PLC system integration', 'Heat recovery', 'Fluid distribution networks', 'Storage facilities', 'Industrial fumes systems'],
      [
        'Overhauls and upgrades',
        'Handling and relocations',
        'Mechanical, hydraulic and pneumatic maintenance',
        'Design and construction of medium-heavy carpentry infrastructures',
        'District heating / Co-generation plants',
      ],
    ],
  },
  about: [
    {
      title: ['Flexibility and bespoke', 'services for industry'],
      text: 'The design and construction of our products and integrated solutions are tailored to the specific needs of the customer. A structured, highly specialized technical team is at your full disposal for prompt assistance and maintenance 24/7.',
    },
    {
      title: ['Technological toolchain', 'for reliable and durable products'],
      text: 'BRT Industrial Services makes exclusive use of certified materials and technologies, integrated with state-of-the-art control and management systems for utmost efficiency. Indeed, only the most perfect integration of mechanics, electronics and information technology allows for the best optimization of time, space and resources.',
    },
  ],
  services: {
    title: ['Specialized services', 'for the mechanical industry'],
    paragraphs: [
      'BRT Industrial Service is devoted to the design and construction of industrial plants to transport bulk materials (belt and screw conveyors), waste treatment and storage plants, refrigeration and heat recovery systems.',
      'BRT Industrial Service also offers bulk storage solutions and pneumatic transport systems applied to A.P.B.P. methane networks, LPG, technical gases, steam, industrial water cooling liquids, diathermal oil, flours, cereals, coffee, and much more.',
      'The staff at BRT Industrial Service is qualified and certified for the construction of light and medium-heavy industrial carpentry infrastructures, industrial furnaces upgrades and overhauls, special steel processing.',
    ],
    cert: 'BRT Industrial Service is certified by RINA s.p.a. in compliance with the law EN 1090-1 (Conformity assessment of structural components for the execution of steel and aluminium structures - CE marking)',
    licenseIntro: 'Pursuant to L 46/90, BRT Industrial Service is authorized to design, build and install the following systems:',
    licenses: [
      { letter: 'C', label: 'Heating and air conditioning' },
      { letter: 'D', label: 'Sanitary water transport, treatment and storage' },
      { letter: 'E', label: 'Gas transportation and usage' },
      { letter: 'G', label: 'Fire protection' },
    ],
    letterWord: 'letter',
    training:
      'All BRT Industrial Service technicians are highly specialized and attend professional training and updating courses on a regular basis.',
  },
  projects: {
    title: ['Some customers', 'enjoying our services'],
    sectors: [
      { name: 'Food Industry', clients: ['Amadori', 'Colline del Chianti Winery', 'Fiore 1827'] },
      { name: 'Mechanical Industry', clients: ['Fonderie Valdelsane', 'Santarnecchi'] },
      {
        name: 'Environmental Sector',
        clients: ['Sienambiente', 'Ecostar', 'Alia Environmental Services', 'Revet', 'C.R.C.M', 'Ecostargrenn'],
      },
      { name: 'Other Sectors', clients: ['RCR Cristalleria', 'Proget Impianti', 'PAL', 'Frilli'] },
    ],
  },
  contacts: {
    title: 'Contacts',
    vat: 'VAT number: 01468770522',
    country: 'ITALY',
    phoneLabel: 'Phone',
    people: [
      { role: 'Technical Design Manager', name: 'Alessio Bartolomeo', mob: '+39 339 8816266', email: 'alessio@brt.srl' },
      { role: 'Sales Manager, Administration', name: 'Andrea Bartolomeo', mob: '+39 349 7320997', email: 'andrea@brt.srl' },
      { role: 'Supply Chain Manager, Technician', name: 'Elio Nesi', mob: '+39 334 1987991', email: 'tecnico@brt.srl' },
      { role: 'Site manager', name: 'Rocco Bartolomeo', mob: '+39 338 6586092', email: 'rocco@brt.srl' },
    ],
    form: {
      nome: 'Name',
      cognome: 'Surname',
      email: 'Email',
      telefono: 'Phone',
      messaggio: 'Message',
      privacy: 'I consent to the processing of my data in order to receive an answer following this contact request.',
      submit: 'Send',
      sending: 'Sending…',
      sent: 'Message sent. We will get back to you soon.',
      error: 'The message could not be sent. Try again or write to andrea@brt.srl.',
      required: {
        nome: 'Name is required',
        email: 'Email is required',
        messaggio: 'Message is required',
        privacy: 'Please confirm the data processing consent to send the message.',
      },
    },
  },
}

export const content: Record<Lang, Content> = { it, en }

export function telHref(number: string) {
  return `tel:${number.replace(/[^\d+]/g, '')}`
}
