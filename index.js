const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);
// Serve index.html for all routes


const User = require('./User');
let users = {};

// Function to add a new user
function addUser(username, password) {
  console.log('Adding user:', username, password);
  if (username === '' || password === '') {
      return 'empty';
  } else if (users.hasOwnProperty(username)) {
      return false; 
  } else {
      users[username] = new User(username, password);
      return true;
  }
}

// Function to retrieve user by username
function getUser(username) {
  return users.hasOwnProperty(username) ? users[username] : null;
}

// Register a new user
app.post('/api/register', (req, res, next) => {
  try {
    console.log('Received registration request:', req.body);
    const { username, password } = req.body;
    const result = addUser(username, password);
    if (result === true) {
      console.log('User registered successfully:', username);
      res.status(201).json({ message: 'User registered successfully' });
    } else if (result === false) {
      console.log('Username already taken:', username);
      res.status(401).json({ message: 'Username has been taken' });
    } else if (result === 'empty') {
      console.log('Empty username or password');
      res.status(400).json({ message: 'Username or password cannot be empty' });
    }
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});


apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (user && user.password === password) {  
    res.json({ message: 'Login successful' });
  } else {
      res.status(401).json({ message: 'Invalid username or password' });
  }
});

apiRouter.get('/exercises', (req, res) => {
  const { username } = req.query;
  const user = getUser(username);
  if (user) {
      res.json({ exercises: user.exercises });
  } else {
      res.status(404).json({ message: 'User not found' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});