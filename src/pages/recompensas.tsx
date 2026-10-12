import { useState } from 'react'
import RewardCard from '../components/reward-card'
import RedeemModal from '../components/redeem-modal'
import { rewards, type Reward } from '../data/rewards'

type CategoryFilter = 'all' | 'food' | 'toy' | 'accessory' | 'donation'

const Recompensas = () => {
  const [filter, setFilter] = useState<CategoryFilter>('all')
  const [walletPoints, setWalletPoints] = useState(850)
  const [resgatesFeitos, setResgatesFeitos] = useState(3)
  const [pontosDoados, setPontosDoados] = useState(200)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [toastMessage, setToastMessage] = useState('')

  const filteredRewards =
    filter === 'all' ? rewards : rewards.filter((reward) => reward.category === filter)

  const filterButtonClass = (value: CategoryFilter) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      filter === value ? 'bg-primary text-white' : 'bg-white text-text-body hover:bg-lilac-light'
    }`

  const handleConfirmRedeem = () => {
    if (!selectedReward) return

    setWalletPoints((prev) => prev - selectedReward.points)

    if (selectedReward.isDonation) {
      setPontosDoados((prev) => prev + selectedReward.points)
    } else {
      setResgatesFeitos((prev) => prev + 1)
    }

    setToastMessage(`✅ ${selectedReward.name} resgatado com sucesso!`)
    setSelectedReward(null)

    setTimeout(() => setToastMessage(''), 3000)
  }

  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">🛍️ Loja Solidária</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-dark">
          Troque Pontos por <span className="text-primary">Recompensas</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Sem gastar dinheiro! Use os pontos que você ganhou nas missões para resgatar produtos reais para o seu pet.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="text-center">
            <span className="block text-xs text-text-muted">Sua carteira</span>
            <div className="font-display text-xl font-bold text-primary">
              <span>{walletPoints}</span> pts
            </div>
          </div>
          <div className="text-center">
            <span className="block text-xs text-text-muted">Resgates feitos</span>
            <div className="font-display text-xl font-bold text-text-dark">{resgatesFeitos}</div>
          </div>
          <div className="text-center">
            <span className="block text-xs text-text-muted">Pontos doados</span>
            <div className="font-display text-xl font-bold text-text-dark">{pontosDoados}</div>
          </div>
        </div>
      </header>

      {/* Loja */}
      <section className="px-6 py-16" aria-labelledby="store-title">
        <div className="mx-auto max-w-5xl">
          <div role="tablist" aria-label="Categorias de produtos" className="flex flex-wrap gap-2">
            <button role="tab" aria-selected={filter === 'all'} onClick={() => setFilter('all')} className={filterButtonClass('all')}>
              Todos
            </button>
            <button role="tab" aria-selected={filter === 'food'} onClick={() => setFilter('food')} className={filterButtonClass('food')}>
              🍖 Alimentação
            </button>
            <button role="tab" aria-selected={filter === 'toy'} onClick={() => setFilter('toy')} className={filterButtonClass('toy')}>
              🎾 Brinquedos
            </button>
            <button role="tab" aria-selected={filter === 'accessory'} onClick={() => setFilter('accessory')} className={filterButtonClass('accessory')}>
              🎀 Acessórios
            </button>
            <button role="tab" aria-selected={filter === 'donation'} onClick={() => setFilter('donation')} className={filterButtonClass('donation')}>
              ❤️ Doações
            </button>
          </div>

          <h2 id="store-title" className="mt-6 font-display text-xl font-bold text-text-dark">
            Produtos disponíveis — <span className="text-primary">{filteredRewards.length} itens</span>
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4" aria-live="polite">
            {filteredRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                id={reward.id}
                emoji={reward.emoji}
                name={reward.name}
                description={reward.description}
                points={reward.points}
                badge={reward.badge}
                note={reward.isDonation ? 'Doe qualquer quantidade' : 'Parte do valor vai para ONGs'}
                buttonLabel={reward.isDonation ? 'Doar pontos →' : 'Resgatar →'}
                onRedeem={() => setSelectedReward(reward)}
              />
            ))}
          </div>

          {/* Banner de doação */}
          <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-lilac-light p-8 text-center md:flex-row md:text-left">
            <div className="text-5xl">💛</div>
            <div>
              <h3 className="font-display text-xl font-bold text-text-dark">Doe seus pontos e faça a diferença!</h3>
              <p className="mt-1 text-sm text-text-body">
                Além de resgatar produtos para o seu pet, você pode transformar seus pontos em doações para ONGs parceiras. Cada ponto doado ajuda animais em situação de vulnerabilidade a receberem cuidados, ração e amor. Clique em qualquer produto de doação acima para contribuir!
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedReward && (
        <RedeemModal
          emoji={selectedReward.emoji}
          name={selectedReward.name}
          points={selectedReward.points}
          walletPoints={walletPoints}
          onConfirm={handleConfirmRedeem}
          onClose={() => setSelectedReward(null)}
        />
      )}

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-bg-dark px-6 py-3 font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </main>
  )
}

export default Recompensas