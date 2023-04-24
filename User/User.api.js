const express = require('express');
const router = express.Router();
const userService = require('./User.service.js');

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.authenticateUser(username, password);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
