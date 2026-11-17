import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type BotaoLinkProps = {
  to: string
  children: ReactNode
  variante?: 'primario' | 'secundario' | 'claro'
}

const estilos = {
  primario: 'bg-mare text-white hover:bg-tinta',
  secundario: 'border-2 border-tinta text-tinta hover:bg-tinta hover:text-white',
  claro: 'bg-sinal text-tinta hover:bg-white',
}

export default function BotaoLink({ to, children, variante = 'primario' }: BotaoLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-block rounded-full px-7 py-4 text-center text-lg font-semibold transition-colors ${estilos[variante]}`}
    >
      {children}
    </Link>
  )
}