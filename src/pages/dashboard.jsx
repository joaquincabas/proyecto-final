import { useState } from "react";
import { Layout } from "../components/Layout";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !price || !description) {
      setError("Debes completar todos los campos");
      return;
    }

    if (name.length < 4) {
      setError("El nombre debe tener al menos 4 caracteres");
      return;
    }

    // Crear objeto de producto correctamente
    const newProduct = {
      id: crypto.randomUUID(),
      title: name,          // ✅ clave correcta
      price: price,
      description: description,
      category: "",
      image: ""
    };

    try {
      // Petición POST al backend
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });

      const data = await response.json();
      setProduct(data);
      setName("");
      setPrice("");
      setDescription("");
    } catch (err) {
      setError("Error al guardar el producto");
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1>Panel de Administración</h1>

      <section>
        <h2>Cargar nuevo producto</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre del producto:</label>
            <input
              type="text"
              name="nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Guardar producto</button>
        </form>

        {product && (
          <div>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

// Export nombrado
export default Dashboard;