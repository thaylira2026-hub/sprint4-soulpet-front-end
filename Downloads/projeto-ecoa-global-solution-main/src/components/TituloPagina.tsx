import BotaoLibras from './BotaoLibras'
import BotaoOuvir from './BotaoOuvir'

type TituloPaginaProps = {
  titulo: string
  destaque?: string
  etiqueta?: string
  icone?: string
  descricao?: string
}

export default function TituloPagina({ titulo, destaque, etiqueta, icone, descricao }: TituloPaginaProps) {
  return (
    <header className="mb-14 rounded-3xl bg-mare-clara/50 px-6 py-14 text-center md:py-16">
      {etiqueta && (
        <p className="inline-flex items-center gap-2 text-lg font-semibold text-mare">
          {icone && <span aria-hidden="true">{icone}</span>}
          {etiqueta}
        </p>
      )}
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
        {titulo}
        {destaque && (
          <>
            {' '}
            <span className="text-mare/50" aria-hidden="true">/</span>{' '}
            <span className="text-mare">{destaque}</span>
          </>
        )}
      </h1>
      {descricao && (
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tinta/80 md:text-xl">
          {descricao}
        </p>
      )}
      <div data-nao-ler className="mt-6 flex flex-wrap justify-center gap-3">
        <BotaoLibras />
        <BotaoOuvir />
      </div>
    </header>
  )
}