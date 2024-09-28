// footer.component.tsx
import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <p>© 2024 INFILTRAUTOS. Todos los derechos reservados.</p>
                </div>
                <div className="footer-section">
                    <a href="/contacto">Contacto</a>
                    <a href="/negocios">Negocios</a>
                </div>
                <div className="footer-selection social-icons">
                    <a href="#"><i className="fab fa-cc-visa"></i></a>
                    <a href="#"><i className="fab fa-cc-mastercard"></i></a>
                    <a href="#"><i className="fab fa-cc-amex"></i></a>
                </div>
                <div className="footer-section">
                    <p>¡Enterate de nuestras novedades!</p>
                    <form className= "suscribe-form">
                        <input type="email" placeholder="Correo electrónico" />
                        <button type="submit">Suscribirse</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer