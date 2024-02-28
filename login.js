function login() {
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    window.location.href = "calendar.html";
}

document.getElementById('signinBtn').addEventListener('click', function() {
    login();
});

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