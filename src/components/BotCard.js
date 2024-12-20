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
import axios from "axios";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
} from "date-fns";
import samplePLData from "../month-year-pnl.json";
import { ProductionUrl } from "../URL/url";

const BotCard = (props) => {
  const clientdata = useSelector((state) => state.account.allClientData);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  // State Variables
  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";
  const email = useSelector((state) => state.email.email);

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
  const [loader, setLoader] = useState(true);
  const ids = userSchema.DeployedData.filter(
    (data) => data.Broker === "paperTrade"
  ).map((data) => data.Strategy);
  const currentYear = new Date().getFullYear().toString(); // Get the current year as a string
  const currentMonth = new Date().toISOString().slice(5, 7);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pnlValue, setPnlValue] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [days, setDays] = useState([]);
  const [allSheetData, setAllSheetData] = useState([]);
  const [dailyPnL, setDailyPnL] = useState({});
  const [tradeStats, setTradeStats] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [DropDownDate, setDropDownDate] = useState("2023-02");

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
    { label: "2025", value: "2025" },
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

  const [dataByUserId, setDataByUserId] = useState({});

  useEffect(() => {
    // Transform the data to be grouped by UserId
    const groupedData = allSheetData.reduce((acc, entry) => {
      acc[entry.UserId] = entry;
      return acc;
    }, {});
    console.log(groupedData);
    setDataByUserId(groupedData);
  }, [allSheetData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(allSheetData);
        setLoader(true);
        const response = await axios.post(`${url}/getMarketPlaceData `, {
          email,
        });
        const jsonData = response.data.allData;

        // Filter strategies based on IDs
        const filteredData = jsonData.filter((item) => ids.includes(item._id));

        // Merge filteredData with DeployedData
        const mergedData = filteredData.map((strategy) => {
          // Find matching DeployedData entry for this strategy
          const deployedInfo = userSchema.DeployedData.find(
            (data) => data.Strategy.toString() === strategy._id.toString()
          );

          // Merge strategy with deployedInfo
          return {
            ...strategy,
            AppliedDate: deployedInfo ? deployedInfo.AppliedDate : "N/A", // Add AppliedDate
            Index: deployedInfo ? deployedInfo.Index : "N/A", // Add other fields if needed
          };
        });

        setFilteredData(mergedData);

        const response3 = await axios.post(`${url}/fetchAllSheetData`, {
          email,
        });
        setAllSheetData(response3.data.allSheetData);
        console.log(allSheetData);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const start = startOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const end = endOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const days = eachDayOfInterval({ start, end });
    const emptyCells = renderEmptyCells(getDay(start));
    setDays(days);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    console.log(userSchema);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const calculateStats = () => {
      const allStats = allSheetData.map((entry) => {
        const sheetData = entry.sheetData;

        // Filter trades for the selected month
        console.log(selectedYear + "-" + selectedMonth);

        const filteredTrades = sheetData.filter((trade) => {
          // Check if trade[3] exists and is a string before calling startsWith
          const tradeDate = trade[3];
          if (tradeDate && typeof tradeDate === "string") {
            return tradeDate.startsWith(selectedYear + "-" + selectedMonth); // Trade date matches the selected month
          }
          return false; // Skip trades with an invalid date
        });

        console.log(filteredTrades);

        // Variables to calculate stats
        let profitableTrades = 0;
        let totalTrades = filteredTrades.length;
        let totalPnL = 0;
        let totalInvestment = 0;

        // Iterate through each filtered trade
        filteredTrades.forEach((trade) => {
          const pnl = parseFloat(trade[10]); // P&L value
          const investment = parseFloat(trade[9]); // Investment amount (absolute)

          if (pnl > 0) {
            profitableTrades++; // Count profitable trades
          }

          totalPnL += pnl;
          totalInvestment += Math.abs(investment); // Sum up the absolute investment values
        });

        // Calculate Trade Accuracy
        const tradeAccuracy =
          totalTrades > 0
            ? ((profitableTrades / totalTrades) * 100).toFixed(2)
            : 0;

        // Calculate ROI
        const roi =
          totalInvestment > 0
            ? ((totalPnL / totalInvestment) * 100).toFixed(2)
            : 0;

        // Return stats for this entry
        return {
          strategyName: entry.strategyName,
          tradeAccuracy: parseFloat(tradeAccuracy),
          roi: parseFloat(roi),
        };
      });
      console.log(allStats);
      setTradeStats(allStats);
    };

    calculateStats();
  }, [dailyPnL, selectedMonth, selectedYear]);

  useEffect(() => {
    if (allSheetData.length > 0) {
      // Initialize an empty object to store P&L by date for all sheets
      const allPnlByDate = {};

      // Loop through each sheetData in allSheetData
      allSheetData.forEach((sheet) => {
        const sheetData = sheet.sheetData;

        // Process sheetData to calculate daily P&L
        sheetData.forEach((trade) => {
          const date = trade[3]; // Extract the start date from the trade
          const pnl = parseFloat(trade[10]); // Parse the Profit/Loss value

          // Initialize the accumulator for the date if not already present
          if (!allPnlByDate[date]) {
            allPnlByDate[date] = 0;
          }

          // Add the P&L for this trade to the date's total
          allPnlByDate[date] += pnl;
        });
      });

      console.log(allPnlByDate);
      setDailyPnL(allPnlByDate);
    }
  }, [allSheetData]);

  useEffect(() => {
    console.log(clientdata);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [clientdata, dailyPnL]);

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
        clientdata.map((item, index) => {
          const clientCode = item.userData?.data?.clientcode;

          return (
            // Add return here
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
                          <span className="value">
                            {userSchema.ActiveStrategys}
                          </span>
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
                      <span className="value">
                        {userSchema.ActiveStrategys}
                      </span>
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
                  {clientCode && dataByUserId[clientCode] ? (
                    <>
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
                                onChange={(e) =>
                                  setSelectedYear(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setSelectedMonth(e.target.value)
                                }
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
                          <div className="d-flex flex-column align-items-center">
                            <div className="calendar-section">
                              <div className="calendar">
                                <div className="calendar-body">
                                  {renderEmptyCells(getDay(start) - 1)}
                                  {days.map((day) => {
                                    const date = format(day, "yyyy-MM-dd");
                                    const plValue = dailyPnL[date];

                                    return (
                                      <div
                                        key={date}
                                        // className={`calendar-cell ${
                                        //   plValue >= 0 ? "positive" : "negative"
                                        // }`}

                                        className={`calendar-cell ${
                                          plValue == undefined
                                            ? "grey"
                                            : plValue >= 0
                                            ? "positive"
                                            : "negative"
                                        }`}
                                        onClick={() => {
                                          setSelectedDate(date);
                                          setPnlValue(plValue);
                                        }}
                                        onMouseEnter={(e) =>
                                          handleMouseEnter(
                                            e,
                                            format(day, "yyyy-MM-dd"),
                                            dailyPnL[
                                              format(day, "yyyy-MM-dd")
                                            ] || "No Data"
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
                                <div className="date">
                                  <span>
                                    {selectedDate
                                      ? format(
                                          new Date(selectedDate),
                                          "MMM dd, yyyy"
                                        )
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
                          </div>
                          <div className="calendar-section"> </div>
                          <div className="charts-section nnnnmm flex-column">
                            <CircularChart
                              percentage={
                                tradeStats[index]?.tradeAccuracy || "No Data"
                              }
                              color="#007bff"
                              strokeWidth={14}
                            />
                            <div>
                              <p>Accuracy</p>
                            </div>
                          </div>
                          <div className="charts-section nnnnmm flex-column">
                            <CircularChart
                              percentage={tradeStats[index]?.roi || "No Data"}
                              color="#fbc02d"
                              strokeWidth={14}
                            />
                            <div>
                              <p>ROI</p>
                            </div>
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
                    </>
                  ) : (
                    <div className="text-center">Deploy Strategy First</div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default BotCard;
