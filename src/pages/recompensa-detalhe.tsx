import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { rewards } from '../data/rewards'
import RedeemModal from '../components/redeem-modal'

const RecompensaDetalhe = () => {
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [walletPoints, setWalletPoints] = useState(850)
  const reward = rewards.find((r) => r.id === id)

  if (!reward) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-text-dark">Produto não encontrado</h1>
        <p className="mt-2 text-text-muted">O produto que você procura não existe ou foi removido.</p>
        <Link to="/recompensas" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white">
          Voltar para Recompensas
        </Link>
      </main>
    )
  }

  const handleConfirmRedeem = () => {
    setWalletPoints((prev) => prev - reward.points)
    setShowModal(false)
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link to="/recompensas" className="text-sm font-semibold text-primary hover:underline">
        ← Voltar para a loja
      </Link>

      <div className="mt-6 rounded-3xl border border-border-soft bg-white p-8 text-center shadow-lg">
        {reward.badge && (
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
            {reward.badge}
          </span>
        )}
        <div className="mt-4 text-6xl">{reward.emoji}</div>
        <h1 className="mt-4 font-display text-3xl font-bold text-text-dark">{reward.name}</h1>
        <p className="mt-3 text-text-body">{reward.description}</p>
        <div className="mt-6 font-display text-2xl font-bold text-primary">{reward.points} pts</div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 rounded-full bg-primary px-8 py-3 font-semibold text-white hover:bg-secondary"
        >
          {reward.isDonation ? 'Doar pontos' : 'Resgatar recompensa'}
        </button>
      </div>

      {showModal && (
        <RedeemModal
          emoji={reward.emoji}
          name={reward.name}
          points={reward.points}
          walletPoints={walletPoints}
          onConfirm={handleConfirmRedeem}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  )
}

export default RecompensaDetalhe