import { useCallback, useEffect, useRef, useState } from 'react'

export type EstadoLeitura = 'parado' | 'falando' | 'pausado'

export function textoDaPagina(): string {
  const principal = document.getElementById('conteudo')
  if (!principal) {
    return ''
  }

  const seletor = 'h1, h2, h3, p, li, summary, label'
  const blocos = Array.from(principal.querySelectorAll<HTMLElement>(seletor))
  const partes: string[] = []

  for (const bloco of blocos) {
    if (bloco.closest('[data-nao-ler], [aria-hidden="true"]')) continue
    if (bloco.querySelector(seletor)) continue

    const copia = bloco.cloneNode(true) as HTMLElement
    copia.querySelectorAll('[aria-hidden="true"]').forEach((elemento) => elemento.remove())

    const texto = (copia.textContent ?? '')
      .replace(/\p{Extended_Pictographic}/gu, '')
      .replace(/\*/g, '')
      .replace(/Ecoa\+/g, 'Ecoa mais')
      .replace(/\s+/g, ' ')
      .trim()

    if (texto) {
      partes.push(/[.!?:]$/.test(texto) ? texto : `${texto}.`)
    }
  }

  return partes.join(' ')
}

export function useLeitura() {
  const suportado = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [estado, setEstado] = useState<EstadoLeitura>('parado')
  const leituraAtual = useRef(0)

  const parar = useCallback(() => {
    if (!suportado) return
    leituraAtual.current += 1
    window.speechSynthesis.cancel()
    setEstado('parado')
  }, [suportado])

  const ler = useCallback(
    (texto: string) => {
      if (!suportado || !texto) return
      const sintese = window.speechSynthesis
      sintese.cancel()

      leituraAtual.current += 1
      const idDestaLeitura = leituraAtual.current

      const vozes = sintese.getVoices()
      const voz =
        vozes.find((v) => v.lang === 'pt-BR') ?? vozes.find((v) => v.lang.startsWith('pt'))

      const frases = texto.match(/[^.!?]+[.!?]*/g) ?? [texto]

      frases.forEach((frase, indice) => {
        const fala = new SpeechSynthesisUtterance(frase.trim())
        fala.lang = 'pt-BR'
        fala.rate = 0.95
        if (voz) fala.voice = voz
        if (indice === frases.length - 1) {
          fala.onend = () => {
            if (leituraAtual.current === idDestaLeitura) setEstado('parado')
          }
        }
        sintese.speak(fala)
      })

      setEstado('falando')
    },
    [suportado],
  )

  const pausar = useCallback(() => {
    if (!suportado) return
    window.speechSynthesis.pause()
    setEstado('pausado')
  }, [suportado])

  const continuar = useCallback(() => {
    if (!suportado) return
    window.speechSynthesis.resume()
    setEstado('falando')
  }, [suportado])


  useEffect(() => {
    return () => {
      if (suportado) window.speechSynthesis.cancel()
    }
  }, [suportado])

  return { suportado, estado, ler, pausar, continuar, parar }
}