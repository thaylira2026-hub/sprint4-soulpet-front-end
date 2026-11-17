export type PerguntaFaq = {
  pergunta: string
  resposta: string
}

export type CategoriaFaq = {
  id: string
  etiqueta: string
  icone: string
  titulo: string
  perguntas: PerguntaFaq[]
}