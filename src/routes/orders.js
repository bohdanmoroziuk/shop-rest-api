const router = require('express').Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
  Order
    .find()
    .select('_id productId quantity')
    .populate('product', '_id name price')
      .then(orders => {
        res.status(200).json({
          message: 'Handling GET request /orders',
          orders,
          count: orders.length
        });
      })
      .catch(error => {
        res.status(404).json({
          error
        });
      });
});

router.get('/:id', checkAuth, (req, res, next) => {
  Order
    .findById(req.params.id)
    .select('_id productId quantity')
    .populate('product', '_id name price')
      .then(order => {
        res.status(200).json({
          message: 'Handling GET request /orders/:id',
          order
        });
      })
      .catch(error => {
        res.status(404).json({
          error
        });
      });
});

router.post('/', checkAuth, (req, res, next) => {
  const { productId, quantity } = req.body;

  Product.findById(productId)
    .then(product => {
      if (product) {
        const order = new Order({
          productId,
          quantity
        });
          
        return order.save();
      } else {
        return res.status(404).json({
          message: 'Product not found',
          error
        });
      }
    })
    .then(order => {
      res.status(201).json({
        message: 'Handling POST request /orders',
        createdOrder: order
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.patch('/:id', checkAuth, (req, res, next) => {
  Order.findByIdAndUpdate(req.params.id, { $set: { ...req.body } })
    .then(order => {
      res.status(201).json({
        message: 'Handling PATCH request /orders/:id',
        updatedOrder: order
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Order.findByIdAndRemove(req.params.id)
    .then(order => {
      res.status(200).json({
        message: 'Handling DELETE request /orders/:id',
        deletedOrder: order
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

module.exports = router;
