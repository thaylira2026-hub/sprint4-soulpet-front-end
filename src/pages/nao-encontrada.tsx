import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const REDIRECT_SECONDS = 5

const NaoEncontrada = () => {
  const [seconds, setSeconds] = useState<number>(REDIRECT_SECONDS)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (seconds <= 0) {
      navigate('/', { replace: true })
      return
    }
    const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds, navigate])

  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="text-6xl">🐶❓</div>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-dark sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="mt-3 text-text-body">
        O endereço <code className="rounded bg-lilac-light px-2 py-1 text-sm text-primary">{location.pathname}</code> não existe.
      </p>
      <p className="mt-2 text-sm text-text-muted" aria-live="polite">
        Você será redirecionado para o início em <strong>{seconds}</strong> segundo{seconds === 1 ? '' : 's'}...
      </p>
      <Link
        to="/"
        replace
        className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary"
      >
        Ir para o início agora
      </Link>
    </main>
  )
}

export default NaoEncontrada    