const express = require('express');
const morgan = require('morgan');

const app = express();

const productsRoutes = require('./src/routes/products');
const ordersRoutes = require('./src/routes/orders');

app.use(morgan('dev'));

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');

  error.status = 404;

  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
