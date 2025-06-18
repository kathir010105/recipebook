const express = require('express');
const app = express();

let recipes = [
  { id: 1, title: 'Pasta', description: 'Boil water, add pasta.', author: 'admin' },
  { id: 2, title: 'Toast', description: 'Put bread in toaster.', author: 'user' }
];

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
  res.status(500).send('Broken add recipe');
});

app.get('/api/favorites', (req, res) => {
  res.json([]);
});

app.post('/api/upload', (req, res) => {
  res.status(500).send('Image upload is broken');
});

app.get('/api/comments', (req, res) => {
  res.json([]);
});
app.post('/api/comments', (req, res) => {
  res.status(500).send('Adding comments is broken');
});

app.get('/api/search', (req, res) => {
  res.json([]);
});

app.get('/api/profile', (req, res) => {
  res.json({ username: '???', email: '???' });
});

app.get('/api/notifications', (req, res) => {
  res.json(['Welcome to RecipeBook!', 'Error: Something went wrong.']);
});

function unused() { return null; }

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 