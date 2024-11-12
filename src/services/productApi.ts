// src/services/productApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default class ProductApi {
    async getProduct(itemId: number) {
        try {
            console.log("Ejecutando getProduct");
            const response = await axios.get(`${API_URL}/getProduct`, {
                params: {
                    id: itemId
                }
            })
            console.log("Producto obtenido:", response.data)
            return response.data;
        } catch (error) {
            console.log("Error al obtener el producto:", error)
            return null;
        }
    }

    async getAllFilters() {
        try {
            console.log("Ejecutando getAllFilters");
            const allFilters = await axios.post(`${API_URL}/querySql`, {
                query: "SELECT * FROM Filtros"
            });
            console.log("Filtros obtenidos:", allFilters.data.data);
            return allFilters.data.data;
        } catch (error) {
            console.log("Error al obtener filtros:", error);
        }
    }

    async getFilteredProducts(marca?: string, modelo?: string, año?: number) {
        try {
            const response = await axios.post(`${API_URL}/querySql`, {
                query: `SELECT F.* FROM Filtros F JOIN Autos A ON F.id_filtros = A.id_filtros 
                        WHERE (${marca ? `A.marca = '${marca}'` : '1=1'}) AND 
                              (${modelo ? `A.modelo = '${modelo}'` : '1=1'}) AND 
                              (${año ? `A.año = ${año}` : '1=1'})`
            });
            return response.data.data;
        } catch (error) {
            console.log("Error al obtener filtros filtrados:", error);
        }
    }

    async getAutoFilters(): Promise<any[]> { 
        try { 
            const response = await axios.post(`${API_URL}/querySql`, { query: "SELECT DISTINCT marca, modelo, año FROM Autos" });
            console.log("Filtros de autos obtenidos desde la base de datos:", response.data.data);
            return response.data.data as any[]; // Forzamos el tipo
        } catch (error) { 
            console.log("Error al obtener los filtros de autos:", error); 
            return []; // Retornamos un array vacío en caso de error
        } 
    }
    async getModelsAndYearsByMarca(marca: string): Promise<{ modelos: string[], años: number[] }> {
        try {
            const response = await axios.post(`${API_URL}/querySql`, {
                query: `SELECT DISTINCT modelo, año FROM Autos WHERE marca = '${marca}'`
            });
            console.log("Modelos y años obtenidos desde la base de datos:", response.data.data);
            // Asumimos que response.data.data es un array de objetos con propiedades modelo y año
            const modelos = response.data.map((item: any) => item.modelo);
            const años = response.data.map((item: any) => item.año);
            return { modelos, años };
        } catch (error) {
            console.log("Error al obtener los modelos y años:", error);
            return { modelos: [], años: [] }; // Retornamos un objeto vacío en caso de error
        }
    }
}    