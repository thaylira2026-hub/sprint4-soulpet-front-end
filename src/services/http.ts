import type { ApiErrorBody, HttpMethod } from '../types/api'

// URL da API Java publicada no Render 
const API_URL: string = import.meta.env.VITE_API_URL ?? 'https://soulpet-api.onrender.com'

// Erro personalizado com o status HTTP
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
  signal?: AbortSignal
}

const friendlyMessage = (status: number): string => {
  if (status === 404) return 'Não encontramos o que você procurava.'
  if (status === 400) return 'Alguns dados enviados são inválidos.'
  if (status >= 500) return 'O servidor está com problemas. Tente novamente em instantes.'
  return 'Não foi possível concluir a requisição.'
}

// A API Java às vezes devolve o erro como JSON e às vezes como texto puro
// (ex: "Missão não encontrada!") 
async function extractErrorMessage(response: Response): Promise<string> {
  const fallback = friendlyMessage(response.status)
  try {
    const text = (await response.text()).trim()
    if (!text) return fallback
    try {
      const body = JSON.parse(text) as ApiErrorBody
      return body.message ?? body.erro ?? fallback
    } catch {
      return text.length < 200 && !text.startsWith('<') ? text : fallback
    }
  } catch {
    return fallback
  }
}

// Função central: todas as chamadas à API passam por aqui (usa fetch nativo, sem Axios)
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      signal,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError('Não foi possível conectar à API. Verifique sua conexão.', 0)
  }

  if (!response.ok) {
    throw new ApiError(await extractErrorMessage(response), response.status)
  }

  // 204 No Content (comum em DELETE e PUT)
  if (response.status === 204) return undefined as T

  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}

// Atalhos para cada método HTTP
export const http = {
  get: <T>(path: string, signal?: AbortSignal) => request<T>(path, { signal }),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body }),
  delete: (path: string) => request<void>(path, { method: 'DELETE' }),
}