import express from 'express'
import carro from './router/carro.js'
import usuario from './router/usuario.js'
import database from './config/database.js'

const app = express()
app.use(express.json())

app.use("/api/v1/carro", carro)
app.use("/api/v1/usuario", usuario)

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000")
        })
    })
    .catch((e) => {
        console.log(e)
    })
