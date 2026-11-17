import { useEffect, useState } from 'react'
import { voltarAoTopo } from '../utils/atalhos'

// Botão redondo de voltar ao topo. Só aparece no computador:
// no celular, o "Topo" fica na barra de atalhos lá embaixo.
export default function VoltarAoTopo() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    function verificarRolagem() {
      setVisivel(window.scrollY > 400)
    }
    window.addEventListener('scroll', verificarRolagem)
    return () => window.removeEventListener('scroll', verificarRolagem)
  }, [])

  if (!visivel) {
    return null
  }

  return (
    <button
      type="button"
      onClick={voltarAoTopo}
      aria-label="Voltar ao topo da página"
      className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-mare text-2xl text-white shadow-lg ring-2 ring-white hover:bg-sinal hover:text-tinta lg:flex"
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}