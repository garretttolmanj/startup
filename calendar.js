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

    addWorkout(date, exercise, sets, reps) {
        if (!this.calendar[date]) {
            this.calendar[date] = [];
        }
        this.calendar[date].push(exercise);
        this.calendar[date].push(sets);
        this.calendar[date].push(reps);
        this.save();
    }
  
    save() {
        localStorage.setItem(this.username, JSON.stringify(this));
    }
  
    static load(username) {
        const userData = JSON.parse(localStorage.getItem(username)); 
        return userData;
    }
  }
  
function setUserName(username) {
    const userID = document.getElementById('userID');
    userID.innerText = "- " + username + " -";
} 


const username = localStorage.getItem('username');
const password = localStorage.getItem('password');
const current_user = new User(username, password);
current_user.addWorkout("February 27 2024", "Squats", 5, 8);
current_user.addWorkout("February 27 2024", "Bench", 4, 10);
console.log(current_user.calendar);
current_user.save();
setUserName(username);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = {
    0: ["Sunday", "Sun"],
    1: ["Monday", "Mon"],
    2: ["Tuesday", "Tue"],
    3: ["Wednesday", "Wed"],
    4: ["Thursday", "Thu"],
    5: ["Friday", "Fri"],
    6: ["Saturday", "Sat"]
};

const actualDate = new Date();
let currentMonth = actualDate.getMonth();
let currentYear = actualDate.getFullYear();

function updateCalendar(year, month) {
    currentMonth = month;
    currentYear = year;
    const Month = month;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const calendarMonth = document.getElementById('Month');
    const calendarYear = document.getElementById('Year');
    calendarMonth.innerHTML = `<h2>${monthNames[currentMonth]}</h2>`;
    calendarYear.innerHTML = `<h2>${currentYear}</h2>`;

    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    const firstDayOfMonth = new Date(year, Month, 1).getDay();
    const lastDayOfLastMonth = new Date(actualDate.getFullYear(), actualDate.getMonth(), 0).getDate();
    const lastDayOfMonth = new Date(year, Month + 1, 0).getDate();

    const totalDays = firstDayOfMonth + lastDayOfMonth;
    const numRows = Math.ceil(totalDays / 7) + 1;

    let date = 1;
    let nextMonthDate = 1;
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            if (i === 0) {
                row.classList.add('calendar-week-header');
                const weekday = document.createElement('div');
                weekday.setAttribute('data-full-name', weekdays[j][0]);
                weekday.setAttribute('data-short-name', weekdays[j][1]);
                cell.appendChild(weekday);
            } else if (i === 1 && j < firstDayOfMonth) {
                row.classList.add('calendar-week');
                const day = document.createElement('div');
                day.textContent = lastDayOfLastMonth - firstDayOfMonth + j + 1;
                cell.classList.add('previous-month');
                cell.addEventListener('click', () => {
                    const modal = document.getElementById('calendarModal');
                    if (currentMonth === 0) {
                        updateDay(11, day.textContent, currentYear);
                    } else {
                        updateDay(currentMonth - 1, day.textContent, currentYear);
                    }
                    openItem(modal);
                })
                cell.appendChild(day);
            } else if (date <= lastDayOfMonth) {
                row.classList.add('calendar-week');
                const day = document.createElement('div');
                day.textContent = date;
                if (date === actualDate.getDate() && currentMonth === actualDate.getMonth() && currentYear === actualDate.getFullYear()) {
                    day.classList.add('today');
                }
                cell.addEventListener('click', () => {
                    const modal = document.getElementById('calendarModal');
                    updateDay(currentMonth, day.textContent, currentYear);
                    openItem(modal);
                })
                cell.appendChild(day);
                date++;
            } else if (date > lastDayOfMonth) {
                row.classList.add('calendar-week');
                const day = document.createElement('div');
                day.textContent = nextMonthDate;
                cell.classList.add('previous-month');
                cell.addEventListener('click', () => {
                    const modal = document.getElementById('calendarModal');
                    if (currentMonth === 11) {
                        updateDay(0, day.textContent, currentYear);
                    } else {
                        updateDay(currentMonth + 1, day.textContent, currentYear);
                    }
                    openItem(modal);
                })
                cell.appendChild(day);
                nextMonthDate++;
            }
            cell.classList.add('col-xs-1');
            cell.classList.add('grid-cell');
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}


updateCalendar(currentYear, currentMonth);

document.getElementById('prev-month').addEventListener('click', () => {
    let newYear = currentYear;
    let newMonth = currentMonth - 1;
    if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    }
    updateCalendar(newYear, newMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
    let newYear = currentYear;
    let newMonth = currentMonth + 1;
    if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    }
    updateCalendar(newYear, newMonth);
});

// Exercise Modal
function openItem(item) {
    item.style.display = "block";
}

function closeItem(item) {
    item.style.display = "none";
}

function loadExercises() {
    if (localStorage.getItem('exercise_list') === null) {
        exercise_list = ['Squats', 'Bench', 'Deadlift'];
        localStorage.setItem('exercise_list', JSON.stringify(exercise_list));
    }
    exercise_list = current_user.exercise_list;

    list = document.getElementById('ExerciseList');
    for (const exercise of exercise_list) {
        const item = document.createElement('li');
        item.textContent = exercise;
        list.appendChild(item);
    }

}

document.getElementById('openExerciseModal').addEventListener('click', function() {
    const modal = document.getElementById('ExerciseModal');
    openItem(modal);
});

document.getElementsByClassName("close")[0].addEventListener('click', () => {
    const modal = document.getElementById('ExerciseModal');
    document.getElementById('addExerciseButton').style.display = "flex";
    inputBar = document.getElementById('addExercise').style.display = "none";
    closeItem(modal);
} );
document.getElementsByClassName("close")[1].addEventListener('click', () => {
    const modal = document.getElementById('calendarModal');
    closeItem(modal);
} );

document.getElementById('addExerciseButton').addEventListener('click', () => {
    const btn = document.getElementById('addExerciseButton');
    const inputBar = document.getElementById('addExercise');
    closeItem(btn);
    inputBar.style.display = "flex";
})

window.addEventListener('click', function(event) {
    const modal = document.getElementById('ExerciseModal');
    if (event.target === modal) {
        closeItem(modal);
        document.getElementById('addExerciseButton').style.display = "flex";
        inputBar = document.getElementById('addExercise').style.display = "none";
    }
});
window.addEventListener('click', function(event) {
    const modal = document.getElementById('calendarModal');
    if (event.target === modal) {
        closeItem(modal);
    }
});

document.getElementById('button-addon2').addEventListener('click', addExercise);

// Add event listener for 'keydown' event on the exercise input field
const exerciseInput = document.getElementById('button-addon2').previousElementSibling;
exerciseInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Check if the key pressed is 'Enter'
        addExercise();
    }
});

function addExercise() {
    const newExercise = exerciseInput.value.trim();
    const btn = document.getElementById('addExerciseButton');
    const inputBar = document.getElementById('addExercise'); 
    exercise_list = current_user.exercise_list;
    if (newExercise !== '' && !exercise_list.includes(newExercise)) {
        current_user.addExercise(newExercise);
        document.getElementById('ExerciseList').innerHTML = "";
        loadExercises();
        exerciseInput.value = '';
        inputBar.style.display = "none";
        btn.style.display = 'flex';
    } else {
        exerciseInput.value = '';
        inputBar.style.display = "none";
        btn.style.display = 'flex';
    }
}


function updateDay(month, day, year) {
    const date_section = document.getElementById('Date');
    date_section.innerHTML = '';
    const correct_date = document.createElement('h2');
    const date = monthNames[month] + " " + day + " "  + year;
    correct_date.textContent = date;
    date_section.appendChild(correct_date);

    const exercise_list = current_user.exercise_list;
    const inputBar = document.getElementById('inputGroupSelect01');
    inputBar.innerHTML = '';

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    placeholderOption.hidden = true;
    placeholderOption.textContent = 'Select Exercise';
    inputBar.appendChild(placeholderOption);
    for (item of exercise_list) {
        const new_option = document.createElement('option');
        new_option.innerText = item;
        inputBar.appendChild(new_option);
    }

    // update the workout list
    if (date in current_user.calendar) {
        const workout = document.getElementById('workout')
        for (let i=0; i < current_user.calendar[date].length; i+=3) {
            const exercise = current_user.calendar[date][i];
            const sets = current_user.calendar[date][i + 1];
            const reps = current_user.calendar[date][i + 2];
            
            const new_workout = document.createElement('li');
            const header = document.createElement('h3');
            header.innerText = exercise + " " + sets + " Sets " + reps + " Reps";
            new_workout.appendChild(header);
            const new_table = document.createElement('table');
            // for each workout create the first row then the next row
            const row1 = document.createElement('tr');
            const weight_header = document.createElement('th');
            weight_header.innerText = "Weight";
            row1.appendChild(weight_header);
            for (let j=0; j < sets; j++) {
                const new_cell = document.createElement('td');
                row1.appendChild(new_cell);
            }
            const row2 = document.createElement('tr');
            const reps_header = document.createElement('th');
            reps_header.innerText = "Completed Reps";
            row2.appendChild(reps_header);
            for (let j=0; j < sets; j++) {
                const new_cell = document.createElement('td');
                row2.appendChild(new_cell);
            }
            new_table.appendChild(row1);
            new_table.appendChild(row2);

            new_workout.appendChild(new_table);
            workout.appendChild(new_workout);
        }
    } else {
        console.log(false);
    }
}

document.getElementById('button-addon3').addEventListener('click', function() {
    // Get values from input fields
    const exerciseSelect = document.getElementById('inputGroupSelect01');
    const exercise = exerciseSelect.options[exerciseSelect.selectedIndex].text;
    const sets = document.getElementById('setsInput').value;
    const reps = document.getElementById('repsInput').value;

    // Check if any input field is empty
    if (exercise === 'Exercise' || sets === '' || reps === '') {
        alert('Please fill out all fields');
        return;
    }

    // Get current date
    const dateDiv = document.getElementById('Date');
    const h2Element = dateDiv.querySelector('h2');
    const dateText = h2Element.textContent;

    // Call addWorkout function
    current_user.addWorkout(dateText, exercise, sets, reps);

    // Optional: Clear input fields
    exerciseSelect.selectedIndex = 0;
    document.getElementById('setsInput').value = '';
    document.getElementById('repsInput').value = '';

    // Optional: Display success message or perform other actions
    alert('Workout added successfully!');
});


loadExercises();