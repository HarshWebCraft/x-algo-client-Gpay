import React, { useEffect, useState } from "react";
import "./PaperTradeTable.css";
import { ProductionUrl } from "../URL/url";
import axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";

const PaperTradeTable = () => {
  const [pnlData, setPnlData] = useState([]);

  const url =
    process.env.NODE_ENV === "production"
      ? ProductionUrl
      : "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/fetchSheetData`); // Your backend API endpoint
        console.log(response.data);
        setPnlData(response.data);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="paper-trade-table-container container">
      <div className="paper-trade-balance-container">
        {/* <h3>Paper Trading Balance: ${}</h3> */}
      </div>
      <div className="paper-trade-table-wrapper">
        <Scrollbar style={{ height: 400 }}>
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
              {pnlData.map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                  <td>{item[5]}</td>
                  <td>{item[6]}</td>
                  <td>{item[7]}</td>
                  <td>{item[8]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scrollbar>
      </div>
    </div>
  );
};

export default PaperTradeTable;
