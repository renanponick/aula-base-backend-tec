import RepositoryPartida from '../repository/partida.js'

class ServicePartida {
    BuscarTodas() {
        return RepositoryPartida.BuscarTodas()
    }

    async BuscarPorId(id) {
        id = this.ValidarId(id)
        const partida = await RepositoryPartida.BuscarPorId(id)
        if (!partida) throw this.Erro('Partida não encontrada.', 404)
        return partida
    }

    Criar(dados) {
        this.ValidarDados(dados, true)
        return RepositoryPartida.Criar(dados)
    }

    async Atualizar(id, dados) {
        this.ValidarDados(dados, false)
        const partida = await this.BuscarPorId(id)
        return RepositoryPartida.Atualizar(partida, dados)
    }

    async Deletar(id) {
        const partida = await this.BuscarPorId(id)
        await RepositoryPartida.Deletar(partida)
    }

    ValidarDados(dados, exigirObrigatorios) {
        if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
            throw this.Erro('O corpo da requisição deve ser um objeto.')
        }

        const camposPermitidos = ['descricao', 'data', 'vencedor']
        const desconhecidos = Object.keys(dados).filter((campo) => !camposPermitidos.includes(campo))
        if (desconhecidos.length) throw this.Erro(`Campo inválido: ${desconhecidos.join(', ')}`)

        if (exigirObrigatorios && (!dados.descricao || !dados.data)) {
            throw this.Erro('Descrição e data são obrigatórias.')
        }
        if (!exigirObrigatorios && !Object.keys(dados).length) {
            throw this.Erro('Informe ao menos um campo para atualizar.')
        }
        if (dados.descricao !== undefined && (typeof dados.descricao !== 'string' || !dados.descricao.trim())) {
            throw this.Erro('Descrição não pode ser vazia.')
        }
        if (dados.data !== undefined && Number.isNaN(new Date(dados.data).getTime())) {
            throw this.Erro('Data inválida.')
        }
        if (dados.vencedor !== undefined && dados.vencedor !== null && typeof dados.vencedor !== 'string') {
            throw this.Erro('Vencedor deve ser um texto ou nulo.')
        }
    }

    ValidarId(id) {
        if (!/^\d+$/.test(String(id)) || Number(id) < 1) {
            throw this.Erro('ID inválido.')
        }
        return Number(id)
    }

    Erro(message, statusCode = 400) {
        const error = new Error(message)
        error.statusCode = statusCode
        return error
    }
}

export default new ServicePartida()