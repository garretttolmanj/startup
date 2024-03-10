
async function login() {
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;
    if (username === '' || password === '') {
        window.alert('Username or password cannot be empty');
        return;
    }
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.href = "calendar.html";
    } else {
        window.alert('Username and Password not recognized')
    }
}

document.getElementById('signinBtn').addEventListener('click', function() {
    login();
});

async function getquote() {
    // Fetch a random quote from the Quotable API
    const response = await fetch('https://api.quotable.io/quotes/random?tags=athletics|competition|health|inspirational|motivational|pain|perseverance|sports|success|war|work');
    const data = await response.json();
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    if (response.ok) {
        quote.innerText = data[0].content;
        author.innerText = data[0].author;
    } else {
        quote.innerText = "YEAH BUDDY!!!!!"
        author.innerText = "Ronnie Coleman";
    }
  }
//   athletics|competition|health|inspirational|motivational|pain|perseverance|sports|success|war|work  /quotes/random?tags=athletics
getquote();
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