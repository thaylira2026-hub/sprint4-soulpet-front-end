import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/missoes', label: 'Missões' },
    { to: '/recompensas', label: 'Recompensas' },
    { to: '/integrantes', label: 'Equipe' },
    { to: '/faq', label: 'FAQ' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border-soft bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-bold text-primary" onClick={closeMenu}>
          soulpet
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-6 text-sm font-semibold text-text-body md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-primary">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contato" className="rounded-full bg-primary px-4 py-2 text-white hover:bg-secondary">
              Contato
            </Link>
          </li>
        </ul>

        {/* Botão hambúrguer - só aparece no mobile */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-text-dark transition-transform ${
              isOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span className={`h-0.5 w-6 bg-text-dark transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-text-dark transition-transform ${
              isOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <ul className="flex flex-col gap-1 border-t border-border-soft bg-white px-6 py-4 text-sm font-semibold text-text-body md:hidden">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={closeMenu} className="block rounded-lg px-2 py-3 hover:bg-lilac-light hover:text-primary">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contato"
              onClick={closeMenu}
              className="mt-2 block rounded-full bg-primary px-4 py-3 text-center text-white hover:bg-secondary"
            >
              Contato
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Header