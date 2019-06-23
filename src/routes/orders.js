const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request /orders'
  });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request /orders/:id'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST request /orders'
  });
});

router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Handling PATCH request /orders/:id'
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Handling DELETE request /orders/:id'
  });
});

module.exports = router;
