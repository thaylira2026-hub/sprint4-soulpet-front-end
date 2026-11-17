// DADOS TEMPORÁRIOS: usados só enquanto a API Java não está no ar.
// Antes da entrega, preencham VITE_API_URL e apaguem este arquivo e os trechos
// "if (USANDO_DADOS_TEMPORARIOS)" dos services.
import type { Atendimento } from '../types/Atendimento'
import type { Cidadao } from '../types/Cidadao'
import type { Servico } from '../types/Servico'
import type { Unidade } from '../types/Unidade'

export const servicosTemporarios: Servico[] = [
  {
    id: 1,
    nome: 'Consulta de rotina',
    descricao:
      'Consulta com médico clínico geral na Unidade Básica de Saúde (UBS) mais perto de você. Serve para check-up, renovar receitas e pedir exames.',
    categoria: 'SAUDE',
    pictograma: 'saude',
    duracaoMin: 20,
    documentos: ['RG', 'Cartão do SUS', 'Comprovante de residência'],
  },
  {
    id: 2,
    nome: 'Vacinação',
    descricao:
      'Aplicação das vacinas do calendário nacional, como gripe e covid-19. Leve a carteira de vacinação, se tiver.',
    categoria: 'SAUDE',
    pictograma: 'vacina',
    duracaoMin: 10,
    documentos: ['RG', 'Cartão do SUS', 'Carteira de vacinação'],
  },
  {
    id: 3,
    nome: 'Primeira via do RG',
    descricao:
      'Emissão da Carteira de Identidade Nacional no Poupatempo. A primeira via é gratuita.',
    categoria: 'DOCUMENTOS',
    pictograma: 'documento',
    duracaoMin: 30,
    documentos: ['Certidão de nascimento ou casamento', 'CPF', 'Comprovante de residência'],
  },
  {
    id: 4,
    nome: 'Cadastro Único (CadÚnico)',
    descricao:
      'Cadastro no CRAS que é a porta de entrada para benefícios como o Bolsa Família e a tarifa social de energia.',
    categoria: 'BENEFICIOS',
    pictograma: 'beneficio',
    duracaoMin: 40,
    documentos: ['RG', 'CPF', 'Comprovante de residência', 'Carteira de trabalho'],
  },
]

export const unidadesTemporarias: Unidade[] = [
  { id: 1, nome: 'UBS Vila Mariana', tipo: 'UBS', endereco: 'Rua Domingos de Morais, 1000', bairro: 'Vila Mariana' },
  { id: 2, nome: 'UBS Santa Cecília', tipo: 'UBS', endereco: 'Rua Vitorino Carmilo, 500', bairro: 'Santa Cecília' },
  { id: 3, nome: 'Poupatempo Sé', tipo: 'POUPATEMPO', endereco: 'Praça do Carmo, 100', bairro: 'Sé' },
  { id: 4, nome: 'CRAS Lapa', tipo: 'CRAS', endereco: 'Rua Guaicurus, 200', bairro: 'Lapa' },
]

// Quais unidades oferecem cada serviço (no banco, é a tabela TB_SERVICO_UNIDADE)
export const servicosPorUnidade: Record<number, number[]> = {
  1: [1, 2],
  2: [1, 2],
  3: [3],
  4: [4],
}

// "Banco" no localStorage do navegador: assim o balcão e o acompanhamento,
// abertos em abas diferentes, enxergam os mesmos atendimentos.
function lerLista<T>(chave: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(chave) ?? '[]') as T[]
  } catch {
    return []
  }
}

function salvarLista<T>(chave: string, lista: T[]) {
  try {
    localStorage.setItem(chave, JSON.stringify(lista))
  } catch {
    // Sem localStorage, os dados temporários não ficam salvos
  }
}

export function lerCidadaosTemporarios() {
  return lerLista<Cidadao>('ecoa-temp-cidadaos')
}

export function salvarCidadaosTemporarios(lista: Cidadao[]) {
  salvarLista('ecoa-temp-cidadaos', lista)
}

export function lerAtendimentosTemporarios() {
  return lerLista<Atendimento>('ecoa-temp-atendimentos')
}

export function salvarAtendimentosTemporarios(lista: Atendimento[]) {
  salvarLista('ecoa-temp-atendimentos', lista)
}

// Simula a demora de uma chamada de rede, para testar o "Carregando"
export function esperar(milissegundos = 500) {
  return new Promise((resolver) => setTimeout(resolver, milissegundos))
}