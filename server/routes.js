const express = require('express');
const router = express.Router();
const auth = require('./auth');

// Mock users
const users = [{ username: 'admin', password: 'password' }];

// Broken login route
router.post('/login', (req, res) => {
  // Doesn't parse body, always fails except for admin
  const { username, password } = req.body || {};
  const token = auth.login(username, password);
  if (token) return res.json({ token });
  res.status(401).send('Login failed');
});

// Broken register route
router.post('/register', (req, res) => {
  res.status(500).send('Registration is broken');
});

module.exports = router; 