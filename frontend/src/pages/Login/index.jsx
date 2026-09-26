import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/client'
import { useAuth } from '../../auth-context'
import './styles.css'

function Login() {
  const [modoCadastro, setModoCadastro] = useState(false); const [email, setEmail] = useState(''); const [senha, setSenha] = useState(''); const [erro, setErro] = useState(''); const [carregando, setCarregando] = useState(false)
  const { login } = useAuth(); const navigate = useNavigate()
  async function enviar(event) {
    event.preventDefault(); setErro(''); setCarregando(true)
    try { if (modoCadastro) await api.criarUsuario({ email, senha }); const resposta = await api.login({ email, senha }); login(resposta.token); navigate('/') }
    catch (error) { setErro(error.message) } finally { setCarregando(false) }
  }
  return <section className="auth-card"><p className="eyebrow">Acesso ao sistema</p><h1>{modoCadastro ? 'Criar usuário' : 'Entrar'}</h1><p className="muted">Use suas credenciais para gerenciar carros.</p><form onSubmit={enviar}><label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Senha<input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} required /></label>{erro && <p className="error">{erro}</p>}<button className="primary" disabled={carregando}>{carregando ? 'Aguarde...' : modoCadastro ? 'Cadastrar e entrar' : 'Entrar'}</button></form><button className="secondary" onClick={() => { setModoCadastro(!modoCadastro); setErro('') }}>{modoCadastro ? 'Já tenho uma conta' : 'Criar novo usuário'}</button></section>
}
export default Login
