const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { BCRYPT_ROUNDS, JWT_SECRET } = require('../secrets');
const Users = require('../users/users-model');

router.post('/register', (req, res, next) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
    user.password = hash;

    Users.addUser(user)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(next);
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenGen(user);
        res.status(200).json({ message: `${username} logged in`, user, token });
      } else {
        next({ status: 401, message: 'Invalid credentials' });
      }
    })
    .catch(next);
});

function tokenGen(user) {
    const payload = {
      subject: user.user_id,
      username: user.username,
      role_name: user.role_name,
      permissions: user.permissions
    };
    const options = {
      expiresIn: '1d',
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
  }

module.exports = router;