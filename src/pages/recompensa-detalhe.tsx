import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RedeemModal from '../components/redeem-modal';
import {
  ErrorState,
  LoadingState,
} from '../components/status-message';
import { useFetch } from '../hooks/use-fetch';
import { ApiError } from '../services/http';
import {
  buscarRecompensa,
  carregarLoja,
  resgatarRecompensa,
} from '../services/recompensa-service';

type Feedback = {
  tipo: 'sucesso' | 'erro';
  texto: string;
} | null;

// GET /recompensas/{codigo} + a carteira do usuário, em paralelo
const carregarDetalhe = async (id: string, signal: AbortSignal) => {
  const [reward, loja] = await Promise.all([
    buscarRecompensa(id, signal),
    carregarLoja(signal),
  ]);

  return {
    reward,
    saldo: loja.saldo,
  };
};

const RecompensaDetalhe = () => {
  const { id = '' } = useParams();

  const { state, refetch } = useFetch(
    (signal) => carregarDetalhe(id, signal),
    [id]
  );

  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <BackLink />
        <LoadingState message="Carregando recompensa..." />
      </main>
    );
  }

  if (state.status === 'error') {
    if (state.code === 404) {
      return <RecompensaNaoEncontrada />;
    }

    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <BackLink />

        <div className="mt-6">
          <ErrorState
            message={state.message}
            onRetry={() => refetch()}
          />
        </div>
      </main>
    );
  }

  const { reward, saldo } = state.data;
  const esgotado = reward.stock <= 0;

  // POST /usuarios-recompensas
  const handleConfirmRedeem = async () => {
    setShowModal(false);
    setFeedback(null);

    try {
      await resgatarRecompensa(Number(reward.id));

      setFeedback({
        tipo: 'sucesso',
        texto: `✅ ${reward.name} ${
          reward.isDonation ? 'doado' : 'resgatado'
        } com sucesso!`,
      });

      refetch(true);
    } catch (error) {
      const texto =
        error instanceof ApiError
          ? error.message
          : 'Não foi possível concluir o resgate.';

      setFeedback({
        tipo: 'erro',
        texto,
      });
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <BackLink />

      <article className="mt-6 rounded-3xl border border-border-soft bg-white p-6 text-center shadow-lg sm:p-8">
        {reward.badge && (
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
            {reward.badge}
          </span>
        )}

        <div className="mt-4 text-6xl">{reward.emoji}</div>

        <h1 className="mt-4 font-display text-2xl font-bold text-text-dark sm:text-3xl">
          {reward.name}
        </h1>

        <p className="mt-3 text-text-body">
          {reward.description}
        </p>

        <div className="mt-6 font-display text-2xl font-bold text-primary">
          {reward.points} pts
        </div>

        <p className="mt-1 text-sm text-text-muted">
          {reward.isDonation
            ? 'Doação para ONG parceira'
            : `${reward.stock} unidades em estoque`}
          {' · '}
          Sua carteira: {saldo} pts
        </p>

        <button
          onClick={() => setShowModal(true)}
          disabled={esgotado}
          className="mt-6 w-full rounded-full bg-primary px-8 py-3 font-semibold text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {esgotado
            ? 'Esgotado'
            : reward.isDonation
              ? 'Doar pontos'
              : 'Resgatar recompensa'}
        </button>

        {feedback && (
          <div className="mt-4">
            <p
              role={feedback.tipo === 'erro' ? 'alert' : 'status'}
              className={`text-sm font-semibold ${
                feedback.tipo === 'erro'
                  ? 'text-red-600'
                  : 'text-primary'
              }`}
            >
              {feedback.texto}
            </p>

            {feedback.tipo === 'sucesso' && (
              <Link
                to="/recompensas"
                className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
              >
                Ver meus resgates →
              </Link>
            )}
          </div>
        )}
      </article>

      {showModal && (
        <RedeemModal
          emoji={reward.emoji}
          name={reward.name}
          points={reward.points}
          walletPoints={saldo}
          onConfirm={handleConfirmRedeem}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
};

// Link para voltar à loja
const BackLink = () => (
  <Link
    to="/recompensas"
    className="text-sm font-semibold text-primary hover:underline"
  >
    ← Voltar para a loja
  </Link>
);

// Tela exibida quando a recompensa não existe
const RecompensaNaoEncontrada = () => (
  <main className="mx-auto max-w-2xl px-4 py-20 text-center">
    <div className="text-5xl">🔍</div>

    <h1 className="mt-4 font-display text-2xl font-bold text-text-dark">
      Recompensa não encontrada
    </h1>

    <p className="mt-2 text-text-muted">
      O produto que você procura não existe ou foi removido.
    </p>

    <Link
      to="/recompensas"
      className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary"
    >
      Voltar para Recompensas
    </Link>
  </main>
);

export default RecompensaDetalhe;