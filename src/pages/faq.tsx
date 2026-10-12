import { Link } from 'react-router-dom'
import FaqItem from '../components/faq-item'
import { faqCategories } from '../data/faq'

const Faq = () => {
  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">❓ Dúvidas</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-dark">
          Perguntas <span className="text-primary">Frequentes</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Encontre respostas para as principais dúvidas sobre a SoulPet, missões, pontos e recompensas.
        </p>
      </header>

      {/* FAQ */}
      <section className="px-6 py-16" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl space-y-12">
          {faqCategories.map((category, index) => (
            <div key={category.title}>
              <div className="mb-4">
                <span className="text-sm font-semibold text-secondary">{category.badge}</span>
                <h2 id={index === 0 ? 'faq-title' : undefined} className="mt-1 font-display text-2xl font-bold text-text-dark">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-3">
                {category.questions.map((item) => (
                  <FaqItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          ))}

          {/* CTA final */}
          <div className="rounded-3xl bg-lilac-light p-8 text-center">
            <div className="text-4xl">💬</div>
            <h3 className="mt-2 font-display text-xl font-bold text-text-dark">Ainda tem dúvidas?</h3>
            <p className="mt-1 text-sm text-text-body">
              Nossa equipe está pronta para te ajudar! Envie sua mensagem pelo formulário de contato.
            </p>
            <Link to="/contato" className="mt-4 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-secondary">
              Falar com a equipe →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Faq