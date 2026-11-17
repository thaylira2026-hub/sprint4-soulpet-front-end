// Botão bem visível que abre o tradutor VLibras (o botão padrão dele é pequeno e fica na lateral)
type VLibrasWidget = {
  open?: () => void
  initBtn?: HTMLButtonElement
}

function pegarVLibras() {
  return (window as unknown as { VLibrasWidget?: VLibrasWidget }).VLibrasWidget
}

export default function BotaoLibras() {

  const vlibrasCarregou = typeof window !== 'undefined' && 'VLibras' in window
  if (!vlibrasCarregou) {
    return null
  }

  function abrirVLibras() {
    const vlibras = pegarVLibras()
    if (vlibras?.open) {
      vlibras.open()
    } else {
      vlibras?.initBtn?.click()
    }
  }

  return (
    <button
      type="button"
      onClick={abrirVLibras}
      className="inline-flex items-center gap-2 rounded-full bg-mare px-5 py-3 text-lg font-semibold text-white transition-colors hover:bg-tinta"
    >
      <span aria-hidden="true">🤟</span> Ver em Libras
    </button>
  )
}