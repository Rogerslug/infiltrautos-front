// src/components/cart.component.tsx
import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

const Cart: React.FC = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("Cart debe ser utilizado dentro de un CartProvider")
    }

    const { cart, removeFromCart } = context;
    const total = cart.reduce((acc, product) => acc + product.price, 0)
    const [showPaypalModal, setShowPaypalModal] = useState(false)

    const handleCheckout = () => {
        setShowPaypalModal(true)
    }

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total.toFixed(2),
                },
            }],
        }).then((orderID: string) => {
            return orderID
        })
    }

    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            alert(`Transacción completada por ${details.payer.name.given_name}`);
            setShowPaypalModal(false)
        });
    };

    return (
        <div className="cart-page">
            <div className="cart-products">
                {cart.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    cart.map((product) => (
                        <div key={product.id} className="cart-product">
                            <img src={product.image} alt={product.name} className="cart-product-image" />
                            <div className="cart-product-info">
                                <p>{product.name}</p>
                                <p>${product.price.toFixed(2)}</p>
                                <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-summary">
                <h2>Resumen del pedido</h2>
                <ul>
                    {cart.map((product) => (
                        <li key={product.id}>
                            {product.name} <span>${product.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="cart-total">
                    <strong>Total: </strong>${total.toFixed(2)}
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Proceder a la Compra</button>
            </div>

            {/* Modal de PayPal */}
            {showPaypalModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Completa tu pago</h5>
                                <button onClick={() => setShowPaypalModal(false)} className="close-button">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    // Aquí puedes manejar el envío del formulario
                                    // Por ejemplo, podrías llamar a createOrder aquí
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Monto</label>
                                        <input type="number" className="form-control" id="amount" value={total.toFixed(2)} readOnly />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Pagar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart