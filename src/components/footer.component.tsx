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
                    <a href="/m&v">Misión y valores</a>
                </div>
                <div className="footer-selection social-icons">
                    <a href="#"><i className="fab fa-cc-visa"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer