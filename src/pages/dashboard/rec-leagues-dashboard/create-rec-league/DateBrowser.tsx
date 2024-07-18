import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DateBrowser.css'; // Create and import a CSS file for custom styles

const DateBrowser = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 0 }); // Sunday as the start of the week
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 0 });

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(addDays(startOfCurrentWeek, i));
  }

  const previousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="mb-3 fw-bold">{format(currentWeek, 'MMMM yyyy')}</div>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-secondary" onClick={previousWeek}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="d-flex justify-content-between w-100 mx-3">
          {daysOfWeek.map((day) => (
            <div
              key={day.toISOString()}
              className={`text-center date-item ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <div>{format(day, 'EEE')}</div>
              <div className="fw-bold">{format(day, 'd')}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-outline-secondary" onClick={nextWeek}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default DateBrowser;
