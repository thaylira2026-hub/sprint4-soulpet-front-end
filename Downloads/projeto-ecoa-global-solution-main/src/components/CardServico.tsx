import { Link } from 'react-router-dom'
import { iconeDoServico, nomesCategoria } from '../data/icones'
import type { Servico } from '../types/Servico'

type CardServicoProps = {
  servico: Servico
}

export default function CardServico({ servico }: CardServicoProps) {
  return (
    <Link
      to={`/servicos/${servico.id}`}
      className="flex h-full flex-col rounded-3xl border-2 border-tinta/10 bg-white p-6 hover:border-mare"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mare-clara text-4xl"
        aria-hidden="true"
      >
        {iconeDoServico(servico.pictograma)}
      </span>
      <p className="mt-4 font-semibold text-mare">{nomesCategoria[servico.categoria]}</p>
      <h3 className="mt-1 text-xl font-bold">{servico.nome}</h3>
      <p className="mt-2 line-clamp-3 text-lg leading-relaxed text-tinta/80">{servico.descricao}</p>
      <p className="mt-auto pt-5 font-semibold text-mare underline underline-offset-4">
        Ver detalhes e agendar
      </p>
    </Link>
  )
}