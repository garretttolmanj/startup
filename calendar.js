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
                cell.appendChild(day);
            } else if (date <= lastDayOfMonth) {
                row.classList.add('calendar-week');
                const day = document.createElement('div');
                day.textContent = date;
                if (date === actualDate.getDate() && currentMonth === actualDate.getMonth() && currentYear === actualDate.getFullYear()) {
                    day.classList.add('today');
                }
                cell.appendChild(day);
                date++;
            } else if (date > lastDayOfMonth) {
                row.classList.add('calendar-week');
                const day = document.createElement('div');
                day.textContent = nextMonthDate;
                cell.classList.add('previous-month');
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
    exercise_list = JSON.parse(localStorage.getItem('exercise_list'));

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
    }
});
document.getElementById('button-addon2').addEventListener('click', () => { // Add event listener to the "Add" button
    const exerciseInput = document.getElementById('button-addon2').previousElementSibling; // Get the input element
    const newExercise = exerciseInput.value.trim(); // Get the value and remove leading/trailing spaces

    if (newExercise !== '') { // Ensure the input is not empty
        let exerciseList = JSON.parse(localStorage.getItem('exercise_list')) || []; // Retrieve or initialize exercise list from localStorage
        exerciseList.push(newExercise); // Add the new exercise
        localStorage.setItem('exercise_list', JSON.stringify(exerciseList)); // Update localStorage

        // Update the displayed list of exercises in the modal
        loadExercises();

        // Reset input field and hide input bar
        exerciseInput.value = '';
        const inputBar = document.getElementById('addExercise');
        inputBar.style.display = "none";
    }
});


loadExercises();