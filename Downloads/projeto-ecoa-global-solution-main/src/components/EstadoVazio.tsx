import type { ReactNode } from 'react'

type EstadoVazioProps = {
  titulo: string
  texto: string
  children?: ReactNode
}

export default function EstadoVazio({ titulo, texto, children }: EstadoVazioProps) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-tinta/20 px-6 py-12 text-center">
      <span className="text-4xl" aria-hidden="true">
        🔎
      </span>
      <p className="mt-3 text-xl font-bold">{titulo}</p>
      <p className="mx-auto mt-2 max-w-xl text-lg text-tinta/80">{texto}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}