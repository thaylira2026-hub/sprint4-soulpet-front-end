export type StatusAtendimento = 'AGENDADO' | 'CHAMADO' | 'CONCLUIDO' | 'CANCELADO'

export type Atendimento = {
  id: number
  idCidadao: number
  idServico: number
  idUnidade: number
  dataHora: string
  status: StatusAtendimento
}

// O que o site envia para agendar
export type AtendimentoNovo = {
  idServico: number
  idUnidade: number
  dataHora: string
}