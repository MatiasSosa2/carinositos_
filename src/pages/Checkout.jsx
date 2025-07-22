import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const PUBLIC_KEY = 'APP_USR-9a8df06d-3d29-4033-8cba-ff2b45525921';
const BACKEND_URL = 'http://localhost:4000';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  // Datos formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // Inicializar Mercado Pago solo 1 vez
  useEffect(() => {
    initMercadoPago(PUBLIC_KEY);
  }, []);

  // Manejo de cambios en inputs
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Validar datos mínimos
  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.address.trim()
    );
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 font-secondary">Tu carrito está vacío</h1>
        <p className="text-terracota-dark mb-6">Agrega productos para poder finalizar la compra.</p>
        <Button asChild>
          <Link to="/catalogo">Ir al Catálogo</Link>
        </Button>
      </div>
    );
  }

  const shippingCost = 5.0;
  const total = subtotal + shippingCost;

  const handleBuy = async () => {
    if (!isFormValid()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsLoading(true);
    setError(null);

    setShowLoader(true); // Mostrar loader premium

    // Crear array items con estructura que Mercado Pago espera
    const items = cart.map((item) => ({
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
      currency_id: 'ARS', // puedes parametrizar
      // id: item.id, // opcional
      // picture_url: item.image, // si tienes url imagen
    }));

    try {
      const res = await fetch(`${BACKEND_URL}/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (res.ok && data.id) {
        setPreferenceId(data.id);
      } else {
        setError('Error al crear preferencia de pago. Intenta nuevamente.');
        console.error('Backend error:', data);
      }
    } catch (err) {
      setError('Error de conexión con el servidor. Intenta más tarde.');
      console.error('Fetch error:', err);
    }

    setIsLoading(false);
    setTimeout(() => setShowLoader(false), 2000); // Ocultar loader después de 2 segundos
  };

  const onReady = () => {
    console.log('Mercado Pago Wallet lista');
  };

  const onError = (error) => {
    setError('Error en el proceso de pago.');
    console.error('Error en Wallet:', error);
  };

  const onSubmit = () => {
    clearCart();
    navigate('/OrderConfirmation');
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Cariñositos</title>
        <meta
          name="description"
          content="Finaliza tu compra en Cariñositos. Ingresa tus datos y elige tu método de pago."
        />
      </Helmet>

      {showLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#c6a788]/80">
          <div className="flex flex-col items-center">
            <img src="/favicon.svg" alt="Logo" className="w-16 h-16 mb-4 animate-bounce" />
            <span className="text-2xl font-bold text-white">Redirigiendo a Mercado Pago...</span>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-center text-4xl font-bold mb-12 font-secondary">Finalizar Compra</h1>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Formulario Datos de Envío */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 font-secondary">Datos de Envío</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input id="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input id="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección *</Label>
                <Input id="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="state">Provincia</Label>
                  <Input id="state" value={formData.state} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="zip">Cód. Postal</Label>
                  <Input id="zip" value={formData.zip} onChange={handleInputChange} />
                </div>
              </div>
            </form>
            {error && (
              <p className="mt-4 text-red-600 font-medium" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Resumen del pedido */}
          <div className="bg-terracota-light p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 font-secondary">Resumen de tu Orden</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                      src={item.image}
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-terracota-dark">
                        {item.size}, {item.color} x{item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator className="my-6" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-terracota-dark">Subtotal</p>
                <p className="font-medium">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-terracota-dark flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Envío
                </p>
                <p className="font-medium">${shippingCost.toFixed(2)}</p>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>

            {/* Botón o Wallet de Mercado Pago */}
            <div className="mt-8">
              {!preferenceId ? (
                <Button onClick={handleBuy} disabled={isLoading} className="w-full" aria-busy={isLoading}>
                  {isLoading ? 'Procesando...' : 'Pagar con Mercado Pago'}
                </Button>
              ) : (
                <Wallet
                  initialization={{ preferenceId, redirectMode: 'self' }}
                  onReady={onReady}
                  onError={onError}
                  onSubmit={onSubmit}
                  customization={{
                    texts: { action: 'Pagar', valueProp: 'security_details' },
                    visual: { buttonBackground: '#a75e4a', borderRadius: '8px' },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Checkout;
