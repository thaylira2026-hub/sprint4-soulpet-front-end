import { http, ApiError } from './http'
import { USUARIO_ID } from '../config'
import type {
  MissaoApi,
  MissaoComStatus,
  Mission,
  MissionLevel,
  NovaConclusaoMissao,
  UsuarioMissaoApi,
} from '../types/missao'

// A API não tem campo de dificuldade, então o nível é definido pelos pontos da missão
const NIVEIS: Record<MissionLevel, { label: string; prazo: string }> = {
  easy: { label: '🟢 Fácil', prazo: 'Até 24h' },
  medium: { label: '🟡 Médio', prazo: 'Até 7 dias' },
  hard: { label: '🔴 Difícil', prazo: 'Até 30 dias' },
}

const nivelPorPontos = (pontos: number): MissionLevel => {
  if (pontos <= 70) return 'easy'
  if (pontos <= 200) return 'medium'
  return 'hard'
}

// Ícone escolhido por palavras-chave do título
const ICONES: Array<[RegExp, string]> = [
  [/ado[cç]/i, '🏠'],
  [/foto/i, '📸'],
  [/v[ií]deo/i, '🎥'],
  [/vet|sa[uú]de|vacin/i, '🩺'],
  [/evento/i, '🎉'],
  [/ong|volunt/i, '🤝'],
  [/coment/i, '💬'],
  [/curt/i, '💙'],
  [/convid|amig/i, '📲'],
  [/perfil/i, '🔔'],
  [/artigo|texto/i, '📰'],
]

const iconeDaMissao = (titulo: string): string =>
  ICONES.find(([regex]) => regex.test(titulo))?.[1] ?? '🐾'

// Converte o JSON da API para o formato que os componentes usam
export const toMission = (missao: MissaoApi, concluida = false): Mission => {
  const level = nivelPorPontos(missao.pontosRecompensa)
  return {
    id: String(missao.codigo),
    icon: iconeDaMissao(missao.titulo),
    level,
    difficulty: NIVEIS[level].label,
    tag: concluida ? '✅ Concluída' : undefined,
    title: missao.titulo,
    description: missao.descricao ?? 'Sem descrição.',
    points: missao.pontosRecompensa,
    deadline: NIVEIS[level].prazo,
  }
}

const conclusoesDoUsuario = async (signal?: AbortSignal): Promise<UsuarioMissaoApi[]> => {
  const todas = (await http.get<UsuarioMissaoApi[]>('/usuarios-missoes', signal)) ?? []
  return todas.filter((item) => item.codUsuario === USUARIO_ID && item.concluida)
}

// GET /missoes + GET /usuarios-missoes → lista com a marcação das missões já concluídas
export async function listarMissoes(signal?: AbortSignal): Promise<Mission[]> {
  const [missoes, conclusoes] = await Promise.all([
    http.get<MissaoApi[]>('/missoes', signal),
    conclusoesDoUsuario(signal),
  ])
  const concluidas = new Set(conclusoes.map((item) => item.codMissao))
  return (missoes ?? []).map((missao) => toMission(missao, concluidas.has(missao.codigo)))
}

// GET /missoes/{codigo} → detalhe da missão + status de conclusão do usuário
export async function buscarMissao(id: string, signal?: AbortSignal): Promise<MissaoComStatus> {
  if (!/^\d+$/.test(id)) throw new ApiError('Missão não encontrada!', 404)

  const [missao, conclusoes] = await Promise.all([
    http.get<MissaoApi>(`/missoes/${id}`, signal),
    conclusoesDoUsuario(signal),
  ])
  const conclusao = conclusoes.find((item) => item.codMissao === missao.codigo) ?? null
  return { ...toMission(missao, conclusao !== null), conclusao }
}

// POST /usuarios-missoes → registra que o usuário concluiu a missão
export function concluirMissao(codMissao: number): Promise<UsuarioMissaoApi> {
  const corpo: NovaConclusaoMissao = { concluida: true, codUsuario: USUARIO_ID, codMissao }
  return http.post<UsuarioMissaoApi>('/usuarios-missoes', corpo)
}

// DELETE /usuarios-missoes/{codigo} → desfaz a conclusão
export function desfazerConclusao(codigo: number): Promise<void> {
  return http.delete(`/usuarios-missoes/${codigo}`)
}