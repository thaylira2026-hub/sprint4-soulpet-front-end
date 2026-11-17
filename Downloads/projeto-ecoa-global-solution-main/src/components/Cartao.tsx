import type { ReactNode } from 'react'

type CartaoProps = {
  titulo: string
  icone?: string
  children: ReactNode
}

export default function Cartao({ titulo, icone, children }: CartaoProps) {
  return (
    <article className="h-full rounded-3xl border border-tinta/10 bg-white p-6">
      {icone && (
        <span className="text-4xl" aria-hidden="true">
          {icone}
        </span>
      )}
      <h3 className="mt-3 text-xl font-semibold">{titulo}</h3>
      <div className="mt-2 space-y-2 text-lg leading-relaxed text-tinta/80">{children}</div>
    </article>
  )
}