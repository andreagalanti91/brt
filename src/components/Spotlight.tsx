import type { CSSProperties, PointerEvent, ReactNode } from 'react'

type Props = { className?: string; style?: CSSProperties; children: ReactNode }

/** Riquadro con un alone di luce che segue il puntatore (solo su dispositivi con mouse). */
export function Spotlight({ className, style, children }: Props) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div className={`spotlight ${className ?? ''}`} style={style} onPointerMove={onMove}>
      {children}
    </div>
  )
}
