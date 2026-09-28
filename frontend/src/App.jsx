import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './auth-context'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Cars from './pages/Cars'
import Profile from './pages/Profile'
import About from './pages/About'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return <div className="app-shell"><Header /><main className="app-content"><Routes><Route path="/login" element={<Login />} /><Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /><Route path="/carros" element={<PrivateRoute><Cars /></PrivateRoute>} /><Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} /><Route path="/aula" element={<PrivateRoute><About /></PrivateRoute>} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /></div>
}

export default App
