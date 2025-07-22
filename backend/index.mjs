import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mercadopago from 'mercadopago';

dotenv.config();

const app = express();
app.use(express.json());

// Permitir ambos orígenes de desarrollo
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5174',
  // Agrega aquí otros puertos si usas otro (ejemplo: 'http://localhost:5175')
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
}));

// Configuración Mercado Pago v2.x
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// Healthcheck
app.get('/', (req, res) => {
  res.json({ message: 'API de backend funcionando correctamente.' });
});

// Crear preferencia de pago
app.post('/create_preference', async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No se recibieron items válidos.' });
    }

const preference = {
  items: [
    {
      title: "Producto de prueba",
      quantity: 1,
      unit_price: 100
    }
  ],
  back_urls: {
    success: "https://www.google.com",
    failure: "https://www.google.com",
    pending: "https://www.google.com"
  },
  auto_return: "approved"
};

mercadopago.preferences
  .create(preference)
  .then(response => res.json({ id: response.body.id }))
  .catch(error => res.status(500).json({ error: 'Error interno al crear preferencia', details: error.message }));


    // SDK v2.x: mercadopago.preferences.create
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id, init_point: response.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({
      error: 'Error interno al crear preferencia',
      details: error.message || error,
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});


// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
