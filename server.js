const express = require('express');
const server = express();

// Importing Routers
const postsRouter = require('./data/posts/post-router.js');
const usersRouter = require('./data/users/user-router.js');

server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send({
        greet: process.env.GREET
    })
});

module.exports = server;