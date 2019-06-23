const express = require('express');
const morgan = require('morgan');

const app = express();

const productsRoutes = require('./src/routes/products');
const ordersRoutes = require('./src/routes/orders');

app.use(morgan('dev'));

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
  res.status(200).json({
    message: 'Welcome to the Shop API'
  });
});

module.exports = app;
