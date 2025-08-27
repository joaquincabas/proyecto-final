import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext"; // ✅ usamos el contexto global

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUserContext } = useAuth(); // ✅ usamos setUserContext del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const newUser = {
      email,
      username,
      password,
      name: {
        firstname: "Nombre",
        lastname: "Apellido",
      },
      address: {
        city: "Ciudad",
        street: "Calle",
        number: 3,
        zipcode: "12926-3874",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: "1-570-236-7033",
    };

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Error en el registro");

      const data = await response.json();
      console.log("Usuario registrado:", data);
      setSuccess("¡Usuario registrado con éxito!");
      setUserContext(true); // ✅ Simula login automático
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Hubo un error al registrar el usuario.");
    }
  };

  return (
    <Layout>
      <h1>Registrate</h1>

      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Correo:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </section>
    </Layout>
  );
};

export default Register;
