const express = require('express');
const path = require('path');
const userModel = require('./app/models/userModel');

const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));



// GET all users
app.get('/users', (req, res) => {
    userModel.getAllUsers((error, users) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.render('users/', { users });
    //   res.json(users);
    });
});
  
  // GET user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    userModel.getUserById(userId, (error, user) => {
      if (error) {
        if (error.message === 'User not found') {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(500).json({ error: 'Internal server error' });
        }
        return;
      }
  
      res.json(user);
    });
});
  
  // POST create user
app.post('/users', (req, res) => {
    const userData = req.body;
  
    userModel.createUser(userData, (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      res.status(201).json(result);
    });
});
  
  // PUT update user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
  
    userModel.updateUser(userId, userData, (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      res.json(result);
    });
});
  
  // DELETE user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    userModel.deleteUser(userId, (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      res.json(result);
    });
});

// Define routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Welcome to my EJS app!' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', message: 'This is the about page.' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
