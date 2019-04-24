const express = require('express');
const server = express();

// Importing Routers
const postsRouter = require('./data/posts/post-router.js');
const usersRouter = require('./data/users/user-router.js');

// Custom Middleware. toUpperCase FirstLetter
const nameHandler = (req, res, next) => {
    const { name } = req.body;
    if(name !== name.toUpperCase()) {
        res.status(400).send("Capitalize the first letter of your name.")
    } else {
        next();
    }
};

server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('Backend Day3')
});

module.exports = server;