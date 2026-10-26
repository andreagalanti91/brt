/** Percorso di un file in public/, compatibile con il `base` di Vite (es. /sanmarziale/ su GitHub Pages). */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
