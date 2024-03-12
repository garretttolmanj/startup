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
  
    async save() {
        try {
            await fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.username, exercise_list: this.exercise_list, calendar: this.calendar, friends: this.friends })
            });
        } catch (error) {
            window.alert("Error saving user");
        }
    }    

    static async load(username) {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            
            const userDataObject = await response.json();
            console.log(userDataObject);
            const user = new User(userDataObject.username, userDataObject.password);
            user.exercise_list = userDataObject.exercise_list;
            user.calendar = userDataObject.calendar;
            return user;

        } catch (error) {
            console.error('Error loading user:', error);
            return null;
        }
    }
    
    
  }


function setUserName(username) {
    const userID = document.getElementById('userID');
    userID.innerText = "- " + username + " -";
}

let current_user;

async function getUserAndSetUserName(username) {
    current_user = await User.load(username);
    setUserName(username);
}


async function main() {

    const username = localStorage.getItem('username');
    await getUserAndSetUserName(username);

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
            const listItem = button.closest('.list-group-item');
            const friendName = listItem.querySelector('.friend-name').textContent.trim();
            current_user.addFriend(friendName);
            listItem.remove();
            refreshFriendList();
        });
    });

    document.querySelectorAll('.decline-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            button.closest('.list-group-item').remove();
        });
    });

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
}

main();