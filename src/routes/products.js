const router = require('express').Router();
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product
    .find()
    .select('_id name price')
      .then(products => {
        res.status(200).json({
          message: 'Handling GET request /products',
          products,
          count: products.length
        });
      })
      .catch(error => {
        res.status(404).json({
          error
        });
      });
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      res.status(200).json({
        message: 'Handling GET request /products/:id',
        product
      });
    })
    .catch(error => {
      res.status(404).json({
        error
      });
    });
});

router.post('/', (req, res, next) => {
  const { name, price } = req.body;

  new Product({
    name,
    price
  })
    .save()
      .then(product => {
        res.status(201).json({
          message: 'Handling POST request /products',
          createdProduct: product
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
});

router.patch('/:id', (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, { $set: { ...req.body } })
    .then(product => {
      res.status(201).json({
        message: 'Handling PATCH request /products/:id',
        createdProduct: product
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Product.findByIdAndRemove(req.params.id)
    .then(product => {
      res.status(200).json({
        message: 'Handling DELETE request /products/:id',
        deletedProduct: product
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

module.exports = router;
