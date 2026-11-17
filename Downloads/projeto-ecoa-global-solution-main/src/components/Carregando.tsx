type CarregandoProps = {
  texto?: string
}

export default function Carregando({ texto = 'Carregando...' }: CarregandoProps) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-lg text-tinta/80">
      <span
        className="h-6 w-6 animate-spin rounded-full border-4 border-mare-clara border-t-mare motion-reduce:animate-none"
        aria-hidden="true"
      />
      {texto}
    </div>
  )
}