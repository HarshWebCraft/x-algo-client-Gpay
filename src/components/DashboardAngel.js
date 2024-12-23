import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductionUrl } from "../URL/url";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import MultiCalendar from "./MultiCalendar";
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
        // setLoader(false);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchData();
  }, []);

  // -------------------------------------------------------> fetch Excel sheet data <--------------------------------------------- //

  //   -------------------------------------------------------> calculate p&l  day wise <-------------------------------------------- //

  useEffect(() => {
    if (allSheetData.length > 0) {
      // Map over allSheetData and add the P&L by date to each sheet object
      const updatedSheetData = allSheetData.map((sheet) => {
        // Initialize the `pnlByDate` object for this sheet
        const pnlByDate = {};

        // Check if `sheet.sheetData` exists and is a non-empty array
        if (
          sheet.sheetData &&
          Array.isArray(sheet.sheetData) &&
          sheet.sheetData.length > 0
        ) {
          sheet.sheetData.forEach((trade) => {
            // Extract the date and P&L values
            const date = trade[3]; // Extract the start date (assumes it's in column 3)
            const pnl = parseFloat(trade[10]); // Parse the Profit/Loss value (assumes it's in column 10)

            // Ensure date is valid and pnl is a number
            if (date && !isNaN(pnl)) {
              // Initialize the accumulator for the date if not already present
              if (!pnlByDate[date]) {
                pnlByDate[date] = 0;
              }

              // Add the P&L for this trade to the date's total
              pnlByDate[date] += pnl;
            }
          });
        }

        // Return the updated sheet object with the added `pnlByDate`
        return {
          ...sheet,
          pnlByDate, // Add the P&L by date to this sheet
        };
      });

      console.log(updatedSheetData);
      setUpdatedAllSheetData(updatedSheetData); // Set the updated sheet data
    }
  }, [allSheetData]);

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

                <div>
                  <div>
                    {allSheetData
                      .filter((sheet) => sheet.UserId === clientId) // Filter sheets by UserId
                      .map((filteredSheet, index2) => (
                        <div key={index2} className="sheet-item">
                          <div className="sheet-info">
                            <span className="label">Strategy Name:</span>
                            <span className="value">
                              {filteredSheet.strategyName || "N/A"}
                            </span>
                          </div>
                          <MultiCalendar
                            allSheetData={allSheetData}
                            clientId={filteredSheet.UserId}
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
