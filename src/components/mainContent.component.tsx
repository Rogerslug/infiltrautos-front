// mainContent.component.tsx
import React from 'react';
import ProductCard from '../components/productCard.component'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import IProductCard from '../interfaces/productCard.interface'

import ProductCardProps from '../interfaces/productCard.interface'


import Banner from '../assets/Banner.jpeg'
import Dummy1 from '../assets/dummy1.jpeg'
import Dummy2 from '../assets/dummy2.jpeg'
import Dummy3 from '../assets/dummy3.jpeg'
import Dummy4 from '../assets/dummy4.jpeg'
import Dummy5 from '../assets/dummy5.jpeg'
import Dummy6 from '../assets/dummy6.jpeg'
import Dummy7 from '../assets/dummy7.jpeg'
import Dummy8 from '../assets/dummy8.jpeg'
import Dummy9 from '../assets/dummy9.jpeg'

const MainContent: React.FC = () => {
    const [page, setPage] = useState(1)
    const location = useLocation()
    const productos = [
        { id: 1, image: Dummy1, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 1" },
        { id: 2, image: Dummy2, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 2" },
        { id: 3, image: Dummy3, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 3" },
        { id: 4, image: Dummy4, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 4" },
        { id: 5, image: Dummy5, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 5" },
        { id: 6, image: Dummy6, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 6" },
        { id: 7, image: Dummy7, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 7" },
        { id: 8, image: Dummy8, name: "TextoDummy", price: '$00.00', description: "Descripción del dummy 8" }
    ]

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
                {productos.map((product) => <ProductCard key={product.id} image={product.image} name={product.name} price={product.price} description={product.description} />)}
            </div>
            <div className="pagination">
                <button className="pagination-button" onClick={() => setPage((prev: number) => prev - 1)} disabled={page === 0}>Anterior</button>
                <span>Página {page}</span>
                <button className="pagination-button" onClick={() => setPage((prev: number) => prev + 1)} disabled={page === 10}>Siguiente</button>
            </div>
        </main>
    )
}

export default MainContent;
