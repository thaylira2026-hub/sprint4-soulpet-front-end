import { Link } from 'react-router-dom'
import Logo from './Logo'

type LinkRodape = {
  label: string
  to: string
  externo?: boolean
}

const colunas: { titulo: string; links: LinkRodape[] }[] = [
  {
    titulo: 'Navegação',
    links: [
      { label: 'Início', to: '/' },
      { label: 'Solução', to: '/solucao' },
      { label: 'Serviços', to: '/servicos' },
      { label: 'Sobre o projeto', to: '/sobre' },
    ],
  },
  {
    titulo: 'Comunidade',
    links: [
      { label: 'Nossa equipe', to: '/integrantes' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contato', to: '/contato' },
    ],
  },
  {
    titulo: 'Projeto',
    links: [
      {
        label: 'GitHub',
        to: 'https://github.com/thaylira2026-hub/projeto-ecoa-global-solution',
        externo: true,
      },
      { label: 'Roadmap', to: '/solucao' },
    ],
  },
]

const estiloLink = 'text-nevoa/80 hover:text-sinal hover:underline'

export default function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="bg-tinta text-nevoa">
      <div className="mx-auto max-w-7xl px-4 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo negativo tamanho={44} />
            <p className="mt-3 max-w-xs leading-relaxed text-nevoa/80">
              Serviços públicos acessíveis para pessoas surdas e com deficiência auditiva. Entenda,
              agende e seja avisado quando chegar a sua vez.
            </p>
            <p className="mt-3 font-semibold text-sinal">Mais acesso, mais voz, mais cidadania.</p>
          </div>

          {colunas.map((coluna) => (
            <nav key={coluna.titulo} aria-label={coluna.titulo}>
              <h2 className="text-lg font-semibold text-white">{coluna.titulo}</h2>
              <ul className="mt-4 space-y-3">
                {coluna.links.map((link) => (
                  <li key={link.label}>
                    {link.externo ? (
                      <a href={link.to} target="_blank" rel="noreferrer" className={estiloLink}>
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className={estiloLink}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pb-24 pt-8 text-center text-sm text-nevoa/60 lg:pb-8">
          <p>© {anoAtual} Ecoa+ · Global Solution FIAP · Turma 1TDSR</p>
          <p className="mt-2">Feito com 💚 pela equipe Inova Lab</p>
        </div>
      </div>
    </footer>
  )
}