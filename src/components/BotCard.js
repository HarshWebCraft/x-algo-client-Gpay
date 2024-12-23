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
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });
  const [loading, setLoading] = useState(true);

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
  const [start, setStart] = useState(new Date(selectedYear, selectedMonth, 1));
  const [DropDownDate, setDropDownDate] = useState("2023-02");

  const currentDate = new Date();
  // const start = startOfMonth(currentDate);
  // const start = new Date(selectedYear, selectedMonth, 1); // First day of the selected month
  // renderEmptyCells(getDay(start));
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
    { label: "January", value: 1 }, // January is 0 in JavaScript
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  // Redux
  const dispatch = useDispatch();

  const capital = props.capital;

  // Helper Functions
  // const renderEmptyCells = (startDay) =>
  //   Array.from({ length: startDay }).map((_, i) => (
  //     <div key={`empty-${i}`} className="calendar-cell empty"></div>
  //   ));

  function renderEmptyCells(startDayIndex) {
    // This will show the same value as startDayIndex, but it's redundant here

    const start = startOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const end = endOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const days = eachDayOfInterval({ start, end });
    let finalStart = 0;
    const dayString = days[0]?.toString(); // Convert Date object to string
    const firstThreeCharacters = dayString?.substring(0, 3); // Get the first 3 characters

    console.log(firstThreeCharacters);

    // Switch case to handle different days of the week
    switch (firstThreeCharacters) {
      case "Sun":
        finalStart = 0;
        // Handle Sunday case
        break;
      case "Mon":
        finalStart = 1;

        // Handle Monday case
        break;
      case "Tue":
        finalStart = 2;

        // Handle Tuesday case
        break;
      case "Wed":
        finalStart = 3;

        // Handle Wednesday case
        break;
      case "Thu":
        finalStart = 4;

        // Handle Thursday case
        break;
      case "Fri":
        finalStart = 5;

        // Handle Friday case
        break;
      case "Sat":
        finalStart = 6;

        // Handle Saturday case
        break;
      default:
        console.log("Unknown day");
    }
    // Using startDayIndex directly to render the empty cells
    return Array.from({ length: finalStart }, (_, index) => (
      <div
        key={`empty-${index}`}
        className="calendar-cell bg-transparent"
      ></div>
    ));
  }

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
        // setLoader(true);
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
        console.log(response3.data.allSheetData);
        // setLoader(false);
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

    const dayString = days[0]?.toString(); // Convert Date object to string
    const firstThreeCharacters = dayString?.substring(0, 3); // Get the first 3 characters

    console.log(firstThreeCharacters);

    // Switch case to handle different days of the week
    switch (firstThreeCharacters) {
      case "Sun":
        renderEmptyCells(0);
        // Handle Sunday case
        break;
      case "Mon":
        renderEmptyCells(1);

        // Handle Monday case
        break;
      case "Tue":
        renderEmptyCells(2);

        // Handle Tuesday case
        break;
      case "Wed":
        renderEmptyCells(3);

        // Handle Wednesday case
        break;
      case "Thu":
        renderEmptyCells(4);

        // Handle Thursday case
        break;
      case "Fri":
        renderEmptyCells(5);

        // Handle Friday case
        break;
      case "Sat":
        renderEmptyCells(6);

        // Handle Saturday case
        break;
      default:
        console.log("Unknown day");
    }

    const adjustedMonth = selectedMonth - 1;
    setStart(new Date(selectedYear, adjustedMonth, 1));
    console.log(getDay(new Date(selectedYear, adjustedMonth, 1)));
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

        const filteredTrades = sheetData?.filter((trade) => {
          // Check if trade[3] exists and is a string before calling startsWith
          const tradeDate = trade[3];
          if (tradeDate && typeof tradeDate === "string") {
            return tradeDate.startsWith(selectedYear + "-" + selectedMonth); // Trade date matches the selected month
          }
          return false; // Skip trades with an invalid date
        });

        // console.log(filteredTrades);

        // Variables to calculate stats
        let profitableTrades = 0;
        let totalTrades = filteredTrades?.length;
        let totalPnL = 0;
        let totalInvestment = 0;

        // Iterate through each filtered trade
        filteredTrades?.forEach((trade) => {
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
      // Initialize an array to store P&L by date for each sheet
      const pnlBySheet = [];

      // Loop through each sheetData in allSheetData
      allSheetData.forEach((sheet, index) => {
        // Check if `sheet.sheetData` exists and is a non-empty array
        if (
          sheet.sheetData &&
          Array.isArray(sheet.sheetData) &&
          sheet.sheetData.length > 0
        ) {
          const sheetData = sheet.sheetData;

          // Initialize an empty object to store P&L by date for the current sheet
          const sheetPnlByDate = {};

          sheetData.forEach((trade) => {
            // Extract the date and P&L values
            const date = trade[3]; // Extract the start date (assumes it's in column 3)
            const pnl = parseFloat(trade[10]); // Parse the Profit/Loss value (assumes it's in column 10)

            // Ensure date is valid and pnl is a number
            if (date && !isNaN(pnl)) {
              // Initialize the accumulator for the date if not already present
              if (!sheetPnlByDate[date]) {
                sheetPnlByDate[date] = 0;
              }

              // Add the P&L for this trade to the date's total
              sheetPnlByDate[date] += pnl;
            }
          });

          // Store the P&L by date for this sheet in the array
          pnlBySheet[index] = sheetPnlByDate;
        } else {
          // If sheetData is missing or empty, store an empty object
          pnlBySheet[index] = {};
        }
      });

      console.log(pnlBySheet);
      setDailyPnL(pnlBySheet);
    }
  }, [allSheetData]);

  useEffect(() => {
    console.log(clientdata);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [clientdata, dailyPnL]);

  useEffect(() => {
    const newStartDate = new Date(selectedYear, selectedMonth, 1); // First day of selected month and year
    setStart(newStartDate); // Update the start state
  }, [selectedMonth, selectedYear]);

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
                              <span className="qwmz">
                                {dataByUserId[clientCode].strategyName}
                              </span>
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
                                  {/* Render the day of the week header */}
                                  <div className="calendar-cell grey">
                                    <div>S</div>
                                  </div>
                                  <div className="calendar-cell grey">
                                    <div>M</div>
                                  </div>
                                  <div className="calendar-cell grey">
                                    <div>T</div>
                                  </div>
                                  <div className="calendar-cell grey">
                                    <div>W</div>
                                  </div>
                                  <div className="calendar-cell grey">
                                    <div>T</div>
                                  </div>
                                  <div className="calendar-cell grey">
                                    <div>F</div>
                                  </div>
                                  <div className="calendar-cell grey">
                                    <div>S</div>
                                  </div>
                                </div>

                                <div className="calendar-body">
                                  {/* Render empty cells until the first day of the month */}
                                  {renderEmptyCells(getDay(start))}

                                  {/* Render the days of the month */}
                                  {days.map((day) => {
                                    const date = format(day, "yyyy-MM-dd");
                                    const plValue = dailyPnL[date];

                                    return (
                                      <div
                                        key={date}
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
