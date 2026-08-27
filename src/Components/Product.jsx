import laptop from '../assets/product/laptop.jpg';
import mouse from '../assets/product/mouse.jpg';
import teclado from '../assets/product/teclado.jpg';
import audifonos from '../assets/product/audifonos.jpg';

export default function Product({ onSelectProduct }) {
    const products = [
        { id: 0, img: laptop, name: "Laptop Pro 15", description: "Procesador de alto rendimiento para trabajo pesado", price: 1200.00 },
        { id: 1, img: mouse, name: "Mouse Ergonómico", description: "Sensor óptico 16000 DPI con 6 botones programables", price: 45.00 },
        { id: 2, img: teclado, name: "Teclado Mecánico RGB", description: "Switches Red, retroiluminado, distribución en español", price: 85.00 },
        { id: 3, img: audifonos, name: "Audífonos Inalámbricos", description: "Cancelación de ruido activa, Bluetooth 5.2", price: 150.00 },
    ];

    return (
        <>
            <br/><h2 className='text-center'>Productos</h2><br/>
            <div className="container">
                <div className="row g-4">   
                    {products.map((product) => (
                        <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
                            <div className="card h-100">
                                <img src={product.img} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Precio: ${product.price}</p>
                                    <button 
                                        onClick={() => onSelectProduct(product.id)}
                                        className="btn btn-primary w-100"
                                    >
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div><br/><br/>
            </div>
        </>
    );
}