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
        this.save();
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
        exercise_list = current_user.exercise_list;
        list = document.getElementById('ExerciseList');
        list.innerHTML = '';
        for (const exercise of exercise_list) {
            const item = document.createElement('li');
            item.textContent = exercise;
            list.appendChild(item);
        }

    }

    document.getElementById('openExerciseModal').addEventListener('click', function() {
        const modal = document.getElementById('ExerciseModal');
        loadExercises();
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

    // calendar modal
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
        if (event.key === 'Enter') { 
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
        const workout = document.getElementById('workout');
        workout.innerHTML = '';
        // update the workout list
        if (date in current_user.calendar) {
            for (let i=0; i < current_user.calendar[date].length; i+=4) {
                const exercise = current_user.calendar[date][i];
                const sets = current_user.calendar[date][i + 1];
                const reps = current_user.calendar[date][i + 2];
                const set_Data = current_user.calendar[date][i + 3];
                const new_workout = document.createElement('li');
                const header = document.createElement('h3');
                const btn = document.createElement('button');
                header.innerText = exercise + " " + sets + " Sets " + reps + " Reps";

                btn.textContent = 'Remove';
                btn.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'remove-btn');
                btn.addEventListener('click', function() {
                    const listItem = btn.closest('li');
                    if (listItem) {
                    listItem.remove();
                    }
                    current_user.calendar[date].splice(i, i+4);
                    current_user.save();
                });
                new_workout.appendChild(header);
                new_workout.appendChild(btn);
                const new_table = document.createElement('table');
                // for each workout create the first row then the next row
                const row1 = document.createElement('tr');
                const weight_header = document.createElement('th');
                weight_header.innerText = "Weight";
                row1.appendChild(weight_header);
                for (let j=0; j < sets; j++) {
                    if (j < set_Data.length) {
                        const new_cell = document.createElement('td');
                        new_cell.textContent = set_Data[j].weight;

                        new_cell.addEventListener('click', ()=> {
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = new_cell.textContent.trim();
                            new_cell.innerHTML = '';
                            new_cell.appendChild(input);
                            input.focus();
                            input.addEventListener('blur', function() {
                                new_cell.textContent = input.value;
                                if (!current_user.calendar[date][i + 3][j]) {
                                    current_user.calendar[date][i + 3].push({weight: input.value});
                                    current_user.save();
                                } else {
                                    current_user.calendar[date][i + 3][j].weight = input.value;
                                    current_user.save();
                                }
                            });
                            input.addEventListener('keypress', function(event) {
                                if (event.key === 'Enter') {
                                    input.blur();
                                }
                            });
                        })

                        row1.appendChild(new_cell);
                    } else {
                        const new_cell = document.createElement('td');
                        new_cell.addEventListener('click', ()=> {
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = new_cell.textContent.trim();
                            new_cell.innerHTML = '';
                            new_cell.appendChild(input);
                            input.focus();
                            input.addEventListener('blur', function() {
                                new_cell.textContent = input.value;
                                if (!current_user.calendar[date][i + 3][j]) {
                                    current_user.calendar[date][i + 3].push({weight: input.value});
                                    current_user.save();
                                } else {
                                    current_user.calendar[date][i + 3][j].weight = input.value;
                                    current_user.save();
                                }
                            });
                            input.addEventListener('keypress', function(event) {
                                if (event.key === 'Enter') {
                                    input.blur();
                                }
                            });
                        })
                        row1.appendChild(new_cell); 
                    }
                }
                const row2 = document.createElement('tr');
                const reps_header = document.createElement('th');
                reps_header.innerText = "Reps";
                row2.appendChild(reps_header);
                for (let j=0; j < sets; j++) {
                    if (j < set_Data.length) {
                        const new_cell = document.createElement('td');
                        new_cell.textContent = set_Data[j].completedReps;
                        
                        new_cell.addEventListener('click', ()=> {
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = new_cell.textContent.trim();
                            new_cell.innerHTML = '';
                            new_cell.appendChild(input);
                            input.focus();
                            input.addEventListener('blur', function() {
                                new_cell.textContent = input.value;
                                if (!current_user.calendar[date][i + 3][j]) {
                                    current_user.calendar[date][i + 3].push({completedReps: input.value});
                                    current_user.save();
                                } else {
                                    current_user.calendar[date][i + 3][j].completedReps = input.value;
                                    current_user.save();
                                }
                            });
                            input.addEventListener('keypress', function(event) {
                                if (event.key === 'Enter') {
                                    input.blur();
                                }
                            });
                        })
                        row2.appendChild(new_cell);
                        
                    } else {
                        const new_cell = document.createElement('td');
                        
                        new_cell.addEventListener('click', ()=> {
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = new_cell.textContent.trim();
                            new_cell.innerHTML = '';
                            new_cell.appendChild(input);
                            input.focus();
                            input.addEventListener('blur', function() {
                                new_cell.textContent = input.value;
                                if (!current_user.calendar[date][i + 3][j]) {
                                    current_user.calendar[date][i + 3].push({completedReps: input.value});
                                    current_user.save();
                                } else {
                                    current_user.calendar[date][i + 3][j].completedReps = input.value;
                                    current_user.save();
                                }
                            });
                            input.addEventListener('keypress', function(event) {
                                if (event.key === 'Enter') {
                                    input.blur();
                                }
                            });
                        })

                        row2.appendChild(new_cell); 
                    }
                }
                new_table.appendChild(row1);
                new_table.appendChild(row2);

                new_workout.appendChild(new_table);
                workout.appendChild(new_workout);
            }
        }
    }

    document.getElementById('button-addon3').addEventListener('click', function() {

        const exerciseSelect = document.getElementById('inputGroupSelect01');
        const exercise = exerciseSelect.options[exerciseSelect.selectedIndex].text;
        const sets = document.getElementById('setsInput').value;
        const reps = document.getElementById('repsInput').value;
        const setData = [];

        if (exercise === 'Exercise' || sets === '' || reps === '') {
            alert('Please fill out all fields');
            return;
        }

        const dateDiv = document.getElementById('Date');
        const h2Element = dateDiv.querySelector('h2');
        const dateText = h2Element.textContent;

        current_user.addWorkout(dateText, exercise, Number(sets), Number(reps), setData);

        exerciseSelect.selectedIndex = 0;
        document.getElementById('setsInput').value = '';
        document.getElementById('repsInput').value = '';

        const current_date = dateText.split(' ');
        const month = monthNames.indexOf(current_date[0]);
        const day = Number(current_date[1]);
        const year = Number(current_date[2]);

        updateDay(month, day, year);

    });
}

main();
