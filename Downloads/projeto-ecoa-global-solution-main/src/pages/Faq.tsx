import BotaoLink from '../components/BotaoLink'
import TituloPagina from '../components/TituloPagina'
import { categoriasFaq } from '../data/faq'

export default function Faq() {
  return (
    <div>
      <TituloPagina
        etiqueta="Central de ajuda"
        icone="❓"
        titulo="Perguntas frequentes"
        descricao="Tire suas dúvidas sobre o Ecoa+, o agendamento e o dia do atendimento."
      />

      <div className="mx-auto max-w-4xl">
        <nav aria-label="Assuntos das perguntas" className="flex flex-wrap gap-3">
          {categoriasFaq.map((categoria) => (
            <a
              key={categoria.id}
              href={`#${categoria.id}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-mare/30 bg-white px-4 py-2 font-semibold text-mare hover:border-mare"
            >
              <span aria-hidden="true">{categoria.icone}</span>
              {categoria.etiqueta}
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {categoriasFaq.map((categoria) => (
            <section
              key={categoria.id}
              id={categoria.id}
              aria-labelledby={`titulo-${categoria.id}`}
              className="scroll-mt-8"
            >
              <p className="inline-flex items-center gap-2 font-semibold text-mare">
                <span aria-hidden="true">{categoria.icone}</span>
                {categoria.etiqueta}
              </p>
              <h2
                id={`titulo-${categoria.id}`}
                className="mt-1 text-3xl font-extrabold tracking-tight"
              >
                {categoria.titulo}
              </h2>

              <div className="mt-6 space-y-4">
                {categoria.perguntas.map((item) => (
                  <details
                    key={item.pergunta}
                    className="group rounded-2xl border border-tinta/10 bg-white open:border-mare/40"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                      {item.pergunta}
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mare-clara text-xl text-mare transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-6 pb-6 text-lg leading-relaxed text-tinta/80">{item.resposta}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-20 rounded-3xl bg-mare-clara/60 px-6 py-12 text-center">
          <span className="text-5xl" aria-hidden="true">
            💬
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Ainda tem dúvidas?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-tinta/80">
            Nossa equipe está pronta para ajudar. Envie sua mensagem pelo formulário de contato.
          </p>
          <div className="mt-8">
            <BotaoLink to="/contato">Falar com a equipe</BotaoLink>
          </div>
        </section>
      </div>
    </div>
  )
}