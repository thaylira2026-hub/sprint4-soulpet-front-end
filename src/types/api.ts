// Tipos genéricos usados em toda a comunicação com a API Java

// Union type: só aceita um destes métodos HTTP
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Union type discriminado: cada estado da requisição tem um formato próprio
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

// Intersection type: junta qualquer tipo com um id numérico vindo do banco
export type WithId = { id: number }
export type Entity<T> = T & WithId

// Formato de erro que a API pode devolver no corpo da resposta
export interface ApiErrorBody {
  message?: string
  erro?: string
  status?: number
}