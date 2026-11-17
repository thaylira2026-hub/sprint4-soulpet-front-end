import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { textoDaPagina, useLeitura } from '../hooks/useLeitura'
import { abrirVLibras, vlibrasDisponivel, voltarAoTopo } from '../utils/atalhos'

const TAMANHOS_LETRA = [100, 112.5, 125, 137.5]

// O localStorage pode falhar em alguns navegadores, por isso o try/catch
function lerPreferencia(chave: string) {
  try {
    return localStorage.getItem(chave)
  } catch {
    return null
  }
}

function salvarPreferencia(chave: string, valor: string) {
  try {
    localStorage.setItem(chave, valor)
  } catch {
    // Sem localStorage, a preferência só vale até fechar a página
  }
}

const estiloOpcao =
  'flex h-12 items-center rounded-2xl border-2 border-tinta/15 px-4 text-lg font-semibold hover:border-mare disabled:opacity-40'

// Botões da barra de atalhos do celular e do tablet: ícone em cima, nome embaixo
const estiloAtalho =
  'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-2 text-base font-semibold text-tinta hover:bg-nevoa'

export default function BarraAcessibilidade() {
  const [aberta, setAberta] = useState(false)
  const [nivelLetra, setNivelLetra] = useState(() => Number(lerPreferencia('ecoa-letra') ?? 0))
  const [altoContraste, setAltoContraste] = useState(
    () => lerPreferencia('ecoa-contraste') === 'sim',
  )
  const leitura = useLeitura()
  const { pathname } = useLocation()
  const { parar } = leitura

  useEffect(() => {
    document.documentElement.style.fontSize = `${TAMANHOS_LETRA[nivelLetra]}%`
    salvarPreferencia('ecoa-letra', String(nivelLetra))
  }, [nivelLetra])

  useEffect(() => {
    document.documentElement.classList.toggle('alto-contraste', altoContraste)
    salvarPreferencia('ecoa-contraste', altoContraste ? 'sim' : 'nao')
  }, [altoContraste])

  // Ao trocar de página, para a leitura e fecha o painel
  useEffect(() => {
    parar()
    setAberta(false)
  }, [pathname, parar])

  function restaurarPadrao() {
    setNivelLetra(0)
    setAltoContraste(false)
    parar()
  }

  return (
    <div className="z-30 lg:fixed lg:bottom-6 lg:left-6">
      {aberta && (
        <div
          id="painel-acessibilidade"
          className="fixed inset-x-3 bottom-24 z-30 max-h-[70vh] overflow-y-auto rounded-3xl border border-tinta/10 bg-white p-5 text-tinta shadow-xl lg:absolute lg:inset-x-auto lg:bottom-16 lg:left-0 lg:w-72"
        >
          <h2 className="text-xl font-extrabold">Acessibilidade</h2>

          <p className="mt-4 font-semibold">Tamanho da letra</p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNivelLetra(nivelLetra - 1)}
              disabled={nivelLetra === 0}
              aria-label="Diminuir a letra"
              className={`${estiloOpcao} justify-center`}
            >
              A−
            </button>
            <span className="flex-1 text-center text-lg" aria-live="polite">
              {TAMANHOS_LETRA[nivelLetra]}%
            </span>
            <button
              type="button"
              onClick={() => setNivelLetra(nivelLetra + 1)}
              disabled={nivelLetra === TAMANHOS_LETRA.length - 1}
              aria-label="Aumentar a letra"
              className={`${estiloOpcao} justify-center`}
            >
              A+
            </button>
          </div>

          <button
            type="button"
            onClick={() => setAltoContraste(!altoContraste)}
            aria-pressed={altoContraste}
            className={`${estiloOpcao} mt-4 w-full justify-between`}
          >
            Alto contraste
            <span aria-hidden="true">{altoContraste ? '✅' : '⬜'}</span>
          </button>

          {leitura.suportado && (
            <button
              type="button"
              onClick={() =>
                leitura.estado === 'parado' ? leitura.ler(textoDaPagina()) : leitura.parar()
              }
              className={`${estiloOpcao} mt-3 w-full justify-between`}
            >
              {leitura.estado === 'parado' ? 'Ouvir esta página' : 'Parar a leitura'}
              <span aria-hidden="true">{leitura.estado === 'parado' ? '🔊' : '⏹️'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={restaurarPadrao}
            className="mt-4 w-full text-center font-semibold text-mare underline underline-offset-4"
          >
            Restaurar padrão
          </button>
        </div>
      )}

      {/* Celular e tablet: barra fixa embaixo, com nomes nos botões, sem cobrir o texto */}
      <nav
        aria-label="Atalhos de acessibilidade"
        className="fixed inset-x-0 bottom-0 z-30 flex gap-1 border-t border-tinta/10 bg-white px-2 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden"
      >
        <button
          type="button"
          onClick={() => setAberta(!aberta)}
          aria-expanded={aberta}
          aria-controls="painel-acessibilidade"
          className={`${estiloAtalho} ${aberta ? 'bg-nevoa' : ''}`}
        >
          <span aria-hidden="true" className="text-2xl">{aberta ? '✕' : '♿'}</span>
          {aberta ? 'Fechar' : 'Acessibilidade'}
        </button>

        {vlibrasDisponivel() && (
          <button type="button" onClick={abrirVLibras} className={estiloAtalho}>
            <span aria-hidden="true" className="text-2xl">🤟</span>
            Libras
          </button>
        )}

        <button type="button" onClick={voltarAoTopo} className={estiloAtalho}>
          <span aria-hidden="true" className="text-2xl">⬆️</span>
          Topo
        </button>
      </nav>

      {/* Computador: botão redondo no canto */}
      <button
        type="button"
        onClick={() => setAberta(!aberta)}
        aria-expanded={aberta}
        aria-controls="painel-acessibilidade"
        aria-label={aberta ? 'Fechar opções de acessibilidade' : 'Abrir opções de acessibilidade'}
        className="hidden h-14 w-14 items-center justify-center rounded-full bg-tinta text-3xl text-white shadow-lg ring-2 ring-white hover:bg-mare lg:flex"
      >
        <span aria-hidden="true">{aberta ? '✕' : '♿'}</span>
      </button>
    </div>
  )
}