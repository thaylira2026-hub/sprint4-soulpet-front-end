import { useParams, Link } from 'react-router-dom'
import { missions } from '../data/missions'

const MissaoDetalhe = () => {
  const { id } = useParams()
  const mission = missions.find((m) => m.id === id)

  if (!mission) {
    return <MissaoNaoEncontrada />
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <BackLink />
      <MissaoCard mission={mission} />
    </main>
  )
}

const MissaoNaoEncontrada = () => (
  <main className="mx-auto max-w-2xl px-4 py-20 text-center">
    <h1 className="font-display text-2xl font-bold text-text-dark">
      Missão não encontrada
    </h1>
    <p className="mt-2 text-text-muted">
      A missão que você procura não existe ou foi removida.
    </p>
    <Link
      to="/missoes"
      className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white"
    >
      Voltar para Missões
    </Link>
  </main>
)

const BackLink = () => (
  <Link to="/missoes" className="text-sm font-semibold text-primary hover:underline">
    ← Voltar para todas as missões
  </Link>
)

type MissaoCardProps = {
  mission: {
    icon: string
    difficulty: string
    tag: string
    title: string
    description: string
    points: number
    deadline: string
  }
}

const MissaoCard = ({ mission }: MissaoCardProps) => (
  <div className="mt-6 rounded-3xl border border-border-soft bg-white p-8 shadow-lg">
    <div className="text-5xl">{mission.icon}</div>

    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full bg-lilac-light px-3 py-1 text-sm font-semibold text-primary">
        {mission.difficulty}
      </span>
      <span className="rounded-full bg-blue-light px-3 py-1 text-sm font-semibold text-blue">
        {mission.tag}
      </span>
    </div>

    <h1 className="mt-4 font-display text-3xl font-bold text-text-dark">
      {mission.title}
    </h1>
    <p className="mt-4 text-text-body">{mission.description}</p>

    <div className="mt-6 flex gap-6 border-t border-border-soft pt-6">
      <div>
        <div className="text-sm text-text-muted">Recompensa</div>
        <div className="text-xl font-bold text-primary">+{mission.points} pts</div>
      </div>
      <div>
        <div className="text-sm text-text-muted">Prazo</div>
        <div className="text-xl font-bold text-text-dark">{mission.deadline}</div>
      </div>
    </div>
  </div>
)

export default MissaoDetalhe