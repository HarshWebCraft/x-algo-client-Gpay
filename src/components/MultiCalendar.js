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
  selectedStrategy,
}) => {
  const yearOptions = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ]; // Modify this as needed

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDateInfo, setSelectedDateInfo] = useState({
    date: null,
    pnl: null,
  });
  const [selectedMonths, setSelectedMonths] = useState(
    allSheetData.map(() => new Date()) // Initialize a separate month for each spreadsheet
  );
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  useEffect(() => {
    console.log(updatedAllSheetData);
  });

  const handleMouseMove = (event, date, pnl) => {
    if (pnl !== undefined) {
      const tooltipWidth = 150; // Adjust based on the tooltip's width
      const tooltipHeight = 40; // Adjust based on the tooltip's height

      let x = event.clientX;
      let y = event.clientY;

      // Prevent tooltip from overflowing on the right
      if (x + tooltipWidth > window.innerWidth) {
        x = window.innerWidth - tooltipWidth;
      }

      // Prevent tooltip from overflowing on the bottom
      if (y + tooltipHeight > window.innerHeight) {
        y = window.innerHeight - tooltipHeight;
      }

      setTooltip({
        visible: true,
        x: x + 10, // Add offset
        y: y + 10, // Add offset
        content: `${format(date, "yyyy-MM-dd")} P&L: ${pnl}`,
      });
    } else {
      setTooltip({
        visible: true,
        x: event.clientX + 10, // Add offset
        y: event.clientY + 10, // Add offset
        content: `${format(date, "yyyy-MM-dd")} , No data`,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleDateClick = (day, pnl) => {
    setSelectedDateInfo({
      date: format(day, "yyyy-MM-dd"),
      pnl: pnl || "No Data", // If P&L is undefined, display 'No Data'
    });
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
        .filter(
          (sheet) =>
            sheet.UserId === clientId && sheet.strategyName === selectedStrategy
        ) // Filter sheets by UserId
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
              <div
                className="d-flex flex-row gap-1 "
                style={{ paddingLeft: "17em", marginTop: "-1.5em" }}
              >
                {/* <div className="sheet-info">
                  <span className="label">Strategy Name:</span>
                  <span className="value">
                    {filteredSheet.strategyName || "N/A"}
                  </span>
                </div> */}

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
              <div
                className="d-flex flex-row gap-2 justify-content-around w-100"
                style={{ height: "130px" }}
              >
                <div className="d-flex flex-column">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 0fr)",
                      gap: "0px",
                      alignItems: "center",
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
                          }}
                          onMouseMove={(e) => handleMouseMove(e, day, pnl)} // Trigger tooltip on hover
                          onMouseLeave={handleMouseLeave} // Hide tooltip when mouse leaves
                          onClick={() => handleDateClick(day, pnl)}
                        >
                          {day.getDate()}
                        </div>
                      );
                    })}

                    {tooltip.visible && (
                      <div
                        style={{
                          position: "absolute",
                          top: tooltip.y + 120,
                          left: tooltip.x + 0,
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

                  {selectedDateInfo.date && (
                    <div
                      style={{
                        marginTop: "5px",
                        alignItems: "start",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span className="label" style={{ fontSize: "0.8em" }}>
                        Selected Date:{" "}
                        <span className="" style={{ color: "black" }}>
                          {selectedDateInfo.date}
                        </span>
                      </span>
                      <span className="label">
                        P&L:{" "}
                        <span
                          className={`value ${
                            selectedDateInfo.pnl < 0 ? "negative" : "positive"
                          }`}
                        >
                          {selectedDateInfo.pnl !== null &&
                          selectedDateInfo.pnl !== undefined
                            ? selectedDateInfo.pnl
                            : "0.00"}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="charts-section nnnnmm flex-row">
                  {/* Accuracy Chart */}
                  <div className="flex-column">
                    <CircularChart
                      percentage={monthlyAccuracy}
                      color="#007bff"
                      strokeWidth={14}
                    />
                    <p className="mb-0">Accuracy</p>
                  </div>
                </div>

                <div className="charts-section nnnnmm flex-row">
                  {/* ROI Chart */}
                  <div className="flex-column">
                    <CircularChart
                      percentage={monthlyRoi}
                      color="#fbc02d"
                      strokeWidth={14}
                    />
                    <p className="mb-0">ROI</p>
                  </div>
                </div>

                <div className="stat-item wwwwsssssdddd">
                  <div className="label">Monthly gain</div>
                  <div className="value green">0%</div>
                </div>
                <div className="stat-item wwwwsssssdddd">
                  <div className="label">Today's gain</div>
                  <div className="value green">0%</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MultiCalendar;
