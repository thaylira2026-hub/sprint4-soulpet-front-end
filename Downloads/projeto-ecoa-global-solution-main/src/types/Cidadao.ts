export type Cidadao = {
  id: number
  nome: string
  telefone?: string
  dataNascimento?: string
}

// O que o site envia para cadastrar: tudo menos o id, que a API cria
export type CidadaoNovo = Omit<Cidadao, 'id'>