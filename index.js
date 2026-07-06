import express from 'express'
import { campeao, monstro } from './repository/index.js'

const app = express()

app.get("/jogo/status", (req, res) => {
    res.send({ 
        campeaoVida: campeao.hp,
        monstroVida: monstro.hp
     })
})

function verificarVencedor() {
    if (monstro.hp <= 0) {
        return "Campeão venceu!"
    } else if (campeao.hp <= 0) {
        return "Monstro venceu!"
    }
    return null
}

function monstroTurno(defesa) {
    // Sortear o que o monstro irá fazer: atacar, curar ou nada
    const opcoes = ["atacar", "curar", "nada"];
    const escolha = opcoes[Math.floor(Math.random() * opcoes.length)];

    switch (escolha) {
        case "atacar":
            defesa = defesa || 0;
            campeao.hp -= Math.max(0, monstro.danoBase - defesa);
            return "O monstro atacou o campeão!";
        case "curar":
            monstro.hp = Math.min(monstro.hpBase, monstro.hp + monstro.curar);
            return "O monstro curou-se!";
        case "nada":
            return "O monstro não fez nada!";
    }
}

app.get("/jogo/ataque", (req, res) => {
    monstro.hp -= campeao.ataque
    const monstroJogou = monstroTurno()
    const vencedor = verificarVencedor()

    return res.send({ 
        monstroJogou,
        campeaoVida: campeao.hp,
        monstroVida: monstro.hp,
        message: vencedor
    })
})

app.get("/jogo/defesa", (req, res) => {
    const monstroJogou = monstroTurno(campeao.defesa)
    const vencedor = verificarVencedor()

    return res.send({ 
        monstroJogou,
        campeaoVida: campeao.hp,
        monstroVida: monstro.hp,
        message: vencedor
    })
})

app.get("/jogo/curar", (req, res) => {
    campeao.hp = Math.min(campeao.hpBase, campeao.hp + campeao.curar)
    const monstroJogou = monstroTurno()
    const vencedor = verificarVencedor()

     return res.send({ 
        monstroJogou,
        campeaoVida: campeao.hp,
        monstroVida: monstro.hp,
        message: vencedor
    })
})

app.listen(3000, () => {
    console.log("Servidor ouvindo na porta 3000")
})