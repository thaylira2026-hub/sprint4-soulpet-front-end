import { useCallback, useEffect, useRef, useState } from 'react'

// Tipos mínimos da Web Speech API (reconhecimento de fala), que o TypeScript não traz prontos
type ResultadoFala = { isFinal: boolean; 0: { transcript: string } }
type EventoFala = { resultIndex: number; results: ArrayLike<ResultadoFala> }
type Reconhecedor = {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((evento: EventoFala) => void) | null
  onend: (() => void) | null
  onerror: ((evento: { error: string }) => void) | null
}
type ConstrutorReconhecedor = new () => Reconhecedor

// O Chrome e o Edge oferecem com o prefixo "webkit"
function obterReconhecedor(): ConstrutorReconhecedor | undefined {
  if (typeof window === 'undefined') return undefined
  const janela = window as unknown as {
    SpeechRecognition?: ConstrutorReconhecedor
    webkitSpeechRecognition?: ConstrutorReconhecedor
  }
  return janela.SpeechRecognition ?? janela.webkitSpeechRecognition
}

// Transforma a fala do microfone em texto, em português, enquanto a pessoa fala
export function useReconhecimentoFala() {
  const Construtor = obterReconhecedor()
  const suportado = Construtor !== undefined

  const [ouvindo, setOuvindo] = useState(false)
  const [textoFinal, setTextoFinal] = useState('')
  const [textoParcial, setTextoParcial] = useState('')
  const [erro, setErro] = useState('')

  const reconhecedor = useRef<Reconhecedor | null>(null)
  const querOuvir = useRef(false)

  const iniciar = useCallback(() => {
    if (!Construtor) return
    setErro('')
    const novo = new Construtor()
    novo.lang = 'pt-BR'
    novo.continuous = true
    novo.interimResults = true

    novo.onresult = (evento) => {
      let parcial = ''
      let final = ''
      for (let i = evento.resultIndex; i < evento.results.length; i++) {
        const resultado = evento.results[i]
        if (resultado.isFinal) final += resultado[0].transcript
        else parcial += resultado[0].transcript
      }
      if (final) setTextoFinal((anterior) => `${anterior} ${final}`.trim())
      setTextoParcial(parcial)
    }

    novo.onerror = (evento) => {
      if (evento.error === 'not-allowed' || evento.error === 'service-not-allowed') {
        querOuvir.current = false
        setErro('Permita o uso do microfone no navegador para a legenda funcionar.')
      }
    }

    // O navegador para sozinho depois de um tempo em silêncio: se ainda queremos ouvir, recomeça
    novo.onend = () => {
      if (querOuvir.current) {
        novo.start()
      } else {
        setOuvindo(false)
        setTextoParcial('')
      }
    }

    reconhecedor.current = novo
    querOuvir.current = true
    novo.start()
    setOuvindo(true)
  }, [Construtor])

  const parar = useCallback(() => {
    querOuvir.current = false
    reconhecedor.current?.stop()
    setOuvindo(false)
  }, [])

  const limpar = useCallback(() => {
    setTextoFinal('')
    setTextoParcial('')
  }, [])

  // Desliga o microfone ao sair da página
  useEffect(() => {
    return () => {
      querOuvir.current = false
      reconhecedor.current?.stop()
    }
  }, [])

  return { suportado, ouvindo, textoFinal, textoParcial, erro, iniciar, parar, limpar }
}