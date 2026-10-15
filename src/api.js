import api, { API_BASE_URL } from './api/axios.js'

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('Configura VITE_API_URL con la URL del backend.')
  }

  const { body, ...requestOptions } = options

  try {
    const response = await api.request({
      ...requestOptions,
      url: path.startsWith('/') ? path : `/${path}`,
      data: body,
      responseType: 'text',
    })
    return parseApiResponse(response)
  } catch (requestError) {
    if (!requestError.response) {
      throw requestError
    }

    const data = parseApiResponse(requestError.response)
    throw new Error(
      data?.mensaje || data?.message || 'Ocurrió un error al comunicarse con el servidor.',
      { cause: requestError }
    )
  }
}

function parseApiResponse(response) {
  const contentType = response.headers['content-type'] || ''
  const responseUrl =
    response.request?.responseURL || api.getUri(response.config)

  if (!contentType.includes('application/json') && !contentType.includes('+json')) {
    throw new Error(
      `La URL configurada no respondió como API JSON (${response.status}, ${contentType || 'sin Content-Type'}): ${responseUrl}. ` +
      'En Netlify, configura VITE_API_URL con la URL pública del backend en Render y vuelve a desplegar.'
    )
  }

  try {
    return JSON.parse(response.data)
  } catch {
    throw new Error(`La API devolvió JSON inválido (${response.status}) desde ${responseUrl}.`)
  }
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
