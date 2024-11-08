// src/interfaces/ICartContext.ts
import IProductCard from "./productCard.interface";

export default interface ICartContext {
    cart: IProductCard[]
    addToCart: (product: IProductCard) => void
    removeFromCart: (id: number) => void
}