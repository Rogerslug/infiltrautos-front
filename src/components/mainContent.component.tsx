// mainContent.component.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/productCard.component'
import { useNavigate } from 'react-router-dom'
import ProductApi from '../services/productApi'
import IProductCard from '../interfaces/productCard.interface'
import Banner from '../assets/Banner.jpeg'

const MainContent: React.FC = () => {
    const navigate = useNavigate()
    const [transformedP, setTransformedP] = useState<IProductCard[]>([])
    const itemsPerPage = 8
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await new ProductApi().getAllFilters()
                const transformedProducts = response.map((item: any[]) => ({
                    id: item[0],
                    name: item[1],
                    image: `${process.env.PUBLIC_URL}/img/${item[4]}`,
                    price: item[5],
                    description: item[7],
                }))
                setTransformedP(transformedProducts)
                setTotalPages(Math.ceil(transformedProducts.length / itemsPerPage))
            } catch (error) {
                console.log("Error al obtener productos", error)
            }
        }
        fetchProducts()
    }, [])

    const startIndex = (page - 1) * itemsPerPage
    const currentProducts = transformedP.slice(startIndex, startIndex + itemsPerPage)

    return (
        <main className="main-content">
            <div className="breadcrumb">
                <button className="breadcrumb-button">Inicio</button>
                <span> {'>'} </span>
            </div>
            <div className="container">
                <div className="intro-text">
                        <div className="text-box">Trabajamos con las mejores marcas del mercado para asegurar que tu coche reciba el mejor cuidado.</div>
                        <div className="text-box">Ofrecemos precios justos y accesibles para que mantengas tu vehículo en perfectas condiciones sin gastar de más.</div>
                        <div className="text-box">Recibe tus productos en la puerta de tu casa de manera rápida y segura.</div>
                    </div>
                <div className="ad-image">
                    <img className="ad-image" src={Banner} alt="Imagen decorativa" />
                </div>
            </div>
            <div className="product-list">
                {currentProducts.map((product) => (
                    <ProductCard 
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        stock={product.stock} // Agregado para cumplir con la interfaz IProductCard
                        type={product.type} // Agregado para cumplir con la interfaz IProductCard
                        description={product.description}
                        onClick={() => navigate(`/product/${product.id}`)}
                    />
                ))}
            </div>
            <div className="pagination">
                <button className="pagination-button" onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))} disabled={page === 1}>Anterior</button>
                <span>Página {page} de {totalPages}</span>
                <button className="pagination-button" onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Siguiente</button>
            </div>
        </main>
    )
}

export default MainContent;
