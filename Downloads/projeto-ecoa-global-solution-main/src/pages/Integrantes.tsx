import TituloPagina from '../components/TituloPagina'
import { integrantes } from '../data/integrante'
import type { Integrante } from '../types/Integrante'

function iniciais(nome: string) {
  const partes = nome.split(' ')
  const primeira = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''
  return (primeira + ultima).toUpperCase()
}

function FotoIntegrante({ integrante }: { integrante: Integrante }) {
  const estilo = 'relative mx-auto h-40 w-40 rounded-full border-8 border-white'

  if (integrante.foto) {
    return (
      <img
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
        className={`${estilo} bg-white object-cover`}
      />
    )
  }

  return (
    <div
      className={`${estilo} flex items-center justify-center bg-mare text-4xl font-extrabold text-white`}
      aria-hidden="true"
    >
      {iniciais(integrante.nome)}
    </div>
  )
}
function FaixaOndas() {
  return (
    <div className="relative h-32 overflow-hidden bg-mare" aria-hidden="true">
      <span className="absolute left-1/2 top-full h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />
      <span className="absolute left-1/2 top-full h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20" />
      <span className="absolute left-1/2 top-full h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10" />
    </div>
  )
}

export default function Integrantes() {
  return (
    <div>
      <TituloPagina
        etiqueta="Nossa equipe"
        icone="👥"
        titulo="Quem somos"
        destaque="Integrantes"
        descricao="Conheça a equipe da Inova Lab que criou o Ecoa+ para tornar os serviços públicos acessíveis a pessoas surdas e com deficiência auditiva."
      />

      <section aria-labelledby="titulo-turma" className="text-center">
        <h2 id="titulo-turma" className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Turma: <span className="text-mare">1TDSR-2026</span>
        </h2>
        <p className="mt-3 text-lg text-tinta/70">
          FIAP · Análise e Desenvolvimento de Sistemas · Global Solution 2026
        </p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {integrantes.map((integrante) => (
            <li
              key={integrante.github}
              className="flex flex-col overflow-hidden rounded-3xl border border-tinta/10 bg-white"
            >
              <FaixaOndas />
              <div className="-mt-20 flex flex-1 flex-col px-6 pb-8">
                <FotoIntegrante integrante={integrante} />
                <h3 className="mt-4 text-xl font-bold leading-snug">{integrante.nome}</h3>
                <p className="mx-auto mt-3 rounded-full bg-mare-clara px-4 py-1 text-sm font-semibold text-mare">
                  {integrante.funcao}
                </p>
                <p className="mt-3 text-tinta/70">{integrante.rm}</p>
                <div className="mt-auto flex justify-center gap-3 pt-6">
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub de ${integrante.nome}`}
                    className="rounded-full border-2 border-tinta px-5 py-2 font-semibold hover:bg-tinta hover:text-white"
                  >
                    GitHub
                  </a>
                  {integrante.linkedin && (
                    <a
                      href={integrante.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`LinkedIn de ${integrante.nome}`}
                      className="rounded-full bg-mare px-5 py-2 font-semibold text-white hover:bg-tinta"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}