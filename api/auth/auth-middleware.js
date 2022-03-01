const dbConfig = require('../../data/db-config');
const { JWT_SECRET } = require('../secrets');
const jwt = require('jsonwebtoken');

const checkLoggedIn = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        next({ status: 401, message: 'Token required' });
    } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            next({ status: 401, message: 'Token invalid' });
        } else {
            req.decodedJwt = decoded;
            next();
        }
        });
    }
};

const only = (permissions) => (req, res, next) => {
    if (req.decodedJwt.permissions === permissions) {
      next();
    } else {
      next({ status: 403, message: "Invalid permissions" });
    }
  };

module.exports = {
    checkLoggedIn,
    only,
}