import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCartStore } from '@/store/cartStore';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const { cart, subtotal, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    subtotal: state.subtotal,
    clearCart: state.clearCart,
  }));
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  return (
    <Dialog open={isCartOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-beige-bg right-0 top-0 h-full max-h-screen translate-x-0 translate-y-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right cart-dialog-content">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex flex-col h-full"
        >
          <DialogHeader className="p-6 border-b border-beige-pastel flex-shrink-0">
            <DialogTitle className="text-2xl font-bold flex justify-between items-center font-secondary">
              <span>Tu Carrito</span>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-6 w-6" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
              <ShoppingBag className="h-24 w-24 text-beige-pastel mb-4" />
              <h3 className="text-xl font-semibold text-text-dark font-secondary">Tu carrito está vacío</h3>
              <p className="text-terracota-dark mt-2">¡Explora nuestro catálogo y encuentra algo que te encante!</p>
              <Button onClick={onClose} className="mt-6" asChild>
                <Link to="/catalogo">Ver Productos</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                {cart.map(item => (
                  <CartItem key={item.id + item.size + item.color} item={item} />
                ))}
              </div>
              <div className="p-6 border-t border-beige-pastel flex-shrink-0 bg-[#c6a788] sticky bottom-0 z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-text-dark font-secondary">Subtotal</span>
                  <span className="text-2xl font-bold text-text-dark font-secondary">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-terracota-dark text-center mb-4">Los impuestos y costos de envío se calculan en el checkout.</p>
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-terracota-dark text-white hover:bg-terracota-hover" asChild>
                    <Link to="/checkout" onClick={onClose}>Finalizar Compra</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={clearCart}>
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;