import { Link } from 'react-router-dom'
import FeatureCard from '../components/feature-card'
import MissionCard from '../components/mission-card'
import RewardCard from '../components/reward-card'
import StatCounter from '../components/stat-counter'
import { EmptyState, ErrorState, LoadingState } from '../components/status-message'
import { useFetch } from '../hooks/use-fetch'
import { listarMissoes } from '../services/missao-service'
import { listarRecompensas } from '../services/recompensa-service'

const Home = () => {
  const missoes = useFetch(listarMissoes)
  const recompensas = useFetch(listarRecompensas)

  return (
    <main>
      {/* Hero */}
      <section className="bg-bg px-6 py-20" aria-labelledby="hero-title">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-lilac-light px-4 py-1 text-sm font-semibold text-primary">
            <span>🐾</span> Comunidade SoulUp
          </div>

          <h1 id="hero-title" className="mt-4 font-display text-4xl font-bold text-text-dark md:text-5xl">
            Ajude pets,<br />
            <span className="text-primary">ganhe recompensas</span>
          </h1>

          <p className="mt-4 text-text-body">
            Na SoulPet você completa missões, acumula pontos e troca por produtos reais para o seu pet — tudo de graça e pelo bem dos animais!
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/sobre" className="rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-lilac-light">
              Conhecer o projeto
            </Link>
            <Link to="/missoes" className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary">
              Ver missões
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
            <StatCounter target={1200} label="Missões disponíveis" />
            <StatCounter target={50} label="Recompensas" />
            <StatCounter target={5000} label="Pets beneficiados" />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-6 py-16" aria-labelledby="how-title">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-secondary">✨ Como funciona</span>
            <h2 id="how-title" className="mt-2 font-display text-3xl font-bold text-text-dark">
              Simples, divertido e <span className="text-primary">recompensador</span>
            </h2>
            <p className="mt-2 text-text-body">Três passos para transformar o seu amor pelos pets em recompensas reais.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon="🎯"
              title="Complete Missões"
              description="Escolha missões do seu nível - fácil, médio ou difícil. Cada uma tem um prazo e um valor em pontos diferentes. Quanto maior o esforço, maior a recompensa!"
            />
            <FeatureCard
              icon="⭐"
              title="Acumule Pontos"
              description="Cada missão concluída te dá pontos que ficam guardados na sua carteira. Suba de nível e desbloqueie recompensas exclusivas!"
            />
            <FeatureCard
              icon="🎁"
              title="Resgate Recompensas"
              description="Troque seus pontos por ração, coleiras, areia, brinquedos e muito mais — sem gastar um centavo do seu bolso!"
            />
          </div>
        </div>
      </section>

      {/* Missões em destaque */}
      <section className="bg-bg px-6 py-16" aria-labelledby="missions-title">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-secondary">🎯 Missões</span>
            <h2 id="missions-title" className="mt-2 font-display text-3xl font-bold text-text-dark">
              Missões para <span className="text-primary">todos os níveis</span>
            </h2>
            <p className="mt-2 text-text-body">Fácil, médio ou difícil — escolha o seu ritmo e comece a ganhar pontos agora!</p>
          </div>

          <div className="mt-10">
            {missoes.state.status === 'loading' && <LoadingState message="Buscando missões..." />}
            {missoes.state.status === 'error' && (
              <ErrorState message={missoes.state.message} onRetry={() => missoes.refetch()} />
            )}
            {missoes.state.status === 'success' && missoes.state.data.length === 0 && (
              <EmptyState icon="🎯" title="Nenhuma missão cadastrada ainda" />
            )}
            {missoes.state.status === 'success' && missoes.state.data.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {missoes.state.data.slice(0, 3).map((mission) => (
                  <MissionCard
                    key={mission.id}
                    id={mission.id}
                    icon={mission.icon}
                    difficulty={mission.difficulty}
                    tag={mission.tag}
                    title={mission.title}
                    description={mission.description}
                    points={mission.points}
                    deadline={mission.deadline}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link to="/missoes" className="font-semibold text-primary hover:underline">
              Ver todas as missões →
            </Link>
          </div>
        </div>
      </section>

      {/* Recompensas em destaque */}
      <section className="px-6 py-16" aria-labelledby="rewards-title">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-secondary">🎁 Recompensas</span>
            <h2 id="rewards-title" className="mt-2 font-display text-3xl font-bold text-text-dark">
              Troque pontos por <span className="text-primary">produtos reais</span>
            </h2>
            <p className="mt-2 text-text-body">Sem gastar dinheiro! Use seus pontos para resgatar produtos de qualidade para o seu pet.</p>
          </div>

          <div className="mt-10">
            {recompensas.state.status === 'loading' && <LoadingState message="Buscando recompensas..." />}
            {recompensas.state.status === 'error' && (
              <ErrorState message={recompensas.state.message} onRetry={() => recompensas.refetch()} />
            )}
            {recompensas.state.status === 'success' && recompensas.state.data.length === 0 && (
              <EmptyState icon="🎁" title="Nenhuma recompensa cadastrada ainda" />
            )}
            {recompensas.state.status === 'success' && recompensas.state.data.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                {recompensas.state.data.slice(0, 4).map((reward) => (
                  <RewardCard
                    key={reward.id}
                    id={reward.id}
                    emoji={reward.emoji}
                    name={reward.name}
                    points={reward.points}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link to="/recompensas" className="font-semibold text-primary hover:underline">
              Ver loja completa →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-primary px-6 py-16 text-center text-white" aria-labelledby="cta-title">
        <span className="text-sm font-semibold text-lilac-light">🐾 Junte-se a nós</span>
        <h2 id="cta-title" className="mt-2 font-display text-3xl font-bold">Pronto para começar a ajudar?</h2>
        <p className="mx-auto mt-2 max-w-xl text-lilac-light">
          Entre para a SoulPet, complete missões e faça parte de uma comunidade que transforma o amor por pets em impacto real.
        </p>
        <Link to="/sobre" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-primary hover:bg-lilac-light">
          Saiba mais sobre o projeto
        </Link>
      </section>
    </main>
  )
}

export default Home