// src/services/productApi.ts
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default class ProductApi {
    async getProduct(itemId: number) {
        try {
            const response = await axios.get(`${API_URL}/getProduct`, {
                params: {
                    id: itemId
                }
            })
            console.log("Producto obtenido:", response.data)
            return response.data
        } catch (error) {
            console.log("Error al obtener el producto:", error)
            return null
        }
    }

    async getAllFilters() { // Obtener todos los filtros de aire de automóviles
        try {
            console.log("Ejecutando getAllFilters")
            const allFilters = await axios.post(`${API_URL}/querySql`, {
                query: "SELECT * FROM Filtros"
            })
            //console.log("Filtros recuperados desde la clase", allFilters.data)
            return allFilters.data.data
        } catch (error) {
            console.log("Error al obtener filtros:", error)
        }
    }
}
