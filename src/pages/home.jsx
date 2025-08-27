import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Home = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })
    if (response.ok) {
      setProducts((prevProduct) => prevProduct.filter((product) => product.id !== id))
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

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
      })

      if (response.ok) {
        const data = await response.json()
        setProducts((prevProduct) =>
          prevProduct.map((product) => (product.id === productToEdit.id ? data : product))
        );
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-5 fw-bold">Bienvenido a Nuestra Tienda</h1>
        <p className="lead">Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
      </div>

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

        {/* Barra de búsqueda con Bootstrap */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mb-4"
        />

        {/* Mostrar productos filtrados con diseño Bootstrap */}
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <strong>{product.category}</strong>
                  </p>
                  {user && (
                    <div className="mt-auto">
                      <button className="btn btn-primary me-2" onClick={() => handleOpenEdit(product)}>
                        Actualizar
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                        Borrar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popup de edición */}
      {showPopup && (
        <section className="popup-edit bg-white p-4 rounded shadow position-fixed top-50 start-50 translate-middle" style={{ zIndex: 1050, width: '90%', maxWidth: '500px' }}>
          <h2>Editando producto.</h2>
          <button className="btn btn-secondary mb-3" onClick={() => setShowPopup(null)}>
            Cerrar
          </button>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Ingrese el titulo"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
              className="form-control mb-2"
              required
            />
            <input
              type="number"
              placeholder="Ingrese el precio"
              value={priceEdit}
              onChange={(e) => setPriceEdit(e.target.value)}
              className="form-control mb-2"
              required
            />
            <textarea
              placeholder="Ingrese la descripción"
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
              className="form-control mb-2"
              required
            ></textarea>
            <input
              type="text"
              placeholder="Ingrese la categoria"
              value={categoryEdit}
              onChange={(e) => setCategoryEdit(e.target.value)}
              className="form-control mb-2"
              required
            />
            <input
              type="text"
              placeholder="Ingrese la URL de la imagen"
              value={imageEdit}
              onChange={(e) => setImageEdit(e.target.value)}
              className="form-control mb-3"
              required
            />
            <button type="submit" className="btn btn-success w-100">
              Actualizar
            </button>
          </form>
        </section>
      )}
    </Layout>
  )
}

export default Home
