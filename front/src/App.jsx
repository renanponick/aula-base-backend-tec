import { useEffect, useState } from 'react'
import './App.css'

import stickhero from './assets/stickhero.webp'
import monstro from './assets/monstro.webp'
import { atacar, curar, defender, status } from './api/onehero'

function App() {
  const [campeaoVida, setCampeaoVida] = useState({
    vidaBase: 500,
    vidaAtual: 500
  })
  const [monstroVida, setMonstroVida] = useState({
    vidaBase: 1000,
    vidaAtual: 1000
  })
  const [mensagem, setMensagem] = useState('')
  const [jogoFinalizado, setJogoFinalizado] = useState(false)

  useEffect(() => {
    async function iniciar() {
      const statusData = await status()
      setCampeaoVida({
        vidaBase: statusData.campeaoVida,
        vidaAtual: statusData.campeaoVida
      })
      setMonstroVida({
        vidaBase: statusData.monstroVida,
        vidaAtual: statusData.monstroVida
      })
    }
  
    iniciar()
  }, [])

  function verificarVencedor() {
    if (monstroVida.vidaAtual <= 0) {
      setJogoFinalizado(true)
      setMensagem("Campeão venceu!")
    } else if (campeaoVida.vidaAtual <= 0) {
      setJogoFinalizado(true)
      setMensagem("Monstro venceu!")
    }
  }

  useEffect(() => {
    verificarVencedor()
  }, [campeaoVida, monstroVida])

  async function handleAtacar() {
    const data = await atacar()
    setCampeaoVida(prev => ({
      ...prev,
      vidaAtual: data.campeaoVida
    }))
    setMonstroVida(prev => ({
      ...prev,
      vidaAtual: data.monstroVida
    }))

    data.monstroJogou && setMensagem(data.monstroJogou)
  }

  async function handleDefender() {
    const data = await defender()
    setCampeaoVida(prev => ({
      ...prev,
      vidaAtual: data.campeaoVida
    }))
    setMonstroVida(prev => ({
      ...prev,
      vidaAtual: data.monstroVida
    }))

    data.monstroJogou && setMensagem(data.monstroJogou)
  }

  async function handleCurar() {
    const data = await curar()
    setCampeaoVida(prev => ({
      ...prev,
      vidaAtual: data.campeaoVida
    }))

    data.monstroJogou && setMensagem(data.monstroJogou)
  }

  return (
    <>
      <h1>Jogo de RPG - StickHero</h1>

      <div className="game-container">
        <div className="champion">
          <img src={stickhero} alt="Stick Hero" />
          <div className="health-bar">
            <div className="health">
              <div className="dead-health" style={{ width: `${100 - (campeaoVida.vidaAtual / campeaoVida.vidaBase * 100)}%` }}></div>
            </div>
            <div className="health-text">
              {campeaoVida.vidaAtual} / {campeaoVida.vidaBase}
            </div>
          </div>
        </div>

        <div className="monster">
          <img src={monstro} alt="Monstro" />
          <div className="health-bar">
            <div className="health">
              <div className="dead-health" style={{ width: `${100 - (monstroVida.vidaAtual / monstroVida.vidaBase * 100)}%` }}></div>
            </div>
            <div className="health-text">
              {monstroVida.vidaAtual} / {monstroVida.vidaBase}
            </div>
          </div>
        </div>
      </div>

      <div className="message">
        {mensagem && <p>{mensagem}</p>}
      </div>

      {
      jogoFinalizado
      ? (
        <div className="game-over">
          <h2>Jogo Finalizado</h2>
        </div>
      )
      : (
          <div className="actions">
            <button onClick={handleAtacar}>
              Atacar
            </button>
            <button onClick={handleDefender}>
              Defender
            </button>
            <button onClick={handleCurar}>
              Curar
            </button>
          </div>
      )}
    </>
  )
}

export default App
