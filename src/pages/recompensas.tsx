import { useEffect, useState } from 'react';
import RewardCard from '../components/reward-card';
import RedeemModal from '../components/redeem-modal';
import MeusResgates from '../components/meus-resgates';
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components/status-message';
import { useFetch } from '../hooks/use-fetch';
import { ApiError } from '../services/http';
import {
  cancelarResgate,
  carregarLoja,
  resgatarRecompensa,
} from '../services/recompensa-service';
import type {
  ResgateDetalhado,
  Reward,
  RewardCategory,
} from '../types/recompensa';

// Union type: "todos" ou uma das categorias (menos "other", que só aparece em "Todos")
type CategoryFilter = 'all' | Exclude<RewardCategory, 'other'>;

const FILTROS: Array<{ value: CategoryFilter; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'food', label: '🍖 Alimentação' },
  { value: 'toy', label: '🎾 Brinquedos' },
  { value: 'accessory', label: '🎀 Acessórios' },
  { value: 'donation', label: '❤️ Doações' },
];

const Recompensas = () => {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [cancelandoId, setCancelandoId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const { state, refetch } = useFetch(carregarLoja);

  // Some com o aviso depois de 3 segundos
  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => setToastMessage(''), 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  const filterButtonClass = (value: CategoryFilter) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      filter === value
        ? 'bg-primary text-white'
        : 'bg-white text-text-body hover:bg-lilac-light'
    }`;

  const mensagemDeErro = (error: unknown) =>
    error instanceof ApiError
      ? error.message
      : 'Algo deu errado. Tente novamente.';

  // POST /usuarios-recompensas
  const handleConfirmRedeem = async () => {
    if (!selectedReward) return;

    const reward = selectedReward;

    setSelectedReward(null);
    setToastMessage('⏳ Registrando seu resgate...');

    try {
      await resgatarRecompensa(Number(reward.id));

      setToastMessage(
        `✅ ${reward.name} ${
          reward.isDonation ? 'doado' : 'resgatado'
        } com sucesso!`
      );

      refetch(true);
    } catch (error) {
      setToastMessage(`❌ ${mensagemDeErro(error)}`);
    }
  };

  // DELETE /usuarios-recompensas/{codigo}
  const handleCancelar = async (resgate: ResgateDetalhado) => {
    setCancelandoId(resgate.codigo);

    try {
      await cancelarResgate(resgate.codigo);

      setToastMessage(
        '↩️ Resgate cancelado. Os pontos voltaram para a sua carteira.'
      );

      refetch(true);
    } catch (error) {
      setToastMessage(`❌ ${mensagemDeErro(error)}`);
    } finally {
      setCancelandoId(null);
    }
  };

  const loja = state.status === 'success' ? state.data : null;

  const filteredRewards = loja
    ? filter === 'all'
      ? loja.recompensas
      : loja.recompensas.filter(
          (reward) => reward.category === filter
        )
    : [];

  const pontosDoados = loja
    ? loja.resgates.reduce(
        (total, r) =>
          total + (r.recompensa?.isDonation ? r.recompensa.points : 0),
        0
      )
    : 0;

  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">
          🛍️ Loja Solidária
        </span>

        <h1 className="mt-2 font-display text-3xl font-bold text-text-dark sm:text-4xl">
          Troque Pontos por{' '}
          <span className="text-primary">Recompensas</span>
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Sem gastar dinheiro! Use os pontos que você ganhou nas missões
          para resgatar produtos reais para o seu pet.
        </p>

        {loja && (
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-3">
            <div className="text-center">
              <span className="block text-xs text-text-muted">
                Carteira de {loja.usuario.nome.split(' ')[0]}
              </span>

              <div className="font-display text-xl font-bold text-primary">
                {loja.saldo} pts
              </div>

              <span className="block text-[11px] text-text-muted">
                +{loja.pontosGanhos} em missões
              </span>
            </div>

            <div className="text-center">
              <span className="block text-xs text-text-muted">
                Resgates feitos
              </span>

              <div className="font-display text-xl font-bold text-text-dark">
                {loja.resgates.length}
              </div>
            </div>

            <div className="text-center">
              <span className="block text-xs text-text-muted">
                Pontos doados
              </span>

              <div className="font-display text-xl font-bold text-text-dark">
                {pontosDoados}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Loja */}
      <section className="px-6 py-16" aria-labelledby="store-title">
        <div className="mx-auto max-w-5xl">
          <div
            role="tablist"
            aria-label="Categorias de produtos"
            className="flex flex-wrap gap-2"
          >
            {FILTROS.map((item) => (
              <button
                key={item.value}
                role="tab"
                aria-selected={filter === item.value}
                onClick={() => setFilter(item.value)}
                className={filterButtonClass(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <h2
            id="store-title"
            className="mt-6 font-display text-xl font-bold text-text-dark"
          >
            Produtos disponíveis
            {loja && (
              <span className="text-primary">
                {' '}
                — {filteredRewards.length} itens
              </span>
            )}
          </h2>

          <div className="mt-6" aria-live="polite">
            {state.status === 'loading' && (
              <LoadingState message="Carregando a loja..." />
            )}

            {state.status === 'error' && (
              <ErrorState
                message={state.message}
                onRetry={() => refetch()}
              />
            )}

            {loja && filteredRewards.length === 0 && (
              <EmptyState
                icon="🎁"
                title="Nenhum produto nesta categoria"
                description={
                  loja.recompensas.length === 0
                    ? 'A loja ainda não tem recompensas cadastradas.'
                    : 'Experimente outra categoria.'
                }
              />
            )}

            {loja && filteredRewards.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredRewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    id={reward.id}
                    emoji={reward.emoji}
                    name={reward.name}
                    description={reward.description}
                    points={reward.points}
                    badge={reward.badge}
                    note={
                      reward.isDonation
                        ? 'Vai direto para a ONG'
                        : `${reward.stock} em estoque`
                    }
                    buttonLabel={
                      reward.stock <= 0
                        ? 'Esgotado'
                        : reward.isDonation
                          ? 'Doar pontos →'
                          : 'Resgatar →'
                    }
                    onRedeem={
                      reward.stock > 0
                        ? () => setSelectedReward(reward)
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Meus resgates */}
          {loja && (
            <div className="mt-16">
              <h2 className="font-display text-xl font-bold text-text-dark">
                🧾 Meus resgates
              </h2>

              <p className="mt-1 text-sm text-text-muted">
                Mudou de ideia? Cancele um resgate e recupere os pontos.
              </p>

              <div className="mt-4">
                <MeusResgates
                  resgates={loja.resgates}
                  cancelandoId={cancelandoId}
                  onCancelar={handleCancelar}
                />
              </div>
            </div>
          )}

          {/* Banner de doação */}
          <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-lilac-light p-6 text-center sm:p-8 md:flex-row md:text-left">
            <div className="text-5xl">💛</div>

            <div>
              <h3 className="font-display text-xl font-bold text-text-dark">
                Doe seus pontos e faça a diferença!
              </h3>

              <p className="mt-1 text-sm text-text-body">
                Além de resgatar produtos para o seu pet, você pode
                transformar seus pontos em doações para ONGs parceiras.
                Cada ponto doado ajuda animais em situação de
                vulnerabilidade a receberem cuidados, ração e amor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedReward && loja && (
        <RedeemModal
          emoji={selectedReward.emoji}
          name={selectedReward.name}
          points={selectedReward.points}
          walletPoints={loja.saldo}
          onConfirm={handleConfirmRedeem}
          onClose={() => setSelectedReward(null)}
        />
      )}

      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-full bg-bg-dark px-6 py-3 text-center text-sm font-semibold text-white shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </main>
  );
};

export default Recompensas;