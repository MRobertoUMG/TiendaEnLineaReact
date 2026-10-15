import { useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { apiRequest, normalizeProduct } from './api.js'
import './App.css'
import Welcome from './Components/Welcome.jsx'
import Navbar from './Components/Navbar.jsx'
import FeaturedProducts from './Components/FeaturedProducts.jsx'
import Footer from './Components/Footer.jsx'
import Product from './Components/Product.jsx'
import ProductDetail from './Components/ProductDetail.jsx'
import SignUp from './Components/SignUp.jsx'
import Contact from './Components/Contact.jsx'
import Cart from './Components/Cart.jsx'
import Login from './Components/Login.jsx'
import Profile from './Components/Profile.jsx'
import SessionInterceptor from './Components/SessionInterceptor.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContextBase.js'

function ProductDetailRoute({ onNavigate }) {
  const { productId } = useParams()

  return (
    <ProductDetail
      productId={productId}
      onClose={() => onNavigate('catalog')}
    />
  )
}

function App() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined
    }

    const abortController = new AbortController()

    async function loadProducts() {
      try {
        const data = await apiRequest('/recursos', { signal: abortController.signal })
        if (!Array.isArray(data)) {
          throw new Error('La respuesta del servidor no contiene una lista de productos.')
        }
        setProducts(data.map(normalizeProduct))
        setProductsError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setProductsError(requestError.message)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setProductsLoading(false)
        }
      }
    }

    loadProducts()
    return () => abortController.abort()
  }, [isAuthenticated])

  const handleCreateProduct = async (newProduct) => {
    const createdProduct = await apiRequest('/recursos', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    })
    setProducts((previousProducts) => [
      ...previousProducts,
      normalizeProduct(createdProduct),
    ])
  }

  const handleDeleteProduct = async (productId) => {
    await apiRequest(`/recursos/${encodeURIComponent(productId)}`, {
      method: 'DELETE',
    })
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== productId)
    )
  }

  const handleUpdateProduct = async (productId, changes) => {
    const updatedProduct = await apiRequest(
      `/recursos/${encodeURIComponent(productId)}`,
      {
        method: 'PUT',
        body: JSON.stringify(changes),
      }
    )
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === productId ? normalizeProduct(updatedProduct) : product
      )
    )
  }

  const handleSearchProducts = async (term) => {
    setProductsLoading(true)
    setProductsError('')

    try {
      const query = new URLSearchParams()
      if (term.trim()) {
        query.set('buscar', term.trim())
      }
      const queryString = query.toString()
      const data = await apiRequest(
        `/recursos${queryString ? `?${queryString}` : ''}`
      )
      if (!Array.isArray(data)) {
        throw new Error('La respuesta del servidor no contiene una lista de recursos.')
      }
      setProducts(data.map(normalizeProduct))
    } catch (requestError) {
      setProductsError(requestError.message)
    } finally {
      setProductsLoading(false)
    }
  }

  const handleNavigate = useCallback((page) => {
    const paths = {
      home: '/',
      catalog: '/catalog',
      signup: '/signup',
      login: '/login',
      profile: '/profile',
      contact: '/contact',
      cart: '/cart',
    }

    navigate(paths[page] || '/')
  }, [navigate])

  const productProps = {
    products,
    loading: productsLoading,
    error: productsError,
    onSelectProduct: (productId) => navigate(`/products/${encodeURIComponent(productId)}`),
    onCreateProduct: handleCreateProduct,
    onDeleteProduct: handleDeleteProduct,
    onUpdateProduct: handleUpdateProduct,
    onSearchProducts: handleSearchProducts,
  }

  return (
    <>
      <SessionInterceptor />
      <Welcome />
      <Navbar onNavigate={handleNavigate} />
      <Routes>
        <Route path="/login" element={<Login onNavigate={handleNavigate} />} />
        <Route path="/signup" element={<SignUp onNavigate={handleNavigate} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <>
                <FeaturedProducts products={products.slice(0, 3)} />
                <Product {...productProps} />
              </>
            }
          />
          <Route path="/catalog" element={<Product {...productProps} />} />
          <Route
            path="/products/:productId"
            element={<ProductDetailRoute onNavigate={handleNavigate} />}
          />
          <Route
            path="/profile"
            element={<Profile onNavigate={handleNavigate} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
