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
    const username = document.cookie.match(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/)[1];
    await getUserAndSetUserName(username);

    const stats_dict = {}
    for (exercise of current_user.exercise_list) {
        stats_dict[exercise] = 0;
    }

    for (key in current_user.calendar) {
        for (let i=0; i < current_user.calendar[key].length; i+=4) {
            const exercise = current_user.calendar[key][i];
            const data = current_user.calendar[key][i + 3];
            for (item of data) {
                if (Number(item.weight) > stats_dict[exercise]) {
                    stats_dict[exercise] = Number(item.weight);
                }
            }
        }
    }


    const stats_table = document.getElementById('stats_table');
    stats_table.innerHTML = '';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const row_head = document.createElement('tr');
    const lift = document.createElement('th');
    const Max = document.createElement('th');
    lift.innerText = 'Lift';
    Max.innerText = 'Max';
    row_head.appendChild(lift);
    row_head.appendChild(Max);
    thead.appendChild(row_head);
    stats_table.appendChild(thead);

    for (exercise in stats_dict) {
        const row_body = document.createElement('tr');
        const lift_stat = document.createElement('td');
        const weight_stat = document.createElement('td');
        lift_stat.innerText = exercise;
        weight_stat.innerText = stats_dict[exercise];

        row_body.appendChild(lift_stat);
        row_body.appendChild(weight_stat);
        tbody.appendChild(row_body);
    }
    stats_table.appendChild(tbody);
}

main();