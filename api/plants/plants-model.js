const res = require('express/lib/response');
const db = require('../../data/db-config');

async function getAllPlants() {
    const plants = await db('plants');
    return plants;
}

async function getPlantById(plant_id) {
    const data = await db('plants as p')
    .leftJoin('users as u')
    .select(
        'p.plant_id', 
        'p.nickname', 
        'p.species', 
        'p.h2oFrequency',
        'p.user_id'
    )
    .orderBy('p.user_id')
    .where('p.plant_id', plant_id);
    return data;
}

async function addPlants(plant) {
    let newPlant_id;
    await db.transaction(async (trx) => {
        const addPlants = {
            nickname: plant.nickname,
            species: plant.species,
            h2oFrequency: plant.h2oFrequency
        };
        let plant_id;
        try{
            [{ plant_id }] = await trx('plants').insert(addPlants, 'plant_id');
            newPlant_id = plant_id;
        } catch (err) {
            res.status(400).json(err);
        }
    });
    return getPlantById(newPlant_id)
}

module.exports = {
    getAllPlants,
    getPlantById,
    addPlants
}