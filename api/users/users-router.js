const router = require('express').Router()
const User = require('./users-model');
router.get('/', (req, res, next) => {
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

router.use((err, req, res, next)=>{ // eslint-disable-line
    res.status(500).json({
        customMessage: 'something terrible happened in the recipes router',
        message: err.message,
        stack: err.stack,
    })
});

module.exports = router;