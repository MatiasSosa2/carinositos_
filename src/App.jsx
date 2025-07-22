import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { initMercadoPago } from '@mercadopago/sdk-react';

import { useCartStore } from '@/store/cartStore';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import ProductDetail from '@/pages/ProductDetail';
import Checkout from '@/pages/Checkout';
import NotFound from '@/pages/NotFound';
import OrderConfirmation from '@/pages/OrderConfirmation';

// Reemplaza con tu Public Key de Mercado Pago
const MERCADOPAGO_PUBLIC_KEY = "APP_USR-ff134c1b-2174-4e66-b246-29e11c54cc26"; // Public Key de la cuenta compradora
initMercadoPago(MERCADOPAGO_PUBLIC_KEY);

function App() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-beige-bg text-text-dark">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/catalogo/:category" element={<Catalog />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmacion" element={<OrderConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <AnimatePresence>
        {isCartOpen && <Cart onClose={closeCart} />}
      </AnimatePresence>
    </div>
  );
}

export default App;