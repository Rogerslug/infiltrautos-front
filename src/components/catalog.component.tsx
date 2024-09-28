// src/pages/Catalog.tsx
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard.component'
import { getProducts } from '../services/productApi'
import IProductCard from '../interfaces/productCard.interface'
import showDetails from '../components/showDetails.component'
import { useNavigate } from 'react-router-dom';

import Dummy1 from '../assets/dummy1.jpeg'
import Dummy2 from '../assets/dummy2.jpeg'
import Dummy3 from '../assets/dummy3.jpeg'
import Dummy4 from '../assets/dummy4.jpeg'
import Dummy5 from '../assets/dummy5.jpeg'
import Dummy6 from '../assets/dummy6.jpeg'
import Dummy7 from '../assets/dummy7.jpeg'
import Dummy8 from '../assets/dummy8.jpeg'
import Dummy9 from '../assets/dummy9.jpeg'

const productos = [
  { id: 1, image: Dummy1, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 1" },
  { id: 2, image: Dummy2, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 2" },
  { id: 3, image: Dummy3, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 3" },
  { id: 4, image: Dummy4, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 4" },
  { id: 5, image: Dummy5, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 5" },
  { id: 6, image: Dummy6, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 6" },
  { id: 7, image: Dummy7, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 7" },
  { id: 8, image: Dummy8, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 8" },
  { id: 9, image: Dummy9, name: "TextoDummy", price: '$00.00', descripcion: "Descripción del dummy 9" }
]

const Catalog: React.FC = () => {
  const navigate = useNavigate();

  const showDetails = (product: IProductCard) => {
    navigate(`/product/${product.id}`, { state: { product } })
  };

  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<IProductCard[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const { products, total } = await getProducts(page, itemsPerPage)
            setProducts(products)
            setTotalPages(Math.ceil(total / itemsPerPage))
        } catch (error) {
            console.log("Error al obtener productos", error)
        }
    }

    fetchProducts()
  }, [page])

  return (
    <div className="catalog-page">
      <h1>Catálogo de Productos</h1>
      <div className="product-list">
        {productos.map((product) => (  
          <ProductCard key={product.id} image={product.image} name={product.name} price={product.price} onClick={() => showDetails(product)} />
        ))}
      </div>
      <div className="pagination">
        <button className="pagination-button" onClick={() => setPage((prev: number) => prev - 1)} disabled={page === 0}>Anterior</button>
        <span>Página {page}</span>
        <button className="pagination-button" onClick={() => setPage((prev: number) => prev + 1)} disabled={page === 10}>Siguiente</button> 
      </div>
    </div>
  );
};

export default Catalog