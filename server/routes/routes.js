const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Comment model
const commentSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body || {};
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Example GET
router.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Example POST
router.post('/recipes', async (req, res) => {
  const { title, description, author, image } = req.body;
  if (!title || !description || !author) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newRecipe = new Recipe({ title, description, author, image });
  await newRecipe.save();
  res.status(201).json(newRecipe);
});

// Comments endpoints
router.get('/comments', async (req, res) => {
  const { recipeId } = req.query;
  if (!recipeId) return res.status(400).json({ error: 'Missing recipeId' });
  const comments = await Comment.find({ recipeId });
  res.json(comments);
});

router.post('/comments', async (req, res) => {
  const { recipeId, text } = req.body;
  if (!recipeId || !text) return res.status(400).json({ error: 'Missing fields' });
  // For now, author is from JWT
  let author = 'anonymous';
  try {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      author = decoded.username;
    }
  } catch {}
  const comment = new Comment({ recipeId, text, author });
  await comment.save();
  res.status(201).json(comment);
});

// Profile endpoint
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Delete recipe by ID
router.delete('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recipe.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 