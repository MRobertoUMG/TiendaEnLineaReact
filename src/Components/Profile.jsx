import { useAuth } from '../context/AuthContextBase.js'

export default function Profile({ onNavigate }) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="container my-5 text-center">
        <p>Debes iniciar sesión para ver tu perfil.</p>
        <button type="button" className="btn btn-primary" onClick={() => onNavigate('login')}>
          Iniciar Sesión
        </button>
      </div>
    )
  }

  const accessDate = user.accessDate
    ? new Date(user.accessDate).toLocaleString('es-GT')
    : 'No disponible'

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <section className="card shadow">
            <div className="card-body p-5">
              <h1 className="card-title mb-4">Mi perfil</h1>
              <dl className="row mb-4">
                <dt className="col-sm-5">Nombre</dt>
                <dd className="col-sm-7">{user.name}</dd>
                <dt className="col-sm-5">Correo</dt>
                <dd className="col-sm-7">{user.email}</dd>
                <dt className="col-sm-5">Tipo de cliente</dt>
                <dd className="col-sm-7">{user.role}</dd>
                <dt className="col-sm-5">Último acceso</dt>
                <dd className="col-sm-7">{accessDate}</dd>
              </dl>
              <button type="button" className="btn btn-outline-primary" onClick={() => onNavigate('home')}>
                Volver al inicio
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
