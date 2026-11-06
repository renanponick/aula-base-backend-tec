import RepositoryGame from '../repository/game.js'

class ServiceGame {
    ObterStatus() {
        const { campeao, monstro } = RepositoryGame.ObterEstado()
        return { campeaoVida: campeao.hp, monstroVida: monstro.hp }
    }

    Atacar() {
        const { campeao, monstro } = RepositoryGame.ObterEstado()
        monstro.hp -= campeao.ataque
        return this.FinalizarTurno(this.MonstroTurno(), campeao, monstro)
    }

    Defender() {
        const { campeao, monstro } = RepositoryGame.ObterEstado()
        return this.FinalizarTurno(this.MonstroTurno(campeao.defesa), campeao, monstro)
    }

    Curar() {
        const { campeao, monstro } = RepositoryGame.ObterEstado()
        campeao.hp = Math.min(campeao.hpBase, campeao.hp + campeao.curar)
        return this.FinalizarTurno(this.MonstroTurno(), campeao, monstro)
    }

    Resetar() {
        RepositoryGame.Resetar()
        return { message: 'Resetado' }
    }

    FinalizarTurno(monstroJogou, campeao, monstro) {
        return {
            monstroJogou,
            campeaoVida: campeao.hp,
            monstroVida: monstro.hp,
            message: this.VerificarVencedor(campeao, monstro),
        }
    }

    VerificarVencedor(campeao, monstro) {
        if (monstro.hp <= 0) return 'Campeão venceu!'
        if (campeao.hp <= 0) return 'Monstro venceu!'
        return null
    }

    MonstroTurno(defesa) {
        const { campeao, monstro } = RepositoryGame.ObterEstado()
        const opcoes = ['atacar', 'curar', 'nada']
        const escolha = opcoes[Math.floor(Math.random() * opcoes.length)]

        switch (escolha) {
            case 'atacar':
                campeao.hp -= Math.max(0, monstro.danoBase - (defesa || 0))
                return 'O monstro atacou o campeão!'
            case 'curar':
                monstro.hp = Math.min(monstro.hpBase, monstro.hp + monstro.curar)
                return 'O monstro curou-se!'
            case 'nada':
                return 'O monstro não fez nada!'
        }
    }
}

export default new ServiceGame()