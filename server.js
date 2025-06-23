const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

app.post('/create_preference', async (req, res) => {
  try {
    const items = req.body.cart.map(product => ({
      title: product.name,
      unit_price: Number(product.price),
      quantity: 1,
      currency_id: "ARS"
    }));

    const preference = {
      items,
      back_urls: {
        success: "https://tusitio.com/success.html",
        failure: "https://tusitio.com/failure.html",
        pending: "https://tusitio.com/pending.html"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: 'Error al crear la preferencia' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
