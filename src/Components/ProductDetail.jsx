import { useEffect, useState } from 'react'
import { apiRequest, normalizeProduct } from '../api.js'

export default function ProductDetail({ productId, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function loadProduct() {
      setLoading(true)
      setError('')
      try {
        const data = await apiRequest(`/recursos/${encodeURIComponent(productId)}`, {
          signal: abortController.signal,
        })
        setProduct(normalizeProduct(data))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProduct()
    return () => abortController.abort()
  }, [productId])

  if (loading) {
    return <p className="container my-5 text-center">Cargando producto...</p>
  }

  if (error) {
    return <div className="container my-5 alert alert-danger" role="alert">{error}</div>
  }

  if (!product) {
    return <div className="container my-5">Producto no encontrado</div>
  }

  const handleAddToCart = () => {
    alert(`${quantity} ${product.name}(s) añadido(s) al carrito`)
    setQuantity(1)
  }

  return (
    <div className="container mt-4">
      <button onClick={onClose} className="btn btn-secondary mb-4">
        Volver a Productos
      </button>
      <div className="row">
        <div className="col-md-6 mb-4 text-center">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="col-md-6">
          <h1 className="text-center">{product.name}</h1>
          <h3 className="text-primary mb-3 text-center">${Number(product.price).toFixed(2)}</h3>
          <p className="lead text-center">{product.description}</p>
          {product.specs.length > 0 && (
            <>
              <hr />
              <h5>Especificaciones:</h5>
              <ul className="list-group mb-4 text-right">
                {product.specs.map((spec, index) => (
                  <li key={`${spec}-${index}`} className="list-group-item">{spec}</li>
                ))}
              </ul>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="quantity" className="form-label">Cantidad:</label>
            <div className="input-group mb-3" style={{ maxWidth: '150px' }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number.parseInt(event.target.value, 10) || 1))}
                min="1"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg w-100 mb-2 mb-5"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  )
}
