import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'

type LinkMenu = {
  to: string
  label: string
  destaque?: boolean
}

const links: LinkMenu[] = [
  { to: '/', label: 'Início' },
  { to: '/solucao', label: 'Solução' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato', destaque: true },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)

  function estiloLink(link: LinkMenu, ativo: boolean) {
    if (link.destaque) {
      return 'block rounded-full bg-mare px-6 py-2 text-lg font-semibold text-white hover:bg-tinta'
    }
    return `block rounded-full px-4 py-2 text-lg ${
      ativo ? 'font-semibold text-mare underline decoration-2 underline-offset-8' : 'text-tinta hover:text-mare'
    }`
  }

  return (
    <header className="relative border-b border-tinta/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NavLink to="/" aria-label="Ecoa+, página inicial" onClick={() => setAberto(false)}>
          <Logo tamanho={44} />
        </NavLink>

        <button
          type="button"
          className="rounded-full p-2 text-tinta lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-principal"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto(!aberto)}
        >
          <span className="text-3xl" aria-hidden="true">
            {aberto ? '✕' : '☰'}
          </span>
        </button>

        <nav
          id="menu-principal"
          aria-label="Menu principal"
          className={`${aberto ? 'block' : 'hidden'} absolute left-0 top-full z-10 w-full border-b border-tinta/10 bg-white px-4 pb-4 lg:static lg:block lg:w-auto lg:border-0 lg:p-0`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => estiloLink(link, isActive)}
                  onClick={() => setAberto(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}