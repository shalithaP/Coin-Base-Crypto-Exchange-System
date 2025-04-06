const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas URI
mongoose.connect('mongodb+srv://shalithaP:psrvlog@cluster0.qg2em.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple User model
const User = mongoose.model('User', {
  name: String,
  email: String
});

// POST /users - Add a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// GET /users - Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// ✅ Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
  });
}

// ✅ Export the app for testing
module.exports = app;
