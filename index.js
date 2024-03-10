const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));


app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

const User = require('./User');

let users = {};

// Function to add a new user
function addUser(username, password) {
    if (!users[username]) {
        users[username] = new User(username, password);
        return true;
    } else {
      return false;
    }
}

// Function to retrieve user by username
function getUser(username) {
  return users.hasOwnProperty(username) ? users[username] : null;
}


// Register a new user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!addUser(username, password)) {
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(401).json({ message: 'Username has been taken' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  if (user && user.password === password) {
      res.json({ message: 'Login successful' });
  } else {
      res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.get('/api/exercises', (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});