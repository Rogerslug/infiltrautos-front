import React from 'react';
import Dummy1 from '../assets/dummy1.jpeg';
import Dummy2 from '../assets/dummy2.jpeg';
import Dummy3 from '../assets/dummy3.jpeg';
import Dummy4 from '../assets/dummy4.jpeg';

const dummyProducts = [
  { id: 1, image: Dummy1, name: "Filtro Panel", price: 420.00 },
  { id: 2, image: Dummy2, name: "Filtro Doble Panel", price: 500.00 },
  { id: 3, image: Dummy3, name: "STP ST12404", price: 400.00 },
  { id: 4, image: Dummy4, name: "STP90136", price: 350.00 }
];

const Cart: React.FC = () => {
    // Calcular el total del pedido
    const total = dummyProducts.reduce((acc, product) => acc + product.price, 0);

    return (
        <div className="cart-page">
            <div className="cart-products">
                {dummyProducts.map((product) => (
                    <div key={product.id} className="cart-product">
                        <img src={product.image} alt={product.name} className="cart-product-image" />
                        <div className="cart-product-info">
                            <p>{product.name}</p>
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h2>Resumen del pedido</h2>
                <ul>
                    {dummyProducts.map((product) => (
                        <li key={product.id}>
                            {product.name} <span>${product.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="cart-total">
                    <strong>Total: </strong>${total.toFixed(2)}
                </div>
                <button className="checkout-button">Proceder a la Compra</button>
            </div>
        </div>
    );
};

export default Cart
