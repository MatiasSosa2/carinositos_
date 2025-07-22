import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { GiBearHead } from 'react-icons/gi'; 
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const { toast } = useToast();
  const openCart = useCartStore((state) => state.openCart);
  const cart = useCartStore((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 Búsqueda en construcción',
      description: 'Esta función aún no está implementada. ¡Puedes solicitarla en tu próximo prompt! 🚀',
    });
  };
  
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Superiores', path: '/catalogo/superiores' },
    { name: 'Inferiores', path: '/catalogo/inferiores' },
    { name: 'Conjuntos', path: '/catalogo/conjuntos' },
    { name: 'Varios', path: '/catalogo/varios' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-[#c6a788]/90 backdrop-blur-sm shadow-md' : 'bg-[#c6a788]'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-secondary">
            <span className="text-[#a67c52] font-bold">
              🧸 Cariñositos
            </span>
          </Link>


          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-[#a67c52] ${isActive ? 'text-[#f5ecd7] underline underline-offset-4' : 'text-text-dark'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
              <Input type="search" placeholder="Buscar..." className="h-9 w-48" />
              <Button type="submit" variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            
            <Button variant="ghost" size="icon" onClick={openCart} className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-terracota text-white text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-beige-bg/95 backdrop-blur-sm absolute top-full left-0 w-full shadow-lg"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `p-3 rounded-md text-base font-medium transition-colors hover:bg-[#a67c52]/10 ${isActive ? 'bg-[#f5ecd7] text-[#a67c52] underline underline-offset-4' : 'text-text-dark'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <form onSubmit={handleSearch} className="lg:hidden p-3 flex items-center gap-2">
                <Input type="search" placeholder="Buscar productos..." className="flex-grow" />
                <Button type="submit" variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;