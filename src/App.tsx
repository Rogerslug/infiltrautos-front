// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // npm install react-router-dom
import './App.css';
import Header from './components/header.component'
import Footer from './components/footer.component'
import MainContent from './components/mainContent.component'
import Catalog from './components/catalog.component'
import ShowDetails from './components/showDetails.component'
import Cart from './components/cart.component'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/product/:id" element={<ShowDetails />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;