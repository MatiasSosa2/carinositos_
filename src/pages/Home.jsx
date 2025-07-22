import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight, ShoppingBag, Heart, Gift } from 'lucide-react';

const Home = () => {
  const featuredProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>🧸 Cariñositos - Ropa con Amor para los Más Pequeños</title>
        <meta name="description" content="Descubre la ropa de bebé más tierna y de alta calidad en Cariñositos. Diseños exclusivos, 100% algodón y pensados para la comodidad de tu pequeño." />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-beige-bg"
      >
        {/* Hero Section */}
        <section
          className="hero-bg relative flex items-center justify-center"
          style={{
            backgroundImage: "url('../images/banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '500px',
            width: '100%',
          }}
        >
          <div className="container mx-auto px-4 py-20 md:py-32 text-center relative z-10">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4 font-secondary text-white drop-shadow-lg"
            >
              Ropa para los más pequeños
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl mx-auto text-lg mb-8 text-white drop-shadow"
            >
              La ropa más suave, segura y adorable para los primeros años de tu bebé.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button size="lg" asChild>
                <Link to="/catalogo">
                  Explorar Colección <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-terracota-light rounded-full p-4 mb-4">
                  <Heart className="h-8 w-8 text-terracota" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-secondary">100% Algodón Pima</h3>
                <p className="text-terracota-dark">Suavidad y cuidado excepcionales para la piel sensible de tu bebé.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-terracota-light rounded-full p-4 mb-4">
                  <ShoppingBag className="h-8 w-8 text-terracota" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-secondary">Diseños Únicos</h3>
                <p className="text-terracota-dark">Colecciones exclusivas y llenas de ternura para cada etapa.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-terracota-light rounded-full p-4 mb-4">
                  <Gift className="h-8 w-8 text-terracota" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-secondary">El Regalo Perfecto</h3>
                <p className="text-terracota-dark">Encuentra el obsequio ideal para baby showers y nacimientos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-secondary">Novedades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/catalogo">Ver todo el catálogo</Link>
              </Button>
            </div>
          </div>
        </section>
        
      </motion.div>
    </>
  );
};

export default Home;