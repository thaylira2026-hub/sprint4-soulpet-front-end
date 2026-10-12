import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-bg-dark px-6 py-12 text-lilac-light">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <div className="font-display text-lg font-bold text-white">🐾 soulpet</div>
          <p className="mt-2 text-sm text-lilac">
            Comunidade dentro da SoulUp para quem ama e cuida de pets. Complete missões, ganhe pontos e resgate recompensas!
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Navegação</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Início</Link></li>
            <li><Link to="/sobre" className="hover:text-white">Sobre o Projeto</Link></li>
            <li><Link to="/missoes" className="hover:text-white">Missões</Link></li>
            <li><Link to="/recompensas" className="hover:text-white">Recompensas</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Comunidade</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/integrantes" className="hover:text-white">Nossa Equipe</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/contato" className="hover:text-white">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Projeto</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href="https://github.com/thaylira2026-hub/sprint3-soulpet-front-end"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li><Link to="/sobre" className="hover:text-white">Tecnologias</Link></li>
            <li><Link to="/sobre" className="hover:text-white">Roadmap</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-lilac">
        <p>©️ 2026 SoulPet · Projeto Challenge FIAP</p>
        <p className="mt-1">Feito com 💜 pela equipe SoulPet</p>
      </div>
    </footer>
  )
}

export default Footer