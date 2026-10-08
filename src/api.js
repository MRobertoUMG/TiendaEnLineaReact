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
  const contentType = response.headers.get('content-type') || ''
  let data

  if (contentType.includes('application/json') || contentType.includes('+json')) {
    try {
      data = await response.json()
    } catch {
      throw new Error(`La API devolvió JSON inválido (${response.status}) desde ${response.url}.`)
    }
  } else {
    await response.text()
    throw new Error(
      `La URL configurada no respondió como API JSON (${response.status}, ${contentType || 'sin Content-Type'}): ${response.url}. ` +
      'En Netlify, configura VITE_API_URL con la URL pública del backend en Render y vuelve a desplegar.'
    )
  }

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
