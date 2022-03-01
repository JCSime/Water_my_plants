const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('./users-model');
const Plants = require('../plants/plants-model');
const { checkLoggedIn, only, validateUserId } = require('../auth/auth-middleware');

router.get('/', checkLoggedIn, only('admin'), (req, res, next) => {
    User.getAllUsers()
        .then(users => {
            res.json(users)
        })
        .catch(next)
});

router.get('/:user_id', (req, res, next) => {
    const user_id = req.params.user_id;
    User.findBy({ user_id })
      .first()
      .then((user) => {
        res.json(user);
      })
      .catch(next);
});

router.get('/:user_id/plants', checkLoggedIn, (req, res, next) => {
  Plants.getMyPlants(req.params.user_id)
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch(next);
});

router.put('/:user_id', validateUserId, (req, res, next) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  
  User.updateUser(req.params.user_id, user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = router;