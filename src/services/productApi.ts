import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const getProducts = async (page: number, itemsPerPage: number) => {
    const index = itemsPerPage;
    try {
        const response = await axios.get(`${API_URL}/products?page=${page}&limit=${index}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default getProducts