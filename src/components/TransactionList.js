import React from "react";
import TransactionItem from "./TransactionItem.js";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Invoice ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
