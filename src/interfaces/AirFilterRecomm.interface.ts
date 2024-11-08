interface IAirFilterRecomm {
    ShowDetails: {
        name: string
        price: number // Asegúrate de que sea string
        description?: string
        rating?: number
        type: string
        material: string
        stock: number
    }
}

export default IAirFilterRecomm