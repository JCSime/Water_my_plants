const db = require('../../data/db-config');

module.exports = {
    get,
    findBy,
    addUser
}

function get() {
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