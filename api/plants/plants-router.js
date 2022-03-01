const express = require('express');
const router = express.Router();

const Plants = require('./plants-model');

const { checkLoggedIn, only } = require('../auth/auth-middleware');

router.get('/', checkLoggedIn, only('admin'), (req, res, next) => {
    Plants.getAllPlants()
    .then((plants) => {
        res.status(200).json(plants);
    })
    .catch(next);
});

router.post('/', (req, res, next)=>{
    Plants.addPlants(req.body)
        .then((plant) => {
            res.status(201).json(plant);
        })
        .catch(next);
});

module.exports = router;