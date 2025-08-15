import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header style={{ backgroundColor: "lightblue" }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png" alt="imagen de logo" />
      <nav>
        <ul>
          {/* Cambiar elementos a por componentes Link de react-router-dom */}
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registrate">Registrate</Link></li>
          <button>Cerrar sesión</button>
        </ul>
      </nav>
    </header>
  )
}

export { Header }