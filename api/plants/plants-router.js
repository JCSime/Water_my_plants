const express = require('express');
const router = express.Router();

const Plants = require('./plants-model');

router.get('/', (req, res, next) => {
    Plants.getAllPlants()
    .then((plants) => {
        res.status(200).json(plants);
    })
    .catch(next);
});

module.exports = router;