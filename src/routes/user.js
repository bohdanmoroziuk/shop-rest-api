const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email })
    .then(user => {
      // It means that the array of matches is returned
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'A user with such email already exists'
        });
      }

      bcrypt.hash(password, process.env.JWT_SALT_ROUNDS, function (error, hash) {
        if (error) {
          return res.status(500).json({
            error
          });
        }

        const user = new User({
          email,
          password: hash
        });

        user.save()
          .then(() => {
            res.status(201).json({
              message: 'User registered'
            });
          })
          .catch(error => {
            res.status(500).json({
              error
            });
          });
      });
    });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }

      bcrypt.compare(password, user[0].password, (error, result) => {
        if (error || !result) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }

        const token = jwt.sign(
          { email, id: user[0]._id }, 
          process.env.JWT_SECRET_KEY, 
          { expiresIn: '1h' }
        );

        return res.status(200).json({
          message: 'Auth successful',
          token
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      res.status(200).json({
        deletedUser: user
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

module.exports = router;