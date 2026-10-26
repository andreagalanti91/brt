import { content, type Lang } from './content/site'
import { useReveal } from './hooks/useReveal'
import { useScrollScenes } from './hooks/useScrollScenes'
import { useActiveSection } from './hooks/useActiveSection'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Statement } from './components/Statement'
import { ServiceList } from './components/ServiceList'
import { About } from './components/About'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Contacts } from './components/Contacts'
import { Footer } from './components/Footer'

export function App({ lang }: { lang: Lang }) {
  const t = content[lang]
  useReveal()
  useScrollScenes()
  const active = useActiveSection()

  return (
    <>
      <Header t={t} active={active} />
      <main>
        <section id="home" className="home" aria-label={t.nav[0]}>
          <Hero t={t} />
          <Statement t={t} />
          <ServiceList t={t} />
        </section>
        <About t={t} />
        <Services t={t} />
        <Projects t={t} />
        <Contacts t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
