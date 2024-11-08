// src/context/CartContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import IProductCard from '../interfaces/productCard.interface';

interface CartContextType {
    cart: IProductCard[];
    addToCart: (product: IProductCard) => void;
    removeFromCart: (id: number) => void;
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
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== id));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, product) => acc + product.price, 0);
    };

    const createOrder = async () => {
        const total = calculateTotal();
        // Aquí puedes hacer la llamada a la API de PayPal para crear la orden
        // Asegúrate de manejar la respuesta y errores
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ total }),
            });
            const data = await response.json();
            return data.orderID; // Devuelve el ID de la orden creada
        } catch (error) {
            console.error("Error al crear la orden:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, createOrder }}>
            {children}
        </CartContext.Provider>
    );
};
