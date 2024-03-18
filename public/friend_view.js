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

  class Friend {
    constructor(username) {
        this.username = username;
        this.exercise_list = ["Squat", "Bench", "Deadlift"]
        this.calendar = {};
    }
    
    addExercise(exercise) {
        this.exercise_list.push(exercise);
        this.save();
    }

    static async load(username) {
        try {
            const response = await fetch(`/api/friends/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userDataObject = await response.json();
    
            if (userDataObject) {
                const user = new Friend(userDataObject.username);
                user.exercise_list = userDataObject.exercise_list;
                user.calendar = userDataObject.calendar;
                return user;
            } else {
                console.log('Error retrieving user');
            }
    
        } catch (error) {
            console.error('Error loading friend:', error);
            return null;
        }
    }
    
  }  


function setUserName(username) {
    const userID = document.getElementById('userID');
    userID.innerText = "- " + username + " -";
}

function setFriendID(friend_name) {
    const friend_ID = document.getElementById('openStatModal');
    friend_ID.innerText = "View " + friend_name + "'s Stats";
}

let current_user;
let current_friend;

async function getUserAndSetUserName(username, friend_name) {
    current_user = await User.load(username);
    current_friend = await Friend.load(friend_name);
    setFriendID(friend_name);
    setUserName(username);
}
// I want to add functionality to remove friends


async function main() {


    
    const username = document.cookie.match(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/)[1];
    const friend_name = document.cookie.match(/(?:(?:^|.*;\s*)current_user\s*=\s*([^;]*).*$)|^.*$/)[1];
    await getUserAndSetUserName(username, friend_name);


    // Added functionality to transfer workouts made by your friends to your own calendar.
    function copyWorkout(date){
        const workout = current_friend.calendar[date];
        if (workout) {
            for (let i = 0; i < workout.length; i+=4) {
                const exercise = workout[i];
                if (!current_user.exercise_list.includes(exercise)) {
                    current_user.addExercise(exercise);
                }
                const sets = workout[i+1];
                const reps = workout[i+2];
                current_user.addWorkout(date, exercise, sets, reps, [])
            }
        }
    }

    document.getElementById('copyWorkout').addEventListener('click', () => {
        const date = document.getElementById('Date').innerText;
        const btn = document.getElementById('copyWorkout').innerText = 'Transferred!'
        copyWorkout(date);
    });


    // functionality to display your friend's stats.
    const stats_dict = {}
    for (exercise of current_friend.exercise_list) {
        stats_dict[exercise] = 0;
    }

    for (key in current_friend.calendar) {
        for (let i=0; i < current_friend.calendar[key].length; i+=4) {
            const exercise = current_friend.calendar[key][i];
            const data = current_friend.calendar[key][i + 3];
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

    //I still need to Add some functionality to display your friends stats and be able to copy your friend's workouts to your day.

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

    function openItem(item) {
        item.style.display = "block";
    }

    function closeItem(item) {
        item.style.display = "none";
    }


    document.getElementById('openStatModal').addEventListener('click', function() {
        const modal = document.getElementById('statModal');
        openItem(modal);
    });

    document.getElementsByClassName("close")[0].addEventListener('click', () => {
        const modal = document.getElementById('statModal');
        closeItem(modal);
    } );

    document.getElementsByClassName("close")[1].addEventListener('click', () => {
        const modal = document.getElementById('calendarModal');
        closeItem(modal);
    } );

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('statModal');
        if (event.target === modal) {
            closeItem(modal);
        }
    });




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
    document.getElementsByClassName("close")[0].addEventListener('click', () => {
        const modal = document.getElementById('calendarModal');
        closeItem(modal);
    } );

    function updateDay(month, day, year) {
        
        const date_section = document.getElementById('Date');
        date_section.innerHTML = '';
        const correct_date = document.createElement('h2');
        const date = monthNames[month] + " " + day + " "  + year;
        correct_date.textContent = date;
        date_section.appendChild(correct_date);

        const exercise_list = current_friend.exercise_list;

        const workout = document.getElementById('workout');
        workout.innerHTML = '';
        // update the workout list
        if (date in current_friend.calendar) {
            for (let i=0; i < current_friend.calendar[date].length; i+=4) {
                const exercise = current_friend.calendar[date][i];
                const sets = current_friend.calendar[date][i + 1];
                const reps = current_friend.calendar[date][i + 2];
                const set_Data = current_friend.calendar[date][i + 3];
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
                    if (j < set_Data.length) {
                        const new_cell = document.createElement('td');
                        new_cell.textContent = set_Data[j].weight;

                        row1.appendChild(new_cell);
                    } else {
                        const new_cell = document.createElement('td');
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
                        
                        row2.appendChild(new_cell);
                        
                    } else {
                        const new_cell = document.createElement('td');
                        

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
}
main();