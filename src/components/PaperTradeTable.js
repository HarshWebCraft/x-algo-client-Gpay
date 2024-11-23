import React, { useEffect, useState } from "react";
import "./PaperTradeTable.css";
import io from "socket.io-client";

// const socket = io("ws://oyster-app-4y3eb.ondigitalocean.app");

const PaperTradeTable = () => {
  const [pnlData, setPnlData] = useState([]);

  useEffect(() => {
    // // Listen for PnL updates
    // socket.on("updatePnL", (data) => {
    //   setPnlData((prev) => {
    //     const existing = prev.find(
    //       (item) => item.symbol === data.symbol && item.side === data.side
    //     );
    //     if (existing) {
    //       return prev.map((item) =>
    //         item.symbol === data.symbol && item.side === data.side
    //           ? { ...item, runningPnL: data.runningPnL }
    //           : item
    //       );
    //     }
    //     return [...prev, data];
    //   });
    // });
    // return () => {
    //   socket.off("updatePnL");
    // };
  }, []);

  const data = [
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 35, city: "Chicago" },
    { id: 4, name: "David", age: 28, city: "San Francisco" },
  ];

  return (
    <>
      <div>
        <h2>Live P&L</h2>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Side</th>
              <th>Running P&L</th>
            </tr>
          </thead>
          <tbody>
            {pnlData.map((trade, index) => (
              <tr key={index}>
                <td>{trade.symbol}</td>
                <td>{trade.side}</td>
                <td>{trade.runningPnL} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="paper-trade-table-container container">
        <div className="paper-trade-balance-container">
          <h3>Paper Trading Balance: ${}</h3>
        </div>
        <div className="paper-trade-table-wrapper">
          <table className="paper-trade-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>Symbol</th>
                <th>Strategy</th>
                <th>Entry Type</th>
                <th>Entry Qty</th>
                <th>Entry Time</th>
                <th>Entry Price</th>
                <th>Exit Time</th>
                <th>Exit Price</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.city}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.city}</td>
                  <td>{item.city}</td>
                  <td>{item.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default PaperTradeTable;
