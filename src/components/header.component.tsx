import React from 'react'
import infIcon from '../assets/INFILTRAUTOS icon.png'

const Header: React.FC = () => {

  return (
    <header className="header">
      <div className="logo">
        <img src={infIcon} alt="Logo" />
        <nav className="nav">
        <a href="/">INFILTRAUTOS</a>
        </nav>
      </div>
      <nav className="nav">
        <a href="/catalogo">Catálogo</a>
        <a href="/categorias">Categorías</a>
        <a href="/modelos">Modelos</a>
      </nav>
      <div className="search-cart">
        <input type="text" placeholder="Buscar..." />
        <button className="search-button">🔍</button>
        <a href="/carrito" className="cart-link">🛒 Carrito de compra</a>
      </div>
    </header>
  )
}

export default Header
