const API_URL = (
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '')
const API_BASE_URL = API_URL
  ? (API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`)
  : null

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('Configura VITE_API_URL con la URL del backend.')
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.mensaje || 'Ocurrió un error al comunicarse con el servidor.')
  }

  return data
}

export function normalizeProduct(product) {
  return {
    id: product._id,
    image: product.imagen,
    name: product.nombre,
    description: product.descripcion,
    price: product.precio,
    specs: product.especificaciones || [],
  }
}
