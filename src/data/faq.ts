export interface FaqQuestion {
  question: string
  answer: string
}

export interface FaqCategory {
  badge: string
  title: string
  questions: FaqQuestion[]
}

export const faqCategories: FaqCategory[] = [
  {
    badge: '🌐 Geral',
    title: 'Sobre a SoulPet',
    questions: [
      {
        question: 'O que é a SoulPet?',
        answer: 'A SoulPet é uma comunidade dentro da rede social SoulUp — focada no meio ecológico — voltada para amantes de animais. Nela, você pode se conectar com outros usuários apaixonados por animais, participar de campanhas de adoção e completar missões para ganhar pontos que se transformam em recompensas reais para o seu bichinho.',
      },
      {
        question: 'A SoulPet é gratuita?',
        answer: 'Sim! A SoulPet é 100% gratuita. Você não precisa colocar nenhum dinheiro real para participar, completar missões ou resgatar recompensas. Tudo funciona com os pontos que você acumula ao engajar com a comunidade.',
      },
      {
        question: 'Preciso ter um pet para participar?',
        answer: 'Não necessariamente! Qualquer pessoa que ame animais pode participar da SoulPet. Você pode apoiar campanhas de adoção, compartilhar conteúdos sobre bem-estar animal e ajudar outros tutores mesmo sem ter um pet em casa.',
      },
      {
        question: 'Como faço para entrar na SoulPet?',
        answer: 'Para acessar a SoulPet, você precisa primeiro criar uma conta na SoulUp (a rede social principal). Depois é só acessar a aba de comunidades, buscar por "SoulPet" e clicar em "Entrar na comunidade". Pronto — você já pode começar a completar missões!',
      },
    ],
  },
  {
    badge: '🎯 Missões',
    title: 'Sobre as Missões',
    questions: [
      {
        question: 'Quais são os níveis de dificuldade das missões?',
        answer: 'As missões são divididas em três níveis: 🟢 Fácil — prazo de até 1 dia, tarefas rápidas como curtir posts, comentar publicações ou compartilhar conteúdo. 🟡 Médio — prazo de até 1 semana, exigem mais engajamento, como divulgar campanhas de adoção ou publicar fotos do seu pet. 🔴 Difícil — prazo de até 1 mês, missões de alto impacto, como ajudar 3 pets a encontrar um lar ou organizar um evento pet na comunidade.',
      },
      {
        question: 'O que acontece se eu não completar a missão no prazo?',
        answer: 'Se a missão não for concluída dentro do prazo, ela expira e você não recebe os pontos. Mas não se preocupe — novas missões aparecem regularmente, então sempre haverá oportunidades para acumular mais pontos!',
      },
      {
        question: 'Posso completar várias missões ao mesmo tempo?',
        answer: 'Sim! Você pode ter várias missões ativas simultaneamente, de diferentes níveis. Isso te permite acumular pontos mais rapidamente combinando missões fáceis do dia com missões médias e difíceis em andamento.',
      },
      {
        question: 'Como a plataforma sabe que completei uma missão?',
        answer: 'A SoulPet verifica automaticamente as ações realizadas dentro da plataforma SoulUp — como curtidas, comentários e compartilhamentos. Para missões que envolvem ações externas (como organizar um evento), você precisará registrar a conclusão na plataforma com comprovações.',
      },
    ],
  },
  {
    badge: '🎁 Pontos & Recompensas',
    title: 'Sobre os Pontos',
    questions: [
      {
        question: 'Os pontos expiram?',
        answer: 'Não! Os pontos acumulados na sua carteira SoulPet não têm prazo de validade. Você pode acumulá-los no seu ritmo e resgatar as recompensas quando quiser, sem pressão.',
      },
      {
        question: 'Posso transferir meus pontos para outra pessoa?',
        answer: 'Atualmente os pontos são pessoais e intransferíveis. Porém, existe a opção de doação de pontos para ONGs parceiras cadastradas na plataforma, que utilizam esses pontos para resgatar produtos para animais em situação de abandono ou resgate.',
      },
      {
        question: 'Como funciona o resgate de recompensas?',
        answer: 'Quando você acumula pontos suficientes, basta acessar a Loja Solidária dentro da SoulPet, escolher o produto desejado e clicar em "Trocar". Os pontos são debitados da sua carteira e o produto é enviado para o endereço cadastrado no seu perfil. Simples assim!',
      },
      {
        question: 'Quais produtos estão disponíveis na Loja Solidária?',
        answer: 'A loja conta com uma variedade de produtos para pets, incluindo: ração premium para cães e gatos, petiscos, brinquedos, coleiras, areia para gato, caminhas, comedouros, bebedouros e muito mais. O catálogo é atualizado regularmente com novos produtos de parceiros!',
      },
      {
        question: 'Existe um limite de resgates por mês?',
        answer: 'Não há limite fixo de resgates mensais. O único limite é a quantidade de pontos disponível na sua carteira. Quanto mais missões você completar, mais poderá resgatar!',
      },
    ],
  },
]