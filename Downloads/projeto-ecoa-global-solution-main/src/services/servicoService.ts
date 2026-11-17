import type { Servico } from '../types/Servico'
import { ErroRequisicao, USANDO_DADOS_TEMPORARIOS, requisicao } from './api'
import { esperar, servicosTemporarios } from './dadosTemporarios'

// GET /servicos
export async function listarServicos(): Promise<Servico[]> {
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar()
    return servicosTemporarios
  }
  return requisicao<Servico[]>('/servicos')
}

// GET /servicos/{id}
export async function buscarServico(id: number): Promise<Servico> {
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar()
    const servico = servicosTemporarios.find((item) => item.id === id)
    if (!servico) throw new ErroRequisicao('Serviço não encontrado.', 404)
    return servico
  }
  return requisicao<Servico>(`/servicos/${id}`)
}