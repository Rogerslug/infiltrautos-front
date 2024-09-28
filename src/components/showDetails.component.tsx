// src/components/showDetails.component.tsx
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Dummy1 from '../assets/dummy1.jpeg'
import Dummy2 from '../assets/dummy2.jpeg'
import Dummy3 from '../assets/dummy3.jpeg'
import Dummy4 from '../assets/dummy4.jpeg'
import Dummy5 from '../assets/dummy5.jpeg'
import Dummy6 from '../assets/dummy6.jpeg'
import Dummy7 from '../assets/dummy7.jpeg'
import Dummy8 from '../assets/dummy8.jpeg'
import Dummy9 from '../assets/dummy9.jpeg'

const dummyProducts = [
  { id: 1, image: Dummy1, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 1", rating: 4},
  { id: 2, image: Dummy2, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 2", rating: 5},
  { id: 3, image: Dummy3, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 3", rating: 3},
  { id: 4, image: Dummy4, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 4", rating: 2},
  { id: 5, image: Dummy5, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 5", rating: 1},
  { id: 6, image: Dummy6, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 6", rating: 5},
  { id: 7, image: Dummy7, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 7", rating: 4},
  { id: 8, image: Dummy8, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 8", rating: 3},
  { id: 9, image: Dummy9, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 9", rating: 2}
]

/* interface ShowDetailsProps {
  product: IProductCard;
}

const ShowDetails: React.FC = () => {
  const location = useLocation()
  const { product } = location.state || {}

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  return (
    <div className="product-details-page">
      <button className="back-button" onClick={() => window.history.back()}>Volver</button>
      <div className="product-details-container">
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2 className="product-detail-name">{product.name}</h2>
          <p className="product-detail-price">{product.price}</p>
          <p className="product-detail-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
 */

// Componente para mostrar las estrellas de calificación
const StarRating = ({ rating}: { rating: number }) => {
    return (
        <div className='star-rating'>
            { Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                    { index < rating ? '★' : '☆' }
                </span>
            ))}
        </div>
    )
}

// Componente de detalles del producto dummy

const ShowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>() // Obtener el parámetro del id de la URL
    const navigate = useNavigate()
    const [cart, setCart] = useState<any[]>([])

    // Buscar producto dummy basado en el id
    const dummyProduct = dummyProducts.find((product) => product.id === Number(id))

    if (!dummyProduct) {
        return <div>Producto no encontrado</div>
    }

    // Función para agregar al carrito
    const handleAddToCart = () => {
        setCart([...cart, dummyProduct])
        alert(`${dummyProduct.name} agregado al carrito`)
    }

    return (
        <div className="product-details-page">
            <div className="breadcrumb">
                <button onClick={() => navigate(-1)} className="breadcrumb-button">Inicio</button>
                <span> {'>'} </span>
                <h1 className="breadcrumb-text">Detalles</h1>
            </div>
            <div className="product-details-container">
                <img src={dummyProduct.image} alt={dummyProduct.name} className="product-detail-image" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                <div className="product-detail-info">
                    <h2 className="product-detail-name">{dummyProduct.name}</h2>
                    <p className="product-detail-price">{dummyProduct.price}</p>
                    <p className="product-detail-description">{dummyProduct.description}</p>

                    {/* Mostrar la calificación de estrellas */}
                    <StarRating rating={dummyProduct.rating} />

                    {/* Botón para agregar al carrito */}
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    )
    
} 

export default ShowDetails