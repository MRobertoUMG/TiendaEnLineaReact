export default function Contact() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-2">Contacto y Soporte</h2>
              <p className="text-center text-muted mb-4">¿Tienes preguntas? Estamos aquí para ayudarte</p>
              
              <form>
                {/* Nombre */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="name"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control"
                    id="email"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Teléfono */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Teléfono (Opcional)</label>
                  <input 
                    type="tel" 
                    className="form-control"
                    id="phone"
                    placeholder="+502 XXXX-XXXX"
                  />
                </div>

                {/* Asunto */}
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Asunto</label>
                  <select className="form-select" id="subject">
                    <option selected>Selecciona un asunto</option>
                    <option value="duda">Tengo una pregunta</option>
                    <option value="problema">Tengo un problema</option>
                    <option value="sugerencia">Sugerencia o comentario</option>
                    <option value="reclamo">Reclamo o reporte</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Mensaje</label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    rows="5"
                    placeholder="Cuéntanos en detalle cómo podemos ayudarte..."
                  ></textarea>
                </div>

                {/* Botón Enviar */}
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                >
                  Enviar Mensaje
                </button>
              </form>

              {/* Información de contacto adicional */}
              <hr className="my-4" />
              <div className="row mt-4">
                <div className="col-md-4 text-center mb-3">
                  <h6 className="text-primary">Email</h6>
                  <p className="text-muted">soporte@tienda.com</p>
                </div>
                <div className="col-md-4 text-center mb-3">
                  <h6 className="text-primary">Teléfono</h6>
                  <p className="text-muted">+502 2XXX-XXXX</p>
                </div>
                <div className="col-md-4 text-center mb-3">
                  <h6 className="text-primary">Horario</h6>
                  <p className="text-muted">Lun-Vie 9AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}