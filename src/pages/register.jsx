import { Layout } from "../components/Layout"

const Register = () => {
  return (
    <Layout>
      <h1>Registrate</h1>

      <section>
        <h2>Hola, bienvenido</h2>
        <form>
          <div>
            <label>Username:</label>
            <input type="text" />
          </div>
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

export { Register }