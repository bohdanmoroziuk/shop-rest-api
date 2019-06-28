const router = require('express').Router();

const Order = require('../controllers/order');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, Order.getAll);

router.get('/:id', checkAuth, Order.getById);

router.post('/', checkAuth, Order.create);

router.patch('/:id', checkAuth, Order.update);

router.delete('/:id', checkAuth, Order.delete);

module.exports = router;
