// ---------- Formato do JSON da API Java (RecompensaTO, UsuarioTO, UsuarioRecompensaTO) ----------

export interface RecompensaApi {
  codigo: number;
  nome: string;
  descricao: string | null;
  custoPontos: number;
  tipo: string;
  estoque: number;
}

export interface UsuarioApi {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  pontos: number;
  nivel: string;
}

export interface UsuarioRecompensaApi {
  codigo: number;
  dataResgate: string | null;
  codRecompensa: number;
  codUsuario: number;
}

// Só os campos de missões que a carteira precisa para somar os pontos ganhos
export type MissaoPontosApi = {
  codigo: number;
  pontosRecompensa: number;
};

export type ConclusaoApi = {
  codUsuario: number;
  codMissao: number;
  concluida: boolean;
};

// Corpo do POST /usuarios-recompensas: a data o back-end preenche sozinho
export type NovoResgate = Omit<UsuarioRecompensaApi, 'codigo' | 'dataResgate'>;


// ---------- Formato usado pelas telas (convertido no service) ----------

export type RewardCategory =
  | 'food'
  | 'toy'
  | 'accessory'
  | 'donation'
  | 'other';

export interface Reward {
  id: string;
  emoji: string;
  name: string;
  description: string;
  points: number;
  badge?: string;
  category: RewardCategory;
  isDonation: boolean;
  stock: number;
}

// Intersection type: o resgate da API + a recompensa completa a que ele se refere
export type ResgateDetalhado = UsuarioRecompensaApi & {
  recompensa: Reward | null;
};

// Tudo o que a Loja Solidária precisa carregar de uma vez
export interface DadosLoja {
  recompensas: Reward[];
  usuario: UsuarioApi;
  resgates: ResgateDetalhado[];
  pontosGanhos: number;
  pontosGastos: number;
  saldo: number;
}