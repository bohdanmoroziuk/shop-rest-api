const router = require('express').Router();

const User = require('../controllers/user');

router.post('/signup', User.singUp);

router.post('/login', User.logIn);

router.delete('/:id', User.delete);

module.exports = router;