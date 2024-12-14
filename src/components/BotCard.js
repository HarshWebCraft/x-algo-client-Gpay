import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
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

const BotCard = (props) => {
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
    "2023-02-04": -462.84,
    "2023-03-01": 5500,
    "2023-03-02": -1800,
    "2023-03-03": 2200,
    "2023-03-06": -550,
    "2023-03-07": 3500,
    "2023-03-08": 1200,
    "2023-03-09": -4300,
    "2023-03-10": -2800,
    "2023-03-13": 9100,
    "2023-03-14": -1700,
    "2023-03-15": 2250,
    "2023-03-16": 3300,
    "2023-03-17": -5800,
    "2023-03-20": -3100,
    "2023-03-21": 400,
    "2023-03-22": 6500,
    "2023-03-23": 2700,
    "2023-03-24": -4900,
    "2023-03-27": 1000,
    "2023-03-28": -2100,
    "2023-03-29": 3900,
    "2023-03-30": -200,
    "2023-03-31": 4600,
    "2023-04-03": -1800,
    "2023-04-04": 3400,
    "2023-04-05": -2500,
    "2023-04-06": 1000,
    "2023-04-07": 1500,
    "2023-04-10": 5200,
    "2023-04-11": -3400,
    "2023-04-12": 6700,
    "2023-04-13": -2900,
    "2023-04-14": 3200,
    "2023-04-17": 400,
    "2023-04-18": 4200,
    "2023-04-19": 1800,
    "2023-04-20": -800,
    "2023-04-21": -1400,
    "2023-04-24": 1500,
    "2023-04-25": -2100,
    "2023-04-26": 5600,
    "2023-04-27": -3100,
    "2023-04-28": 3400,
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clientDataWithActiveStatus, setClientDataWithActiveStatus] = useState(
    []
  );
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedMonth, setSelectedMonth] = useState("2023-02");
  const [selectedDate, setSelectedDate] = useState(null);
  const [pnlValue, setPnlValue] = useState(null);
  const currentDate = new Date();
  const start = startOfMonth(currentDate); // start of the current month
  const date = format(currentDate, "yyyy-MM-dd");
  const monthsWithYears = [
    { label: "2023-01", value: "2023-01" },
    { label: "2023-02", value: "2023-02" },
    { label: "2023-03", value: "2023-03" },
    { label: "2023-04", value: "2023-04" },
    { label: "2023-05", value: "2023-05" },
    { label: "2023-06", value: "2023-06" },
    { label: "2023-07", value: "2023-07" },
  ];

  const renderEmptyCells = (startDay) => {
    const emptyCells = [];
    for (let i = 0; i < startDay; i++) {
      emptyCells.push(
        <div key={`empty-${i}`} className="calendar-cell empty"></div>
      );
    }
    return emptyCells;
  };

  useEffect(() => {
    const start = startOfMonth(new Date(selectedMonth));
    const end = endOfMonth(new Date(selectedMonth));
    const days = eachDayOfInterval({ start, end });
    const emptyCells = renderEmptyCells(getDay(start));
    setDays(days);
  }, [selectedMonth]);

  const setCalendarData = (days, emptyCells) => {
    console.log("Calendar Data Updated", days, emptyCells);
  };

  const [days, setDays] = useState([]);
  const [allSheetData, setAllSheetData] = useState([]);

  const dispatch = useDispatch();
  const clientdata = useSelector((state) => state.account.allClientData);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);

  const capital = props.capital;
  const userId = "H54303926"; // Example userId, this can be dynamically fetched from state if required

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => {
      const initializedData = clientdata.map((item) => ({
        ...item,
        isActive: true, // Default status is Active
      }));
      setClientDataWithActiveStatus(initializedData);
      setLoading(false); // Data is loaded
      console.log(clientDataWithActiveStatus);
    }, 2000); // Simulate a 2-second delay
  }, [clientdata]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleChange = (index) => {
    setClientDataWithActiveStatus((prevData) => {
      const newData = [...prevData];
      newData[index].isActive = !newData[index].isActive; // Toggle active status

      return newData;
    });
  };

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
                  <div className="d-flex  gap-5">
                    <div className="stat-item">
                      <div className="label">
                        Strategy name :{" "}
                        <span className="qwmz">Breakout Breeze</span>
                      </div>
                      <div className="value"></div>
                    </div>
                    <div className="stat-item">
                      <div className="dropdown-container">
                        <select
                          className="month-dropdown ps-3 pe-3"
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                          {monthsWithYears.map((month) => (
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
                                  plValue >= 0 ? "positive" : "negative"
                                }`}
                                onClick={() => {
                                  setSelectedDate(date);
                                  setPnlValue(plValue);
                                }}
                              >
                                <div>{format(day, "d")}</div>
                              </div>
                            );
                          })}
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
                          <span className="label">F&O:</span>
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
                    <div className="charts-section">
                      <CircularChart
                        percentage={79.66}
                        color="#007bff"
                        strokeWidth={14}
                      />
                    </div>
                    <div className="charts-section">
                      <CircularChart
                        percentage={57.76}
                        color="#fbc02d"
                        strokeWidth={14}
                      />
                    </div>
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
