// productCard.interface.tsx
interface IProductCard {
    id?: number
    product?: IProductCard
    image: string
    name: string
    price: string
    description?: string
    onClick?: any
}

export default IProductCard