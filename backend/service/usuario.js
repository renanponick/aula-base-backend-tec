import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import RepositoryUsuario from '../repository/usuario.js'

const segredo = 'M3uS3gr3d0'

class ServiceUsuario {

    // Core- Regra de Negocio
    async Buscar() {
        return RepositoryUsuario.Find()
    }

    async Detalhe(id) {
        if(!id) {
            throw new Error("Favor informar o ID")
        }

        const usuario = await RepositoryUsuario.FindById(id)
        
        if(!usuario) {
            throw new Error(`ID ${id} do usuario não encontrado`)
        }

        return usuario
    }
    // Função(parametros, parametros, parametros)
    async Criar(email, senha) {
        if (!email || !senha) {
            throw new Error("Favor informar todos os dados")
        }

        const senhaCripto = await bcrypt.hash(senha, 12)

        const usuario = await RepositoryUsuario.Create(email, senhaCripto)

        return usuario
    }

    async Alterar(id, email, senha) {
        if (!id) {
            throw new Error("Favor informar os dados");
        }

        const senhaCripto = !senha // ternario
            ? undefined // se sim
            : await bcrypt.hash(senha, 12) // se nao

        const usuarioAlterado = await RepositoryUsuario.Update(id, email, senhaCripto)
        
        return usuarioAlterado
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }
        
        const usuario = await RepositoryUsuario.Delete(id)

        return usuario
    }

    async Login(email, senha) {
        if(!email || !senha) {
            throw new Error("Email ou senha inválido")
        }

        const usuario = await RepositoryUsuario.FindByEmail(email)

        if(!usuario) {
            throw new Error("Email ou senha inválido")
        }

        if(
           !(await bcrypt.compare(String(senha), usuario.senha)) 
        ) {
            throw new Error("Email ou senha inválido")
        }

        return jwt.sign(
            { id: usuario.id, email },
            segredo,
            { expiresIn: 60 * 60 }
        )
    }

}

export default new ServiceUsuario()