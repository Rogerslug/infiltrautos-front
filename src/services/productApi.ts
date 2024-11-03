// src/services/productApi.ts
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default class ProductApi {
    async getProduct(page: number, itemsPerPage: number) {
        const index = itemsPerPage
        try {
            const response = await axios.get(`${API_URL}/=${page}&limit=${index}`)
            console.log("response desde la clase productApi", response)
            console.log("response.data desde la clase", response.data)
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getAllFilters() { // Obtener todos los filtros de aire de automóviles
        try {
            console.log("Ejecutando getAllFilters")
            const allFilters = await axios.post('http://localhost:5000/api/querySql', {
                query: "SELECT * FROM Filtros"
            })
            console.log("Filtros recuperados desde la clase", allFilters.data)
            return allFilters.data
        } catch (error) {
            console.log(error)
        }
    }
}
