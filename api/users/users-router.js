const router = require('express').Router()
const bcrypt = require('bcryptjs');
const Users = require('./users-model');
const Plants = require('../plants/plants-model');
const { checkLoggedIn, only, validateUserId } = require('../auth/auth-middleware');

router.get('/', checkLoggedIn, only('admin'), (req, res, next) => {
    Users.getAllUsers()
        .then(users => {
            res.json(users)
        })
        .catch(next)
});

router.get('/:user_id', (req, res, next) => {
    const user_id = req.params.user_id;
    Users.findBy({ user_id })
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
  
  Users.updateUser(req.params.user_id, user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete('/:user_id', (req, res, next) => {
  Users.deleteUser(req.params.user_id)
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(next);
});

module.exports = router;