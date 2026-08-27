export default function Cart() {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Carrito de Compras</h2>

      {/* Tabla de productos */}
      <div className="table-responsive mb-4">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Ejemplo de producto */}
            <tr>
              <td>
                <strong>Laptop Pro 15</strong>
                <br/>
                <small className="text-muted">Procesador de alto rendimiento para trabajo pesado</small>
              </td>
              <td>$1,200.00</td>
              <td>
                <div className="input-group" style={{ maxWidth: '100px' }}>
                  <button className="btn btn-outline-secondary btn-sm">-</button>
                  <input type="number" className="form-control form-control-sm text-center" value="1"min="1"/>
                  <button className="btn btn-outline-secondary btn-sm">+</button>
                </div>
              </td>
              <td>$1,200.00</td>
              <td>
                <button className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>

            {/* Otro ejemplo */}
            <tr>
              <td>
                <strong>Mouse Ergonómico</strong>
                <br/>
                <small className="text-muted">Sensor óptico 16000 DPI con 6 botones programables</small>
              </td>
              <td>$45.00</td>
              <td>
                <div className="input-group" style={{ maxWidth: '100px' }}>
                  <button className="btn btn-outline-secondary btn-sm">-</button>
                  <input type="number" className="form-control form-control-sm text-center" value="2" min="1"/>
                  <button className="btn btn-outline-secondary btn-sm">+</button>
                </div>
              </td>
              <td>$90.00</td>
              <td>
                <button className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row">

        {/* Resumen del carrito */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen del Carrito</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>$1,290.00</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Impuestos (12%):</span>
                <strong>$154.80</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Envío:</span>
                <strong>$0.00</strong>
              </div>

              <hr/>

              <div className="d-flex justify-content-between mb-3">
                <h6>Total:</h6>
                <h6 className="text-primary">$1,444.80</h6>
              </div>

              <button className="btn btn-primary w-100">
                Proceder al Checkout
              </button>

              <small className="text-muted d-block text-center mt-2">
                ✓ Envío gratis en compras mayores a $1,000
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Sección carrito vacío (oculta cuando hay productos) */}
      {/* 
      <div className="text-center py-5">
        <h4 className="text-muted">Tu carrito está vacío</h4>
        <p className="text-muted mb-3">Parece que no has agregado ningún producto</p>
        <button className="btn btn-primary">Ir al Catálogo</button>
      </div>
      */}
    </div>
  );
}