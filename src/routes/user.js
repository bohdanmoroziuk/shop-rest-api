const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  const saltRounds = 10;

  User.find({ email })
    .then(user => {
      // It means that the array of matches is returned
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'A user with such email already exists'
        });
      }

      bcrypt.hash(password, saltRounds, function (error, hash) {
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