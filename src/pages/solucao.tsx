import { Link } from 'react-router-dom'
import FeatureCard from '../components/feature-card'

interface JourneyStep {
  step: number
  icon: string
  title: string
  description: string
}

interface ImpactItem {
  value: string
  label: string
}

const journey: JourneyStep[] = [
  {
    step: 1,
    icon: '🐾',
    title: 'Entre na comunidade',
    description: 'O tutor acessa a SoulPet dentro da rede SoulUp e cria o perfil do seu pet.',
  },
  {
    step: 2,
    icon: '🎯',
    title: 'Escolha missões',
    description: 'Missões fáceis, médias ou difíceis, com prazos e pontuações proporcionais ao esforço.',
  },
  {
    step: 3,
    icon: '⭐',
    title: 'Acumule pontos',
    description: 'Cada missão concluída soma pontos na carteira virtual, que não expiram.',
  },
  {
    step: 4,
    icon: '🎁',
    title: 'Resgate ou doe',
    description: 'Os pontos viram produtos reais para o pet ou doações para ONGs parceiras.',
  },
]

const impact: ImpactItem[] = [
  { value: '0 R$', label: 'Custo para o tutor' },
  { value: '3', label: 'Níveis de missão' },
  { value: '2', label: 'Formas de usar pontos' },
  { value: '100%', label: 'Foco no bem-estar animal' },
]

const Solucao = () => {
  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">💡 Solução do Projeto</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-text-dark sm:text-4xl">
          Engajamento digital que vira <span className="text-primary">cuidado real</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Entenda o problema que a SoulPet resolve e como a gamificação conecta tutores, pets e ONGs.
        </p>
      </header>

      {/* Problema x Solução */}
      <section className="px-6 py-16" aria-labelledby="problem-title">
        <h2 id="problem-title" className="sr-only">Problema e solução</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-border-soft bg-white p-6 shadow-sm sm:p-8">
            <span className="text-sm font-semibold text-secondary">🌍 O problema</span>
            <h3 className="mt-2 font-display text-xl font-bold text-text-dark sm:text-2xl">
              Animais sem cuidado, tutores sem recursos
            </h3>
            <ul className="mt-4 space-y-3 text-text-body">
              <li>🏚️ Milhões de animais vivem em situação de abandono no Brasil.</li>
              <li>💸 Muitos tutores não conseguem arcar com ração, areia e acessórios de qualidade.</li>
              <li>📉 ONGs de proteção animal dependem de doações irregulares.</li>
            </ul>
          </article>

          <article className="rounded-3xl bg-primary p-6 text-white shadow-sm sm:p-8">
            <span className="text-sm font-semibold text-lilac-light">✅ A solução</span>
            <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">
              Gamificação a favor dos pets
            </h3>
            <ul className="mt-4 space-y-3 text-lilac-light">
              <li>🎯 Missões que incentivam adoção, saúde e engajamento responsável.</li>
              <li>💎 Pontos trocados por produtos reais, sem gastar dinheiro.</li>
              <li>❤️ Opção de doar pontos para ONGs parceiras.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Jornada do usuário */}
      <section className="bg-bg px-6 py-16" aria-labelledby="journey-title">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-secondary">🧭 Jornada do usuário</span>
            <h2 id="journey-title" className="mt-2 font-display text-2xl font-bold text-text-dark sm:text-3xl">
              Do cadastro à <span className="text-primary">recompensa</span>
            </h2>
          </div>

          <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <li key={item.step} className="relative rounded-2xl border border-border-soft bg-white p-6 shadow-sm">
                <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                  {item.step}
                </span>
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 font-display text-lg font-bold text-text-dark">{item.title}</h3>
                <p className="mt-2 text-sm text-text-body">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pilares */}
      <section className="px-6 py-16" aria-labelledby="pillars-title">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-sm font-semibold text-secondary">🏛️ Pilares</span>
          <h2 id="pillars-title" className="mt-2 font-display text-2xl font-bold text-text-dark sm:text-3xl">
            Como a <span className="text-primary">SoulPet funciona</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon="🎯"
              title="Sistema de Missões"
              description="Fácil (até 1 dia), médio (até 1 semana) e difícil (até 1 mês), com pontuação proporcional ao esforço."
            />
            <FeatureCard
              icon="💎"
              title="Carteira de Pontos"
              description="Cada missão concluída adiciona pontos à carteira virtual do usuário, sem prazo de validade."
            />
            <FeatureCard
              icon="🛍️"
              title="Loja Solidária"
              description="Ração, brinquedos, coleiras e doações para ONGs, tudo trocado por pontos."
            />
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {impact.map((item) => (
              <div key={item.label} className="rounded-2xl bg-lilac-light p-4">
                <div className="font-display text-xl font-bold text-primary sm:text-2xl">{item.value}</div>
                <div className="mt-1 text-xs text-text-muted">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-6 py-16 text-center text-white" aria-labelledby="solution-cta-title">
        <h2 id="solution-cta-title" className="font-display text-2xl font-bold sm:text-3xl">
          Veja a solução funcionando
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-lilac-light">
          Explore as missões disponíveis e a Loja Solidária com dados reais da nossa API.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/missoes" className="rounded-full bg-white px-6 py-3 font-semibold text-primary hover:bg-lilac-light">
            Ver missões
          </Link>
          <Link to="/recompensas" className="rounded-full border border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
            Ver recompensas
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Solucao