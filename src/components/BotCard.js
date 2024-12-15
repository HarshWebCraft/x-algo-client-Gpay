import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./BotCard.css";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Cld";
import CircularChart from "./CircularChart";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
} from "date-fns";
import samplePLData from "../month-year-pnl.json";

const BotCard = (props) => {
  // State Variables
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clientDataWithActiveStatus, setClientDataWithActiveStatus] = useState(
    []
  );
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pnlValue, setPnlValue] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [days, setDays] = useState([]);
  const [allSheetData, setAllSheetData] = useState([]);

  const currentDate = new Date();
  const start = startOfMonth(currentDate);
  const date = format(currentDate, "yyyy-MM-dd");

  // Options for Months and Years
  const monthsWithYears = Array.from({ length: 7 }, (_, i) => ({
    label: `2023-0${i + 1}`,
    value: `2023-0${i + 1}`,
  }));

  const yearOptions = [
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
  ];

  const monthOptions = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  // Redux
  const dispatch = useDispatch();
  const clientdata = useSelector((state) => state.account.allClientData);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);

  const capital = props.capital;

  // Helper Functions
  const renderEmptyCells = (startDay) =>
    Array.from({ length: startDay }).map((_, i) => (
      <div key={`empty-${i}`} className="calendar-cell empty"></div>
    ));

  const setCalendarData = (days, emptyCells) => {
    console.log("Calendar Data Updated", days, emptyCells);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleChange = (index) => {
    setClientDataWithActiveStatus((prevData) => {
      const newData = [...prevData];
      newData[index].isActive = !newData[index].isActive;
      return newData;
    });
  };

  const handleMouseEnter = (event, date, plValue) => {
    const { clientX, clientY } = event;
    setTooltip({
      visible: true,
      x: clientX,
      y: clientY,
      content: `${date}: Net realised P&L: ${plValue}`,
    });
  };

  const handleMouseMove = (event) => {
    setTooltip((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  // Effects
  useEffect(() => {
    const start = startOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const end = endOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const days = eachDayOfInterval({ start, end });
    const emptyCells = renderEmptyCells(getDay(start));
    setDays(days);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    setTimeout(() => {
      const initializedData = clientdata.map((item) => ({
        ...item,
        isActive: true,
      }));
      setClientDataWithActiveStatus(initializedData);
      setLoading(false);
    }, 2000);
  }, [clientdata]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="row stats-container">
          <div className="account-info">
            <Skeleton height={35} width="40%" />
            <Skeleton height={35} width="20%" />
            <Skeleton height={35} width="20%" />
            <Skeleton height={35} width="20%" />
          </div>
          <div className="stats-toggle-container">
            <div className="stats-card">
              <Skeleton height={30} width={200} />
              <Skeleton height={30} width={200} />
              <Skeleton height={30} width={200} />
              <Skeleton height={30} width={200} />
            </div>
          </div>
        </div>
      ) : (
        clientDataWithActiveStatus.map((item, index) => (
          <div className="row stats-container" key={index}>
            <div className="account-info">
              {isMobile ? (
                <>
                  <div className="dropdown-header" onClick={toggleExpand}>
                    <span>Account Information</span>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </div>

                  {isExpanded && (
                    <div className="dropdown-content">
                      <div className="account-item">
                        <span className="label">Name:</span>
                        <span className="value">
                          {item.userData
                            ? item.userData.data.name
                            : item.userDetails?.result?.name || "N/A"}
                        </span>
                      </div>
                      <div className="account-item">
                        <span className="label">Broker:</span>
                        <span className="value">
                          {item.userData ? "Angel One" : "Delta"}
                        </span>
                      </div>
                      <div className="account-item">
                        <span className="label">User Id:</span>
                        <span className="value">
                          {item.userData
                            ? item.userData.data.clientcode
                            : item.balances?.result[0]?.user_id || "N/A"}
                        </span>
                      </div>
                      <div className="account-item">
                        <span className="label">Strategies:</span>
                        <span className="value">5</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="account-item">
                    <span className="label">Name:</span>
                    <span className="value">
                      {item.userData
                        ? item.userData.data.name
                        : item.userDetails?.result?.first_name +
                            item.userDetails?.result?.last_name || "N/A"}
                    </span>
                  </div>
                  <div className="account-item">
                    <span className="label">Broker:</span>
                    <span className="value">
                      {item.userData ? "Angel One" : "Delta"}
                    </span>
                  </div>
                  <div className="account-item">
                    <span className="label">User Id:</span>
                    <span className="value">
                      {item.userData
                        ? item.userData.data.clientcode
                        : item.balances?.result[0]?.user_id || "N/A"}
                    </span>
                  </div>
                  <div className="account-item">
                    <span className="label">Active Strategy:</span>
                    <span className="value">{userSchema.ActiveStrategys}</span>
                  </div>
                </>
              )}
            </div>
            <div className="stats-toggle-container">
              <div className="stats-card">
                <div className="qzptd">
                  <div className="stat-item">
                    <div className="label">Account Balance</div>
                    <div className="value">
                      {item.userData ? (
                        capital.map((cap, index1) => {
                          if (index === index1) {
                            return (
                              <div
                                className={cap.net < 0 ? "red" : "green"}
                                key={index1}
                              >
                                ₹{cap.net}
                              </div>
                            );
                          }
                          return null;
                        })
                      ) : (
                        <div
                          className={
                            item?.balances?.result[0]?.balance_inr < 0
                              ? "red"
                              : "green" || ""
                          }
                          key={index}
                        >
                          ₹{item?.balances?.result[0]?.balance_inr || ""}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="label">Overall gain</div>
                    <div className="value">0</div>
                  </div>
                  <div className="stat-item">
                    <div className="label">Monthly gain</div>
                    <div className="value green">0%</div>
                  </div>
                  <div className="stat-item">
                    <div className="label">Today's gain</div>
                    <div className="value green">0%</div>
                  </div>
                </div>
                <hr className="horizontal-line" />
                <div className="Strategy-details d-flex flex-column">
                  <div className="d-flex eeerrtt  gap-5">
                    <div className="stat-item edcvon">
                      <div className="label">
                        Strategy name :
                        <span className="qwmz">Breakout Breeze</span>
                      </div>
                      <div className="value"></div>
                    </div>
                    <div className="stat-item edcvon">
                      <div className="dropdown-container">
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="month-dropdown"
                        >
                          {yearOptions.map((year) => (
                            <option key={year.value} value={year.value}>
                              {year.label}
                            </option>
                          ))}
                        </select>

                        <select
                          value={selectedMonth}
                          className="month-dropdown"
                          onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                          {monthOptions.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="calendar-stats-container">
                    <div className="calendar-section">
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
                                  samplePLData[format(day, "yyyy-MM-dd")] >= 0
                                    ? "positive"
                                    : "negative"
                                } ${selectedDate === date ? "selected" : ""}`}
                                onClick={() => {
                                  setSelectedDate(date); // Set the clicked date
                                  setPnlValue(
                                    samplePLData[format(day, "yyyy-MM-dd")] || 0
                                  );
                                }}
                                onMouseEnter={(e) =>
                                  handleMouseEnter(
                                    e,
                                    format(day, "yyyy-MM-dd"),
                                    samplePLData[format(day, "yyyy-MM-dd")] ||
                                      "No Data"
                                  )
                                }
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                              >
                                <div>{format(day, "d")}</div>
                              </div>
                            );
                          })}
                          {tooltip.visible && (
                            <div
                              style={{
                                position: "fixed",
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
                      </div>
                    </div>
                    <div className="calendar-section">
                      <div className="pnl-details">
                        <div className="pnl-text">
                          <span>Net realised P&L</span>
                        </div>

                        <div className="date">
                          <span>
                            {selectedDate
                              ? format(new Date(selectedDate), "MMM dd, yyyy")
                              : "Select a date"}
                          </span>
                        </div>
                        <div className="pnl-value">
                          <span className="label">P&L:</span>
                          <span
                            className={`value ${
                              pnlValue < 0 ? "negative" : "positive"
                            }`}
                          >
                            {pnlValue !== null && pnlValue !== undefined
                              ? pnlValue.toFixed(2)
                              : "0.00"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="charts-section nnnnmm">
                      <CircularChart
                        percentage={79.66}
                        color="#007bff"
                        strokeWidth={14}
                      />
                    </div>
                    <div className="charts-section nnnnmm">
                      <CircularChart
                        percentage={57.76}
                        color="#fbc02d"
                        strokeWidth={14}
                      />
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
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default BotCard;
