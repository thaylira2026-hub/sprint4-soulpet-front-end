import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

// Rede de segurança: se alguma página quebrar, mostra uma mensagem amigável
// em vez de deixar a tela inteira em branco
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Erro ao exibir a página:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="text-6xl">😿</div>
          <h1 className="mt-4 font-display text-2xl font-bold text-text-dark sm:text-3xl">
            Ops! Esta página teve um problema
          </h1>
          <p className="mt-3 text-text-body">
            Algo inesperado aconteceu ao mostrar os dados. Recarregue a página para tentar de novo.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary"
            >
              Recarregar página
            </button>
            <a
              href="/"
              className="rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-lilac-light"
            >
              Ir para o início
            </a>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary