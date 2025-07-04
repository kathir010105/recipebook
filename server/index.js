const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('./middleware/cors');
const app = express();
const routes = require('./routes/routes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors);
app.use(express.json()); // To parse JSON bodies

// Use only the router for /api
app.use('/api', routes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 