const express = require('express');

const server = express();
const usersRouter = require('./users/users-router')

server.use(express.json());
server.use('/api/users', usersRouter);

server.use('*', (req, res)=>{
    res.json({ api: 'up' })
});

module.exports = server;