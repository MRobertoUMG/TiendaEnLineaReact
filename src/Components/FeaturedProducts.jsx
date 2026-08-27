import laptop from '../assets/product/laptop.jpg';
import teclado from '../assets/product/teclado.jpg';
import mouse from '../assets/product/mouse.jpg';

export default function FeaturedProducts() {
  return (
    <div className="featured-products d-flex flex-column align-items-center">
      <h2 className="mt-4 text-center">Productos Destacados</h2>
      <div id="carouselExampleCaptions" class="carousel carousel-dark slide" style={{maxWidth: '800px'}} data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src={laptop} class="d-block mx-auto m-img" style={{maxHeight: '600px'}} alt="laptop"/>
            <div class="carousel-caption d-none d-md-block text-dark">
                <h5>Laptop Pro 15</h5>
            </div>
            </div>
            <div class="carousel-item">
            <img src={teclado} class="d-block mx-auto  m-img" style={{maxHeight: '600px'}} alt="teclado"/>
            <div class="carousel-caption d-none d-md-block  text-dark">
                <h5>Teclado Mecánico RGB</h5>
            </div>
            </div>
            <div class="carousel-item">
            <img src={mouse} class="d-block mx-auto  m-img" style={{maxHeight: '600px'}} alt="mouse"/>
            <div class="carousel-caption d-none d-md-block  text-dark">
                <h5>Mouse Ergonómico</h5>
            </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
    </div>
  )
}