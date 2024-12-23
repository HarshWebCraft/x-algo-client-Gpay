import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import CircularChart from "./CircularChart";

const MultiCalendar = ({
  index2,
  allSheetData,
  clientId,
  updatedAllSheetData,
}) => {
  const yearOptions = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ]; // Modify this as needed

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonths, setSelectedMonths] = useState(
    allSheetData.map(() => new Date()) // Initialize a separate month for each spreadsheet
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const handleMouseMove = (event, date, pnl) => {
    if (pnl !== undefined) {
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        content: `${format(date, "yyyy-MM-dd")} P&L: ${pnl}`, // Show the date in the tooltip
      });
    } else {
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        content: `${format(date, "yyyy-MM-dd")} , No data`, // Show the date in the tooltip
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // Handle month or year change for a specific spreadsheet
  const handleDateChange = (e, sheetIndex, type) => {
    const value = e.target.value;
    const newDate = new Date(selectedYear, value, 1); // Set new date based on selected year and month
    const updatedDates = [...selectedMonths];
    updatedDates[sheetIndex] = newDate;

    if (type === "year") {
      setSelectedYear(value); // Update selected year if it's the year dropdown
    }

    setSelectedMonths(updatedDates);
  };

  // Function to calculate monthly accuracy and ROI
  const calculateMonthlyStats = (sheet, selectedDate) => {
    const monthKey = format(selectedDate, "yyyy-MM");

    const monthlyAccuracy = sheet.monthlyAccuracy?.[monthKey] || "No Data";
    const monthlyRoi = sheet.monthlyRoi?.[monthKey] || "No Data";

    return { monthlyAccuracy, monthlyRoi };
  };

  return (
    <div key={index2} className="w-100">
      {updatedAllSheetData
        .filter((sheet) => sheet.UserId === clientId) // Filter sheets by UserId
        .map((filteredSheet, index) => {
          const { sheetName, pnlByDate } = filteredSheet || {};
          const selectedMonth = selectedMonths[index];

          const { monthlyAccuracy, monthlyRoi } = calculateMonthlyStats(
            filteredSheet,
            selectedMonth
          );

          // Generate the days of the month for rendering
          const start = startOfWeek(startOfMonth(selectedMonth)); // Start from the first week
          const end = endOfWeek(endOfMonth(selectedMonth)); // End at the last week
          const days = eachDayOfInterval({ start, end });

          return (
            <div
              key={index}
              style={{
                marginBottom: "40px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="d-flex flex-row gap-5">
                <div className="sheet-info">
                  <span className="label">Strategy Name:</span>
                  <span className="value">
                    {filteredSheet.strategyName || "N/A"}
                  </span>
                </div>

                {/* Year Dropdown */}
                <select
                  className="rounded-3"
                  onChange={(e) => handleDateChange(e, index, "year")}
                  value={selectedYear}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                {/* Month Dropdown */}
                <select
                  className="rounded-3"
                  onChange={(e) => handleDateChange(e, index, "month")}
                  value={selectedMonth.getMonth()}
                  style={{
                    marginBottom: "20px",
                  }}
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
              </div>

              {/* Calendar rendering */}
              <div className="d-flex flex-row gap-2 justify-content-around w-100">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 0fr)",
                    gap: "0px",
                  }}
                >
                  {/* Day headers */}
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index3) => (
                    <div
                      key={index3}
                      style={{
                        width: "24px",
                        fontWeight: "bold",
                        textAlign: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                      }}
                    >
                      {day}
                    </div>
                  ))}

                  {/* Days */}
                  {days.map((day) => {
                    const dateKey = format(day, "yyyy-MM-dd"); // Format date as the key to match the pnlByDate keys
                    const pnl = filteredSheet.pnlByDate?.[dateKey]; // Get the P&L for the specific day

                    const isCurrentMonth =
                      day.getMonth() === selectedMonth.getMonth();

                    return (
                      <div
                        key={day}
                        style={{
                          height: "20px",
                          width: "24px",
                          fontSize: "10px",
                          backgroundColor:
                            pnl > 0 ? "green" : pnl < 0 ? "red" : "#f0f0f0", // Green for profit, red for loss, grey for neutral
                          color: isCurrentMonth ? "black" : "#ccc", // Dim days outside the current month
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #ddd",
                          cursor: "pointer", // Make it clear it's hoverable
                        }}
                        onMouseMove={(e) => handleMouseMove(e, day, pnl)} // Trigger tooltip on hover
                        onMouseLeave={handleMouseLeave} // Hide tooltip when mouse leaves
                      >
                        {day.getDate()}
                      </div>
                    );
                  })}
                </div>

                <div className="charts-section flex-row">
                  {/* Accuracy Chart */}
                  <div className="flex-column">
                    <CircularChart
                      percentage={monthlyAccuracy}
                      color="#007bff"
                      strokeWidth={14}
                    />
                    <p>Accuracy</p>
                  </div>
                </div>

                <div className="charts-section flex-row">
                  {/* ROI Chart */}
                  <div className="flex-column">
                    <CircularChart
                      percentage={monthlyRoi}
                      color="#fbc02d"
                      strokeWidth={14}
                    />
                    <p>ROI</p>
                  </div>
                </div>
              </div>
              {tooltip.visible && (
                <div
                  style={{
                    position: "absolute",
                    top: tooltip.y + 10,
                    left: tooltip.x + 10,
                    backgroundColor: "var(--text-color)",
                    color: "var(--bg-color)",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    pointerEvents: "none", // Prevent blocking other interactions
                    zIndex: 1000,
                  }}
                >
                  {tooltip.content}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default MultiCalendar;
