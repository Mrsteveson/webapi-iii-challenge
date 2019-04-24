const express = require('express');

const db = require('./postDb.js');
const router = express.Router();

// Get. **Postman Tested: working**
router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ message: "The posts information could not be retrieved."})
    })
})

// Get by ID. **Postman Tested: working**
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db
    .getById(id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post information could not be retrieved."})
    })
})


// Post. **Postman Tested: working**
// MUST USE AN ACTIVE USER'S ID OR IT DOESNT WORK.
router.post('/', (req, res) => {
    const { user_id, text } = req.body;
    if(!user_id || !text) {
        res.status(400).json({ message: "Please provide text and user_id for the post."})
    }

    db
    .insert({ user_id, text })
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({ message: "There was an error while saving the post to the database."})
    })
})

// Update/Put. **Postman Tested: working**
// MUST USE AN ACTIVE USER'S ID OR IT DOESNT WORK.
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { text} = req.body;
    if(!text) {
        res.status(400).send({ message: "Please provide text and user_id for the post."})
    }

    db
    .update(id, { text })
    .then(update =>{
        if(update) {
            res.status(201).json(update)
        } else {
            res.status(404).send({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).send({ message: "The post information could not be modified."})
    })
})

// Delete. **Postman Tested: working**
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db
    .remove(id)
    .then((id) => {
        if(id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post could not be removed."})
    })
})


module.exports = router;