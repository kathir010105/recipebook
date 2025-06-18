const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const users = [{ username: 'admin', password: 'password' }];

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const token = auth.login(username, password);
  if (token) return res.json({ token });
  res.status(401).send('Login failed');
});

router.post('/register', (req, res) => {
  res.status(500).send('Registration is broken');
});

module.exports = router; 