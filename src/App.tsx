import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import ScrollToTopButton from './components/scroll-to-top-button'
import Home from './pages/home'
import Sobre from './pages/sobre'
import Faq from './pages/faq'
import Contato from './pages/contato'
import Missoes from './pages/missoes'
import Recompensas from './pages/recompensas'
import Integrantes from './pages/integrantes'
import MissaoDetalhe from './pages/missao-detalhe'
import RecompensaDetalhe from './pages/recompensa-detalhe'

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/missao/:id" element={<MissaoDetalhe />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/recompensa/:id" element={<RecompensaDetalhe />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>

      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default App