const db = require('../../data/db-config');

async function getAllPlants() {
    const plants = await db('plants');
    return plants;
}

module.exports = {
    getAllPlants
}