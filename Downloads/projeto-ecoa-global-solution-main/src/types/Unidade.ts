export type TipoUnidade = 'UBS' | 'CRAS' | 'POUPATEMPO'

export type Unidade = {
  id: number
  nome: string
  tipo: TipoUnidade
  endereco: string
  bairro: string
}