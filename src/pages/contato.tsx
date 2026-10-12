import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ContatoFormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
  aceite: boolean
}

const inputClass =
  'w-full rounded-xl border border-border-soft px-4 py-3 text-text-body outline-none focus:border-primary'
const labelClass = 'mb-1 block text-sm font-semibold text-text-dark'
const errorClass = 'mt-1 block text-xs font-semibold text-red-600'

const Contato = () => {
  const [enviado, setEnviado] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContatoFormData>()

  const onSubmit = (data: ContatoFormData) => {
    console.log('Formulário enviado:', data)
    setEnviado(true)
    reset()
  }

  return (
    <main>
      {/* Header da página */}
      <header className="bg-bg px-6 py-16 text-center">
        <span className="text-sm font-semibold text-secondary">✉️ Fale Conosco</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-dark">
          Entre em <span className="text-primary">Contato</span>
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-text-body">
          Tem dúvidas, sugestões ou quer propor uma parceria? Nossa equipe adoraria ouvir você!
        </p>
      </header>

      <section className="px-6 py-16" aria-labelledby="contact-title">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          {/* Informações de contato */}
          <aside>
            <h2 id="contact-title" className="font-display text-2xl font-bold text-text-dark">
              Vamos conversar! 🐾
            </h2>
            <p className="mt-3 text-text-body">
              A SoulPet é um projeto acadêmico desenvolvido com muito carinho na FIAP. Se você tiver dúvidas sobre o projeto, sugestões de melhoria ou quiser saber mais sobre como funciona nossa comunidade, fique à vontade para nos contatar!
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📧</div>
                <div>
                  <div className="font-semibold text-text-dark">E-mail</div>
                  <div className="text-sm text-text-body">soulpet@fiap.com.br</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">🏫</div>
                <div>
                  <div className="font-semibold text-text-dark">Instituição</div>
                  <div className="text-sm text-text-body">FIAP – Faculdade de Informática e Administração Paulista</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">📍</div>
                <div>
                  <div className="font-semibold text-text-dark">Localização</div>
                  <div className="text-sm text-text-body">São Paulo, SP – Brasil</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-2xl">💻</div>
                <div>
                  <div className="font-semibold text-text-dark">GitHub do Projeto</div>
                  <a
                    href="https://github.com/thaylira2026-hub/sprint3-soulpet-front-end"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    github.com/thaylira2026-hub/sprint3-soulpet-front-end ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-bg p-6">
              <p className="font-semibold text-text-dark">📌 Sobre o que posso entrar em contato?</p>
              <ul className="mt-2 space-y-1 text-sm text-text-body">
                <li>🐾 Dúvidas sobre missões e pontos</li>
                <li>🎁 Recompensas e resgates</li>
                <li>🤝 Parcerias com ONGs</li>
                <li>💡 Sugestões de novas funcionalidades</li>
                <li>🐛 Reporte de bugs ou erros</li>
              </ul>
            </div>
          </aside>

          {/* Formulário */}
          <div className="rounded-3xl border border-border-soft bg-white p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold text-text-dark">Enviar mensagem ✉️</h3>

            {enviado && (
              <div role="status" aria-live="polite" className="mt-6 rounded-2xl bg-lilac-light p-6 text-center">
                <div className="text-4xl">🎉</div>
                <div className="mt-2 font-display text-lg font-bold text-text-dark">Mensagem enviada!</div>
                <div className="mt-1 text-sm text-text-body">Obrigado pelo contato! Nossa equipe responderá em breve. 🐾</div>
              </div>
            )}

            {!enviado && (
              <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulário de contato" className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nome" className={labelClass}>Nome *</label>
                    <input
                      type="text"
                      id="nome"
                      placeholder="Seu nome completo"
                      autoComplete="name"
                      className={inputClass}
                      {...register('nome', { required: 'Informe seu nome' })}
                    />
                    {errors.nome && <span role="alert" className={errorClass}>{errors.nome.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="seu@email.com"
                      autoComplete="email"
                      className={inputClass}
                      {...register('email', {
                        required: 'Informe seu e-mail',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Informe um e-mail válido',
                        },
                      })}
                    />
                    {errors.email && <span role="alert" className={errorClass}>{errors.email.message}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="assunto" className={labelClass}>Assunto *</label>
                  <select
                    id="assunto"
                    defaultValue=""
                    className={inputClass}
                    {...register('assunto', { required: 'Selecione um assunto' })}
                  >
                    <option value="" disabled>Selecione um assunto</option>
                    <option value="missoes">🎯 Dúvidas sobre missões</option>
                    <option value="pontos">⭐ Pontos e carteira</option>
                    <option value="recompensas">🎁 Recompensas e resgates</option>
                    <option value="parceria">🤝 Parceria / ONG</option>
                    <option value="sugestao">💡 Sugestão de melhoria</option>
                    <option value="bug">🐛 Reportar bug</option>
                    <option value="outro">💬 Outro assunto</option>
                  </select>
                  {errors.assunto && <span role="alert" className={errorClass}>{errors.assunto.message}</span>}
                </div>

                <div>
                  <label htmlFor="mensagem" className={labelClass}>Mensagem *</label>
                  <textarea
                    id="mensagem"
                    placeholder="Escreva aqui a sua mensagem..."
                    rows={4}
                    className={inputClass}
                    {...register('mensagem', {
                      required: 'Escreva sua mensagem',
                      minLength: { value: 10, message: 'A mensagem precisa ter pelo menos 10 caracteres' },
                    })}
                  />
                  {errors.mensagem && <span role="alert" className={errorClass}>{errors.mensagem.message}</span>}
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="aceite"
                    className="mt-1"
                    {...register('aceite', { required: 'Você precisa aceitar os termos' })}
                  />
                  <label htmlFor="aceite" className="text-sm text-text-body">
                    Concordo que meus dados serão usados somente para responder à minha mensagem, conforme a LGPD.
                  </label>
                </div>
                {errors.aceite && <span role="alert" className={errorClass}>{errors.aceite.message}</span>}

                <button
                  type="submit"
                  aria-label="Enviar mensagem"
                  className="w-full rounded-full bg-primary py-3 font-semibold text-white hover:bg-secondary"
                >
                  Enviar mensagem →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contato