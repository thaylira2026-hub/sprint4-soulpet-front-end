import { useCallback, useEffect, useState } from 'react'
import type { AsyncState } from '../types/api'
import { ApiError } from '../services/http'

// Hook genérico: busca dados da API e controla loading, sucesso e erro
export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetcher(controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message = error instanceof ApiError ? error.message : 'Erro inesperado ao carregar os dados.'
        setState({ status: 'error', message })
      })

    // cancela a requisição se o usuário sair da página antes de terminar
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey, ...deps])

  return { state, refetch }
}