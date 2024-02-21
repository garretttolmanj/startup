// const weekdays = {0 : ["Sunday", "Sun"], 1 : ["Monday", ]}
function updateCalendar() {
    const currentDate = new Date();
    const Year = currentDate.getFullYear()
    const LongMonth = currentDate.toLocaleString('default', { month: 'long' });
    const Month = currentDate.getMonth()
    const firstDayOfMonth = new Date(Year, Month, 1);
    const firstWeekDay = firstDayOfMonth.toLocaleString('en-US', { weekday: 'long' });
    const lastDayOfMonth = new Date(Year, Month + 1, 0);


    const calendarMonth = document.getElementById('Month');
    const calendarYear = document.getElementById('Year');
    calendarMonth.innerHTML = `<h2>${LongMonth}</h2>`;
    calendarYear.innerHTML = `<h2>${Year}</h2>`

    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            if (i === 0) {
                row.classList.add('calendar-week-header');
                cell.textContent = "Date";
            } else {
                row.classList.add('calendar-week')
                const day = document.createElement('div')
                day.textContent = date;
                cell.appendChild(day);
                date++;
            }
            cell.classList.add('col-xs-1') ;
            cell.classList.add('grid-cell');
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}


updateCalendar();
