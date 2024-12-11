import React from "react";
import { Table } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton
import { Scrollbar } from "react-scrollbars-custom";

const Transaction = ({ loader, transactionData }) => {
  const handleAction = (transactionId) => {
    // Handle actions like Delete, View Details, etc.
    console.log(`Action triggered for transaction ${transactionId}`);
  };

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
      ) : (
        <div className="container">
          <div className="row stats-container">
            <div className="stats-toggle-container">
              <div className="paper-trade-table-container container">
                <Scrollbar style={{ height: 200 }}>
                  <table className="paper-trade-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="paper-trade-table-body">
                      {transactionData.length > 0 ? (
                        transactionData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td>{row.date}</td>
                            <td>{row.time}</td>
                            <td>{row.transactionId}</td>
                            <td>{row.amount}</td>
                            <td>{row.status}</td>
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
      )}
    </div>
  );
};

export default Transaction;
