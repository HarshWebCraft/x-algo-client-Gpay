// import React, { useEffect, useState } from "react";
// import "./PaperTradeTable.css";
// import { ProductionUrl } from "../URL/url";
// import axios from "axios";
// import { Scrollbar } from "react-scrollbars-custom";
// import Skeleton from "@mui/material/Skeleton"; // Import Skeleton
// import Switch from "@mui/material/Switch";
// import { useSelector } from "react-redux";
// import delete_broker from "../images/delete_broker.png";
// import Calendar from "./Cld";

// const PaperTradeTable = () => {
//   const [ExcelData, setExcelData] = useState([]);
//   const [pnl, setpnl] = useState();
//   const [allStrategies, setAllStrategies] = useState([]); // Store the strategies
//   const [allSheetData, setAllSheetData] = useState([]); // Store the sheet data
//   const [filteredData, setFilteredData] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState("2023-02");
//   const monthsWithYears = [
//     { label: "2023-01", value: "2023-01" },
//     { label: "2023-02", value: "2023-02" },
//     { label: "2023-03", value: "2023-03" },
//     { label: "2023-04", value: "2023-04" },
//     { label: "2023-05", value: "2023-05" },
//     { label: "2023-06", value: "2023-06" },
//     { label: "2023-07", value: "2023-07" },
//   ];
//   const email = useSelector((state) => state.email.email);
//   const userSchema = useSelector((state) => state.account.userSchemaRedux);
//   const ids = userSchema.DeployedData.filter(
//     (data) => data.Broker === "paperTrade"
//   ).map((data) => data.Strategy);

//   const removeDeploy = async (strategyId, broker) => {
//     try {
//       const response = await axios.post(`${url}/removeDeployStra`, {
//         email,
//         strategyId,
//         broker,
//       });

//       if (response.status === 200) {
//         // Filter out the deleted strategy from allSheetData
//         setAllSheetData((prevData) =>
//           prevData.filter((strategy) => strategy.strategyId !== strategyId)
//         );

//         // Also update filteredData if needed
//         setFilteredData((prevData) =>
//           prevData.filter((strategy) => strategy._id !== strategyId)
//         );

//         console.log("Strategy deleted successfully!");
//       } else {
//         console.error("Failed to delete strategy:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting strategy:", error);
//     }
//   };

//   const url =
//     process.env.NODE_ENV === "production"
//       ? ProductionUrl
//       : "http://localhost:5000";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoader(true);
//         const response = await axios.post(`${url}/getMarketPlaceData`, {
//           email,
//         });
//         const jsonData = response.data.allData;

//         // Filter strategies based on IDs
//         const filteredData = jsonData.filter((item) => ids.includes(item._id));

//         // Merge filteredData with DeployedData
//         const mergedData = filteredData.map((strategy) => {
//           // Find matching DeployedData entry for this strategy
//           const deployedInfo = userSchema.DeployedData.find(
//             (data) => data.Strategy.toString() === strategy._id.toString()
//           );

//           // Merge strategy with deployedInfo
//           return {
//             ...strategy,
//             AppliedDate: deployedInfo ? deployedInfo.AppliedDate : "N/A", // Add AppliedDate
//             Index: deployedInfo ? deployedInfo.Index : "N/A", // Add other fields if needed
//           };
//         });

//         console.log(mergedData);
//         setFilteredData(mergedData);

//         console.log(filteredData);

//         const response3 = await axios.post(`${url}/fetchSheetData`, { email });
//         console.log(response3.data.allSheetData);

//         // Set sheet data to state
//         setAllSheetData(response3.data.allSheetData);
//         console.log(allSheetData);
//         setLoader(false);
//       } catch (error) {
//         console.error("Error fetching sheet data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {loader ? (
//         <div className="skeleton-container container">
//           {/* Skeleton for the card layout */}
//           {[...Array(3)].map((_, index) => (
//             <div key={index} className="skeleton-card row stats-container">
//               <Skeleton height={40} width="30%" className="mr-1" />
//               <Skeleton height={40} width="20%" className="mr-1" />
//               <Skeleton height={40} width="20%" className="mr-1" />
//               <Skeleton height={40} width="20%" className="mr-1" />

//               <Skeleton variant="rectangular" width="100%" height={200} />
//             </div>
//           ))}
//         </div>
//       ) : allSheetData.length > 0 ? (
//         allSheetData.map((strategy, index) => {
//           const pnlValues = strategy.sheetData.map(
//             (row) => parseFloat(row[8]) || 0
//           );
//           const totalPnl = pnlValues.reduce((sum, value) => sum + value, 0);

//           return (
//             <div className="container" key={strategy.strategyId}>
//               <div className="row stats-container">
//                 <div className="account-info tfghnc pe-3 justify-content-between">
//                   <div className="phjhverthj">
//                     <div className="account-item">
//                       <span className="label">Name:</span>
//                       <span className="value">
//                         {userSchema.DeployedData[index].StrategyName}
//                       </span>
//                     </div>
//                     <div className="account-item">
//                       <span className="label">Deploy Date :</span>
//                       <span className="value">
//                         {strategy.DeploedDate || "N/A"}
//                       </span>
//                     </div>
//                     <div className="account-item">
//                       <div className="dropdown-container">
//                         <select
//                           className="month-dropdown ps-3 pe-3"
//                           value={selectedMonth}
//                           onChange={(e) => setSelectedMonth(e.target.value)}
//                         >
//                           {monthsWithYears.map((month) => (
//                             <option key={month.value} value={month.value}>
//                               {month.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="phjhverthj2">
//                     <div className="account-item">
//                       <span className="value">P&L : </span>
//                       <span className={totalPnl < 0 ? "red" : "green"}>
//                         {totalPnl.toFixed(2)}$
//                       </span>
//                     </div>
//                     <div className="account-item">
//                       <img
//                         src={delete_broker || "delete_broker_placeholder.png"}
//                         height={20}
//                         className="delete-icon"
//                         onClick={(e) =>
//                           removeDeploy(
//                             strategy.strategyId,
//                             userSchema.DeployedData[index].Broker
//                           )
//                         }
//                         alt="Delete Broker"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="stats-toggle-container">
//                   <div className="paper-trade-table-container container">
//                     <Scrollbar style={{ height: 200 }}>
//                       <table className="paper-trade-table">
//                         <thead>
//                           <tr>
//                             <th>NO</th>
//                             <th>Symbol</th>
//                             <th>Entry Type</th>
//                             <th>Entry Time</th>
//                             <th>Exit Time</th>
//                             <th>Entry Price</th>
//                             <th>Exit Price</th>
//                             <th>Entry Qty</th>
//                             <th>P&L</th>
//                           </tr>
//                         </thead>
//                         <tbody className="paper-trade-table-body">
//                           {strategy.sheetData.length > 0 ? (
//                             strategy.sheetData.map((row, rowIndex) => (
//                               <tr key={rowIndex}>
//                                 {row.map((cell, cellIndex) => (
//                                   <td key={cellIndex}>{cell || "N/A"}</td>
//                                 ))}
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="9" style={{ textAlign: "center" }}>
//                                 No trade executed
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </Scrollbar>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         "No data available"
//       )}
//     </div>
//   );
// };

// export default PaperTradeTable;

import React, { useEffect, useState } from "react";
import "./PaperTradeTable.css";
import { ProductionUrl } from "../URL/url";
import axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton
import Switch from "@mui/material/Switch";
import { useSelector } from "react-redux";
import delete_broker from "../images/delete_broker.png";
import Calendar from "./Cld";
import CircularChart from "./CircularChart";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

const PaperTradeTable = () => {
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
  const currentYear = new Date().getFullYear().toString(); // Get the current year as a string
  const currentMonth = new Date().toISOString().slice(5, 7);
  const [ExcelData, setExcelData] = useState([]);
  const [pnl, setpnl] = useState();
  const [allStrategies, setAllStrategies] = useState([]); // Store the strategies
  const [allSheetData, setAllSheetData] = useState([]); // Store the sheet data
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [pnlValue, setPnlValue] = useState(null);
  const [days, setDays] = useState([]);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

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
  const monthsWithYears = [
    { label: "2024-01", value: "2024-01" },
    { label: "2024-02", value: "2024-02" },
    { label: "2024-03", value: "2024-03" },
    { label: "2024-04", value: "2024-04" },
    { label: "2024-05", value: "2024-05" },
    { label: "2024-06", value: "2024-06" },
    { label: "2024-07", value: "2024-07" },
    { label: "2024-08", value: "2024-08" },
    { label: "2024-09", value: "2024-09" },
    { label: "2024-10", value: "2024-10" },
    { label: "2024-11", value: "2024-11" },
    { label: "2024-12", value: "2024-12" },
  ];

  const [dailyPnL, setDailyPnL] = useState({});
  const handleMouseEnter = (event, date, plValue) => {
    const { clientX, clientY } = event;
    console.log(plValue);
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
  useEffect(() => {
    if (allSheetData.length > 0) {
      const sheetData = allSheetData[0].sheetData;

      // Process sheetData to calculate daily P&L
      const pnlByDate = sheetData.reduce((acc, trade) => {
        const date = trade[3]; // Extract the start date from the trade
        const pnl = parseFloat(trade[10]); // Parse the Profit/Loss value

        if (!acc[date]) {
          acc[date] = 0; // Initialize if the date is not already in the accumulator
        }

        acc[date] += pnl; // Add the P&L for this trade to the date's total
        return acc;
      }, {});

      setDailyPnL(pnlByDate);
    }
  }, [allSheetData]);

  const email = useSelector((state) => state.email.email);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const ids = userSchema.DeployedData.filter(
    (data) => data.Broker === "paperTrade"
  ).map((data) => data.Strategy);

  const removeDeploy = async (strategyId, broker) => {
    try {
      const response = await axios.post(`${url}/removeDeployStra`, {
        email,
        strategyId,
        broker,
      });

      if (response.status === 200) {
        // Filter out the deleted strategy from allSheetData
        setAllSheetData((prevData) =>
          prevData.filter((strategy) => strategy.strategyId !== strategyId)
        );

        // Also update filteredData if needed
        setFilteredData((prevData) =>
          prevData.filter((strategy) => strategy._id !== strategyId)
        );

        console.log("Strategy deleted successfully!");
      } else {
        console.error("Failed to delete strategy:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting strategy:", error);
    }
  };

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const response3 = await axios.post(`${url}/fetchSheetData`, { email });
        setAllSheetData(response3.data.allSheetData);
        console.log(allSheetData);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date();
  const start = startOfMonth(currentDate); // start of the current month
  const date = format(currentDate, "yyyy-MM-dd"); // current date in "yyyy-MM-dd" format
  useEffect(() => {
    const start = startOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const end = endOfMonth(new Date(`${selectedYear}-${selectedMonth}-01`));
    const days = eachDayOfInterval({ start, end });
    const emptyCells = renderEmptyCells(getDay(start));
    setDays(days);
  }, [selectedYear, selectedMonth]);

  const renderEmptyCells = (startDay) => {
    const emptyCells = [];
    for (let i = 0; i < startDay; i++) {
      emptyCells.push(
        <div key={`empty-${i}`} className="calendar-cell empty"></div>
      );
    }
    return emptyCells;
  };

  const setCalendarData = (days, emptyCells) => {
    setFilteredData((prevData) => [
      ...prevData,
      {
        days,
        emptyCells,
      },
    ]);
  };

  const [tradeStats, setTradeStats] = useState([]);

  // useEffect(() => {
  //   const calculateStats = () => {
  //     const allStats = allSheetData.map((entry) => {
  //       const sheetData = entry.sheetData;

  //       // Filter trades for the selected month
  //       console.log(selectedMonth);
  //       const filteredTrades = sheetData.filter(
  //         (trade) => trade[3].startsWith(selectedMonth) // Trade date matches the selected month
  //       );

  //       // Variables to calculate stats
  //       let profitableTrades = 0;
  //       let totalTrades = filteredTrades.length;
  //       let totalPnL = 0;
  //       let totalInvestment = 0;

  //       // Iterate through each filtered trade
  //       filteredTrades.forEach((trade) => {
  //         const pnl = parseFloat(trade[10]); // P&L value
  //         const investment = parseFloat(trade[9]); // Investment amount (absolute)

  //         if (pnl > 0) {
  //           profitableTrades++; // Count profitable trades
  //         }

  //         totalPnL += pnl;
  //         totalInvestment += Math.abs(investment); // Sum up the absolute investment values
  //       });

  //       // Calculate Trade Accuracy
  //       const tradeAccuracy =
  //         totalTrades > 0
  //           ? ((profitableTrades / totalTrades) * 100).toFixed(2)
  //           : 0;

  //       // Calculate ROI
  //       const roi =
  //         totalInvestment > 0
  //           ? ((totalPnL / totalInvestment) * 100).toFixed(2)
  //           : 0;

  //       // Return stats for this entry
  //       return {
  //         strategyName: entry.strategyName,
  //         tradeAccuracy: parseFloat(tradeAccuracy),
  //         roi: parseFloat(roi),
  //       };
  //     });

  //     setTradeStats(allStats);
  //   };

  //   calculateStats();
  // }, [dailyPnL, selectedMonth]);

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
    console.log(dailyPnL);
  }, [allSheetData, dailyPnL, tradeStats]);
  return (
    <div>
      {loader ? (
        <div className="skeleton-container container">
          {/* Skeleton for the card layout */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="skeleton-card row stats-container"
              style={{ marginTop: "5em" }}
            >
              <Skeleton height={40} width="30%" className="mr-1" />
              <Skeleton height={40} width="20%" className="mr-1" />
              <Skeleton height={40} width="20%" className="mr-1" />
              <Skeleton height={40} width="20%" className="mr-1" />

              <Skeleton variant="rectangular" width="100%" height={200} />
            </div>
          ))}
        </div>
      ) : allSheetData.length > 0 ? (
        allSheetData.map((strategy, index) => {
          const pnlValues = strategy.sheetData.map(
            (row) => parseFloat(row[10]) || 0
          );
          const totalPnl = pnlValues.reduce((sum, value) => sum + value, 0);

          return (
            <div className="container" key={strategy.strategyId}>
              <div className="row stats-container" style={{ marginTop: "5em" }}>
                <div className="account-info tfghnc pe-3 justify-content-between">
                  <div className="phjhverthj">
                    <div className="account-item">
                      <span className="label">Name:</span>
                      <span className="value">
                        {userSchema.DeployedData[index].StrategyName}
                      </span>
                    </div>
                    <div className="account-item">
                      <span className="label">Deploy Date :</span>
                      <span className="value">
                        {strategy.DeploedDate || "N/A"}
                      </span>
                    </div>
                    <div className="account-item">
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
                  <div className="phjhverthj2">
                    <div className="account-item">
                      <span className="value">P&L : </span>
                      <span className={totalPnl < 0 ? "red" : "green"}>
                        {totalPnl.toFixed(2)}$
                      </span>
                    </div>
                    <div className="account-item">
                      <img
                        src={delete_broker || "delete_broker_placeholder.png"}
                        height={20}
                        className="delete-icon"
                        onClick={(e) =>
                          removeDeploy(
                            strategy.strategyId,
                            userSchema.DeployedData[index].Broker
                          )
                        }
                        alt="Delete Broker"
                      />
                    </div>
                  </div>
                </div>
                <div className="stats-toggle-container">
                  <div className="calendar-stats-container">
                    <div className="d-flex flex-column align-items-center">
                      <div className="calendar-section">
                        <div className="calendar">
                          <div className="calendar-body">
                            {renderEmptyCells(getDay(start) - 1)}
                            {days.map((day) => {
                              const date = format(day, "yyyy-MM-dd");
                              const plValue = dailyPnL[date];
                              console.log(plValue);
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
                                      dailyPnL[format(day, "yyyy-MM-dd")] ||
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
                    </div>
                    <div className="calendar-section"> </div>
                    <div className="charts-section nnnnmm d-flex- flex-column ">
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
                    <div className="charts-section nnnnmm d-flex- flex-column ">
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
                    <div className="label">Accuracy</div>
                    <div className="value green">
                      {tradeStats[index]?.tradeAccuracy || "No Data"}
                    </div>
                  </div>
                  <div className="stat-item wwwwsssssdddd">
                    <div className="label">ROI</div>
                    <div className="value green">
                      {tradeStats[index]?.roi || "No Data"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        "No data available"
      )}
    </div>
  );
};

export default PaperTradeTable;
