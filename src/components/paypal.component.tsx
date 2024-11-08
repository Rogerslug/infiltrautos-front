// src/components/paypal.component.tsx

import React, { useState } from 'react';

const Paypal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <div>
            <button onClick={handleShow}>PayPal</button>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Formulario de Pago de PayPal</h5>
                                <button type="button" className="close-button" onClick={handleClose}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" />
                                        <small className="form-text">Ingrese su email</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password" className="form-control" id="password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amount">Monto</label>
                                        <input type="number" className="form-control" id="amount" />
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

export default Paypal;
