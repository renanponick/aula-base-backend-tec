import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/client'
import './styles.css'

function Profile() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  useEffect(() => { api.detalheUsuario().then((resposta) => setEmail(resposta.mensagem?.email || '')).catch((error) => setErro(error.message)) }, [])
  async function salvar(event) { event.preventDefault(); setErro(''); setMensagem(''); try { await api.alterarUsuario({ email, senha }); setSenha(''); setMensagem('Usuário atualizado.') } catch (error) { setErro(error.message) } }
  async function excluir() { if (!window.confirm('Excluir seu usuário? Esta ação não pode ser desfeita.')) return; try { await api.deletarUsuario(); localStorage.removeItem('token'); navigate('/login') } catch (error) { setErro(error.message) } }

  return <section className="page"><div className="page-title"><p className="eyebrow">Conta</p><h1>Meu usuário</h1><p>Atualize os dados usados no login.</p></div>{erro && <p className="alert alert-error">{erro}</p>}{mensagem && <p className="alert alert-success">{mensagem}</p>}<form className="card form profile-form" onSubmit={salvar}><label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Nova senha<input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Deixe vazio para manter" /></label><div className="actions"><button className="button button-primary">Salvar alterações</button><button type="button" className="button button-danger" onClick={excluir}>Excluir usuário</button></div></form></section>
}

export default Profile
