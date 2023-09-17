const express = require('express');
const router = express.Router();
const { signUpModel } = require('../models/usersModel');

router.post('/', (req, res) => {
    signUpModel(req.body)
        .then(() => res.status(201).send('User added!'))
        .catch(err => {
            console.error('Error adding user:', err);
            res.status(500).send('Internal server error');
        });
});

module.exports = router;
