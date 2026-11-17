import type { Atendimento, AtendimentoNovo } from '../types/Atendimento'
import { ErroRequisicao, USANDO_DADOS_TEMPORARIOS, requisicao } from './api'
import {
  esperar,
  lerAtendimentosTemporarios,
  salvarAtendimentosTemporarios,
} from './dadosTemporarios'

// POST /cidadaos/{id}/atendimentos
export async function agendarAtendimento(
  idCidadao: number,
  dados: AtendimentoNovo,
): Promise<Atendimento> {
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar()
    const lista = lerAtendimentosTemporarios()
    // Mesma regra de negócio da API Java: um atendimento por horário na unidade
    const ocupado = lista.some(
      (item) => item.idUnidade === dados.idUnidade && item.dataHora === dados.dataHora,
    )
    if (ocupado) {
      throw new ErroRequisicao('Esse horário já está ocupado nesta unidade. Escolha outro.', 409)
    }
    const atendimento: Atendimento = {
      id: lista.length + 1,
      idCidadao,
      ...dados,
      status: 'AGENDADO',
    }
    salvarAtendimentosTemporarios([...lista, atendimento])
    return atendimento
  }
  return requisicao<Atendimento>(`/cidadaos/${idCidadao}/atendimentos`, {
    method: 'POST',
    body: JSON.stringify(dados),
  })
}

// GET /atendimentos/{id}
export async function buscarAtendimento(id: number): Promise<Atendimento> {
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar(200)
    const atendimento = lerAtendimentosTemporarios().find((item) => item.id === id)
    if (!atendimento) throw new ErroRequisicao('Atendimento não encontrado.', 404)
    return atendimento
  }
  return requisicao<Atendimento>(`/atendimentos/${id}`)
}

// PUT /atendimentos/{id}: usado pelo balcão para chamar a pessoa
export async function chamarAtendimento(atendimento: Atendimento): Promise<Atendimento> {
  const atualizado: Atendimento = { ...atendimento, status: 'CHAMADO' }
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar(200)
    const lista = lerAtendimentosTemporarios()
    if (!lista.some((item) => item.id === atendimento.id)) {
      throw new ErroRequisicao('Atendimento não encontrado.', 404)
    }
    salvarAtendimentosTemporarios(
      lista.map((item) => (item.id === atendimento.id ? atualizado : item)),
    )
    return atualizado
  }
  return requisicao<Atendimento>(`/atendimentos/${atendimento.id}`, {
    method: 'PUT',
    body: JSON.stringify(atualizado),
  })
}