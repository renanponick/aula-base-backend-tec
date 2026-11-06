import ServiceGame from '../service/game.js'

class ControllerGame {
    Status(req, res) {
        res.send(ServiceGame.ObterStatus())
    }

    Ataque(req, res) {
        res.send(ServiceGame.Atacar())
    }

    Defesa(req, res) {
        res.send(ServiceGame.Defender())
    }

    Curar(req, res) {
        res.send(ServiceGame.Curar())
    }

    Resetar(req, res) {
        res.send(ServiceGame.Resetar())
    }
}

export default new ControllerGame()