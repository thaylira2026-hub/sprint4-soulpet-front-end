import BotaoLink from '../components/BotaoLink'
import TituloPagina from '../components/TituloPagina'

export default function NaoEncontrada() {
  return (
    <section className="text-center">
      <p className="text-6xl font-bold text-blue-700">404</p>
      <TituloPagina titulo="Página não encontrada" />
      <BotaoLink to="/">Voltar para o início</BotaoLink>
    </section>
  )
}