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

router.get('/:plant_id', (req, res, next) => {
    const plant_id = req.params.plant_id;
    Plants.getPlantById(plant_id)
        .then((plant) => {
            res.status(200).json(plant);
        })
        .catch(next);
});

router.put('/:plant_id', (req, res, next) => {
    const updates = req.body;
    updates.plant_id = req.params.plant_id;
    Plants.updatePlant(updates.plant_id, updates)
        .then((plant) => {
            res.status(200).json(plant);
        })
        .catch(next)
})

router.delete('/:plant_id', (req, res, next) => {
    Plants.deletePlant(req.params.plant_id)
        .then(count => {
            if (count > 0) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Plant not fount!' })
            }
        })
        .catch(next);
});

module.exports = router;