import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { CalendarModal } from './calendarModal';
import { User } from './user';
import './calendar.css'; // Import the CSS file for styling

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function Calendar(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [modalShow, setModalShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    async function getUserAndSetUserName(username) {
      const user = await User.load(username);
      setCurrentUser(user);
    }

    getUserAndSetUserName(props.userName);
  }, [props.userName]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendar = () => {
    const calendar = [];

    // Render weekdays row
    const weekdaysRow = weekdays.map((day, index) => (
      <div key={index} className="col-xs-1 grid-cell">
        <div data-full-name={day} data-short-name={day}></div>
      </div>
    ));
    calendar.push(<div key="weekdays" className="row calendar-week-header">{weekdaysRow}</div>);

    // Render days
    let dayIndex = 1;
    for (let i = 0; i < 6; i++) {
      const daysRow = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayIndex > daysInMonth) {
          // Render empty cells before the first day of the month and after the last day
          daysRow.push(<div key={`${i}-${j}`} className="col-xs-1 grid-cell"></div>);
        } else {
          const currentDay = dayIndex; // Capture the current day in a separate variable
          const day = monthNames[currentMonth] + ' ' + currentDay + ' ' + currentYear;
          daysRow.push(
            <div
              key={`${i}-${j}`}
              className={`col-xs-1 grid-cell`}
              onClick={() => {
                setSelectedDay(day);
                setModalShow(true);
              }}
            >
              <div>{dayIndex}</div>
            </div>
          );
          dayIndex++;
        }
      }
      calendar.push(<div key={i} className="row calendar-week">{daysRow}</div>);
      if (dayIndex > daysInMonth) break; // Break if all days are rendered
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="container">
      <CalendarModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentUser={currentUser}
        selectedDay={selectedDay}
      />
      <div className="calendarHeader">
        <button className="prevMonth" id="prev-month" onClick={handlePrevMonth}>&lt;</button>
        <div className="d-flex flex-row">
          <span id="Month" className="Month">{new Date(currentYear, currentMonth).toLocaleDateString('default', { month: 'long' })}</span>
          <span id="Year" className="Year">{currentYear}</span>
        </div>
        <button className="nextMonth" id="next-month" onClick={handleNextMonth}>&gt;</button>
      </div>
      
      <div id="calendar-body" className="grid-calendar">
        {renderCalendar()}
      </div>
    </div>
  );
};
