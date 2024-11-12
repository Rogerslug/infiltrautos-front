import IProductCard from "./productCard.interface";

export default interface ICartContext {
    cart: IProductCard[];
    addToCart: (product: IProductCard) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void; // Nueva función para aumentar la cantidad
    decreaseQuantity: (id: number) => void; // Nueva función para disminuir la cantidad
    clearCart: () => void; // Nueva función para limpiar el carrito
    createOrder: () => Promise<string>;
}
