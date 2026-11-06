import ServicePartida from '../service/partida.js'

function enviarErro(res, error) {
    res.status(error.statusCode || 500).send({ message: error.message })
}

class ControllerPartida {
    async BuscarTodas(req, res) {
        try {
            res.status(200).send({ partidas: await ServicePartida.BuscarTodas() })
        } catch (error) {
            this.EnviarErro(res, error)
        }
    }

    async BuscarPorId(req, res) {
        try {
            const partida = await ServicePartida.BuscarPorId(req.params.id)
            res.status(200).send({ partida })
        } catch (error) {
            enviarErro(res, error)
        }
    }

    async Criar(req, res) {
        try {
            const partida = await ServicePartida.Criar(req.body)
            res.status(201).send({ partida })
        } catch (error) {
            enviarErro(res, error)
        }
    }

    async Atualizar(req, res) {
        try {
            const partida = await ServicePartida.Atualizar(req.params.id, req.body)
            res.status(200).send({ partida })
        } catch (error) {
            enviarErro(res, error)
        }
    }

    async Deletar(req, res) {
        try {
            await ServicePartida.Deletar(req.params.id)
            res.status(204).end()
        } catch (error) {
            enviarErro(res, error)
        }
    }
}

export default new ControllerPartida()