interface RedeemModalProps {
  emoji: string
  name: string
  points: number
  walletPoints: number
  onConfirm: () => void
  onClose: () => void
}

const RedeemModal = ({ emoji, name, points, walletPoints, onConfirm, onClose }: RedeemModalProps) => {
  const hasEnoughPoints = walletPoints >= points

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl">{emoji}</div>

        {hasEnoughPoints ? (
          <>
            <h3 className="mt-4 font-display text-xl font-bold text-text-dark">{name}</h3>
            <p className="mt-2 text-text-body">Deseja usar seus pontos para resgatar este item?</p>
            <div className="mt-4 font-display text-2xl font-bold text-primary">{points} pts</div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-full border border-border-soft py-3 font-semibold text-text-body hover:bg-bg"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-full bg-primary py-3 font-semibold text-white hover:bg-secondary"
              >
                Confirmar
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="mt-4 font-display text-xl font-bold text-text-dark">Pontos insuficientes 😅</h3>
            <p className="mt-2 text-text-body">
              Você não tem pontos suficientes para este resgate. Complete mais missões e tente novamente!
            </p>
            <div className="mt-4 text-sm text-text-muted">Você tem: {walletPoints} pts</div>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-primary py-3 font-semibold text-white hover:bg-secondary"
            >
              Entendi
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default RedeemModal