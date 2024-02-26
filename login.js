function login() {
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    const user = new User(username, password);
    localStorage.setItem("username", username);
    user.save();
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
  }
  addExercise(exercise) {
    this.exercise_list.push(exercise);
    this.save();
  }
  
  addWorkout(date, exercise) {
      if (!this.calendar[date]) {
          this.calendar[date] = [];
      }
      this.calendar[date].push(exercise);
      this.save();
  }

  save() {
      localStorage.setItem(this.username, JSON.stringify(this));
  }

  static load(username) {
      const userData = localStorage.getItem(username);
      return userData ? JSON.parse(userData) : null;
  }
} 
