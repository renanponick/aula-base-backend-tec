import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'
import './styles.css'

function Dashboard() {
  const [usuario, setUsuario] = useState(null)
  const [carros, setCarros] = useState([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    Promise.all([api.detalheUsuario(), api.listarCarros()])
      .then(([usuarioResposta, carrosResposta]) => {
        setUsuario(usuarioResposta.mensagem)
        setCarros(carrosResposta.mensagem || [])
      })
      .catch((error) => setErro(error.message))
  }, [])

  return (
    <section className="page">
      <div className="page-title">
        <p className="eyebrow">Página inicial</p>
        <h1>Olá, {usuario?.email || 'estudante'}!</h1>
        <p>Este painel mostra o frontend conversando com o backend.</p>
      </div>
      {erro && <p className="alert alert-error">{erro}</p>}
      <div className="dashboard-cards">
        <article className="card"><h2>Carros cadastrados</h2><strong className="number">{carros.length}</strong><Link className="text-link" to="/carros">Abrir cadastro</Link></article>
        <article className="card"><h2>Usuário conectado</h2><p>{usuario?.email || 'Carregando...'}</p><Link className="text-link" to="/perfil">Editar usuário</Link></article>
        <article className="card"><h2>Exemplo de aula</h2><p>Veja estado, eventos e funções em uma calculadora.</p><Link className="text-link" to="/aula">Abrir aula React</Link></article>
      </div>
      <section className="card dashboard-help"><h2>Fluxo da aplicação</h2><p>Faça login, cadastre um carro e confira a lista. Cada ação chama uma rota da API.</p><ol><li>Login envia e-mail e senha.</li><li>Carros usa criar, listar, editar e excluir.</li><li>Meu usuário atualiza ou remove a conta.</li></ol></section>
    </section>
  )
}

export default Dashboard
