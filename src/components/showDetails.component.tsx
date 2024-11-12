// src/components/showDetails.component.tsx
import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductApi from '../services/productApi'
import Rag from './rag.component';
import { CartContext } from '../context/CartContext';
import IProductCard from '../interfaces/productCard.interface';

// Componente para mostrar las estrellas de calificación
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className='star-rating'>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                    {index < rating ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

// Componente de detalles del producto
const ShowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProductCard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const productApi = new ProductApi();
    const navigate = useNavigate();

    const context = useContext(CartContext);
    if (!context) {
        throw new Error("ShowDetails must be used within a CartProvider");
    }

    const { addToCart } = context
    console.log(context)
    

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await productApi.getProduct(Number(id))
                if (response && response.ok) {
                    const fetchedProduct = response.data[0]
                    setProduct({
                        id: fetchedProduct[0],
                        name: fetchedProduct[1],
                        material: fetchedProduct[2],
                        stock: fetchedProduct[3],
                        image: `${process.env.PUBLIC_URL}/img/${fetchedProduct[4]}`,
                        price: fetchedProduct[5],
                        type: fetchedProduct[6],
                        description: fetchedProduct[7],
                        sku: fetchedProduct[8],
                        rating: fetchedProduct[9]
                    })
                } else {
                    setError('Producto no encontrado')
                }
            } catch (err) {
                setError('Error al obtener el producto')
            } finally {
                setLoading(false)
            }
        };

        fetchProduct();
    }, [id]);
    
    if (loading) {
        return <div>Cargando...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!product) {
        return <div>Producto no encontrado</div>
    }

    const handleAddToCart = () => {
        if (product) {
            try {
                const productToAdd = {
                    ...product,
                    price: Number(product.price)
                };
                console.log(`El producto ${product.name} fue agregado al carrito, producto: ${JSON.stringify(productToAdd)}`);
                addToCart(productToAdd);
                alert(`${product.name} agregado al carrito`);
            } catch (error) {
                console.error("Error al agregar al carrito:", error);
                alert("No se pudo agregar el producto al carrito. Inténtalo de nuevo.");
            }
        }
    }

    return (
        <div className="product-details-page">
            <div className="breadcrumb">
              <button onClick={() => navigate('/')} className="breadcrumb-button">Inicio</button>
              <span> {'>'} </span>                
              <button onClick={() => navigate('/catalogo')} className="breadcrumb-button">Catálogo</button>
              <span> {'>'} </span>
              <h1 className="breadcrumb-text">Detalles</h1>
            </div>
            <div className="product-details-container">
                <img src={product.image} alt={product.name} className="product-detail-image" />
                <div className="product-detail-info">
                    <h2 className="product-detail-name">{product.name}</h2>
                    <p className="product-detail-price">${product.price}</p>
                    <p className="product-detail-description">{product.description}</p>
                    <p className="product-detail-material">Material: {product.material}</p>
                    <p className="product-detail-stock">Stock: {product.stock}</p>
                    <p className="product-detail-type">Tipo: {product.type}</p>
                    <p className="product-detail-sku">SKU: {product.sku}</p>

                    {/* Mostrar la calificación de estrellas si está disponible */}
                    {product.rating && <StarRating rating={product.rating} />}

                    {/* Botón para agregar al carrito */}
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Agregar al carrito</button>
                </div>
            </div>
            <div className="RAG">
                <Rag ShowDetails={product} />
            </div>
        </div>
    )
}

export default ShowDetails