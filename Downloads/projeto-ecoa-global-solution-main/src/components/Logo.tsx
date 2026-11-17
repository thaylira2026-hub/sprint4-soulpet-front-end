import { useId } from 'react'

type LogoProps = {
  negativo?: boolean
  tamanho?: number
}

// Símbolo do Ecoa+: o "+" amarelo emitindo ondas visuais (o eco que você vê)
function Simbolo({ tamanho }: { tamanho: number }) {
  const idRecorte = useId()

  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <clipPath id={idRecorte}>
        <rect width="100" height="100" rx="28" />
      </clipPath>
      <rect width="100" height="100" rx="28" fill="#0f766e" />
      <g clipPath={`url(#${idRecorte})`} fill="none" stroke="#ffffff" strokeWidth="5">
        <circle cx="38" cy="62" r="26" opacity="0.55" />
        <circle cx="38" cy="62" r="40" opacity="0.3" />
        <circle cx="38" cy="62" r="54" opacity="0.16" />
      </g>
      <rect x="26" y="58" width="24" height="8" rx="4" fill="#ffc83d" />
      <rect x="34" y="50" width="8" height="24" rx="4" fill="#ffc83d" />
    </svg>
  )
}

export default function Logo({ negativo = false, tamanho = 40 }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <Simbolo tamanho={tamanho} />
      <span
        className={`font-extrabold tracking-tight ${negativo ? 'text-white' : 'text-tinta'}`}
        style={{ fontSize: tamanho * 0.75 }}
      >
        Ecoa<span className={negativo ? 'text-sinal' : 'text-mare'}>+</span>
      </span>
    </span>
  )
}