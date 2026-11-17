import type { Unidade } from '../types/Unidade'
import { ErroRequisicao, USANDO_DADOS_TEMPORARIOS, requisicao } from './api'
import { esperar, servicosPorUnidade, unidadesTemporarias } from './dadosTemporarios'

// GET /unidades?servicoId={id}
export async function listarUnidadesPorServico(idServico: number): Promise<Unidade[]> {
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar()
    return unidadesTemporarias.filter((unidade) =>
      (servicosPorUnidade[unidade.id] ?? []).includes(idServico),
    )
  }
  return requisicao<Unidade[]>(`/unidades?servicoId=${idServico}`)
}

// GET /unidades/{id}
export async function buscarUnidade(id: number): Promise<Unidade> {
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar(200)
    const unidade = unidadesTemporarias.find((item) => item.id === id)
    if (!unidade) throw new ErroRequisicao('Unidade não encontrada.', 404)
    return unidade
  }
  return requisicao<Unidade>(`/unidades/${id}`)
}