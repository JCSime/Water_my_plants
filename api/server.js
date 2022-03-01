const express = require('express');

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');

const server = express();
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter);

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;