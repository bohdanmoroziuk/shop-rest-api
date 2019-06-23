const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request /products'
  });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request /products/:id'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST request /products'
  });
});

router.patch('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Handling PATCH request /products/:id'
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Handling DELETE request /products/:id'
  });
});

module.exports = router;
