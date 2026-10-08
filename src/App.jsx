import { useEffect, useState } from 'react';
import { apiRequest, normalizeProduct } from './api.js'
import './App.css'
import Welcome from './Components/Welcome.jsx'
import  Navbar  from './Components/Navbar.jsx'
import FeaturedProducts from './Components/FeaturedProducts.jsx'
import Footer from './Components/Footer.jsx'
import Product from './Components/Product.jsx'
import ProductDetail from './Components/ProductDetail.jsx'
import SignUp from './Components/SignUp.jsx'
import Contact from './Components/Contact.jsx'
import Cart from './Components/Cart.jsx'
import Login from './Components/Login.jsx'
import Profile from './Components/Profile.jsx'

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function loadProducts() {
      try {
        const data = await apiRequest('/recursos', { signal: abortController.signal })
        if (!Array.isArray(data)) {
          throw new Error('La respuesta del servidor no contiene una lista de productos.')
        }
        setProducts(data.map(normalizeProduct))
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
  }, [])

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

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProductId(null);
  };

  if (selectedProductId !== null) {
    return (
      <>
        <Welcome />
        <Navbar onNavigate={handleNavigate}/>
        <ProductDetail 
          productId={selectedProductId} 
          onClose={() => setSelectedProductId(null)} 
        />
        <Footer/>
      </>
    );
  }

  return (
     <>
        <Welcome />
        <Navbar onNavigate={handleNavigate}/>
        {currentPage === 'home' && (
          <>
          
            <FeaturedProducts products={products.slice(0, 3)} />
            <Product
              products={products}
              loading={productsLoading}
              error={productsError}
              onSelectProduct={setSelectedProductId}
              onCreateProduct={handleCreateProduct}
              onDeleteProduct={handleDeleteProduct}
              onUpdateProduct={handleUpdateProduct}
              onSearchProducts={handleSearchProducts}
            />
          </>
        )}
        {currentPage === 'catalog' && (
          <Product
            products={products}
            loading={productsLoading}
            error={productsError}
            onSelectProduct={setSelectedProductId}
            onCreateProduct={handleCreateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
            onSearchProducts={handleSearchProducts}
          />
        )}
        {currentPage === 'signup' && (
          <div>
            <SignUp onNavigate={handleNavigate}/>
          </div>
        ) }
        {currentPage === 'login' && (
          <Login onNavigate={handleNavigate} />
        )}
        {currentPage === 'profile' && (
          <Profile onNavigate={handleNavigate} />
        )}
        {currentPage === 'contact' && (
          <div>
            <Contact/>
          </div>
        ) }
        {currentPage === 'cart' && (
          <div>
            <Cart/>
          </div>
        ) }
        <Footer/>
     </>
  )
}

export default App
