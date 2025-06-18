const express = require('express');
const app = express();
// Missing body-parser, CORS, etc.

let recipes = [
  { id: 1, title: 'Pasta', description: 'Boil water, add pasta.', author: 'admin' },
  { id: 2, title: 'Toast', description: 'Put bread in toaster.', author: 'user' }
];

// Broken auth middleware
function auth(req, res, next) {
  if (req.headers['authorization'] !== 'Bearer token') {
    return res.status(401).send('Unauthorized');
  }
  next();
}

app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/api/recipes', auth, (req, res) => {
  // Broken: doesn't parse body, always fails
  res.status(500).send('Broken add recipe');
});

// Broken favorites endpoint
app.get('/api/favorites', (req, res) => {
  res.json([]); // always empty
});

// Broken image upload endpoint
app.post('/api/upload', (req, res) => {
  res.status(500).send('Image upload is broken');
});

// Broken comments endpoint
app.get('/api/comments', (req, res) => {
  res.json([]); // never returns real comments
});
app.post('/api/comments', (req, res) => {
  res.status(500).send('Adding comments is broken');
});

// Broken search endpoint
app.get('/api/search', (req, res) => {
  res.json([]); // never filters
});

// Broken profile endpoint
app.get('/api/profile', (req, res) => {
  res.json({ username: '???', email: '???' });
});

// Broken notifications endpoint
app.get('/api/notifications', (req, res) => {
  res.json(['Welcome to RecipeBook!', 'Error: Something went wrong.']);
});

// Dead code
function unused() { return null; }
// TODO: Add real DB

const routes = require('./routes');
app.use('/api', routes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 