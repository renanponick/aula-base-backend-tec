import ServiceCarro from '../service/carro.js'

class ControllerCarro {
    // Recebimento e a Saida das info
    async Buscar(_, res) {
        try {
            const carros = await ServiceCarro.Buscar()
            res.status(200).send({ mensagem: carros })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id

            const carro = await ServiceCarro.Detalhe(id)

            res.status(200).send({ mensagem: carro })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { marca, ano } = req.body

            await ServiceCarro.Criar(marca, ano)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Alterar(req, res) {
        try {
            const { marca, ano } = req.body
            const id = req.params.id

            await ServiceCarro.Alterar(id, marca, ano)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Deletar(req, res) {
        try {
            const identificador = req.params.id

            await ServiceCarro.Deletar(identificador)

            res.status(204).send({ mensagem: "Deletado" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }
}

export default new ControllerCarro()