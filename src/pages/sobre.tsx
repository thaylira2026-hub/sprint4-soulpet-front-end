import FeatureCard from '../components/feature-card'
import RoadmapItem from '../components/roadmap-item'

const Sobre = () => {
  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">📖 Sobre o Projeto</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-dark">
          Sobre a <span className="text-primary">SoulPet</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Conheça o contexto, a solução proposta, as tecnologias utilizadas e o roadmap do projeto.
        </p>
      </header>

      {/* Sobre / Contexto */}
      <section className="px-6 py-16" aria-labelledby="context-title">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-3xl border border-border-soft bg-white p-8 shadow-sm">
            <span className="text-4xl">🐾</span>
            <h3 className="mt-3 font-display text-xl font-bold text-text-dark">SoulPet</h3>
            <p className="mt-2 text-text-body">
              Uma comunidade feita por e para apaixonados por pets. Aqui, a gente apoia a adoção, conecta tutores e recompensa quem cuida dos pets com todo o carinho que eles merecem.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="font-display text-xl font-bold text-primary">1.200+</div>
                <div className="text-xs text-text-muted">Missões criadas</div>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-primary">50+</div>
                <div className="text-xs text-text-muted">Recompensas</div>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-primary">3</div>
                <div className="text-xs text-text-muted">Níveis de missão</div>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-primary">100%</div>
                <div className="text-xs text-text-muted">Gratuito</div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-secondary">🌍 O Problema</span>
            <h2 id="context-title" className="mt-2 font-display text-2xl font-bold text-text-dark">
              Por que a <span className="text-primary">SoulPet</span> existe?
            </h2>

            <p className="mt-4 text-text-body">
              Milhões de animais vivem em situação de abandono ou carecem de cuidados básicos no Brasil. Ao mesmo tempo, tutores comprometidos muitas vezes não têm acesso fácil a produtos de qualidade para seus pets por questões financeiras.
            </p>

            <p className="mt-3 text-text-body">
              A <strong>SoulPet</strong> nasce como uma comunidade dentro da rede social <strong>SoulUp</strong> — focada no meio ecológico — para criar uma ponte entre o engajamento digital e o cuidado real com animais.
            </p>

            <p className="mt-3 text-text-body">
              Ao completar missões dentro da plataforma, os usuários acumulam pontos que podem ser trocados por produtos físicos para seus pets, sem precisar gastar dinheiro real. É o engajamento gerando impacto concreto!
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['React', 'Vite', 'TypeScript', 'TailwindCSS', 'React Router', 'React Hook Form', 'Responsive Design', 'Google Fonts'].map((tag) => (
                <span key={tag} className="rounded-full bg-lilac-light px-3 py-1 text-xs font-semibold text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solução */}
      <section className="bg-bg px-6 py-16" aria-labelledby="solution-title">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-sm font-semibold text-secondary">💡 A Solução</span>
          <h2 id="solution-title" className="mt-2 font-display text-3xl font-bold text-text-dark">
            Como a <span className="text-primary">SoulPet funciona</span>
          </h2>
          <p className="mt-2 text-text-body">Um sistema de gamificação voltado para o bem-estar animal.</p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon="🎯"
              title="Sistema de Missões"
              description="Três níveis de dificuldade — fácil (até 1 dia), médio (até 1 semana) e difícil (até 1 mês) — com pontuações proporcionais ao esforço exigido."
            />
            <FeatureCard
              icon="💎"
              title="Carteira de Pontos"
              description="Cada missão concluída adiciona pontos à carteira virtual do usuário. Os pontos não expiram e podem ser acumulados livremente."
            />
            <FeatureCard
              icon="🛍️"
              title="Loja Solidária"
              description="Os pontos são trocados por produtos reais como ração, coleiras, brinquedos e areia para gato — sem nenhum custo financeiro para o tutor."
            />
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-6 py-16" aria-labelledby="roadmap-title">
        <div className="mx-auto max-w-5xl">
          <h2 id="roadmap-title" className="text-center font-display text-3xl font-bold text-text-dark">
            Roadmap do <span className="text-primary">Projeto</span>
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <RoadmapItem icon="🎨" title="Design & Layout" status="Sprint 1 · ✅ Concluído" />
            <RoadmapItem icon="🔧" title="Responsividade" status="Sprint 2 · ✅ Concluído" />
            <RoadmapItem icon="⚡" title="Migração para React + Vite" status="Sprint 3 · 🔄 Em andamento" />
            <RoadmapItem icon="🚀" title="Integração com API e Deploy" status="Sprint 4 · ⏳ Futuro" />
          </div>
        </div>
      </section>

      {/* Tecnologias */}
      <section className="bg-bg px-6 py-16" aria-labelledby="tech-title">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-sm font-semibold text-secondary">⚙️ Tecnologias</span>
          <h2 id="tech-title" className="mt-2 font-display text-3xl font-bold text-text-dark">
            Stack <span className="text-primary">Utilizado</span>
          </h2>
          <p className="mt-2 text-text-body">Desenvolvido com as melhores práticas de Front-End Design Engineering.</p>

          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            <FeatureCard icon="⚛️" title="React" description="Componentização e SPA" />
            <FeatureCard icon="⚡" title="Vite" description="Build rápido e eficiente" />
            <FeatureCard icon="🔷" title="TypeScript" description="Tipagem estática e segurança" />
            <FeatureCard icon="🎨" title="Tailwind CSS" description="Estilização utilitária e responsiva" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Sobre