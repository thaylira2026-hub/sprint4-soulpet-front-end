import type { CategoriaServico } from '../types/Servico'

export const nomesCategoria: Record<CategoriaServico, string> = {
  SAUDE: 'Saúde',
  DOCUMENTOS: 'Documentos',
  BENEFICIOS: 'Benefícios',
}

// O campo "pictograma" que vem da API vira um ícone na tela
const iconesPictograma: Record<string, string> = {
  saude: '🩺',
  vacina: '💉',
  documento: '🪪',
  beneficio: '🤝',
}

export function iconeDoServico(pictograma: string) {
  return iconesPictograma[pictograma] ?? '🏛️'
}

// Ícone de cada documento do checklist, para ajudar quem lê pouco
export function iconeDoDocumento(documento: string) {
  const nome = documento.toLowerCase()
  if (nome.includes('cpf')) return '🧾'
  if (nome.includes('sus')) return '💳'
  if (nome.includes('residência')) return '🏠'
  if (nome.includes('vacina')) return '💉'
  if (nome.includes('trabalho')) return '📘'
  if (nome.includes('certidão')) return '📜'
  if (nome.includes('rg') || nome.includes('identidade')) return '🪪'
  return '📄'
}