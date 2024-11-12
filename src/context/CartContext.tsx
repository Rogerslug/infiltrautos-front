import React, { createContext, useState, useEffect, ReactNode } from 'react';
import IProductCard from '../interfaces/productCard.interface';

interface CartContextType {
    cart: IProductCard[];
    addToCart: (product: IProductCard) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
    createOrder: () => Promise<string>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<IProductCard[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: IProductCard) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== id));
    };

    const increaseQuantity = (id: number) => {
        setCart((prevCart) =>
            prevCart.map(product =>
                product.id === id ? { ...product, quantity: (product.quantity || 1) + 1 } : product
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart((prevCart) =>
            prevCart.map(product =>
                product.id === id && product.quantity && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const calculateTotal = () => {
        return cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
    };

    const createOrder = async () => {
        const total = calculateTotal();
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ total }),
            });
            const data = await response.json();
            return data.orderID;
        } catch (error) {
            console.error("Error al crear la orden:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    );
};
