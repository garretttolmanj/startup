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

async function getFriend(friend) {
    user = await userCollection.findOne( {username: friend });
    return {username: user.username, exercise_list: user.exercise_list, calendar: user.calendar};
}

async function createUser(username, password) {
// Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        exercise_list: ["Squat", "Bench", "Deadlift"],
        friends: [],
        friend_requests: [],
        calendar: {}
    };
    await userCollection.insertOne(user);

    return user;
}

async function saveUser(username, exercise_list, calendar, friends, friend_requests) {
    const filter = { username: username };
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
        throw error;
    }
}

async function getAllUsers(currentUsername) {
    try {
        // Query the database to find all users except the current user
        const users = await userCollection.find({ username: { $ne: currentUsername } }).toArray();
        const usernames = users.map(user => user.username);
        return usernames;
    } catch (error) {
        console.error('Error getting all users:', error);
        throw error;
    }
}

async function sendFriendRequest(senderUsername, recipientUsername) {
    try {
        const senderUser = await getUser(senderUsername);
        const recipientUser = await getUser(recipientUsername);

        // Update the recipient's friend_requests array
        if (!recipientUser.friend_requests.includes(senderUsername)) {
            recipientUser.friend_requests.push(senderUsername);
        }
        // if (!senderUser.friend_requests.includes(recipientUsername)) {
        //     senderUser.friend_requests.push(recipientUsername);
        // }
        // Save the updated recipient user object back to the database
        await saveUser(recipientUsername, recipientUser.exercise_list, recipientUser.calendar, recipientUser.friends, recipientUser.friend_requests);
        await saveUser(senderUsername, senderUser.exercise_list, senderUser.calendar, senderUser.friends, senderUser.friend_requests)
        return true; 
    } catch (error) {
        console.error('Error sending friend request:', error);
        return false;
    }
}

async function acceptedFriendRequest(username, friendName) {
    try {
        const friend = await getUser(friendName);
        
        if (!friend.friends.includes(username)) {
            friend.friends.push(username);
        }
        await saveUser(friendName, friend.exercise_list, friend.calendar, friend.friends, friend.friend_requests);
        return true;
    }catch (error) {
        console.error('Error in accepting friend request:', error);
        return false;
    }
}


module.exports = {
    getUser,
    getUserByToken,
    getFriend,
    createUser,
    getAllUsers,
    saveUser,
    sendFriendRequest,
    acceptedFriendRequest
  };