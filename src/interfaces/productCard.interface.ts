// productCard.interface.tsx
interface IProductCard {
    id: number;
    product?: IProductCard;
    image: string;
    name: string;
    price: number;
    description?: string;
    material?: string;
    stock: number;
    type: string;
    sku?: string;
    rating?: number;
    onClick?: any;
    quantity?: number; // Nuevo campo para la cantidad en el carrito
}

export default IProductCard;
