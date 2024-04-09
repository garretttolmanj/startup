const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { setupWebSocketServer } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ message: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);
    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  console.log(req);
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ message: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/users/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
      const token = req.cookies.token;
      res.json({ user: user, authenticated: token === user.token });
      return;
  }

  res.status(404).send({ message: 'Unknown' });
});

apiRouter.get('/friends/:friend', async (req, res) => {
  const { username, exercise_list, calendar } = await DB.getFriend(req.params.friend)
  if (username) {
    res.json({ username: username, exercise_list: exercise_list, calendar: calendar});
    return;
  }
  res.status(404).send({ message: 'Unknown' });
  return;
})


apiRouter.get('/users', async (req, res) => {
  const query = req.query.query;
  const currentUser = req.query.currentUser;

  let usernames = await DB.getAllUsers(currentUser);
  const regexPattern = new RegExp(query, 'i');

  const matchingUsers = usernames.filter(user => regexPattern.test(user));

  res.json( {matchingUsers} );
});



apiRouter.post('/save', async (req, res) => {
  try {
    const { username, exercise_list, calendar, friends, friend_requests } = req.body;
    const user = await DB.getUser(username);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    // Check if the token in the request matches the user's token
    const token = req.cookies.token;
    if (token !== user.token) {
      return res.status(401).send({ message: 'Not authenticated!' });
    }
    
    // Save the user's data
    await DB.saveUser(username, exercise_list, calendar, friends, friend_requests);

    res.status(200).send('User data saved successfully');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error saving user');
  }
});

apiRouter.post('/friendRequest', async (req, res) => {
  try {
    const { senderUsername, recipientUsername } = req.body;
    const result = await DB.sendFriendRequest(senderUsername, recipientUsername);
    if (!result) {
      return res.status(404).send({ message: 'Error sending friend request' });
    };
    
    res.status(200).send('User data saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error sending friend Request');
  }
})

apiRouter.post('/acceptedRequest', async (req, res) => {
  try {
    const { username, friendName } = req.body;
    const result = await DB.acceptedFriendRequest(username, friendName);
    if (!result) {
      return res.status(404).send({ message: 'Error accepting friend request' })
    }
    
    res.status(200).send('Friend data saved successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error accepting friend Request');
  }
})


var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

setupWebSocketServer(httpService);







