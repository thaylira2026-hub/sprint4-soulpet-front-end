import { useParams, Link } from 'react-router-dom'
import { ErrorState, LoadingState } from '../components/status-message'
import { useFetch } from '../hooks/use-fetch'
import { buscarMissao } from '../services/missao-service'
import type { MissaoComStatus } from '../types/missao'

const MissaoDetalhe = () => {
  const { id = '' } = useParams()
  const { state, refetch } = useFetch((signal) => buscarMissao(id, signal), [id])

  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <BackLink />
        <LoadingState message="Carregando missão..." />
      </main>
    )
  }

  if (state.status === 'error') {
    if (state.code === 404) {
      return <MissaoNaoEncontrada />
    }
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <BackLink />
        <div className="mt-6">
          <ErrorState message={state.message} onRetry={() => refetch()} />
        </div>
      </main>
    )
  }

  const mission = state.data

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <BackLink />
      <MissaoCard mission={mission} />
    </main>
  )
}

const MissaoNaoEncontrada = () => (
  <main className="mx-auto max-w-2xl px-4 py-20 text-center">
    <div className="text-5xl">🔍</div>
    <h1 className="mt-4 font-display text-2xl font-bold text-text-dark">Missão não encontrada</h1>
    <p className="mt-2 text-text-muted">A missão que você procura não existe ou foi removida.</p>
    <Link
      to="/missoes"
      className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary"
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

interface MissaoCardProps {
  mission: MissaoComStatus
}

const MissaoCard = ({ mission }: MissaoCardProps) => (
  <article className="mt-6 rounded-3xl border border-border-soft bg-white p-6 shadow-lg sm:p-8">
    <div className="text-5xl">{mission.icon}</div>

    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full bg-lilac-light px-3 py-1 text-sm font-semibold text-primary">
        {mission.difficulty}
      </span>
      {mission.tag && (
        <span className="rounded-full bg-blue-light px-3 py-1 text-sm font-semibold text-blue">{mission.tag}</span>
      )}
    </div>

    <h1 className="mt-4 font-display text-2xl font-bold text-text-dark sm:text-3xl">{mission.title}</h1>
    <p className="mt-4 text-text-body">{mission.description}</p>

    <div className="mt-6 flex flex-wrap gap-6 border-t border-border-soft pt-6">
      <div>
        <div className="text-sm text-text-muted">Recompensa</div>
        <div className="text-xl font-bold text-primary">+{mission.points} pts</div>
      </div>
      <div>
        <div className="text-sm text-text-muted">Prazo</div>
        <div className="text-xl font-bold text-text-dark">{mission.deadline}</div>
      </div>
      {mission.conclusao?.dataConclusao && (
        <div>
          <div className="text-sm text-text-muted">Concluída em</div>
          <div className="text-xl font-bold text-text-dark">
            {new Date(`${mission.conclusao.dataConclusao}T12:00:00`).toLocaleDateString('pt-BR')}
          </div>
        </div>
      )}
    </div>
  </article>
)

export default MissaoDetalhe