import { useEffect, useState } from 'react'
import AvisoErro from '../components/AvisoErro'
import Carregando from '../components/Carregando'
import CardServico from '../components/CardServico'
import EstadoVazio from '../components/EstadoVazio'
import TituloPagina from '../components/TituloPagina'
import { nomesCategoria } from '../data/icones'
import { mensagemDeErro } from '../services/api'
import { listarServicos } from '../services/servicoService'
import type { CategoriaServico, Servico } from '../types/Servico'

type Filtro = 'TODOS' | CategoriaServico

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: 'TODOS', rotulo: 'Todos' },
  { valor: 'SAUDE', rotulo: nomesCategoria.SAUDE },
  { valor: 'DOCUMENTOS', rotulo: nomesCategoria.DOCUMENTOS },
  { valor: 'BENEFICIOS', rotulo: nomesCategoria.BENEFICIOS },
]

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('TODOS')
  const [tentativa, setTentativa] = useState(0)

  // Busca os serviços na API (GET /servicos) ao abrir a página e ao tentar de novo
  useEffect(() => {
    let ativo = true
    listarServicos()
      .then((lista) => {
        if (ativo) setServicos(lista)
      })
      .catch((problema: unknown) => {
        if (ativo) setErro(mensagemDeErro(problema))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })
    return () => {
      ativo = false
    }
  }, [tentativa])

  function tentarDeNovo() {
    setErro('')
    setCarregando(true)
    setTentativa(tentativa + 1)
  }

  const servicosFiltrados =
    filtro === 'TODOS' ? servicos : servicos.filter((servico) => servico.categoria === filtro)

  return (
    <div>
      <TituloPagina
        etiqueta="Serviços públicos"
        icone="🏛️"
        titulo="Escolha um serviço"
        descricao="Veja o passo a passo, os documentos que você precisa levar e agende seu atendimento sem precisar ligar."
      />

      <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-3">
        {filtros.map((item) => (
          <button
            key={item.valor}
            type="button"
            onClick={() => setFiltro(item.valor)}
            aria-pressed={filtro === item.valor}
            className={`rounded-full border-2 px-5 py-2 text-lg font-semibold ${
              filtro === item.valor
                ? 'border-mare bg-mare text-white'
                : 'border-mare/30 bg-white text-mare hover:border-mare'
            }`}
          >
            {item.rotulo}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {carregando && <Carregando texto="Carregando os serviços..." />}

        {!carregando && erro && <AvisoErro mensagem={erro} onTentarDeNovo={tentarDeNovo} />}

        {!carregando && !erro && servicosFiltrados.length === 0 && (
          <EstadoVazio
            titulo="Nenhum serviço encontrado"
            texto="Ainda não há serviços nesta categoria. Escolha outra categoria ou veja todos."
          >
            <button
              type="button"
              onClick={() => setFiltro('TODOS')}
              className="rounded-full bg-mare px-6 py-3 text-lg font-semibold text-white hover:bg-tinta"
            >
              Ver todos os serviços
            </button>
          </EstadoVazio>
        )}

        {!carregando && !erro && servicosFiltrados.length > 0 && (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicosFiltrados.map((servico) => (
              <li key={servico.id}>
                <CardServico servico={servico} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}