import { useAuth } from '../context/AuthContextBase.js'

export default function Navbar({ onNavigate }) {
  const { isAuthenticated, user, logout } = useAuth()

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout()
      return
    }
    onNavigate('login')
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-navbar bg-gradient text-white t-center">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav mx-auto">
                <button class="nav-link active" onClick={() => onNavigate('home')}>Inicio</button>
                <button class="nav-link" onClick={() => onNavigate('catalog')}>Catálogo Completo</button>
                <button class="nav-link" onClick={()=> onNavigate('contact')}>Contacto y Soporte</button>
                {isAuthenticated ? (
                  <>
                  <button class="nav-link" onClick={handleAuthAction}>Cerrar Sesión</button>
                    <button class="nav-link" onClick={() => onNavigate('profile')}>
                      {user.name}
                    </button>
                  </>
                ) : (
                  <button class="nav-link" onClick={handleAuthAction}>Iniciar Sesión</button>
                )}
                <button class="nav-link" onClick={()=> onNavigate('cart')}>&#128722;</button>
            </div>
            </div>
        </div>
    </nav>
  )
}