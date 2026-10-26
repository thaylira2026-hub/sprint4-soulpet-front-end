// Componentes reutilizáveis para os 3 estados de uma requisição: carregando, erro e vazio

interface LoadingStateProps {
  message?: string
}

export const LoadingState = ({ message = 'Carregando...' }: LoadingStateProps) => (
  <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-16 text-text-muted">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-lilac-light border-t-primary" />
    <span className="text-sm font-semibold">{message}</span>
  </div>
)

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div role="alert" className="mx-auto max-w-md rounded-3xl border border-red-200 bg-red-50 p-6 text-center sm:p-8">
    <div className="text-4xl">😿</div>
    <h3 className="mt-2 font-display text-lg font-bold text-text-dark">Ops! Algo deu errado</h3>
    <p className="mt-1 text-sm text-text-body">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 rounded-full bg-primary px-6 py-2 font-semibold text-white hover:bg-secondary"
      >
        Tentar novamente
      </button>
    )}
  </div>
)

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
}

export const EmptyState = ({ icon = '🐾', title, description }: EmptyStateProps) => (
  <div className="mx-auto max-w-md rounded-3xl bg-bg p-6 text-center sm:p-8">
    <div className="text-4xl">{icon}</div>
    <h3 className="mt-2 font-display text-lg font-bold text-text-dark">{title}</h3>
    {description && <p className="mt-1 text-sm text-text-body">{description}</p>}
  </div>
)