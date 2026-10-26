import { asset } from '../lib/asset'

type Props = {
  /** Nome base in public/images, es. "home" → home-960.avif, home-1600.webp… */
  name: string
  widths: number[]
  sizes: string
  alt: string
  className?: string
  width: number
  height: number
  priority?: boolean
}

export function Picture({ name, widths, sizes, alt, className, width, height, priority }: Props) {
  const srcset = (ext: string) => widths.map((w) => `${asset(`images/${name}-${w}.${ext}`)} ${w}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <img
        className={className}
        src={asset(`images/${name}-${widths[widths.length - 1]}.webp`)}
        srcSet={srcset('webp')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  )
}

export const BG_WIDTHS = [960, 1600, 1920]
export const WORK_WIDTHS = [640, 1000]
