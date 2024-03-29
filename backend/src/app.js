const express = require('express');
const productsRoutes = require('./routes/products.routes');
const salesRoutes = require('./routes/sales.routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
