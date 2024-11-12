import React, { useContext, useState } from 'react'; 
import { CartContext } from '../context/CartContext';

const Cart: React.FC = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Cart debe ser utilizado dentro de un CartProvider");
    }

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = context;
    const total = cart.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
    const [showPaypalModal, setShowPaypalModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);

    const handleCheckout = () => {
        setShowPaypalModal(true);
    };

    const handleQuantityChange = (productId: number, delta: number) => {
        if (delta === 1) {
            increaseQuantity(productId);
        } else if (delta === -1) {
            decreaseQuantity(productId);
        }
    };

    const onApprove = () => {
        setShowPaypalModal(false);
        setShowInvoiceModal(true);
    };

    const handleInvoiceClose = () => {
        setShowInvoiceModal(false);
        clearCart();
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
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                </div>
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
                            {product.name} x {product.quantity} <span>${(product.price * (product.quantity || 1)).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="cart-total">
                    <strong>Total: </strong>${total.toFixed(2)}
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Proceder a la Compra</button>
            </div>

            {/* Modal de Pasarela de Pago */}
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
                                    onApprove();
                                }}>
                                    {/* Formulario de pago */}
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre completo</label>
                                        <input type="text" id="name" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo electrónico</label>
                                        <input type="email" id="email" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Dirección</label>
                                        <input type="text" id="address" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="creditCard">Número de tarjeta de crédito</label>
                                        <input type="text" id="creditCard" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expiryDate">Fecha de expiración</label>
                                        <input type="text" id="expiryDate" className="form-control" placeholder="MM/AA" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cvv">CVV</label>
                                        <input type="text" id="cvv" className="form-control" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Pagar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Compra */}
            {showInvoiceModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Compra Exitosa</h5>
                                <button onClick={handleInvoiceClose} className="close-button">
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6>Gracias por tu compra. Aquí está tu factura:</h6>
                                <ul>
                                    {cart.map((product) => (
                                        <li key={product.id}>
                                            {product.name} x {product.quantity} - ${product.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <div className="invoice-total">
                                    <strong>Total Pagado: </strong>${total.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
