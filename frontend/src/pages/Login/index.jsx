import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/client'
import { useAuth } from '../../auth-context'
import './styles.css'

function Login() {
  const [cadastro, setCadastro] = useState(false); const [email, setEmail] = useState(''); const [senha, setSenha] = useState(''); const [erro, setErro] = useState(''); const [carregando, setCarregando] = useState(false)
  const { login } = useAuth(); const navigate = useNavigate()
  async function enviar(event) { event.preventDefault(); setErro(''); setCarregando(true); try { if (cadastro) await api.criarUsuario({ email, senha }); const resposta = await api.login({ email, senha }); login(resposta.token); navigate('/') } catch (error) { setErro(error.message) } finally { setCarregando(false) } }
  return <section className="login-page"><form className="card login-card form" onSubmit={enviar}><p className="eyebrow">Frota Fácil</p><h1>{cadastro ? 'Criar usuário' : 'Entrar'}</h1><p className="muted">Use a API Node para acessar seus carros.</p><label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Senha<input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} required /></label>{erro && <p className="alert alert-error">{erro}</p>}<button className="button button-primary" disabled={carregando}>{carregando ? 'Aguarde...' : cadastro ? 'Cadastrar e entrar' : 'Entrar'}</button><button type="button" className="button" onClick={() => { setCadastro(!cadastro); setErro('') }}>{cadastro ? 'Já tenho uma conta' : 'Criar novo usuário'}</button></form></section>
}

export default Login
