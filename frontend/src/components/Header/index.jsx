import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth-context'
import './styles.css'

function Header() {
  const { isAuthenticated, logout } = useAuth(); const navigate = useNavigate()
  function sair() { logout(); navigate('/login') }
  return <header className="topbar"><Link className="brand" to={isAuthenticated ? '/' : '/login'}>Gestão de Frota</Link>{isAuthenticated && <nav><Link to="/">Painel</Link><button className="link-button" onClick={sair}>Sair</button></nav>}</header>
}
export default Header
