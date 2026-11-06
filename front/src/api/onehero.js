import api from './api'

export async function atacar() {
    const response = await api.get('/jogo/ataque')
    return response.data
}

export async function defender() {
    const response = await api.get('/jogo/defesa')
    return response.data
}

export async function curar() {
    const response = await api.get('/jogo/curar')
    return response.data
}

export async function status() {
    const response = await api.get('/jogo/status')
    return response.data
}

export async function resetar() {
    const response = await api.get('/jogo/resetar')
    return response.data
}

// CRUD de Partidas

export async function listarPartidas() {
    const response = await api.get('/partidas')
    return response.data
}

export async function buscarPartida(id) {
    const response = await api.get(`/partidas/${id}`)
    return response.data
}

export async function criarPartida(partida) {
    const response = await api.post('/partidas', partida)
    return response.data
}

export async function atualizarPartida(id, partida) {
    const dadosAtualizacao = { ...partida }
    delete dadosAtualizacao.id
    delete dadosAtualizacao.Id

    const response = await api.put(`/partidas/${id}`, dadosAtualizacao)
    return response.data
}

export async function excluirPartida(id) {
    const response = await api.delete(`/partidas/${id}`)
    return response.status === 204 ? null : response.data
}