import { useCallback, useEffect, useRef, useState } from 'react'
import type { AsyncState } from '../types/api'
import { ApiError } from '../services/http'

// Hook genérico: busca dados da API e controla loading, sucesso e erro
export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [reloadKey, setReloadKey] = useState(0)
  const silentRef = useRef(false)

  // refetch(true) recarrega "por trás", sem trocar a tela pelo loading
  const refetch = useCallback((silent = false) => {
    silentRef.current = silent
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    if (!silentRef.current) setState({ status: 'loading' })
    silentRef.current = false

    fetcher(controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError) {
          setState({ status: 'error', message: error.message, code: error.status })
        } else {
          setState({ status: 'error', message: 'Erro inesperado ao carregar os dados.', code: 0 })
        }
      })

    // cancela a requisição se o usuário sair da página antes de terminar
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey, ...deps])

  return { state, refetch }
}