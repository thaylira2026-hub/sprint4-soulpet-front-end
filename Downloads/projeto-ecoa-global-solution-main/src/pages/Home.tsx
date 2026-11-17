import BotaoLink from '../components/BotaoLink'
import BotaoLibras from '../components/BotaoLibras'
import BotaoOuvir from '../components/BotaoOuvir'

type Etapa = {
  titulo: string
  texto: string
}

const etapas: Etapa[] = [
  {
    titulo: 'Entenda o serviço',
    texto: 'Em Libras ou em português simples, com os documentos mostrados em imagens.',
  },
  {
    titulo: 'Agende sem ligar',
    texto: 'Escolha a unidade, o dia e o horário pelo site.',
  },
  {
    titulo: 'Espere tranquilo',
    texto: 'Quando chamarem você, o celular vibra e a tela pisca.',
  },
  {
    titulo: 'Converse no balcão',
    texto: 'A fala do atendente aparece em legenda, com tradução para Libras.',
  },
]

// Ilustração do aviso de "sua vez", com as ondas do eco ao redor.
// É só decorativa, por isso fica escondida do leitor de tela (aria-hidden).
function CelularAviso() {
  return (
    <div
      className="relative mx-auto flex h-[28rem] w-full max-w-sm items-center justify-center"
      aria-hidden="true"
    >
      <span className="absolute h-64 w-64 rounded-full border-4 border-mare/30 motion-safe:animate-eco" />
      <span className="absolute h-80 w-80 rounded-full border-4 border-mare/20 motion-safe:animate-eco motion-safe:[animation-delay:1s]" />
      <span className="absolute h-96 w-96 rounded-full border-4 border-mare/10 motion-safe:animate-eco motion-safe:[animation-delay:2s]" />

      <div className="relative w-60 rounded-[2.5rem] border-[10px] border-tinta bg-white p-5 shadow-2xl">
        <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-tinta/20" />
        <p className="text-sm font-semibold text-tinta/70">UBS Vila Mariana</p>
        <p className="text-sm text-tinta/60">Consulta de rotina, 14h</p>
        <div className="mt-4 rounded-2xl bg-sinal p-4">
          <p className="text-3xl">📳</p>
          <p className="mt-2 text-2xl font-extrabold leading-tight">Chegou a sua vez!</p>
          <p className="mt-1">Vá até o guichê 3.</p>
        </div>
        <div className="mt-5 space-y-2">
          <div className="h-2 rounded-full bg-tinta/10" />
          <div className="h-2 w-2/3 rounded-full bg-tinta/10" />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="grid items-center gap-8 overflow-hidden lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            O serviço público, sem depender de ouvir.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-tinta/80">
            Com o Ecoa+, pessoas surdas e com deficiência auditiva entendem o serviço em Libras ou
            em português simples, agendam sem telefonar e sabem na hora quando chega a sua vez.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BotaoLink to="/servicos">Ver serviços</BotaoLink>
            <BotaoLink to="/solucao" variante="secundario">
              Como funciona
            </BotaoLink>
          </div>
          <div data-nao-ler className="mt-6 flex flex-wrap gap-3">
            <BotaoLibras />
            <BotaoOuvir />
          </div>
        </div>
        <CelularAviso />
      </section>

      <section aria-labelledby="titulo-etapas">
        <h2 id="titulo-etapas" className="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">
          Do começo ao fim do atendimento
        </h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {etapas.map((etapa, indice) => (
            <li key={etapa.titulo} className="border-t-4 border-mare pt-5">
              <span className="text-5xl font-extrabold text-mare">{indice + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{etapa.titulo}</h3>
              <p className="mt-2 text-lg leading-relaxed text-tinta/80">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="titulo-modos">
        <h2 id="titulo-modos" className="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">
          Do jeito que você se comunica
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-mare p-8 text-white md:p-10">
            <span className="text-5xl" aria-hidden="true">🤟</span>
            <h3 className="mt-4 text-3xl font-extrabold">Libras</h3>
            <p className="mt-3 text-lg leading-relaxed text-white/90">
              Todo o conteúdo traduzido pelo VLibras e vídeos de intérprete nos serviços mais
              procurados. Para quem tem a Libras como primeira língua.
            </p>
          </div>
          <div className="rounded-3xl border border-tinta/10 bg-white p-8 md:p-10">
            <span className="text-5xl" aria-hidden="true">💬</span>
            <h3 className="mt-4 text-3xl font-extrabold">Texto</h3>
            <p className="mt-3 text-lg leading-relaxed text-tinta/80">
              Português em linguagem simples, legendas e avisos visuais. Para quem lê bem, mas não
              ouve, como muitas pessoas que perderam a audição com a idade.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-tinta px-8 py-14 text-nevoa md:px-14">
        <p className="max-w-3xl text-3xl font-semibold leading-snug md:text-4xl">
          Ninguém deveria perder a vez porque chamaram o nome em voz alta.
        </p>
        <div className="mt-8">
          <BotaoLink to="/servicos" variante="claro">
            Agendar meu atendimento
          </BotaoLink>
        </div>
      </section>
    </div>
  )
}