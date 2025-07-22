import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.productId, item.size, item.color, newQuantity);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 border border-beige-pastel rounded-lg bg-white shadow-sm">
      <Link to={`/producto/${item.productId}`}>
        <img 
          alt={item.name}
          className="w-24 h-24 object-cover rounded-md"
          src={item.image}
        />
      </Link>
      <div className="flex-grow">
        <h3 className="font-semibold text-text-dark">{item.name}</h3>
        <p className="text-sm text-terracota-dark">Color: {item.color}</p>
        <p className="text-sm text-terracota-dark">Talle: {item.size}</p>
        <p className="text-lg font-bold text-terracota-dark mt-1">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-terracota-dark hover:text-terracota-hover" onClick={() => removeFromCart(item.productId, item.size, item.color)}>
          <Trash2 className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;