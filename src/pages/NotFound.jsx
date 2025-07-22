import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - MundoBebé</title>
      </Helmet>
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <Frown className="h-24 w-24 text-blue-300 mb-6" />
        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">¡Ups! Página no encontrada.</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Parece que te has perdido. La página que buscas no existe o fue movida.
        </p>
        <Button asChild size="lg">
          <Link to="/">Volver al Inicio</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFound;