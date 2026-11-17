// Ações usadas por mais de um botão do site (botão de Libras e barra de atalhos do celular)

// O script do VLibras (versão nova) cria este objeto na janela com a função open()
type VLibrasWidget = {
  open?: () => void
  initBtn?: HTMLButtonElement
}

// Se o VLibras não carregou (sem internet ou bloqueado), os botões de Libras não aparecem
export function vlibrasDisponivel() {
  return typeof window !== 'undefined' && 'VLibras' in window
}

export function abrirVLibras() {
  const vlibras = (window as unknown as { VLibrasWidget?: VLibrasWidget }).VLibrasWidget
  if (vlibras?.open) {
    vlibras.open()
  } else {
    // Plano B: clica no botão azul do próprio VLibras
    vlibras?.initBtn?.click()
  }
}

export function voltarAoTopo() {

  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduzirMovimento ? 'auto' : 'smooth' })
}