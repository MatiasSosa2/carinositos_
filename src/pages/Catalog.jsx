import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import Filters from '@/components/products/Filters';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Frown } from 'lucide-react';

const Catalog = () => {
  const location = useLocation();
  const { products, allProducts, filters, setFilters, resetFilters } = useProducts(location);
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);

  useEffect(() => {
    setLocalSearchTerm(filters.searchTerm);
  }, [filters.searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({...prev, searchTerm: localSearchTerm}));
  };

  const categoryName = filters.category || 'Todo';

  return (
    <>
      <Helmet>
        <title>{`Catálogo: ${categoryName} - Cariñositos`}</title>
        <meta name="description" content={`Explora nuestra colección de ropa para bebé. Encuentra ${categoryName.toLowerCase()} y más en Cariñositos.`} />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-secondary">Catálogo</h1>
          <p className="text-lg text-terracota-dark">Descubre nuestra colección completa</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Filters filters={filters} setFilters={setFilters} allProducts={allProducts} resetFilters={resetFilters} />
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Buscar en el catálogo..."
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit"><Search className="h-4 w-4 mr-2" />Buscar</Button>
              </form>
            </div>

            {products.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {products.map((product) => (
                    <motion.div layout key={product.id}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-terracota-light rounded-lg">
                <Frown className="h-16 w-16 text-terracota-dark mb-4" />
                <h3 className="text-2xl font-semibold mb-2 font-secondary">No se encontraron productos</h3>
                <p className="text-terracota-dark mb-6">Intenta ajustar los filtros o limpiar la búsqueda.</p>
                <Button onClick={resetFilters}>Limpiar Filtros</Button>
              </div>
            )}
          </main>
        </div>
      </motion.div>
    </>
  );
};

export default Catalog;