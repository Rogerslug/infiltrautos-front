// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // npm install react-router-dom
import './App.css'
import Header from './components/header.component'
import Footer from './components/footer.component'
import MainContent from './components/mainContent.component'
import Catalog from './components/catalog.component'
import Models from './components/models.component'
import ShowDetails from './components/showDetails.component'
import Cart from './components/cart.component'
import { CartProvider } from './context/CartContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const initialOptions = {
    "clientId": process.env.REACT_APP_PAYPAL_CLIENT_ID, // Accede a la variable de entorno
    currency: "MXN",
    intent: "capture",
};

function App() {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || ''; // Asegúrate de que clientId nunca sea undefined
  const initialOptions = {
    clientId: clientId,
    currency: "MXN",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/modelos" element={<Models />} />
              <Route path="/product/:id" element={<ShowDetails />} />
              <Route path="/carrito" element={<Cart />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </PayPalScriptProvider>
  );
}

export default App;