export default function SignUp() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Crear Cuenta</h2>
              
              <form>
                {/* Nombre Completo */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                  <input type="text" className="form-control" id="fullName" placeholder="Juan Pérez"/>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="correo@ejemplo.com"/>
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password"placeholder="Mínimo 6 caracteres"/>
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
                  <a href="#" className="text-primary ms-2">Inicia sesión aquí</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}