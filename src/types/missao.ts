// ---------- Formato do JSON da API Java (MissaoTO e UsuarioMissaoTO) ----------

export interface MissaoApi {
  codigo: number
  titulo: string
  descricao: string | null
  pontosRecompensa: number
  concluida: boolean
  codComunidade: number
}

export interface UsuarioMissaoApi {
  codigo: number
  concluida: boolean
  dataConclusao: string | null
  codUsuario: number
  codMissao: number
}

// Corpo do POST /usuarios-missoes: tudo menos o que o banco gera sozinho
export type NovaConclusaoMissao = Omit<UsuarioMissaoApi, 'codigo' | 'dataConclusao'>

// ---------- Formato usado pelas telas (convertido no service) ----------

export type MissionLevel = 'easy' | 'medium' | 'hard'

export interface Mission {
  id: string
  icon: string
  level: MissionLevel
  difficulty: string
  tag?: string
  title: string
  description: string
  points: number
  deadline: string
}

// Intersection type: a missão da tela + o status de conclusão do usuário
export type MissaoComStatus = Mission & {
  conclusao: UsuarioMissaoApi | null
}