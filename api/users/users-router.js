const router = require('express').Router()
const User = require('./users-model');

router.get('/', (req, res, next) => {
    User.get()
        .then(users => {
            res.json(users)
        })
        .catch(next)
});

router.use((err, req, res, next)=>{ // eslint-disable-line
    res.status(500).json({
        customMessage: 'something terrible happened in the recipes router',
        message: err.message,
        stack: err.stack,
    })
});

module.exports = router;