import React from "react";
import "./PaperTradeTable.css";

const PaperTradeTable = () => {
  const data = [
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 35, city: "Chicago" },
    { id: 4, name: "David", age: 28, city: "San Francisco" },
  ];

  return (
    <div className="paper-trade-table-container container">
      <div className="paper-trade-balance-container">
        <h3>Paper Trading Balance: ${}</h3>
      </div>
      <div className="paper-trade-table-wrapper">
        <table className="paper-trade-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Symbol</th>
              <th>Strategy</th>
              <th>Entry Type</th>
              <th>Entry Qty</th>
              <th>Exit Price</th>
              <th>Total</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaperTradeTable;
