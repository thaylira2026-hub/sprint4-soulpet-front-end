import type { Cidadao, CidadaoNovo } from '../types/Cidadao'
import { USANDO_DADOS_TEMPORARIOS, requisicao } from './api'
import { esperar, lerCidadaosTemporarios, salvarCidadaosTemporarios } from './dadosTemporarios'

// POST /cidadaos
export async function cadastrarCidadao(dados: CidadaoNovo): Promise<Cidadao> {
  if (USANDO_DADOS_TEMPORARIOS) {
    await esperar()
    const lista = lerCidadaosTemporarios()
    const cidadao: Cidadao = { id: lista.length + 1, ...dados }
    salvarCidadaosTemporarios([...lista, cidadao])
    return cidadao
  }
  return requisicao<Cidadao>('/cidadaos', { method: 'POST', body: JSON.stringify(dados) })
}