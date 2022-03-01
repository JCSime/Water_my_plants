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
    return data[0];
}

async function addPlants(plant) {
    const [newPlant] = await db('plants').insert(plant, [
        'nickname',
        'species',
        'h2oFrequency',
        'user_id',
    ]);
    const result = getPlantById(newPlant)
    return result;
}

async function updatePlant(plant_id, plant) {
    const updatePlant = {
        nickname: plant.nickname,
        species: plant.species,
        h2oFrequency: plant.h2oFrequency,
        user_id: plant.user_id
    };
    await db('plants')
        .where({ plant_id })
        .update(updatePlant);
    return getPlantById(plant_id);
}

function deletePlant(plant_id) {
    return db('plants').where({ plant_id }).del();
}

module.exports = {
    getAllPlants,
    getPlantById,
    addPlants,
    updatePlant,
    deletePlant
}