import Partida from '../model/partida.js'

class RepositoryPartida {
    BuscarTodas() {
        return Partida.findAll({ order: [['id', 'DESC']] })
    }

    BuscarPorId(id) {
        return Partida.findByPk(id)
    }

    Criar(dados) {
        return Partida.create(dados)
    }

    Atualizar(partida, dados) {
        return partida.update(dados)
    }

    Deletar(partida) {
        return partida.destroy()
    }
}

export default new RepositoryPartida()