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
            const user = new User(userDataObject.username, userDataObject.password);
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

console.log(stats_dict)

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