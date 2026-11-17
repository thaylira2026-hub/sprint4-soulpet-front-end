import Cartao from '../components/Cartao'
import TituloPagina from '../components/TituloPagina'

export default function Sobre() {
  return (
    <div className="space-y-12">
      <TituloPagina
        titulo="Sobre o Ecoa+"
        descricao="O Ecoa+ nasceu na Inova Lab para que pessoas surdas e com deficiência auditiva sejam atendidas nos serviços públicos com autonomia, sem depender de terceiros."
      />

      <section aria-labelledby="titulo-problema">
        <h2 id="titulo-problema" className="text-2xl font-bold">
          O problema
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Milhões de brasileiros têm alguma deficiência auditiva. No posto de saúde, no Poupatempo
          ou no CRAS, quase tudo depende de ouvir: o agendamento por telefone, a chamada pelo nome
          na fila e a explicação do atendente no balcão. Para muitos surdos, a Libras é a primeira
          língua e o português escrito é a segunda, então só texto também não resolve.
        </p>
      </section>

      <section aria-labelledby="titulo-publico">
        <h2 id="titulo-publico" className="text-2xl font-bold">
          Para quem é
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Cartao titulo="Pessoas surdas" icone="🤟">
            <p>Que se comunicam em Libras.</p>
          </Cartao>
          <Cartao titulo="Deficiência auditiva" icone="👂">
            <p>Pessoas que se comunicam em português, com ou sem aparelho auditivo.</p>
          </Cartao>
          <Cartao titulo="Perda auditiva com a idade" icone="👵">
            <p>Idosos que passaram a ouvir menos ao longo da vida.</p>
          </Cartao>
        </div>
      </section>

      <section aria-labelledby="titulo-ods">
        <h2 id="titulo-ods" className="text-2xl font-bold">
          Objetivos de Desenvolvimento Sustentável (ONU)
        </h2>
        <ul className="mt-4 space-y-3 text-lg">
          <li>
            <span className="font-bold">ODS 10, Redução das desigualdades:</span> acesso igual aos
            serviços públicos.
          </li>
          <li>
            <span className="font-bold">ODS 3, Saúde e bem-estar:</span> agendamento e atendimento
            em saúde sem barreiras.
          </li>
          <li>
            <span className="font-bold">ODS 11, Cidades e comunidades sustentáveis:</span> serviços
            públicos inclusivos.
          </li>
        </ul>
      </section>
    </div>
  )
}