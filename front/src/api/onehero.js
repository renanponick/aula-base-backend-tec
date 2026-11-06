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

export async function resetar() {
    const res = await fetch("http://localhost:3000/jogo/resetar")
    const data = await res.json()
    return data
}

// CRUD de Partidas

export async function listarPartidas() {
    const res = await fetch("http://localhost:3000/partidas")
    const data = await res.json()
    return data
}

export async function buscarPartida(id) {
    const res = await fetch(`http://localhost:3000/partidas/${id}`)
    const data = await res.json()
    return data
}

export async function criarPartida(partida) {
    const res = await fetch("http://localhost:3000/partidas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partida)
    })

    const data = await res.json()
    return data
}

export async function atualizarPartida(id, partida) {
    const dadosAtualizacao = { ...partida }
    delete dadosAtualizacao.id
    delete dadosAtualizacao.Id

    const res = await fetch(`http://localhost:3000/partidas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosAtualizacao)
    })

    const data = await res.json()
    return data
}

export async function excluirPartida(id) {
    const res = await fetch(`http://localhost:3000/partidas/${id}`, {
        method: "DELETE"
    })

    if (res.status === 204) {
        return null
    }

    const data = await res.json()
    return data
}