import type { ReactNode } from 'react'

type AvisoErroProps = {
  mensagem: string
  onTentarDeNovo?: () => void
  children?: ReactNode
}

export default function AvisoErro({ mensagem, onTentarDeNovo, children }: AvisoErroProps) {
  return (
    <div role="alert" className="rounded-3xl border-2 border-red-600/30 bg-white px-6 py-10 text-center">
      <span className="text-4xl" aria-hidden="true">
        ⚠️
      </span>
      <p className="mx-auto mt-3 max-w-xl text-lg font-semibold">{mensagem}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onTentarDeNovo && (
          <button
            type="button"
            onClick={onTentarDeNovo}
            className="rounded-full bg-mare px-6 py-3 text-lg font-semibold text-white hover:bg-tinta"
          >
            Tentar de novo
          </button>
        )}
        {children}
      </div>
    </div>
  )
}