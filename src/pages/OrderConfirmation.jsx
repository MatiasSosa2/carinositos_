import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  return (
    <>
      <Helmet>
        <title>¡Compra Confirmada! - Cariñositos</title>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[70vh]"
      >
        <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-4xl font-bold text-text-dark mb-4 font-secondary">¡Gracias por tu compra!</h1>
        <p className="text-lg text-terracota-dark max-w-lg mb-8">
          Tu pedido ha sido procesado con éxito. Recibirás un correo electrónico con los detalles de tu compra y el seguimiento del envío muy pronto.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/">Volver al Inicio</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/catalogo">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Seguir Comprando
            </Link>
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default OrderConfirmation;