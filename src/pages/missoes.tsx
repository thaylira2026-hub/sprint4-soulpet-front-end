import { useState } from 'react'
import MissionCard from '../components/mission-card'
import { missions } from '../data/missions'

type LevelFilter = 'all' | 'easy' | 'medium' | 'hard'

const Missoes = () => {
  const [filter, setFilter] = useState<LevelFilter>('all')

  const filteredMissions =
    filter === 'all' ? missions : missions.filter((mission) => mission.level === filter)

  const filterButtonClass = (value: LevelFilter) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      filter === value ? 'bg-primary text-white' : 'bg-white text-text-body hover:bg-lilac-light'
    }`

  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">🎯 Missões</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-dark">
          Central de <span className="text-primary">Missões</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Complete tarefas, ganhe pontos e transforme seu engajamento em impacto real para os pets!
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="font-display text-lg font-bold text-text-dark">🟢 30 pts</div>
            <div className="text-xs text-text-muted">Missões Fáceis — até 1 dia</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="font-display text-lg font-bold text-text-dark">🟡 100 pts</div>
            <div className="text-xs text-text-muted">Missões Médias — até 1 semana</div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="font-display text-lg font-bold text-text-dark">🔴 500 pts</div>
            <div className="text-xs text-text-muted">Missões Difíceis — até 1 mês</div>
          </div>
        </div>
      </header>

      {/* Lista de missões */}
      <section className="px-6 py-16" aria-labelledby="missions-list-title">
        <div className="mx-auto max-w-5xl">
          <div role="toolbar" aria-label="Filtros de missão" className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-text-muted">Filtrar por:</span>
            <div role="group" aria-label="Dificuldade" className="flex flex-wrap gap-2">
              <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')} className={filterButtonClass('all')}>
                Todas
              </button>
              <button aria-pressed={filter === 'easy'} onClick={() => setFilter('easy')} className={filterButtonClass('easy')}>
                🟢 Fácil
              </button>
              <button aria-pressed={filter === 'medium'} onClick={() => setFilter('medium')} className={filterButtonClass('medium')}>
                🟡 Médio
              </button>
              <button aria-pressed={filter === 'hard'} onClick={() => setFilter('hard')} className={filterButtonClass('hard')}>
                🔴 Difícil
              </button>
            </div>
          </div>

          <h2 id="missions-list-title" className="mt-6 font-display text-xl font-bold text-text-dark">
            Missões disponíveis — <span className="text-primary">{filteredMissions.length} missões</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3" aria-live="polite">
            {filteredMissions.map((mission) => (
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

          {/* Como os níveis funcionam */}
          <div className="mt-16 rounded-3xl bg-bg p-8">
            <h3 className="font-display text-xl font-bold text-text-dark">📋 Entenda os níveis de dificuldade</h3>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <span className="text-2xl">🟢</span>
                <div className="mt-1 font-display font-bold text-text-dark">Fácil</div>
                <p className="mt-1 text-sm text-text-body">
                  Tarefas rápidas e simples. Prazo de até <strong>1 dia</strong>. Ideal para quem quer acumular pontos no dia a dia.
                </p>
              </div>
              <div>
                <span className="text-2xl">🟡</span>
                <div className="mt-1 font-display font-bold text-text-dark">Médio</div>
                <p className="mt-1 text-sm text-text-body">
                  Missões que exigem mais engajamento. Prazo de até <strong>1 semana</strong>. Ótimo equilíbrio entre esforço e recompensa.
                </p>
              </div>
              <div>
                <span className="text-2xl">🔴</span>
                <div className="mt-1 font-display font-bold text-text-dark">Difícil</div>
                <p className="mt-1 text-sm text-text-body">
                  Alto impacto e dedicação. Prazo de até <strong>1 mês</strong>. Para quem quer fazer a diferença de verdade e ganhar muito mais pontos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Missoes