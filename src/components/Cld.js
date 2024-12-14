import React from "react";
import "./calendar.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

// Sample P&L Data for February 2023
const samplePLData = {
  "2023-01-30": -4740,
  "2023-01-31": 3940,
  "2023-02-01": 3970,
  "2023-02-02": 7400,
  "2023-02-03": -2690,
  "2023-02-06": -1300,
  "2023-02-07": 4080,
  "2023-02-08": -3480,
  "2023-02-09": -3090,
  "2023-02-10": -1670,
  "2023-02-13": 2470,
  "2023-02-14": 2380,
  "2023-02-15": 1980,
  "2023-02-16": -6020,
  "2023-02-17": -634.64,
  "2023-02-21": -6520,
  "2023-02-22": 291.76,
  "2023-02-23": 1380,
  "2023-02-24": -4380,
  "2023-02-27": 1940,
  "2023-02-28": -462.84,
};

const Calendar = () => {
  const month = "2023-02";
  const start = startOfMonth(new Date(month));
  const end = endOfMonth(new Date(month));

  const days = eachDayOfInterval({ start, end });

  // Render empty cells for the days before the start of the month
  const renderEmptyCells = (startDay) => {
    const emptyCells = [];
    for (let i = 0; i < startDay; i++) {
      emptyCells.push(
        <div key={`empty-${i}`} className="calendar-cell empty"></div>
      );
    }
    return emptyCells;
  };

  return (
    <div className="calendar">
      <div className="calendar-body">
        {renderEmptyCells(getDay(start) - 1)}
        {days.map((day) => {
          const date = format(day, "yyyy-MM-dd");
          const plValue = samplePLData[date];

          return (
            <div
              key={date}
              className={`calendar-cell ${
                plValue >= 0 ? "positive" : "negative"
              }`}
            >
              <div>{format(day, "d")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
