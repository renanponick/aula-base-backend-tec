import { campeaoInicial, monstroInicial } from '../model/game.js'

const campeao = { ...campeaoInicial }
const monstro = { ...monstroInicial }

class RepositoryGame {
    ObterEstado() {
        return { campeao, monstro }
    }

    Resetar() {
        Object.assign(campeao, campeaoInicial)
        Object.assign(monstro, monstroInicial)
    }
}

export default new RepositoryGame()