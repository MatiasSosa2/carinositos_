import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CheckCircle, Info } from 'lucide-react';
import NotFound from './NotFound';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { toast } = useToast();
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedSize, setSelectedSize] = useState(product ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return <NotFound />;
  }

  const finalPrice = product.price * (1 - product.discount / 100);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    toast({
      title: (
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span>¡Agregado al carrito!</span>
        </div>
      ),
      description: `${product.name} (${selectedSize}, ${selectedColor})`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Cariñositos`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img 
                alt={`${product.name} - ${selectedColor} ${selectedImageIndex + 1}`}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                src={product.image}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setSelectedImageIndex(i)} className={`rounded-md overflow-hidden border-2 ${selectedImageIndex === i ? 'border-terracota' : 'border-transparent'}`}>
                  <img 
                    alt={`Thumbnail ${i+1}`}
                    className="w-full h-full object-cover"
                    src={product.image}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link to={`/catalogo/${product.category.toLowerCase()}`} className="text-sm text-terracota-dark hover:underline">{product.category}</Link>
              {product.isNew && <Badge className="bg-terracota text-white">Nuevo</Badge>}
            </div>
            <h1 className="text-4xl font-bold mb-4 font-secondary">{product.name}</h1>
            <p className="text-terracota-dark mb-6">{product.description}</p>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-terracota-dark">${finalPrice.toFixed(2)}</span>
              {product.discount > 0 && <span className="text-xl text-terracota-dark/70 line-through">${product.price.toFixed(2)}</span>}
              {product.discount > 0 && <Badge variant="destructive">-{product.discount}% OFF</Badge>}
            </div>

            <Separator className="my-6" />

            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 font-secondary">Color: <span className="font-normal">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <div key={color} className="color-selector">
                    <input type="radio" id={`color-${color}`} name="color" value={color} checked={selectedColor === color} onChange={() => setSelectedColor(color)} className="sr-only"/>
                    <label htmlFor={`color-${color}`} className="h-8 w-8 rounded-full border cursor-pointer" style={{ backgroundColor: color.toLowerCase() === 'blanco' ? '#fff' : color.toLowerCase() }}></label>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 font-secondary">Talle:</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <div key={size} className="size-selector">
                    <input type="radio" id={`size-${size}`} name="size" value={size} checked={selectedSize === size} onChange={() => setSelectedSize(size)} className="sr-only"/>
                    <label htmlFor={`size-${size}`} className="px-4 py-2 border rounded-md cursor-pointer text-sm font-medium transition-colors hover:bg-terracota-light">{size}</label>
                  </div>
                ))}
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5"/> Agregar al Carrito
            </Button>
            
            <div className="mt-8 p-4 bg-terracota-light border border-beige-pastel rounded-lg">
              <h4 className="font-semibold flex items-center gap-2 mb-2 font-secondary"><Info className="h-5 w-5 text-terracota-dark"/>Detalles del Producto</h4>
              <ul className="list-disc list-inside text-sm text-terracota-dark space-y-1">
                {product.details.map((detail, index) => <li key={index}>{detail}</li>)}
              </ul>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-terracota-dark">Precio efectivo: <span className="font-bold">${(finalPrice * 0.9).toFixed(2)}</span> (10% OFF)</p>
              <p className="text-sm text-terracota-dark">Precio tarjeta: <span className="font-bold">${finalPrice.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;