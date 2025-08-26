import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // Estado para la búsqueda

  const [showPopup, setShowPopup] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const { user } = useAuth();

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" });
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchingProducts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id !== id));
    }
  };

  const handleOpenEdit = (product) => {
    setShowPopup(true);
    setProductToEdit(product);
    setTitleEdit(product.title);
    setPriceEdit(product.price);
    setDescriptionEdit(product.description);
    setCategoryEdit(product.category);
    setImageEdit(product.image);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit,
    };

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          )
        );
      }
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <section>
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
      </section>

      <section>
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>
            <h3>Envíos a todo el país</h3>
            <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
          </li>
          <li>
            <h3>Pagos seguros</h3>
            <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
          </li>
          <li>
            <h3>Atención personalizada</h3>
            <p>Estamos disponibles para ayudarte en todo momento.</p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Nuestros productos</h2>
        <p>Elegí entre nuestras categorías más populares.</p>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Mostrar productos filtrados */}
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <img width="80px" src={product.image} alt={`Imagen de ${product.title}`} />
              <p>${product.price}</p>
              <p>{product.description}</p>
              <p><strong>{product.category}</strong></p>
              {user && (
                <div>
                  <button onClick={() => handleOpenEdit(product)}>Actualizar</button>
                  <button onClick={() => handleDelete(product.id)}>Borrar</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Popup de edición */}
      {showPopup && (
        <section className="popup-edit">
          <h2>Editando producto.</h2>
          <button onClick={() => setShowPopup(null)}>Cerrar</button>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Ingrese el titulo"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />
            <input
              type="number"
              placeholder="Ingrese el precio"
              value={priceEdit}
              onChange={(e) => setPriceEdit(e.target.value)}
            />
            <textarea
              placeholder="Ingrese la descripción"
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Ingrese la categoria"
              value={categoryEdit}
              onChange={(e) => setCategoryEdit(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ingrese la URL de la imagen"
              value={imageEdit}
              onChange={(e) => setImageEdit(e.target.value)}
            />
            <button>Actualizar</button>
          </form>
        </section>
      )}
    </Layout>
  );
};

export default Home;