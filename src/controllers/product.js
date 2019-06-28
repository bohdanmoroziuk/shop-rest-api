const Product = require('../models/product');

const ProductController = {
  getAll(req, res, next) {
    Product
      .find()
      .select('_id name price image')
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
  },
  getById(req, res, next) {
    Product
      .findById(req.params.id)
      .select('_id name price image')
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
  },
  create(req, res, next) {
    const { name, price } = req.body;

    new Product({
      name,
      price,
      image: req.file.path
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
  },
  update(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, { $set: { ...req.body } })
      .then(product => {
        res.status(201).json({
          message: 'Handling PATCH request /products/:id',
          updatedProduct: product
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  },
  delete(req, res, next) {
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
  }
};

module.exports = ProductController;