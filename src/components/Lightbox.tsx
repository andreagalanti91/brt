import { useEffect, useRef } from 'react'
import type { Content } from '../content/site'
import { ChevronIcon, CloseIcon } from './Icons'

type Props = {
  t: Content
  index: number | null
  count: number
  src: (i: number) => string
  onChange: (i: number | null) => void
}

export function Lightbox({ t, index, count, src, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const startX = useRef<number | null>(null)
  const open = index !== null

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const go = (delta: number) => {
    if (index === null) return
    onChange((index + delta + count) % count)
  }

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onChange((index + 1) % count)
      if (e.key === 'ArrowLeft') onChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, count, onChange])

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={t.ui.gallery}
      onClose={() => onChange(null)}
    >
      <button type="button" className="lightbox__backdrop" tabIndex={-1} aria-hidden="true" onClick={() => onChange(null)} />
      {index !== null && (
        <figure
          className="lightbox__figure"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return
            const dx = e.clientX - startX.current
            startX.current = null
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
          }}
        >
          <img key={index} src={src(index)} alt={t.ui.workAlt} draggable={false} />
          <figcaption>
            {index + 1} / {count}
          </figcaption>
        </figure>
      )}
      <button type="button" className="lightbox__btn lightbox__close" onClick={() => onChange(null)} aria-label={t.ui.close}>
        <CloseIcon />
      </button>
      <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label={t.ui.prev}>
        <ChevronIcon />
      </button>
      <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label={t.ui.next}>
        <ChevronIcon />
      </button>
    </dialog>
  )
}
