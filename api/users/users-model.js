const db = require('../../data/db-config');

module.exports = {
    getAllUsers,
    findBy,
    addUser,
    updateUser,
    deleteUser,
}

function getAllUsers() {
    return db('users');
}

function findBy(filter) {
    return db('users')
      .select('user_id', 'username', 'password', 'phoneNumber', 'permissions')
      .where(filter);
}

async function addUser(user) {
    const [newUser] = await db('users').insert(user, [
        'user_id',
        'username',
        'password',
        'permissions',
    ]);
    return newUser;
}

async function updateUser(user_id, updates) {
    const [updatedUser] = await db("users")
        .where({ user_id })
        .update(updates, ['user_id', 'username', 'password', 'permissions']);
    return updatedUser;
}
  
async function deleteUser(user_id) {
    return db("users").where({ user_id }).del();
}