import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

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
          
            <FeaturedProducts/>
            <Product onSelectProduct={setSelectedProductId}/>
          </>
        )}
        {currentPage === 'catalog' && (
          <Product onSelectProduct={setSelectedProductId}/>
        )}
        {currentPage === 'signup' && (
          <div>
            <SignUp/>
          </div>
        ) }
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
