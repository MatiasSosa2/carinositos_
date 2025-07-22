import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="product-card-hover"
    >
      <Card className="overflow-hidden h-full flex flex-col bg-white border-beige-pastel shadow-sm">
        <Link to={`/producto/${product.id}`} className="block">
          <div className="relative">
            <img 
              alt={product.name}
              className="w-full h-64 object-cover"
              src={product.image} />
            {product.isNew && (
              <Badge className="absolute top-2 left-2 bg-terracota text-white">Nuevo</Badge>
            )}
            {product.discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 right-2">-{product.discount}%</Badge>
            )}
          </div>
        </Link>
        <CardContent className="p-4 flex-grow flex flex-col">
          <p className="text-xs text-terracota-dark uppercase">{product.category}</p>
          <h3 className="text-lg font-semibold my-1 flex-grow font-secondary">
            <Link to={`/producto/${product.id}`} className="hover:text-terracota-dark transition-colors">{product.name}</Link>
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-xl font-bold text-terracota-dark">${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
            {product.discount > 0 && (
              <p className="text-sm text-terracota-dark/70 line-through">${product.price.toFixed(2)}</p>
            )}
          </div>
           <Link to={`/producto/${product.id}`} className="mt-4 w-full inline-flex items-center justify-center text-sm font-medium text-terracota-dark hover:text-terracota-hover">
            Ver producto <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;