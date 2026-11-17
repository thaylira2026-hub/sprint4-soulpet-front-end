import { textoDaPagina, useLeitura } from '../hooks/useLeitura'

const estiloBotao =
  'inline-flex items-center gap-2 rounded-full px-5 py-3 text-lg font-semibold transition-colors'

export default function BotaoOuvir() {
  const { suportado, estado, ler, pausar, continuar, parar } = useLeitura()

  // Se o navegador não tem voz, o botão não aparece
  if (!suportado) {
    return null
  }

  return (
    <div data-nao-ler className="flex flex-wrap gap-3">
      {estado === 'parado' && (
        <button
          type="button"
          onClick={() => ler(textoDaPagina())}
          className={`${estiloBotao} bg-tinta text-white hover:bg-mare`}
        >
          <span aria-hidden="true">🔊</span> Ouvir esta página
        </button>
      )}

      {estado === 'falando' && (
        <button
          type="button"
          onClick={pausar}
          className={`${estiloBotao} bg-tinta text-white hover:bg-mare`}
        >
          <span aria-hidden="true">⏸️</span> Pausar
        </button>
      )}

      {estado === 'pausado' && (
        <button
          type="button"
          onClick={continuar}
          className={`${estiloBotao} bg-tinta text-white hover:bg-mare`}
        >
          <span aria-hidden="true">▶️</span> Continuar
        </button>
      )}

      {estado !== 'parado' && (
        <button
          type="button"
          onClick={parar}
          className={`${estiloBotao} border-2 border-tinta text-tinta hover:bg-tinta hover:text-white`}
        >
          <span aria-hidden="true">⏹️</span> Parar
        </button>
      )}

      <span role="status" className="sr-only">
        {estado === 'falando' ? 'Lendo a página em voz alta' : ''}
      </span>
    </div>
  )
}