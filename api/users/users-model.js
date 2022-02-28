const db = require('../../data/db-config');

module.exports = {
    get,
    findBy
}

function get() {
    return db('users');
}

function findBy(filter) {
    return db('users')
      .select('user_id', 'username', 'password')
      .where(filter);
  }
