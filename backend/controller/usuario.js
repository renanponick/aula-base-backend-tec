import ServiceUsuario from '../service/usuario.js'

class ControllerUsuario {
    // Recebimento e a Saida das info
    async Buscar(req, res) {
        try {
            const usuarios = await ServiceUsuario.Buscar()
            const filter = usuarios.find(it => it.dataValues.id === req.session.id)
            res.status(200).send({ mensagem: filter })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.session.id

            const usuario = await ServiceUsuario.Detalhe(id)

            res.status(200).send({ mensagem: usuario })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { email, senha } = req.body

            await ServiceUsuario.Criar(email, senha)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Alterar(req, res) {
        try {
            const { email, senha } = req.body
            const id = req.session.id // Session, Context

            await ServiceUsuario.Alterar(id, email, senha)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Deletar(req, res) {
        try {
            const identificador = req.session.id

            await ServiceUsuario.Deletar(identificador)

            res.status(204).send({ mensagem: "Deletado" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Login(req, res) {
        try {
            const { email, senha } = req.body
            const token = await ServiceUsuario.Login(email, senha)
            res.status(200).send({
                token
            })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

}

export default new ControllerUsuario()