
import { useEffect, useState } from 'react'
import './App.css'

import stickhero from './assets/stickhero.webp'
import monstro from './assets/monstro.webp'

import {
  atacar,
  curar,
  defender,
  resetar,
  status,
  listarPartidas,
  criarPartida,
  atualizarPartida,
  excluirPartida
} from './api/onehero'

const VIDA_MAXIMA_CAMPEAO = 300
const VIDA_MAXIMA_MONSTRO = 200

function BarraVida({ nome, vidaAtual, vidaMaxima }) {
  const porcentagem = Math.max(
    0,
    Math.min(100, (vidaAtual / vidaMaxima) * 100)
  )

  return (
    <div className="health-bar">
      <div
        className="health-fill"
        style={{ width: `${porcentagem}%` }}
      />

      <div className="health-text">
        {nome}: {vidaAtual} / {vidaMaxima}
      </div>
    </div>
  )
}

function App() {
  const [campeaoVida, setCampeaoVida] = useState(300)
  const [monstroVida, setMonstroVida] = useState(200)

  const [mensagem, setMensagem] = useState('')
  const [jogoFinalizado, setJogoFinalizado] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const [partidas, setPartidas] = useState([])
  const [editandoId, setEditandoId] = useState(null)

  const [formEdicao, setFormEdicao] = useState({
    descricao: '',
    vencedor: ''
  })

  useEffect(() => {
    async function iniciar() {
      try {
        const [dadosStatus, dadosPartidas] = await Promise.all([
          status(),
          listarPartidas()
        ])

        atualizarCombate(dadosStatus)
        setPartidas(
          Array.isArray(dadosPartidas)
            ? dadosPartidas
            : dadosPartidas.partidas ?? []
        )
      } catch (error) {
        setErro(error.message)
      } finally {
        setCarregando(false)
      }
    }

    iniciar()
  }, [])

  function atualizarCombate(data) {
    const vidaCampeao = Number(data.campeaoVida)
    const vidaMonstro = Number(data.monstroVida)

    setCampeaoVida(vidaCampeao)
    setMonstroVida(vidaMonstro)

    const terminou = (
      vidaCampeao <= 0 ||
      vidaMonstro <= 0 ||
      data.finalizada === true
    )

    setJogoFinalizado(terminou)

    if (terminou) {
      if (vidaMonstro <= 0) {
        setMensagem('Campeão venceu!')
      } else if (vidaCampeao <= 0) {
        setMensagem('Monstro venceu!')
      } else {
        setMensagem(data.mensagem ?? 'Partida finalizada!')
      }
    } else {
      setMensagem(data.monstroJogou ?? data.mensagem ?? '')
    }

    return terminou
  }

  async function carregarPartidas() {
    const dados = await listarPartidas()

    setPartidas(
      Array.isArray(dados)
        ? dados
        : dados.partidas ?? []
    )
  }

  async function executarJogada(acao) {
    if (carregando || jogoFinalizado) return

    setCarregando(true)
    setErro('')

    try {
      const data = await acao()
      const terminou = atualizarCombate(data)

      if (terminou) {
        const vencedor = Number(data.monstroVida) <= 0 ? 'Campeão' : 'Monstro'

        await criarPartida({
          descricao: 'Combate por turnos',
          data: new Date().toISOString(),
          vencedor
        })

        await carregarPartidas()
      }
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  async function handleResetar() {
    if (carregando) return

    setCarregando(true)
    setErro('')

    try {
      await resetar()

      const dados = await status()
      atualizarCombate(dados)

      setMensagem('')
      await carregarPartidas()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  function iniciarEdicao(partida) {
    setEditandoId(partida.id ?? partida.Id)

    setFormEdicao({
      descricao: partida.descricao ?? partida.Descricao ?? '',
      vencedor: partida.vencedor ?? partida.Vencedor ?? ''
    })
  }

  async function salvarEdicao(partida) {
    const id = partida.id ?? partida.Id

    setCarregando(true)
    setErro('')

    try {
      await atualizarPartida(id, {
        id,
        descricao: formEdicao.descricao,
        data: partida.data ?? partida.Data,
        vencedor: formEdicao.vencedor
      })

      setEditandoId(null)
      await carregarPartidas()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  async function deletarPartida(id) {
    const confirmado = window.confirm(
      'Deseja realmente excluir esta partida?'
    )

    if (!confirmado) return

    setCarregando(true)
    setErro('')

    try {
      await excluirPartida(id)
      await carregarPartidas()
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  function formatarData(valor) {
    if (!valor) return '-'

    const data = new Date(valor)

    return Number.isNaN(data.getTime())
      ? valor
      : data.toLocaleDateString('pt-BR')
  }

  return (
    <main className="app">
      <h1>StickHero</h1>
      <p className="subtitle">Jogo de combate por turnos</p>

      <section className="game-container">
        <div className="champion">
          <h2>Campeão</h2>

          <img src={stickhero} alt="Stick Hero" />

          <BarraVida
            nome="HP"
            vidaAtual={campeaoVida}
            vidaMaxima={VIDA_MAXIMA_CAMPEAO}
          />
        </div>

        <div className="monster">
          <h2>Inimigo</h2>

          <img src={monstro} alt="Monstro" />

          <BarraVida
            nome="HP"
            vidaAtual={monstroVida}
            vidaMaxima={VIDA_MAXIMA_MONSTRO}
          />
        </div>
      </section>

      <section className="combat-panel">
        <div className="message" role="status">
          {mensagem && <p>{mensagem}</p>}
        </div>

        {erro && (
          <p className="error-message" role="alert">
            {erro}
          </p>
        )}

        {jogoFinalizado ? (
          <div className="game-over">
            <h2>Jogo Finalizado</h2>

            <button
              onClick={handleResetar}
              disabled={carregando}
            >
              Nova Partida
            </button>
          </div>
        ) : (
          <div className="actions">
            <button
              onClick={() => executarJogada(atacar)}
              disabled={carregando}
            >
              Atacar
            </button>

            <button
              onClick={() => executarJogada(defender)}
              disabled={carregando}
            >
              Defender
            </button>

            <button
              onClick={() => executarJogada(curar)}
              disabled={carregando}
            >
              Curar
            </button>
          </div>
        )}
      </section>

      <section className="history">
        <h2>Histórico de Partidas</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Vencedor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {partidas.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    Nenhuma partida cadastrada.
                  </td>
                </tr>
              ) : (
                partidas.map(partida => {
                  const id = partida.id ?? partida.Id
                  const editando = editandoId === id

                  return (
                    <tr key={id}>
                      <td>{id}</td>

                      <td>
                        {editando ? (
                          <input
                            type="text"
                            value={formEdicao.descricao}
                            onChange={e =>
                              setFormEdicao({
                                ...formEdicao,
                                descricao: e.target.value
                              })
                            }
                          />
                        ) : (
                          partida.descricao ?? partida.Descricao
                        )}
                      </td>

                      <td>
                        {formatarData(
                          partida.data ?? partida.Data
                        )}
                      </td>

                      <td>
                        {editando ? (
                          <select
                            value={formEdicao.vencedor}
                            onChange={e =>
                              setFormEdicao({
                                ...formEdicao,
                                vencedor: e.target.value
                              })
                            }
                          >
                            <option value="Campeão">Campeão</option>
                            <option value="Monstro">Monstro</option>
                          </select>
                        ) : (
                          partida.vencedor ?? partida.Vencedor
                        )}
                      </td>

                      <td>
                        <div className="table-actions">
                          {editando ? (
                            <>
                              <button
                                onClick={() => salvarEdicao(partida)}
                                disabled={carregando}
                              >
                                Salvar
                              </button>

                              <button
                                onClick={() => setEditandoId(null)}
                                disabled={carregando}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => iniciarEdicao(partida)}
                                disabled={carregando}
                              >
                                Editar
                              </button>

                              <button
                                className="delete-button"
                                onClick={() => deletarPartida(id)}
                                disabled={carregando}
                              >
                                Excluir
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
