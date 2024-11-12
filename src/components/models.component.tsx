import React, { useEffect, useState } from 'react';
import ProductCard from './productCard.component';
import ProductApi from '../services/productApi';
import IProductCard from '../interfaces/productCard.interface';
import { useNavigate } from 'react-router-dom';

const Models: React.FC = () => {
    const navigate = useNavigate();
    const [transformedP, setTransformedP] = useState<IProductCard[]>([]);
    const [marca, setMarca] = useState<string | undefined>();
    const [modelo, setModelo] = useState<string | undefined>();
    const [año, setAño] = useState<number | undefined>();
    const [marcas, setMarcas] = useState<string[]>([]);
    const [modelos, setModelos] = useState<string[]>([]);
    const [años, setAños] = useState<number[]>([]);
    const itemsPerPage = 20;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async () => {
        try {
            setTransformedP([]); // Limpiamos la lista de productos antes de actualizarla

            const response = await new ProductApi().getFilteredProducts(marca, modelo, año);
            const transformedProducts = response.map((item: any[]) => ({
                id: item[0],
                name: item[1],
                material: item[2],
                stock: item[3],
                image: `${process.env.PUBLIC_URL}/img/${item[4]}`,
                price: item[5],
                type: item[6],
                description: item[7],
                sku: item[8]
            }));
            // Eliminar duplicados usando Set
            const uniqueProducts = transformedProducts.reduce((acc: any, curr: any) => {
                const stringifiedProduct = JSON.stringify(curr);
                if (!acc.some((p: any) => JSON.stringify(p) === stringifiedProduct)) {
                  acc.push(curr);
                }
                return acc;
              }, []);
            setTransformedP(uniqueProducts);
            setTotalPages(Math.ceil(uniqueProducts.length / itemsPerPage));
        } catch (error) {
            console.log("Error al obtener productos", error);
        }
    };

    const fetchAutoFilters = async () => {
        try {
            setTransformedP([]); // Limpiamos la lista de productos antes de actualizarla
            const response = await new ProductApi().getAutoFilters();
            console.log("Respuesta de filtros de autos:", response);
    
            // Asumiendo que cada elemento en `response` tiene la estructura [marca, modelo, año]
            const uniqueMarcas = Array.from(new Set(response.map((item) => item[0])));
            const uniqueModelos = Array.from(new Set(response.map((item) => item[1])));
            const uniqueAños = Array.from(new Set(response.map((item) => item[2])));
    
            setMarcas(uniqueMarcas);
            setModelos(uniqueModelos);
            setAños(uniqueAños);
        } catch (error) {
            console.error("Error al obtener filtros de autos", error);
        }
    };

    const fetchModelAndYears = async (selectedMarca: string) => {
        try {
            setModelos([]);
            setAños([]);
            // Obtenemos los modelos y años para la marca seleccionada
            const response = await new ProductApi().getModelsAndYearsByMarca(selectedMarca);
            console.log("Resposne modelAndYears", response)
            // Asumiendo que cada elemento en `response` tiene la estructura [[modelo], [año]]
            const uniqueModelos = Array.from(new Set(response.modelos))
            console.log("uniqueModelos", uniqueModelos)
            const uniqueAños = Array.from(new Set(response.años))
            console.log("uniqueAños", uniqueAños)
            setModelos(uniqueModelos);
            setAños(uniqueAños);
        } catch (error) {
            console.error("Error al obtener modelos y años", error);
            setModelos([]);
            setAños([]);
        }
    }
        

    useEffect(() => {
        // Solo cargamos los filtros al montar el componente
        fetchAutoFilters();
    }, []);

    useEffect(() => {
        if (marca) {
            fetchModelAndYears(marca);
            setModelo(undefined);
            setAño(undefined)
        } else {
            setModelos([]);
            setAños([]);
        }
    }, [marca]);


    const handleSearch = () => {
        fetchProducts();
        setPage(1); // Reinicia la página a 1 después de buscar
    };
    

    const startIndex = (page - 1) * itemsPerPage;
    const currentProducts = transformedP.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="catalog-page">
            <h1>Búsca tus productos</h1>
            <div className="filters">
                <select value={marca} onChange={(e) => setMarca(e.target.value)}>
                    <option value="">Selecciona Marca</option>
                    {marcas.map((marca, index) => (
                        <option key={`marca-${index}-${marca}`} value={marca}>{marca}</option>
                    ))}
                </select>
                <select value={modelo} onChange={(e) => setModelo(e.target.value)}>
                    <option value="">Selecciona Modelo</option>
                    {modelos.map((modelo, index) => (
                        <option key={`modelo-${index}-${modelo}`} value={modelo}>{modelo}</option>
                    ))}
                </select>
                <select value={año} onChange={(e) => setAño(parseInt(e.target.value, 10))}>
                    <option value="">Selecciona Año</option>
                    {años.map((año, index) => (
                        <option key={`año-${index}-${año}`} value={año}>{año}</option>
                    ))}
                </select>
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <div className="product-list">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            type={product.type}
                            onClick={() => navigate(`/product/${product.id}`)}
                            description={product.description}
                            sku={product.sku}
                        />
                    ))
                ) : (
                    <p>No se encontraron productos para los filtros seleccionados.</p>
                )}
            </div>

            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button
                    className="pagination-button"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Models;
