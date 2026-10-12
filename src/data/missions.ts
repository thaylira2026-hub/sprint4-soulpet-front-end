export type MissionLevel = 'easy' | 'medium' | 'hard'

export interface Mission {
  id: string
  icon: string
  level: MissionLevel
  difficulty: string
  tag: string
  title: string
  description: string
  points: number
  deadline: string
}

export const missions: Mission[] = [
  // 🟢 Fácil
  {
    id: '1',
    icon: '💙',
    level: 'easy',
    difficulty: '🟢 Fácil',
    tag: 'Comunidade',
    title: 'Curtir 5 posts da comunidade',
    description: 'Interaja com publicações da SoulPet e mostre seu apoio para a comunidade de tutores.',
    points: 50,
    deadline: 'Até 24h',
  },
  {
    id: '2',
    icon: '💬',
    level: 'easy',
    difficulty: '🟢 Fácil',
    tag: 'Engajamento',
    title: 'Comentar em 3 publicações',
    description: 'Deixe comentários construtivos e engaje com outros tutores da comunidade.',
    points: 30,
    deadline: 'Até 24h',
  },
  {
    id: '3',
    icon: '🔔',
    level: 'easy',
    difficulty: '🟢 Fácil',
    tag: 'Perfil',
    title: 'Completar seu perfil pet',
    description: 'Adicione nome, foto e informações do seu pet ao seu perfil na comunidade.',
    points: 40,
    deadline: 'Até 24h',
  },
  {
    id: '4',
    icon: '📲',
    level: 'easy',
    difficulty: '🟢 Fácil',
    tag: 'Social',
    title: 'Convidar um amigo tutor',
    description: 'Convide alguém que também tem pet para entrar na SoulPet e crescer a comunidade!',
    points: 60,
    deadline: 'Até 24h',
  },

  // 🟡 Médio
  {
    id: '5',
    icon: '🏠',
    level: 'medium',
    difficulty: '🟡 Médio',
    tag: 'Adoção',
    title: 'Compartilhar campanha de adoção',
    description: 'Divulgue uma campanha de adoção de pets e ajude animais a encontrarem um lar.',
    points: 100,
    deadline: 'Até 7 dias',
  },
  {
    id: '6',
    icon: '📸',
    level: 'medium',
    difficulty: '🟡 Médio',
    tag: 'Conteúdo',
    title: 'Publicar foto do seu pet',
    description: 'Compartilhe um momento especial com o seu pet e receba pontos pelo engajamento da comunidade.',
    points: 80,
    deadline: 'Até 7 dias',
  },
  {
    id: '7',
    icon: '🩺',
    level: 'medium',
    difficulty: '🟡 Médio',
    tag: 'Saúde',
    title: 'Registrar visita ao veterinário',
    description: 'Compartilhe na comunidade que levou seu pet ao vet e inspire outros tutores a cuidarem da saúde dos animais.',
    points: 90,
    deadline: 'Até 7 dias',
  },
  {
    id: '8',
    icon: '🎥',
    level: 'medium',
    difficulty: '🟡 Médio',
    tag: 'Conteúdo',
    title: 'Criar vídeo sobre cuidados com pets',
    description: 'Grave e publique um vídeo curto com dicas de cuidados, alimentação ou treinamento para pets.',
    points: 120,
    deadline: 'Até 7 dias',
  },

  // 🔴 Difícil
  {
    id: '9',
    icon: '🏡',
    level: 'hard',
    difficulty: '🔴 Difícil',
    tag: 'Adoção',
    title: 'Ajudar 3 pets a encontrar um lar',
    description: 'Participe ativamente de 3 processos de adoção como facilitador ou divulgador dentro da plataforma.',
    points: 300,
    deadline: 'Até 30 dias',
  },
  {
    id: '10',
    icon: '🎉',
    level: 'hard',
    difficulty: '🔴 Difícil',
    tag: 'Evento',
    title: 'Organizar evento pet na comunidade',
    description: 'Crie e promova um evento presencial ou online relacionado ao bem-estar animal e tutores de pets.',
    points: 500,
    deadline: 'Até 30 dias',
  },
  {
    id: '11',
    icon: '🤝',
    level: 'hard',
    difficulty: '🔴 Difícil',
    tag: 'ONG',
    title: 'Voluntariar em ONG parceira',
    description: 'Realize ao menos 4 horas de voluntariado em uma ONG de proteção animal cadastrada na plataforma.',
    points: 400,
    deadline: 'Até 30 dias',
  },
  {
    id: '12',
    icon: '📰',
    level: 'hard',
    difficulty: '🔴 Difícil',
    tag: 'Conteúdo',
    title: 'Escrever artigo sobre bem-estar animal',
    description: 'Produza um artigo completo (mínimo 500 palavras) sobre cuidados, adoção responsável ou direitos dos animais.',
    points: 350,
    deadline: 'Até 30 dias',
  },
]