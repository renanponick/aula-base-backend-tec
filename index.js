import express from 'express'
import bancoDeDados from './repository/index.js'

const app = express()

app.get("/api/v1/pessoa/", (req, res) => {
    const id = req.query.id
    const nome = req.query.nome

    if(!id || !nome) {
        res.status(400).send({ message: "Parâmetros inválidos!" })
        return
    }

    const pessoa = {
        id,
        nome
    }

    bancoDeDados.push(pessoa)

    res.send({ message: "Pessoa adicionada com sucesso!" })
})


app.get("/api/v1/pessoa/:id", (req, res) => {
    const id = req.params.id

    const pessoa = bancoDeDados.find(p => p.id === id)

    if(!pessoa) {
        res.status(404).send({ message: "Pessoa não encontrada!" })
        return
    }

    res.send({ message: "Pessoa encontrada com sucesso!", pessoa })
})

app.listen(3000, () => {
    console.log("Servidor ouvindo na porta 3000")
})