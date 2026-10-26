import { useEffect, useState } from 'react'
import { sectionIds, type SectionId } from '../content/site'

/** Restituisce la sezione che occupa il centro del viewport (per evidenziare la voce di menu). */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return active
}
