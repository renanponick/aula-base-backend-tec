import { Usuario } from '../model/index.js';

// INSERT INTO usuarios (email, senha) VALUES ("FIAT", 1998)
class RepositoryUsuario {
    
    async Find() {
        const usuarios = await Usuario.findAll({
            include: ['carros']
        })

        return usuarios
    }

    async FindById(id) {
        const usuarioDetalhes = await Usuario.findByPk(id)

        return usuarioDetalhes
    }

    async Create(email, senha) {
        const usuarioCreate = await Usuario.create({ email, senha })

        return usuarioCreate
    }

    async Update(id, email, senha) {
        const usuarioAlterar = await Usuario.findByPk(id)

        if(!usuarioAlterar) {
            throw new Error("Usuario não encontrado")
        }

        usuarioAlterar.email = email || usuarioAlterar.email
        usuarioAlterar.senha = senha || usuarioAlterar.senha

        await usuarioAlterar.save()
    }

    async Delete(id) {
        const usuarioDeletar = await Usuario.findByPk(id)

        if(!usuarioDeletar){
            throw new Error("Usuario não encontrado")
        }

        await usuarioDeletar.destroy()

        return usuarioDeletar
    }

    async FindByEmail(email) {
        return Usuario.findOne({ where: { email } })
    }
}

export default new RepositoryUsuario()