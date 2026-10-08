import { useState } from 'react'
import { useAuth } from '../context/AuthContextBase.js'

export default function Login({ onNavigate }) {
  const { login, isAuthenticated, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error)
        return
      }
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (isAuthenticated) {
    return <p className="text-center my-5">Sesión iniciada como {user.name}.</p>
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">Email</label>
                  <input id="loginEmail" type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                  <input id="loginPassword" type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                  {submitting ? 'Ingresando...' : 'Ingresar'}
                </button>
              </form>
              <button type="button" className="btn btn-link w-100" onClick={() => onNavigate('signup')}>
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
