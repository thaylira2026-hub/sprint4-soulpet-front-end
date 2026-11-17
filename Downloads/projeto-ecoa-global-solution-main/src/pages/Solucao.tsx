import BotaoLink from '../components/BotaoLink'
import Cartao from '../components/Cartao'
import TituloPagina from '../components/TituloPagina'

type Barreira = {
  momento: string
  hoje: string
  comEcoa: string
}

type OutroPublico = {
  icone: string
  titulo: string
  jaFunciona: string[]
  emBreve: string[]
}

const outrosPublicos: OutroPublico[] = [
  {
    icone: '👁️',
    titulo: 'Deficiência visual',
    jaFunciona: [
      'Funciona com leitores de tela, como NVDA e TalkBack',
      'Botão para ouvir a página em voz alta',
      'Alto contraste e letra maior',
    ],
    emBreve: ['Áudios gravados com a explicação de cada serviço'],
  },
  {
    icone: '📖',
    titulo: 'Pessoas não alfabetizadas',
    jaFunciona: ['Ícones em cada serviço', 'Leitura da página em voz alta'],
    emBreve: ['Checklist de documentos só com imagens', 'Atendimento por áudio no WhatsApp'],
  },
  {
    icone: '♿',
    titulo: 'Deficiência motora',
    jaFunciona: ['Navegação completa pelo teclado', 'Botões grandes, fáceis de acertar'],
    emBreve: ['Comandos de voz para navegar e preencher', 'Formulários sem limite de tempo'],
  },
]

const barreiras: Barreira[] = [
  {
    momento: 'Entender o serviço',
    hoje: 'Texto burocrático, e para muitos surdos o português é a segunda língua.',
    comEcoa: 'Conteúdo em Libras e em linguagem simples.',
  },
  {
    momento: 'Saber o que levar',
    hoje: 'Lista de documentos falada ou em papel.',
    comEcoa: 'Checklist de documentos com imagens.',
  },
  {
    momento: 'Agendar',
    hoje: 'Agendamento por telefone.',
    comEcoa: 'Agendamento pelo site, sem precisar ligar.',
  },
  {
    momento: 'Esperar a vez',
    hoje: 'Chamada pelo nome em voz alta.',
    comEcoa: 'O celular vibra e a tela pisca quando chega a sua vez.',
  },
  {
    momento: 'Conversar no balcão',
    hoje: 'O atendente fala e nem sempre há intérprete.',
    comEcoa: 'Legenda ao vivo da fala do atendente, com tradução para Libras.',
  },
]

export default function Solucao() {
  return (
    <div className="space-y-12">
      <TituloPagina
        titulo="Como o Ecoa+ funciona"
        descricao="O Ecoa+ torna o atendimento em serviços públicos acessível para pessoas surdas e com deficiência auditiva, do começo ao fim: entender o serviço, agendar, esperar a vez e conversar com o atendente."
      />

      <section aria-labelledby="titulo-modos">
        <h2 id="titulo-modos" className="text-2xl font-bold">
          Dois modos de comunicação
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Cartao titulo="Libras" icone="🤟">
            <p>
              Conteúdo traduzido pelo VLibras e vídeos de intérprete. Para quem tem a Libras como
              primeira língua.
            </p>
          </Cartao>
          <Cartao titulo="Texto" icone="💬">
            <p>
              Português em linguagem simples, legendas e avisos visuais. Para quem lê bem, mas não
              ouve.
            </p>
          </Cartao>
        </div>
      </section>

      <section aria-labelledby="titulo-barreiras">
        <h2 id="titulo-barreiras" className="text-2xl font-bold">
          Barreiras que resolvemos
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {barreiras.map((barreira) => (
            <li key={barreira.momento}>
              <Cartao titulo={barreira.momento}>
                <p>
                  <span className="font-semibold">Hoje:</span> {barreira.hoje}
                </p>
                <p>
                  <span className="font-semibold">Com o Ecoa+:</span> {barreira.comEcoa}
                </p>
              </Cartao>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-outros">
        <h2 id="titulo-outros" className="text-2xl font-bold">
          Também pensamos em outras deficiências
        </h2>
        <p className="mt-2 max-w-3xl text-lg text-tinta/80">
          O foco do Ecoa+ é a deficiência auditiva, mas o site já ajuda outros públicos e vai
          crescer para atendê-los cada vez melhor.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {outrosPublicos.map((publico) => (
            <li key={publico.titulo}>
              <Cartao titulo={publico.titulo} icone={publico.icone}>
                <p className="font-semibold text-mare">Já funciona</p>
                <ul className="list-disc space-y-1 pl-5">
                  {publico.jaFunciona.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="pt-2 font-semibold text-tinta">Em breve</p>
                <ul className="list-disc space-y-1 pl-5">
                  {publico.emBreve.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Cartao>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-roadmap">
        <h2 id="titulo-roadmap" className="text-2xl font-bold">
          Próximos passos
        </h2>
        <ol className="mt-4 space-y-3 text-lg">
          <li>
            <span className="font-bold">Fase 1 (agora):</span> pessoas surdas e com deficiência
            auditiva.
          </li>
          <li>
            <span className="font-bold">Fase 2:</span> deficiência motora, com comandos de voz e sem
            limite de tempo nos formulários.
          </li>
          <li>
            <span className="font-bold">Fase 3:</span> pessoas cegas, não alfabetizadas e em
            situação de vulnerabilidade.
          </li>
        </ol>
      </section>

      <BotaoLink to="/servicos">Ver serviços</BotaoLink>
    </div>
  )
}