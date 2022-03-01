const router = require('express').Router()
const User = require('./users-model');
const { checkLoggedIn, only } = require('../auth/auth-middleware');

router.get('/', checkLoggedIn, only('admin'), (req, res, next) => {
    User.get()
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

module.exports = router;