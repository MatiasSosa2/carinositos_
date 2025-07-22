import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const calculateSubtotal = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      subtotal: 0,
      
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: (product) => {
        const cart = get().cart;
        const existingProductIndex = cart.findIndex(item => item.productId === product.productId && item.size === product.size && item.color === product.color);

        let updatedCart;
        if (existingProductIndex !== -1) {
          updatedCart = cart.map((item, index) => 
            index === existingProductIndex 
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        } else {
          updatedCart = [...cart, product];
        }
        
        set({ cart: updatedCart, subtotal: calculateSubtotal(updatedCart) });
      },
      
      removeFromCart: (productId, size, color) => {
        const cart = get().cart;
        const updatedCart = cart.filter(item => !(item.productId === productId && item.size === size && item.color === color));
        set({ cart: updatedCart, subtotal: calculateSubtotal(updatedCart) });
      },

      updateQuantity: (productId, size, color, quantity) => {
        const cart = get().cart;
        const updatedCart = cart.map(item => 
          item.productId === productId && item.size === size && item.color === color
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0);
        set({ cart: updatedCart, subtotal: calculateSubtotal(updatedCart) });
      },
      
      clearCart: () => set({ cart: [], subtotal: 0 }),
    }),
    {
      name: 'carinositos-cart-storage',
    }
  )
);