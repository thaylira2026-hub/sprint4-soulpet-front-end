import TeamCard from '../components/team-card'
import { team } from '../data/team'

const Integrantes = () => {
  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">👥 Nossa Equipe</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-dark">
          Quem Somos <span className="text-primary">/ Integrantes</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Conheça as desenvolvedoras apaixonadas por tecnologia e pets que criaram a SoulPet.
        </p>
      </header>

      {/* Equipe */}
      <section className="px-6 py-16" aria-labelledby="team-title">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 id="team-title" className="font-display text-2xl font-bold text-text-dark">
              Turma: <span className="text-primary">1TDSR-2026</span>
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              FIAP · Análise e Desenvolvimento de Sistemas · Sprint 3 · 2026
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <TeamCard
                key={member.rm}
                photo={member.photo}
                name={member.name}
                rm={member.rm}
                github={member.github}
                linkedin={member.linkedin}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Integrantes