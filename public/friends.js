class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.exercise_list = ["Squat", "Bench", "Deadlift"]
        this.calendar = {};
        this.friends = [];
        this.friend_requests = [];
    }
    
    addExercise(exercise) {
        this.exercise_list.push(exercise);
        this.save();
    }

    addFriend(friend) {
        this.friends.push(friend);
        this.removeRequest(friend);
    }
    
    removeRequest(friend) {
        this.friend_requests = this.friend_requests.filter(item => item !== friend);
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
                body: JSON.stringify({ username: this.username, exercise_list: this.exercise_list, calendar: this.calendar, friends: this.friends, friend_requests: this.friend_requests })
            });
        } catch (error) {
            window.alert("Error saving user");
        }
    }    

    static async load(username) {
        try {
            const response = await fetch(`/api/users/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userDataObject = await response.json();
    
            // Check if user is authenticated
            if (userDataObject.authenticated) {
                const user = new User(userDataObject.user.username, userDataObject.user.password);
                user.exercise_list = userDataObject.user.exercise_list;
                user.calendar = userDataObject.user.calendar;
                user.friends = userDataObject.user.friends;
                console.log(userDataObject.friends);
                console.log(userDataObject.friend_requests)
                user.friend_requests = userDataObject.user.friend_requests;
                return user;
            } else {
                console.log('User is not authenticated');
            }
    
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
    const searchInput = document.getElementById('searchInput');

    const searchResults = document.getElementById('searchResults');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim(); // Trim whitespace from the input
    
        // Clear previous search results
        searchResults.innerHTML = '';
    
        // If the query is empty, hide the dropdown
        if (!query) {
            hideDropdown();
            return;
        }
    
        // Fetch matching usernames from the server
        fetchUsernames(query, username)
            .then(usernames => {
                // Display search results
                displaySearchResults(usernames);
            })
            .catch(error => {
                console.error('Error fetching usernames:', error);
            });
    });

    async function fetchUsernames(query, currentUser) {
        try {
            const response = await fetch(`/api/users?query=${query}&currentUser=${currentUser}`);
            if (!response.ok) {
                throw new Error('Failed to fetch usernames');
            }
            const data = await response.json();
            return data.matchingUsers;
        } catch (error) {
            throw error;
        }
    }
    
    function displaySearchResults(usernames) {
        usernames.forEach(username => {
            const resultItem = document.createElement('a');
            resultItem.classList.add('dropdown-item');
            resultItem.textContent = username;
            resultItem.href = '#'; // Add a link if you want to navigate to user profile
            const searchButton = document.getElementById('searchButton');
            const requestButton = document.getElementById('sendRequest');
            resultItem.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                // Handle click on a search result (e.g., send friend request)
                hideDropdown();
                searchButton.classList.add('hide');
                requestButton.classList.remove('hide');
                // Clear search input
                searchInput.value = username;
            });
            searchResults.appendChild(resultItem);
        });
    
        // Show the dropdown
        showDropdown();
    }
    
    function showDropdown() {
        searchResults.classList.add('show');
    }
    
    // Function to hide the dropdown
    function hideDropdown() {
        searchResults.classList.remove('show');
    }
    
    
    const inputBar = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const requestButton = document.getElementById('sendRequest');
    
    async function sendFriendRequest(username, friend) {
        try {
            await fetch('/api/friendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ senderUsername: username, recipientUsername: friend })
            });
        } catch (error) {
            window.alert("Error sending Request");
        }
    }
    console.log(current_user);
    inputBar.addEventListener('click', () => {
        showDropdown();
        searchButton.classList.remove('hide');
        requestButton.classList.add('hide');
        requestButton.innerText = "Send Friend Request";
    })
    requestButton.addEventListener('click', () => {
        requestButton.innerText = 'Sent!';
        const friend = inputBar.value;
        sendFriendRequest(current_user.username, friend);
    })
    // displayFriends();

    // Fetch all usernames except the current user's from the backend
    // const allUsernames = await getAllUsernames(username);
    // console.log(allUsernames);

    // displayUsernamesInSearchBar(allUsernames);

    // async function getAllUsernames(currentUser) {
    //     try {
    //         // Fetch all usernames from the backend
    //         const response = await fetch(`/api/users?username=${currentUser}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch usernames');
    //         }
    //         const data = await response.json();
    //         return data.usernames.filter(username => username !== currentUser);
    //     } catch (error) {
    //         console.error('Error fetching usernames:', error);
    //         return [];
    //     }
    // }

    // function displayUsernamesInSearchBar(usernames) {

    //     const searchInput = document.querySelector('.form-control');


    //     searchInput.value = '';

    //     usernames.forEach(username => {
    //         const option = document.createElement('option');
    //         option.value = username;
    //         searchInput.appendChild(option);
    //     });
    // }

    // async function displayFriends() {
    //     const myFriends = document.getElementById('myFriends');
    //     myFriends.innerHTML = '';
    //     current_user.friends.forEach(friend => {
    //         const new_friend = document.createElement('a');
    //         new_friend.setAttribute('href', 'friend_view.html');
    //         new_friend.setAttribute('class', 'list-group-item list-group-item-action');
    //         new_friend.textContent = friend;
    //         new_friend.addEventListener('click', function(friend) {
    //             return function() {
    //                 localStorage.setItem('current_friend', friend);
    //             };
    //         }(friend));
    //         myFriends.appendChild(new_friend);
    //     });
    // }

    
    const friendRequestsList = document.getElementById('friendRequests');
    friendRequestsList.innerHTML = '';

    current_user.friend_requests.forEach(friendName => {

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'list-group-item-dark');

        const friendNameSpan = document.createElement('span');
        friendNameSpan.classList.add('friend-name');
        friendNameSpan.textContent = friendName;

        const acceptBtn = document.createElement('button');
        acceptBtn.type = 'button';
        acceptBtn.classList.add('btn', 'btn-outline-success', 'btn-sm', 'accept-btn');
        acceptBtn.textContent = 'Accept';

        const declineBtn = document.createElement('button');
        declineBtn.type = 'button';
        declineBtn.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'decline-btn');
        declineBtn.textContent = 'Decline';

        listItem.appendChild(friendNameSpan);
        listItem.appendChild(acceptBtn);
        listItem.appendChild(declineBtn);

        friendRequestsList.appendChild(listItem);

        acceptBtn.addEventListener('click', async function() {
            const listItem = acceptBtn.closest('.list-group-item');
            const friendName = listItem.querySelector('.friend-name').textContent.trim();
            await current_user.addFriend(friendName);
            await current_user.removeRequest(friendName);
            listItem.remove();
            refreshFriendList();
        });

        // Add event listener for decline button
        declineBtn.addEventListener('click', async function() {
            const listItem = declineBtn.closest('.list-group-item');
            const friendName = listItem.querySelector('.friend-name').textContent.trim();
            await current_user.removeRequest(friendName);
            listItem.remove();
        });

    });

    // Function to refresh the friend list after accepting a friend request
    function refreshFriendList() {
        const myFriends = document.getElementById('myFriends');
        myFriends.innerHTML = '';
        current_user.friends.forEach(friend => {
            const new_friend = document.createElement('a');
            new_friend.setAttribute('href', 'friend_view.html');
            new_friend.setAttribute('class', 'list-group-item list-group-item-action');
            new_friend.textContent = friend;
            new_friend.addEventListener('click', function(clickedFriend) {
                return function() {
                    document.cookie = `current_user=${clickedFriend}; path=/`;
                };
            }(friend));
            myFriends.appendChild(new_friend);
        });
    }
    
    refreshFriendList();
}

main();
