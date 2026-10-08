export default function FeaturedProducts({ products }) {
  if (products.length === 0) {
    return null
  }

  const carouselId = 'featuredProductsCarousel'

  return (
    <div className="featured-products d-flex flex-column align-items-center">
      <h2 className="mt-4 text-center">Productos Destacados</h2>
      <div id={carouselId} className="carousel carousel-dark slide" style={{ maxWidth: '800px' }} data-bs-ride="carousel">
        <div className="carousel-indicators">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Producto destacado ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {products.map((product, index) => (
            <div key={product.id} className={`carousel-item${index === 0 ? ' active' : ''}`}>
              {product.image && (
                <img
                  src={product.image}
                  className="d-block mx-auto m-img"
                  style={{ maxHeight: '600px' }}
                  alt={product.name}
                />
              )}
              <div className="carousel-caption text-dark">
                <h5>{product.name}</h5>
              </div>
            </div>
          ))}
        </div>
        {products.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Siguiente</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
