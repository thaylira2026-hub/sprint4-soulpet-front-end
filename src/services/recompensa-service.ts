import { http, ApiError } from './http'
import { USUARIO_ID } from '../config'
import type {
  ConclusaoApi,
  DadosLoja,
  MissaoPontosApi,
  NovoResgate,
  RecompensaApi,
  ResgateDetalhado,
  Reward,
  RewardCategory,
  UsuarioApi,
  UsuarioRecompensaApi,
} from '../types/recompensa'

// Remove acentos e deixa minúsculo, para comparar textos vindos do banco
const normalizar = (texto: string): string =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

// O campo "tipo" da API é texto livre; aqui ele vira uma das categorias dos filtros
const categoriaDoTipo = (tipo: string, nome: string): RewardCategory => {
  const t = normalizar(`${tipo} ${nome}`)
  if (/doa|ong/.test(t)) return 'donation'
  if (/rac|aliment|petisc|comida|areia|snack/.test(t)) return 'food'
  if (/brinq|bola|corda|pelucia/.test(t)) return 'toy'
  if (/acess|coleir|cama|caminha|comedou|bebedou|roupa/.test(t)) return 'accessory'
  return 'other'
}

const EMOJIS: Record<RewardCategory, string> = {
  food: '🍖',
  toy: '🎾',
  accessory: '🎀',
  donation: '❤️',
  other: '🎁',
}

const badgeDoEstoque = (estoque: number): string | undefined => {
  if (estoque <= 0) return 'Esgotado'
  if (estoque <= 5) return 'Últimas unidades'
  return undefined
}

// Quando o banco falha, a API Java devolve itens "em branco" (campos null) em vez de um erro.
// Estas checagens transformam isso num erro de verdade, que a tela sabe mostrar.
const FALHA_NO_SERVIDOR = 'O servidor não conseguiu buscar os dados agora. Tente novamente.'

const recompensaValida = (recompensa: RecompensaApi | null | undefined): recompensa is RecompensaApi =>
  recompensa != null && recompensa.codigo != null && recompensa.nome != null

// Converte o JSON da API para o formato que os componentes usam
export const toReward = (recompensa: RecompensaApi): Reward => {
  const category = categoriaDoTipo(recompensa.tipo, recompensa.nome)
  return {
    id: String(recompensa.codigo),
    emoji: EMOJIS[category],
    name: recompensa.nome,
    description: recompensa.descricao ?? 'Sem descrição.',
    points: recompensa.custoPontos,
    badge: badgeDoEstoque(recompensa.estoque),
    category,
    isDonation: category === 'donation',
    stock: recompensa.estoque,
  }
}

// GET /recompensas
export async function listarRecompensas(signal?: AbortSignal): Promise<Reward[]> {
  const recompensas = (await http.get<RecompensaApi[]>('/recompensas', signal)) ?? []
  return recompensas.filter(recompensaValida).map(toReward)
}

// GET /recompensas/{codigo}
export async function buscarRecompensa(id: string, signal?: AbortSignal): Promise<Reward> {
  if (!/^\d+$/.test(id)) throw new ApiError('Recompensa não encontrada!', 404)
  const recompensa = await http.get<RecompensaApi>(`/recompensas/${id}`, signal)
  if (!recompensaValida(recompensa)) throw new ApiError(FALHA_NO_SERVIDOR, 503)
  return toReward(recompensa)
}

// Carteira = pontos do usuário + pontos das missões que ele concluiu − recompensas que ele resgatou
// GET /recompensas, /usuarios/{codigo}, /usuarios-recompensas, /missoes e /usuarios-missoes (em paralelo)
export async function carregarLoja(signal?: AbortSignal): Promise<DadosLoja> {
  const [recompensas, usuario, todosResgates, missoes, conclusoes] = await Promise.all([
    listarRecompensas(signal),
    http.get<UsuarioApi>(`/usuarios/${USUARIO_ID}`, signal),
    http.get<UsuarioRecompensaApi[]>('/usuarios-recompensas', signal),
    http.get<MissaoPontosApi[]>('/missoes', signal),
    http.get<ConclusaoApi[]>('/usuarios-missoes', signal),
  ])

  if (usuario == null || usuario.codigo == null || usuario.nome == null) {
    throw new ApiError(FALHA_NO_SERVIDOR, 503)
  }

  const porCodigo = new Map(recompensas.map((item) => [item.id, item]))
  const resgates: ResgateDetalhado[] = (todosResgates ?? [])
    .filter((resgate) => resgate.codigo != null && resgate.codUsuario === USUARIO_ID)
    .map((resgate) => ({ ...resgate, recompensa: porCodigo.get(String(resgate.codRecompensa)) ?? null }))
    .sort((a, b) => b.codigo - a.codigo)

  const pontosDaMissao = new Map((missoes ?? []).map((missao) => [missao.codigo, missao.pontosRecompensa]))
  const pontosGanhos = (conclusoes ?? [])
    .filter((item) => item.codMissao != null && item.codUsuario === USUARIO_ID && item.concluida)
    .reduce((total, item) => total + (pontosDaMissao.get(item.codMissao) ?? 0), 0)

  const pontosGastos = resgates.reduce((total, resgate) => total + (resgate.recompensa?.points ?? 0), 0)
  const saldo = Math.max((usuario.pontos ?? 0) + pontosGanhos - pontosGastos, 0)

  return { recompensas, usuario, resgates, pontosGanhos, pontosGastos, saldo }
}

// POST /usuarios-recompensas → registra o resgate no banco
export function resgatarRecompensa(codRecompensa: number): Promise<UsuarioRecompensaApi> {
  const corpo: NovoResgate = { codRecompensa, codUsuario: USUARIO_ID }
  return http.post<UsuarioRecompensaApi>('/usuarios-recompensas', corpo)
}

// DELETE /usuarios-recompensas/{codigo} → cancela o resgate e devolve os pontos
export function cancelarResgate(codigo: number): Promise<void> {
  return http.delete(`/usuarios-recompensas/${codigo}`)
}