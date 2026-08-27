import { useState } from 'react';
import laptop from '../assets/product/laptop.jpg';
import mouse from '../assets/product/mouse.jpg';
import teclado from '../assets/product/teclado.jpg';
import audifonos from '../assets/product/audifonos.jpg';

export default function ProductDetail({ productId, onClose }) {
    const [quantity, setQuantity] = useState(1);

    const products = [
        { 
            id: 0,
            img: laptop, 
            name: "Laptop Pro 15", 
            description: "Procesador de alto rendimiento para trabajo pesado", 
            price: 1200.00,
            specs: [
                "Procesador Intel Core i7",
                "RAM 16GB DDR4",
                "SSD 512GB NVMe",
                "Pantalla 15.6\" FHD",
                "GPU NVIDIA RTX 3060"
            ]
        },
        { 
            id: 1,
            img: mouse, 
            name: "Mouse Ergonómico", 
            description: "Sensor óptico 16000 DPI con 6 botones programables", 
            price: 45.00,
            specs: [
                "Sensor óptico 16000 DPI",
                "6 botones programables",
                "Conexión inalámbrica 2.4GHz",
                "Batería 30 horas",
                "Peso ligero 95g"
            ]
        },
        { 
            id: 2,
            img: teclado, 
            name: "Teclado Mecánico RGB", 
            description: "Switches Red, retroiluminado, distribución en español", 
            price: 85.00,
            specs: [
                "Switches Gateron Red",
                "Retroiluminación RGB",
                "Distribución en español",
                "Conexión USB-C",
                "Estructura de aluminio"
            ]
        },
        { 
            id: 3,
            img: audifonos, 
            name: "Audífonos Inalámbricos", 
            description: "Cancelación de ruido activa, Bluetooth 5.2", 
            price: 150.00,
            specs: [
                "Cancelación de ruido activa ANC",
                "Bluetooth 5.2",
                "Batería 40 horas",
                "Sonido estéreo envolvente",
                "Estuche de carga portátil"
            ]
        }
    ];

    const product = products[productId];

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    const handleAddToCart = () => {
        alert(`${quantity} ${product.name}(s) añadido(s) al carrito`);
        setQuantity(1);
    };

    return (
        <div className="container mt-4">
            {/*<button onClick={onClose} className="btn btn-secondary mb-4">
                ← Volver a Productos
            </button>*/}
            <div className="row">
                <div className="col-md-6 mb-4 text-center">
                    <img 
                        src={product.img} 
                        alt={product.name} 
                        className="img-fluid rounded"
                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className='text-center'>{product.name}</h1>
                    <h3 className="text-primary mb-3 text-center">${product.price.toFixed(2)}</h3>
                    
                    <p className="lead text-center">{product.description}</p>
                    <hr />
                    <h5>Especificaciones:</h5>
                    <ul className="list-group mb-4 text-right">
                        {product.specs.map((spec, index) => (
                            <li key={index} className="list-group-item">
                                {spec}
                            </li>
                        ))}
                    </ul>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="form-label">Cantidad:</label>
                        <div className="input-group mb-3" style={{ maxWidth: '150px' }}>
                            <button 
                                className="btn btn-outline-secondary" 
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                className="form-control text-center" 
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                            <button 
                                className="btn btn-outline-secondary" 
                                type="button"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        className="btn btn-primary btn-lg w-100 mb-2 mb-5"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
