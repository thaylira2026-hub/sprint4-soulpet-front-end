import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import TituloPagina from '../components/TituloPagina'

// Troquem por um e-mail real do grupo
const EMAIL_CONTATO = 'ecoa.inovalab@gmail.com'
const GITHUB_PROJETO = 'https://github.com/thaylira2026-hub/projeto-ecoa-global-solution'

type DadosContato = {
  nome: string
  email: string
  assunto: string
  mensagem: string
  aceite: boolean
}

type ErrosContato = Partial<Record<keyof DadosContato, string>>

type InfoContato = {
  icone: string
  titulo: string
  texto: string
  link?: string
}

const infos: InfoContato[] = [
  { icone: '✉️', titulo: 'E-mail', texto: EMAIL_CONTATO, link: `mailto:${EMAIL_CONTATO}` },
  { icone: '🏫', titulo: 'Instituição', texto: 'FIAP, Faculdade de Informática e Administração Paulista' },
  { icone: '📍', titulo: 'Localização', texto: 'São Paulo, SP, Brasil' },
  { icone: '💻', titulo: 'GitHub do projeto', texto: 'projeto-ecoa-global-solution', link: GITHUB_PROJETO },
]

const assuntos = [
  'Dúvida sobre um serviço ou agendamento',
  'Sugestão de acessibilidade',
  'Parceria com prefeitura ou unidade de atendimento',
  'Problema no site',
  'Outro assunto',
]

const motivos = [
  { icone: '📅', texto: 'Dúvidas sobre serviços e agendamentos' },
  { icone: '🤟', texto: 'Sugestões para melhorar a acessibilidade' },
  { icone: '🏛️', texto: 'Parcerias com prefeituras e unidades' },
  { icone: '🛠️', texto: 'Problemas encontrados no site' },
]

const dadosIniciais: DadosContato = { nome: '', email: '', assunto: '', mensagem: '', aceite: false }

function validar(dados: DadosContato): ErrosContato {
  const erros: ErrosContato = {}
  if (dados.nome.trim().length < 3) {
    erros.nome = 'Digite seu nome com pelo menos 3 letras.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    erros.email = 'Digite um e-mail válido, por exemplo: nome@email.com.'
  }
  if (!dados.assunto) {
    erros.assunto = 'Escolha um assunto.'
  }
  if (dados.mensagem.trim().length < 10) {
    erros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  }
  if (!dados.aceite) {
    erros.aceite = 'Marque a caixa para concordar com o uso dos seus dados.'
  }
  return erros
}

function MensagemErro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) {
    return null
  }
  return (
    <p id={id} className="mt-1 text-red-700">
      {texto}
    </p>
  )
}

export default function Contato() {
  const [dados, setDados] = useState<DadosContato>(dadosIniciais)
  const [erros, setErros] = useState<ErrosContato>({})
  const [enviado, setEnviado] = useState(false)

  function atualizarCampo(
    evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = evento.target
    const valor =
      evento.target instanceof HTMLInputElement && evento.target.type === 'checkbox'
        ? evento.target.checked
        : value
    setDados({ ...dados, [name]: valor })
    setEnviado(false)
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const errosEncontrados = validar(dados)
    setErros(errosEncontrados)
    if (Object.keys(errosEncontrados).length === 0) {
      setEnviado(true)
      setDados(dadosIniciais)
    }
  }

  const estiloCampo = (temErro: boolean) =>
    `mt-2 w-full rounded-2xl border-2 bg-white px-4 py-3 text-lg placeholder:text-tinta/40 ${
      temErro ? 'border-red-600' : 'border-tinta/15 focus:border-mare'
    }`

  return (
    <div>
      <TituloPagina
        etiqueta="Fale conosco"
        icone="💬"
        titulo="Contato"
        descricao="Tem uma dúvida, sugestão ou quer levar o Ecoa+ para a sua cidade? Fale com a equipe."
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <section aria-labelledby="titulo-conversar">
          <h2 id="titulo-conversar" className="text-3xl font-extrabold tracking-tight">
            Vamos conversar? 🤟
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-tinta/80">
            O Ecoa+ é um projeto acadêmico da FIAP, criado pela equipe Inova Lab. Se você tem
            dúvidas sobre o projeto, sugestões de acessibilidade ou quer saber como ele pode
            funcionar na sua cidade, escreva para a gente.
          </p>

          <ul className="mt-8 space-y-6">
            {infos.map((info) => (
              <li key={info.titulo} className="flex gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mare-clara text-2xl"
                  aria-hidden="true"
                >
                  {info.icone}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{info.titulo}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="break-all text-mare underline underline-offset-4 hover:text-tinta"
                    >
                      {info.texto}
                    </a>
                  ) : (
                    <p className="text-tinta/80">{info.texto}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-3xl bg-mare-clara/50 p-6 md:p-8">
            <h3 className="text-xl font-semibold">Sobre o que posso entrar em contato?</h3>
            <ul className="mt-4 space-y-3">
              {motivos.map((motivo) => (
                <li key={motivo.texto} className="flex items-center gap-3 text-lg text-tinta/80">
                  <span aria-hidden="true">{motivo.icone}</span>
                  {motivo.texto}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="titulo-formulario"
          className="rounded-3xl border border-tinta/10 bg-white p-6 md:p-10"
        >
          <h2 id="titulo-formulario" className="text-2xl font-extrabold tracking-tight">
            Enviar mensagem ✉️
          </h2>
          <p className="mt-2 text-tinta/70">Os campos com * são obrigatórios.</p>

          {enviado && (
            <p
              role="status"
              className="mt-6 rounded-2xl bg-mare-clara p-4 text-lg font-semibold text-mare"
            >
              Mensagem enviada! Vamos responder no seu e-mail.
            </p>
          )}

          <form onSubmit={enviar} noValidate className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="font-semibold">
                  Nome *
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={dados.nome}
                  onChange={atualizarCampo}
                  aria-required="true"
                  aria-invalid={Boolean(erros.nome)}
                  aria-describedby={erros.nome ? 'erro-nome' : undefined}
                  className={estiloCampo(Boolean(erros.nome))}
                />
                <MensagemErro id="erro-nome" texto={erros.nome} />
              </div>

              <div>
                <label htmlFor="email" className="font-semibold">
                  E-mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={dados.email}
                  onChange={atualizarCampo}
                  aria-required="true"
                  aria-invalid={Boolean(erros.email)}
                  aria-describedby={erros.email ? 'erro-email' : undefined}
                  className={estiloCampo(Boolean(erros.email))}
                />
                <MensagemErro id="erro-email" texto={erros.email} />
              </div>
            </div>

            <div>
              <label htmlFor="assunto" className="font-semibold">
                Assunto *
              </label>
              <select
                id="assunto"
                name="assunto"
                value={dados.assunto}
                onChange={atualizarCampo}
                aria-required="true"
                aria-invalid={Boolean(erros.assunto)}
                aria-describedby={erros.assunto ? 'erro-assunto' : undefined}
                className={estiloCampo(Boolean(erros.assunto))}
              >
                <option value="">Selecione um assunto</option>
                {assuntos.map((assunto) => (
                  <option key={assunto} value={assunto}>
                    {assunto}
                  </option>
                ))}
              </select>
              <MensagemErro id="erro-assunto" texto={erros.assunto} />
            </div>

            <div>
              <label htmlFor="mensagem" className="font-semibold">
                Mensagem *
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={5}
                placeholder="Escreva aqui a sua mensagem"
                value={dados.mensagem}
                onChange={atualizarCampo}
                aria-required="true"
                aria-invalid={Boolean(erros.mensagem)}
                aria-describedby={erros.mensagem ? 'erro-mensagem' : undefined}
                className={estiloCampo(Boolean(erros.mensagem))}
              />
              <MensagemErro id="erro-mensagem" texto={erros.mensagem} />
            </div>

            <div>
              <label htmlFor="aceite" className="flex items-start gap-3 text-tinta/80">
                <input
                  id="aceite"
                  name="aceite"
                  type="checkbox"
                  checked={dados.aceite}
                  onChange={atualizarCampo}
                  aria-invalid={Boolean(erros.aceite)}
                  aria-describedby={erros.aceite ? 'erro-aceite' : undefined}
                  className="mt-1 h-5 w-5 shrink-0 accent-mare"
                />
                Concordo que meus dados serão usados somente para responder à minha mensagem,
                conforme a LGPD.
              </label>
              <MensagemErro id="erro-aceite" texto={erros.aceite} />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-mare px-6 py-4 text-lg font-semibold text-white hover:bg-tinta"
            >
              Enviar mensagem
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}