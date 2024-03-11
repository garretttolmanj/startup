const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);
// Serve index.html for all routes



let users = {};
class User {
  constructor(username, password) {
      this.username = username;
      this.password = password;
      this.exercise_list = ["Squat", "Bench", "Deadlift"]
      this.calendar = {};
      this.friends = [];
  }
}

// Function to add a new user
function addUser(username, password) {
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
  const { username, password } = req.body;
  const result = addUser(username, password);
  if (result === true) {
    res.status(201).json({ message: 'User registered successfully' });
  } else if (result === false) {
    res.status(401).json({ message: 'Username has been taken' });
  } else if (result === 'empty') {
    res.status(400).json({ message: 'Username or password cannot be empty' });
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

apiRouter.post('/users', (req, res) => {
  const { username } = req.body;
  const user = getUser(username);
  if (user) {
      res.json(user);
  } else {
      res.status(404).json({ message: 'User not found' });
  }
});

apiRouter.post('/save', (req, res) => {
  const { username, exercise_list, calendar, friends } = req.body;
  const user = getUser(username);
  if (user) {
    user.exercise_list = exercise_list;
    user.calendar = calendar;
    user.friends = friends;
    res.send('Saved');
  } else {
      res.status(404).json({message: 'User not found'})
  }
})


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