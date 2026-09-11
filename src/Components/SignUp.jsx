import { useState } from 'react'
import { useAuth } from '../context/AuthContextBase.js'

export default function SignUp({ onNavigate }) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [registered, setRegistered] = useState(false)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    register(formData)
    setRegistered(true)
  }

  if (registered) {
    return <p className="text-center my-5">Cuenta creada e inicio de sesión activo para {formData.name}.</p>
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Crear Cuenta</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Nombre Completo */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                  <input type="text" className="form-control" id="fullName" name="name" placeholder="Juan Pérez" value={formData.name} onChange={handleChange} required/>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="correo@ejemplo.com" value={formData.email} onChange={handleChange} required/>
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Mínimo 6 caracteres" value={formData.password} onChange={handleChange} minLength="6" required/>
                </div>

                {/* Confirmar Contraseña */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input type="password" className="form-control" id="confirmPassword" placeholder="Confirma tu contraseña"/>
                </div>

                {/* Botón Registrarse */}
                <button type="submit" className="btn btn-primary w-100 mb-3">Registrarse</button>

                {/* Enlace a Login */}
                <p className="text-center text-muted">¿Ya tienes cuenta? 
                  <button type="button" className="btn btn-link text-primary ms-2 p-0" onClick={() => onNavigate('login')}>
                    Inicia sesión aquí
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}