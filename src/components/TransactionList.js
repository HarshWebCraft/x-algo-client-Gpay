import React from "react";
import TransactionItem from "./TransactionItem.js";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction-list">
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
