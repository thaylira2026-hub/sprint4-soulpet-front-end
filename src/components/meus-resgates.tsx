import type { ResgateDetalhado } from '../types/recompensa';

interface MeusResgatesProps {
  resgates: ResgateDetalhado[];
  cancelandoId: number | null;
  onCancelar: (resgate: ResgateDetalhado) => void;
}

const formatarData = (data: string | null): string =>
  data
    ? new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR')
    : '—';

// Histórico de resgates do usuário, vindo de GET /usuarios-recompensas
const MeusResgates = ({
  resgates,
  cancelandoId,
  onCancelar,
}: MeusResgatesProps) => {
  if (resgates.length === 0) {
    return (
      <p className="rounded-2xl bg-bg p-6 text-center text-sm text-text-body">
        Você ainda não resgatou nenhuma recompensa. Escolha um produto acima! 🐾
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border-soft overflow-hidden rounded-2xl border border-border-soft bg-white">
      {resgates.map((resgate) => (
        <li
          key={resgate.codigo}
          className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {resgate.recompensa?.emoji ?? '🎁'}
            </span>

            <div>
              <div className="font-semibold text-text-dark">
                {resgate.recompensa?.name ??
                  `Recompensa #${resgate.codRecompensa}`}
              </div>

              <div className="text-xs text-text-muted">
                Resgatado em {formatarData(resgate.dataResgate)}
                {resgate.recompensa &&
                  ` · ${resgate.recompensa.points} pts`}
              </div>
            </div>
          </div>

          <button
            onClick={() => onCancelar(resgate)}
            disabled={cancelandoId === resgate.codigo}
            className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
          >
            {cancelandoId === resgate.codigo
              ? 'Cancelando...'
              : 'Cancelar resgate'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MeusResgates;