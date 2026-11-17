export type CategoriaServico = 'SAUDE' | 'DOCUMENTOS' | 'BENEFICIOS'

export type Servico = {
  id: number
  nome: string
  descricao: string
  categoria: CategoriaServico
  pictograma: string
  duracaoMin: number
  documentos?: string[]
}