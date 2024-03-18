const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

function getUser(username) {
    return userCollection.findOne({ username: username });
}
  
function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

// function getFriend(username) {
//     user = userCollection.findOne( {username: username });
//     console.log(user);
//     return user;
// }
async function createUser(username, password) {
// Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        exercise_list: ["Squat", "Bench", "Deadlift"],
        friends: [],
        calendar: {}
    };
    await userCollection.insertOne(user);

    return user;
}

async function saveUser(username, exercise_list, calendar, friends, friend_requests) {
    const filter = { username: username }; // Define filter criteria
    const update = {
        $set: { // Use $set to update specific fields
            exercise_list: exercise_list,
            calendar: calendar,
            friends: friends,
            friend_requests: friend_requests
        }
    };

    try {
        const result = await userCollection.updateOne(filter, update);
        return result;
    } catch (error) {
        console.error('Error updating document:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}

async function getAllUsers(currentUsername) {
    try {
        // Query the database to find all users except the current user
        const users = await userCollection.find({ username: { $ne: currentUsername } }).toArray();
        // Extract only the usernames from the user objects
        const usernames = users.map(user => user.username);
        return usernames;
    } catch (error) {
        console.error('Error getting all users:', error);
        throw error; // Rethrow the error to handle it in the caller function
    }
}



module.exports = {
    getUser,
    getUserByToken,
    createUser,
    getAllUsers,
    saveUser
  };