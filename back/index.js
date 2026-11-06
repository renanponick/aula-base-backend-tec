import express from 'express'
import routerJogo from './router/game.js'
import routerPartidas from './router/partida.js'
import cors from 'cors'
import database from './config/database.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/jogo', routerJogo)
app.use('/partidas', routerPartidas)

const PORT = 3000

database.db.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor ouvindo na porta ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })