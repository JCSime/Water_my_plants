const users = [
    {username: 'John', password: '1234', phoneNumber: '5555555555', permissions: 'admin'},
    {username: 'Harley', password: '1234', phoneNumber: '4444444444', permissions: 'user'},
    {username: 'Deon', password: '1234', phoneNumber: '5555555555', permissions: 'user'},
]

const plants = [
    {nickname: 'Grumpy', species: 'Croton', h2oFrequency: 3, user_id: 1},
    {nickname: 'Dopey', species: 'Lemon Lime Dracaena', h2oFrequency: 2, user_id: 1},
    {nickname: 'Doc', species: 'Moth Orchid', h2oFrequency: 1, user_id: 2},
    {nickname: 'Happy', species: 'Anthurium', h2oFrequency: 3, user_id: 2},
    {nickname: 'Bashful', species: 'Golden Pothos', h2oFrequency: 1, user_id: 3},
    {nickname: 'Sneezy', species: 'Spathiphyllum', h2oFrequency: 1, user_id: 3},
    {nickname: 'Sleepy', species: 'Dracaena Marginata', h2oFrequency: 1, user_id: 3},
]

exports.seed = async function (knex) {
    await knex('users').insert(users)
    await knex('plants').insert(plants)
}