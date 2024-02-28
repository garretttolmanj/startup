class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.exercise_list = ["Squat", "Bench", "Deadlift"]
        this.calendar = {};
        this.friends = [];
    }
    
    addExercise(exercise) {
        this.exercise_list.push(exercise);
        this.save();
    }

    addFriend(friend) {
        this.friends.push(friend);
        this.save();
    }
    removeFriend(friend)  {
        this.friends = this.friends.filter(item => item !== friend);
        this.save();
    }

    addWorkout(date, exercise, sets, reps, setsData) {
        if (!this.calendar[date]) {
            this.calendar[date] = [];
        }
        this.calendar[date].push(exercise);
        this.calendar[date].push(sets);
        this.calendar[date].push(reps);
        this.calendar[date].push(setsData);
        this.save();
    }
  
    save() {
        localStorage.setItem(this.username, JSON.stringify(this));
    }

    static load(username) {
        const userData = localStorage.getItem(username);
        if (userData) {
            const userDataObject = JSON.parse(userData);
            // Create a new instance of the User class
            const user = new User(userDataObject.username, userDataObject.password);
            // Populate exercise list and calendar data
            user.exercise_list = userDataObject.exercise_list;
            user.calendar = userDataObject.calendar;
            return user;
        } else {
            return null;
        }
    }
    
  }
  
function setUserName(username) {
    const userID = document.getElementById('userID');
    userID.innerText = "- " + username + " -";
} 



const username = localStorage.getItem('username');
const password = localStorage.getItem('password');
let current_user;

if (localStorage.getItem(username)) {
    current_user = User.load(username);
} else {
    current_user = new User(username, password);
}

console.log(current_user);
current_user.save();
setUserName(username);


current_user.addFriend('Garrett');
current_user.addFriend('johnny');
console.log(current_user.friends);

let myFriends = document.getElementById('myFriends');
myFriends.innerHTML = '';

for (let item of current_user.friends) {
    const new_friend = document.createElement('a');
    new_friend.setAttribute('href', 'friend_view.html');
    new_friend.setAttribute('class', 'list-group-item list-group-item-action');
    new_friend.textContent = item;
    new_friend.addEventListener('click', function(friend) {
        return function() {
            localStorage.setItem('current_friend', friend);
        };
    }(item));
    myFriends.appendChild(new_friend);
}

const friendRequests = document.getElementById('friendRequests');


document.querySelectorAll('.accept-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the friend name from the closest .list-group-item
        const listItem = button.closest('.list-group-item');
        const friendName = listItem.querySelector('.friend-name').textContent.trim();
        // Add the friend to the current_user.friends list
        current_user.addFriend(friendName);
        // Remove the list item
        listItem.remove();
        // Refresh the list of friends
        refreshFriendList();
    });
});

// Add event listeners to all decline buttons
document.querySelectorAll('.decline-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        // Remove the list item
        button.closest('.list-group-item').remove();
    });
});

// Function to refresh the list of friends
function refreshFriendList() {
    const myFriends = document.getElementById('myFriends');
    myFriends.innerHTML = '';
    for (const item of current_user.friends) {
        const new_friend = document.createElement('a');
        new_friend.setAttribute('href', 'friend_view.html');
        new_friend.setAttribute('class', 'list-group-item list-group-item-action');
        new_friend.textContent = item;
        new_friend.addEventListener('click', function(friend) {
            return function() {
                localStorage.setItem('current_friend', friend);
            };
        }(item));
        myFriends.appendChild(new_friend);
    }
}
