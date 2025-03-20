import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Shop } from './components/shop/Shop';
import { CartProvider } from './contexts/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutForm } from './components/checkout/CheckoutForm';
import { OrderConfirmation } from './components/checkout/OrderConfirmation';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;