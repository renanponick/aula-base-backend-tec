const API_BASE = import.meta.env.VITE_API_URL || '/api/v1'

async function request(path, options = {}) {
  const token = localStorage.getItem('token')
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', token)
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw new Error(body?.mensagem || body?.message || 'Não foi possível concluir a operação.')
  return body
}

export const api = {
  login: (data) => request('/usuario/login', { method: 'POST', body: JSON.stringify(data) }),
  criarUsuario: (data) => request('/usuario/criar', { method: 'POST', body: JSON.stringify(data) }),
  buscarUsuario: () => request('/usuario/buscar'),
  detalheUsuario: () => request('/usuario/detalhe'),
  alterarUsuario: (data) => request('/usuario/alterar', { method: 'PUT', body: JSON.stringify(data) }),
  deletarUsuario: () => request('/usuario/deletar', { method: 'DELETE' }),
  listarCarros: () => request('/carro/buscar'),
  criarCarro: (data) => request('/carro/criar', { method: 'POST', body: JSON.stringify(data) }),
  alterarCarro: (id, data) => request(`/carro/alterar/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletarCarro: (id) => request(`/carro/deletar/${id}`, { method: 'DELETE' }),
}

