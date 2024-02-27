class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.exercise_list = ["Squat", "Bench", "Deadlift"]
        this.calendar = {};
    }
    
    addExercise(exercise) {
        this.exercise_list.push(exercise);
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

const stats_dict = {}
console.log(current_user.exercise_list)
for (exercise of current_user.exercise_list) {
    stats_dict[exercise] = 0;
}
console.log(stats_dict);

// for (key in current_user.calendar) {
//     for (let i=0; i < current_user.calendar[key].length; i+=4) {
//         const exercise = current_user.calendar[key][i];
//         const data = current_user.calendar[key][i + 3];
//         console.log(data);
//         for ()
//     }
// }