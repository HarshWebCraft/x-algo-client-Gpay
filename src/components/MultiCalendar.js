import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";

const MultiCalendar = ({ allSheetData, clientId }) => {
  const [selectedMonths, setSelectedMonths] = useState(
    allSheetData.map(() => new Date()) // Initialize a separate month for each spreadsheet
  );

  // Handle month change for a specific spreadsheet
  const handleMonthChange = (e, sheetIndex) => {
    const newMonth = new Date(
      selectedMonths[sheetIndex].getFullYear(),
      e.target.value,
      1
    );
    const updatedMonths = [...selectedMonths];
    updatedMonths[sheetIndex] = newMonth;
    setSelectedMonths(updatedMonths);
  };

  return (
    <div>
      {allSheetData
        .filter((sheet) => sheet.UserId === clientId) // Filter sheets by UserId
        .map((filteredSheet, index) => {
          const { sheetName, pnlByDate } = filteredSheet || {}; // Corrected reference to filteredSheet
          const selectedMonth = selectedMonths[index];

          // Generate the days of the month for rendering
          const start = startOfWeek(startOfMonth(selectedMonth)); // Start from the first week
          const end = endOfWeek(endOfMonth(selectedMonth)); // End at the last week
          const days = eachDayOfInterval({ start, end });

          return (
            <div key={index} style={{ marginBottom: "40px" }}>
              {/* Spreadsheet Name */}
              <h3>{sheetName || `Spreadsheet ${index + 1}`}</h3>

              {/* Dropdown for month selection */}
              <select
                onChange={(e) => handleMonthChange(e, index)}
                value={selectedMonth.getMonth()}
                style={{ marginBottom: "20px" }}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {format(
                      new Date(selectedMonth.getFullYear(), i, 1),
                      "MMMM"
                    )}
                  </option>
                ))}
              </select>

              {/* Calendar rendering */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "5px",
                }}
              >
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {day}
                    </div>
                  )
                )}

                {/* Days */}
                {days.map((day) => {
                  const dateKey = format(day, "yyyy-MM-dd"); // Format date as key
                  const pnl = pnlByDate?.[dateKey]; // Get P&L for the day
                  const isCurrentMonth =
                    day.getMonth() === selectedMonth.getMonth();

                  return (
                    <div
                      key={day}
                      style={{
                        height: "80px",
                        backgroundColor:
                          pnl > 0 ? "green" : pnl < 0 ? "red" : "#f0f0f0", // Green for positive, red for negative
                        color: isCurrentMonth ? "black" : "#ccc", // Dim non-current month days
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ddd",
                      }}
                    >
                      <div>
                        <div>{day.getDate()}</div>
                        {pnl && (
                          <div style={{ fontWeight: "bold", color: "white" }}>
                            {pnl.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MultiCalendar;
