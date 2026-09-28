import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth-context'
import './styles.css'

function Header() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function sair() {
    logout()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <Link className="brand" to={isAuthenticated ? '/' : '/login'}>Frota Fácil</Link>
      {isAuthenticated && (
        <nav aria-label="Navegação principal">
          <Link to="/">Início</Link>
          <Link to="/carros">Carros</Link>
          <Link to="/perfil">Meu usuário</Link>
          <Link to="/aula">Aula React</Link>
          <button className="link-button" onClick={sair}>Sair</button>
        </nav>
      )}
    </header>
  )
}

export default Header
