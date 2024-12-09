import React, { useEffect, useState } from "react";
import "./PaperTradeTable.css";
import { ProductionUrl } from "../URL/url";
import axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton
import Switch from "@mui/material/Switch";
import { useSelector } from "react-redux";
import delete_broker from "../images/delete_broker.png";

const PaperTradeTable = () => {
  const [ExcelData, setExcelData] = useState([]);
  const [pnl, setpnl] = useState();
  const [allStrategies, setAllStrategies] = useState([]); // Store the strategies
  const [allSheetData, setAllSheetData] = useState([]); // Store the sheet data
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(true);

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
        const response = await axios.post(`${url}/getMarketPlaceData`, {
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

        console.log(mergedData);
        setFilteredData(mergedData);

        console.log(filteredData);

        const response3 = await axios.post(`${url}/fetchSheetData`, { email });
        console.log(response3.data.allSheetData);

        // Set sheet data to state
        setAllSheetData(response3.data.allSheetData);
        console.log(allSheetData);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loader ? (
        <div className="skeleton-container container">
          {/* Skeleton for the card layout */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-card row stats-container">
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
            (row) => parseFloat(row[8]) || 0
          );
          const totalPnl = pnlValues.reduce((sum, value) => sum + value, 0);

          return (
            <div className="container" key={strategy.strategyId}>
              <div className="row stats-container">
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
                  <div className="paper-trade-table-container container">
                    <Scrollbar style={{ height: 200 }}>
                      <table className="paper-trade-table">
                        <thead>
                          <tr>
                            <th>NO</th>
                            <th>Symbol</th>
                            <th>Entry Type</th>
                            <th>Entry Time</th>
                            <th>Exit Time</th>
                            <th>Entry Price</th>
                            <th>Exit Price</th>
                            <th>Entry Qty</th>
                            <th>P&L</th>
                          </tr>
                        </thead>
                        <tbody className="paper-trade-table-body">
                          {strategy.sheetData.length > 0 ? (
                            strategy.sheetData.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex}>{cell || "N/A"}</td>
                                ))}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9" style={{ textAlign: "center" }}>
                                No trade executed
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Scrollbar>
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
