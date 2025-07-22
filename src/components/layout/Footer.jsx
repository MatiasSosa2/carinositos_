import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-terracota-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-secondary">
              <Heart className="h-8 w-8 text-terracota" />
              <span className="gradient-text">🧸 Cariñositos</span>
            </Link>
            <p className="text-text-dark text-sm">Vistiendo a los más pequeños con amor y calidad.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-terracota-dark hover:text-terracota-hover"><Facebook /></a>
              <a href="#" className="text-terracota-dark hover:text-terracota-hover"><Instagram /></a>
              <a href="#" className="text-terracota-dark hover:text-terracota-hover"><Twitter /></a>
            </div>
          </div>
          
          <div>
            <p className="font-semibold text-text-dark mb-4 font-secondary">Tienda</p>
            <ul className="space-y-2">
              <li><Link to="/catalogo/superiores" className="text-sm text-text-dark hover:text-terracota-dark">Superiores</Link></li>
              <li><Link to="/catalogo/inferiores" className="text-sm text-text-dark hover:text-terracota-dark">Inferiores</Link></li>
              <li><Link to="/catalogo/conjuntos" className="text-sm text-text-dark hover:text-terracota-dark">Conjuntos</Link></li>
              <li><Link to="/catalogo/varios" className="text-sm text-text-dark hover:text-terracota-dark">Varios</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-text-dark mb-4 font-secondary">Ayuda</p>
            <ul className="space-y-2">
              <li><span className="text-sm text-text-dark hover:text-terracota-dark cursor-pointer">Envíos y Devoluciones</span></li>
              <li><span className="text-sm text-text-dark hover:text-terracota-dark cursor-pointer">Guía de Talles</span></li>
              <li><span className="text-sm text-text-dark hover:text-terracota-dark cursor-pointer">Contacto</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-beige-pastel text-center text-sm text-terracota-dark">
          <p>&copy; {new Date().getFullYear()} Cariñositos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

const BannerMovil = () => (
  <div
    style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 50,
      background: '#a67c52',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '1rem',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        whiteSpace: 'nowrap',
        display: 'inline-block',
        animation: 'banner-move 12s linear infinite',
        paddingLeft: '100%',
      }}
    >
      📦 Envíos a todo el país • 📍 Cantilo 186, City Bell • 🛍 Hasta 30 días con bolsa y etiqueta • 💰 15% de descuento en efectivo o transferencia.
    </div>
    <style>{`
      @keyframes banner-move {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `}</style>
  </div>
);

const FooterWithBanner = () => (
  <>
    <Footer />
    <BannerMovil />
  </>
);

export default FooterWithBanner;