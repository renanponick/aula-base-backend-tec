import express from 'express'

// server ou app
const app = express()
//- path params - router
app.get("/api/v1/somar", (req, res) => {
    // query params
    console.log(req.query)

    const num1 = Number(req.query.num1)
    const num2 = Number(req.query.num2)
    const resultado = num1 + num2

    res.send({ resultado, "Tarefa": "Pesquise sobre QueryParams" })
})

// aqui em diante

// metodo GET da função de subtrair usando QueryParam
// Com numero1 e numero2 ou num1 e num2

app.listen(3000, () => {
    console.log("Servidor ouvindo na porta 3000")
})