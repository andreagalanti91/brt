import { asset } from '../lib/asset'

export function Logo({ className }: { className?: string }) {
  return <img className={className} src={asset('images/logo-brt.svg')} alt="BRT Industrial Service S.r.l." width={104} height={96} />
}
