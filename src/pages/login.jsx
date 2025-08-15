import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
const Login = () => {

  const { login } = useAuth()

  const handleLogin = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <Layout>
      <h1>Inicia sesión</h1>

      <section>
        <h2>Hola, bienvenido de nuevo</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Correo electrónico:</label>
            <input type="email" />
          </div>
          <div>
            <label>Contraseña:</label>
            <input type="password" />
          </div>
          <button>Ingresar</button>
        </form>
      </section>
    </Layout>
  )
}

export { Login }