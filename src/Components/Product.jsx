import { useState } from 'react'
import { Alert, Badge, Button, Card, Form } from 'react-bootstrap'

export default function Product({
  products,
  loading,
  error,
  onSelectProduct,
  onCreateProduct,
  onDeleteProduct,
  onUpdateProduct,
  onSearchProducts,
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    especificaciones: '',
  })
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [createSuccess, setCreateSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deletingProductId, setDeletingProductId] = useState(null)
  const [editingProductId, setEditingProductId] = useState(null)
  const [editData, setEditData] = useState(null)
  const [updatingProductId, setUpdatingProductId] = useState(null)
  const [updateError, setUpdateError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  const handleChange = (event) => {
    setFormData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setCreating(true)
    setCreateError('')
    setCreateSuccess(false)

    try {
      await onCreateProduct({
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number(formData.precio),
        imagen: formData.imagen,
        especificaciones: formData.especificaciones
          .split('\n')
          .map((specification) => specification.trim())
          .filter(Boolean),
      })
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
        especificaciones: '',
      })
      setCreateSuccess(true)
    } catch (requestError) {
      setCreateError(requestError.message)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (productId) => {
    setDeletingProductId(productId)
    setDeleteError('')

    try {
      await onDeleteProduct(productId)
    } catch (requestError) {
      setDeleteError(requestError.message)
    } finally {
      setDeletingProductId(null)
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    setSearching(true)
    setSearchError('')

    try {
      await onSearchProducts(searchTerm)
    } catch (requestError) {
      setSearchError(requestError.message)
    } finally {
      setSearching(false)
    }
  }

  const startEditing = (product) => {
    setEditingProductId(product.id)
    setEditData({
      nombre: product.name,
      descripcion: product.description,
      precio: String(product.price),
      imagen: product.image || '',
      especificaciones: product.specs.join('\n'),
    })
    setUpdateError('')
  }

  const handleEditChange = (event) => {
    setEditData((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleUpdate = async (event, productId) => {
    event.preventDefault()
    setUpdatingProductId(productId)
    setUpdateError('')

    try {
      await onUpdateProduct(productId, {
        nombre: editData.nombre,
        descripcion: editData.descripcion,
        precio: Number(editData.precio),
        imagen: editData.imagen,
        especificaciones: editData.especificaciones
          .split('\n')
          .map((specification) => specification.trim())
          .filter(Boolean),
      })
      setEditingProductId(null)
      setEditData(null)
    } catch (requestError) {
      setUpdateError(requestError.message)
    } finally {
      setUpdatingProductId(null)
    }
  }

  return (
    <>
      <br /><h2 className="text-center">Productos</h2><br />
      <div className="container">
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Crear recurso</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Precio (Q)</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  min="0"
                  step="0.01"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productImage">
                <Form.Label>URL de imagen (opcional)</Form.Label>
                <Form.Control
                  type="url"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productSpecifications">
                <Form.Label>Especificaciones (una por línea, opcional)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="especificaciones"
                  value={formData.especificaciones}
                  onChange={handleChange}
                />
              </Form.Group>
              {createError && <Alert variant="danger">{createError}</Alert>}
              {createSuccess && (
                <Alert variant="success">Recurso creado correctamente.</Alert>
              )}
              <Button type="submit" disabled={creating}>
                {creating ? 'Creando...' : 'Crear recurso'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Form className="mb-4" onSubmit={handleSearch}>
          <Form.Group controlId="searchResources">
            <Form.Label>Buscar recursos por nombre</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Ejemplo: camisa"
              />
              <Button type="submit" disabled={searching}>
                {searching ? 'Buscando...' : 'Buscar'}
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => {
                  setSearchTerm('')
                  onSearchProducts('')
                }}
                disabled={searching}
              >
                Limpiar
              </Button>
            </div>
          </Form.Group>
        </Form>
        {searchError && <Alert variant="danger">{searchError}</Alert>}
        {loading && <p className="text-center">Cargando recursos...</p>}
        {error && <Alert variant="danger">{error}</Alert>}
        {deleteError && <Alert variant="danger">{deleteError}</Alert>}
        {!loading && !error && products.length === 0 && (
          <p className="text-center">No hay recursos disponibles.</p>
        )}
        <div className="row g-4">
          {!loading && !error && products.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <Card className="h-100">
                {product.image && <Card.Img variant="top" src={product.image} alt={product.name} />}
                <Card.Body>
                  {editingProductId === product.id ? (
                    <Form onSubmit={(event) => handleUpdate(event, product.id)}>
                      <Form.Group className="mb-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="nombre" value={editData.nombre} onChange={handleEditChange} required />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="descripcion" value={editData.descripcion} onChange={handleEditChange} required />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Precio (Q)</Form.Label>
                        <Form.Control type="number" name="precio" min="0" step="0.01" value={editData.precio} onChange={handleEditChange} required />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>URL de imagen</Form.Label>
                        <Form.Control type="url" name="imagen" value={editData.imagen} onChange={handleEditChange} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Especificaciones (una por línea)</Form.Label>
                        <Form.Control as="textarea" name="especificaciones" value={editData.especificaciones} onChange={handleEditChange} />
                      </Form.Group>
                      {updateError && <Alert variant="danger">{updateError}</Alert>}
                      <Button type="submit" className="me-2" disabled={updatingProductId !== null}>
                        {updatingProductId === product.id ? 'Guardando...' : 'Guardar'}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setEditingProductId(null)
                          setEditData(null)
                          setUpdateError('')
                        }}
                        disabled={updatingProductId !== null}
                      >
                        Cancelar
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Badge bg="primary">Q{Number(product.price).toFixed(2)}</Badge>
                    </>
                  )}
                </Card.Body>
                {editingProductId !== product.id && (
                <Card.Footer className="bg-white border-0">
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className="btn btn-primary w-100"
                  >
                    Ver detalles
                  </button>
                  <Button
                    variant="danger"
                    className="w-100 mt-2"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingProductId !== null}
                  >
                    {deletingProductId === product.id ? 'Eliminando...' : 'Eliminar'}
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="w-100 mt-2"
                    onClick={() => startEditing(product)}
                    disabled={deletingProductId !== null || updatingProductId !== null}
                  >
                    Editar
                  </Button>
                </Card.Footer>
                )}
              </Card>
            </div>
          ))}
        </div><br /><br />
      </div>
    </>
  )
}
