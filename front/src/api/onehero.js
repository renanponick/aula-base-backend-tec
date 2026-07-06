export async function atacar() {
    const res = await fetch("http://localhost:3000/jogo/ataque")
    const data = await res.json()

    return data
}

export async function defender() {
    const res = await fetch("http://localhost:3000/jogo/defesa")
    const data = await res.json()
    return data
}

export async function curar() {
    const res = await fetch("http://localhost:3000/jogo/curar")
    const data = await res.json()
    return data
}

export async function status() {
    const res = await fetch("http://localhost:3000/jogo/status")
    const data = await res.json()
    return data
}