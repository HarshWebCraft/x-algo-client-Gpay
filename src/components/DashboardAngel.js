import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductionUrl } from "../URL/url";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import MultiCalendar from "./MultiCalendar";
import CircularChart from "./CircularChart";
const DashboardAngel = (props) => {
  const brokerInfo = useSelector((state) => state.account.allClientData);
  const userSchema = useSelector((state) => state.account.userSchemaRedux);
  const email = useSelector((state) => state.email.email);
  const capital = props.capital;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allSheetData, setAllSheetData] = useState([]);
  const [dailyPnL, setDailyPnL] = useState({});
  const [updatedAllSheetData, setUpdatedAllSheetData] = useState();

  const ids = userSchema.DeployedData.filter(
    (data) => data.Broker === "paperTrade"
  ).map((data) => data.Strategy);

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // -------------------------------------------------------> fetch Excel sheet data <--------------------------------------------- //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/getMarketPlaceData `, {
          email,
        });
        const jsonData = response.data.allData;

        // Filter strategies based on IDs
        const filteredData = jsonData.filter((item) => ids.includes(item._id));

        // Merge filteredData with DeployedData
        const mergedData = filteredData.map((strategy) => {
          // Find matching DeployedData entry for this strategy
          const deployedInfo = userSchema?.DeployedData?.find(
            (data) => data.Strategy.toString() === strategy._id.toString()
          );

          // Merge strategy with deployedInfo
          return {
            ...strategy,
            AppliedDate: deployedInfo ? deployedInfo.AppliedDate : "N/A", // Add AppliedDate
            Index: deployedInfo ? deployedInfo.Index : "N/A", // Add other fields if needed
          };
        });

        // setFilteredData(mergedData);

        const response3 = await axios.post(`${url}/fetchAllSheetData`, {
          email,
        });
        setAllSheetData(response3.data.allSheetData);
        console.log(response3.data.allSheetData);

        if (response3.data.allSheetData.length > 0) {
          // Map over allSheetData and add P&L, Trade Accuracy, and RIO to each sheet object
          const updatedSheetData = response3.data.allSheetData.map((sheet) => {
            // Initialize the `pnlByDate` and `monthlyMetrics` object for this sheet
            const pnlByDate = {};
            const monthlyMetrics = {}; // Store metrics for each month
            let totalTrades = 0; // Total number of trades
            let successfulTrades = 0; // Number of profitable trades
            let totalInvestment = 0; // Sum of investments
            let totalProfit = 0; // Sum of profits

            // Check if `sheet.sheetData` exists and is a non-empty array
            if (
              sheet.sheetData &&
              Array.isArray(sheet.sheetData) &&
              sheet.sheetData.length > 0
            ) {
              sheet.sheetData.forEach((trade) => {
                // Extract the date, P&L values, and investment
                const date = trade[3]; // Extract the start date (assumes it's in column 3)
                const pnl = parseFloat(trade[10]); // Parse the Profit/Loss value (assumes it's in column 10)
                const investment = parseFloat(trade[5]); // Extract investment value (assumes it's in column 5)

                // Ensure date is valid and pnl is a number
                if (date && !isNaN(pnl)) {
                  const tradeDate = new Date(date);
                  const month = `${tradeDate.getFullYear()}-${
                    tradeDate.getMonth() + 1
                  }`; // Format as "YYYY-MM"

                  // Initialize the accumulator for the date if not already present
                  if (!pnlByDate[date]) {
                    pnlByDate[date] = 0;
                  }

                  // Add the P&L for this trade to the date's total
                  pnlByDate[date] += pnl;

                  // Group metrics by month
                  if (!monthlyMetrics[month]) {
                    monthlyMetrics[month] = {
                      totalTrades: 0,
                      successfulTrades: 0,
                      totalInvestment: 0,
                      totalProfit: 0,
                    };
                  }

                  // Accumulate monthly metrics
                  monthlyMetrics[month].totalTrades++;
                  if (pnl > 0) {
                    monthlyMetrics[month].successfulTrades++;
                  }

                  if (!isNaN(investment) && investment > 0) {
                    monthlyMetrics[month].totalInvestment += investment;
                    monthlyMetrics[month].totalProfit += pnl;
                  }

                  // Accumulate totals for accuracy and RIO
                  totalTrades++;
                  if (pnl > 0) {
                    successfulTrades++;
                  }

                  if (!isNaN(investment) && investment > 0) {
                    totalInvestment += investment;
                    totalProfit += pnl;
                  }
                }
              });
            }

            // Calculate Trade Accuracy and RIO
            const tradeAccuracy =
              totalTrades > 0 ? (successfulTrades / totalTrades) * 100 : 0;
            const rio =
              totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

            // Calculate Monthly Accuracy and RIO
            const monthlyAccuracy = {};
            const monthlyRoi = {};

            Object.keys(monthlyMetrics).forEach((month) => {
              const metrics = monthlyMetrics[month];
              const accuracy =
                metrics.totalTrades > 0
                  ? (metrics.successfulTrades / metrics.totalTrades) * 100
                  : 0;
              const roi =
                metrics.totalInvestment > 0
                  ? (metrics.totalProfit / metrics.totalInvestment) * 100
                  : 0;
              monthlyAccuracy[month] = accuracy.toFixed(2);
              monthlyRoi[month] = roi.toFixed(2);
            });

            // Return the updated sheet object with the added metrics
            return {
              ...sheet,
              pnlByDate, // Add the P&L by date to this sheet
              tradeAccuracy: tradeAccuracy.toFixed(2), // Add Trade Accuracy as a percentage
              rio: rio.toFixed(2), // Add RIO as a percentage
              monthlyAccuracy, // Add monthly accuracy
              monthlyRoi, // Add monthly ROI
            };
          });

          console.log(updatedSheetData);
          setUpdatedAllSheetData(updatedSheetData); // Set the updated sheet data
        }

        // setLoader(false);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchData();
  }, []);

  // -------------------------------------------------------> fetch Excel sheet data <--------------------------------------------- //

  //   -------------------------------------------------------> calculate p&l  day wise <-------------------------------------------- //

  //   -------------------------------------------------------> calculate p&l  day wise <-------------------------------------------- //

  return (
    <div className="DashboardAngel">
      {brokerInfo.map((item, index) => {
        const clientId = item.userData
          ? item.userData.data.clientcode
          : (item.balances?.result[0]?.user_id).toString();
        console.log(clientId);

        return (
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

                <div className="w-100">
                  <div>
                    {allSheetData
                      .filter((sheet) => sheet.UserId === clientId) // Filter sheets by UserId
                      .map((filteredSheet, index2) => (
                        <div key={index2} className="sheet-item w-100">
                          <MultiCalendar
                            index2={index2}
                            allSheetData={allSheetData}
                            clientId={filteredSheet.UserId}
                            updatedAllSheetData={updatedAllSheetData}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardAngel;
