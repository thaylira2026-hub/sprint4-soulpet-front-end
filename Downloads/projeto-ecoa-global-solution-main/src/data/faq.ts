import type { CategoriaFaq } from '../types/PerguntaFaq'

export const categoriasFaq: CategoriaFaq[] = [
  {
    id: 'sobre',
    etiqueta: 'Conhecendo o Ecoa+',
    icone: '🤟',
    titulo: 'Sobre o Ecoa+',
    perguntas: [
      {
        pergunta: 'O que é o Ecoa+?',
        resposta:
          'É uma plataforma que torna o atendimento em serviços públicos acessível para pessoas surdas e com deficiência auditiva. Você entende o serviço em Libras ou em português simples, agenda sem telefonar e é avisado quando chega a sua vez.',
      },
      {
        pergunta: 'Preciso pagar para usar?',
        resposta: 'Não. Para o cidadão, o Ecoa+ é gratuito.',
      },
      {
        pergunta: 'Quem pode usar o Ecoa+?',
        resposta:
          'Qualquer pessoa, mas ele foi pensado para pessoas surdas que usam Libras, pessoas com deficiência auditiva que se comunicam em português e pessoas que perderam a audição com a idade.',
      },
      {
        pergunta: 'Preciso instalar algum aplicativo?',
        resposta:
          'Não. O Ecoa+ funciona direto no navegador do celular, do tablet ou do computador.',
      },
    ],
  },
  {
    id: 'agendamento',
    etiqueta: 'Serviços e agendamento',
    icone: '📅',
    titulo: 'Sobre o agendamento',
    perguntas: [
      {
        pergunta: 'Preciso de telefone para agendar?',
        resposta:
          'Não. Todo o agendamento é feito pelo site. Quem não tem celular pode ser atendido no balcão da unidade, onde o atendente faz o agendamento pela pessoa.',
      },
      {
        pergunta: 'Como sei quais documentos levar?',
        resposta:
          'Na página de cada serviço há um checklist com a imagem de cada documento, como RG, CPF e comprovante de residência.',
      },
      {
        pergunta: 'O que acontece se o horário que escolhi já estiver ocupado?',
        resposta:
          'O site avisa na hora que aquele horário não está mais disponível e pede para você escolher outro.',
      },
    ],
  },
  {
    id: 'atendimento',
    etiqueta: 'No dia do atendimento',
    icone: '📳',
    titulo: 'Sobre o atendimento',
    perguntas: [
      {
        pergunta: 'Como fico sabendo que chegou a minha vez?',
        resposta:
          'Na página de acompanhamento, a tela pisca e o celular vibra quando o atendente chamar você. Ninguém precisa chamar seu nome em voz alta.',
      },
      {
        pergunta: 'Preciso deixar a página aberta enquanto espero?',
        resposta:
          'Sim. Deixe a página de acompanhamento aberta e a vibração do celular ligada para receber o aviso.',
      },
      {
        pergunta: 'Como funciona a legenda no balcão?',
        resposta:
          'O atendente fala normalmente e o texto aparece em letras grandes na tela virada para você, com tradução para Libras pelo VLibras.',
      },
    ],
  },
  {
    id: 'acessibilidade',
    etiqueta: 'Acessibilidade e privacidade',
    icone: '🔒',
    titulo: 'Sobre acessibilidade e dados',
    perguntas: [
      {
        pergunta: 'E se eu não souber Libras?',
        resposta:
          'Você pode escolher o modo Texto, com português em linguagem simples, legendas e avisos visuais.',
      },
      {
        pergunta: 'O que é o VLibras?',
        resposta:
          'É uma ferramenta gratuita do governo federal que traduz textos em português para Libras com um avatar animado.',
      },
      {
        pergunta: 'Não consigo ouvir a leitura da página no celular. O que faço?',
        resposta:
          'No iPhone, a leitura em voz alta não toca com o modo silencioso ligado. Desligue o silencioso pela chave na lateral ou pela Central de Controle, aumente o volume e toque de novo em "Ouvir esta página". Em outros celulares, confira se o volume de mídia está alto.',
      },
      {
        pergunta: 'O site funciona com leitor de tela e teclado?',
        resposta:
          'Sim. Todas as páginas podem ser navegadas pelo teclado e os campos e botões têm descrições para leitores de tela.',
      },
      {
        pergunta: 'Meus dados ficam seguros?',
        resposta:
          'Pedimos só o necessário para o atendimento e seguimos a Lei Geral de Proteção de Dados (LGPD).',
      },
    ],
  },
]