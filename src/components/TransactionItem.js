// TransactionItem.js
import React from "react";

const TransactionItem = ({ transaction }) => {
  const { name, date, invoiceId, amount, status } = transaction;

  return (
    <div className="transaction-item">
      <div className="transaction-name">{name}</div>
      <div className="transaction-date">{date}</div>
      <div className="transaction-invoice-id">{invoiceId}</div>
      <div
        className={`transaction-amount ${
          amount.startsWith("-") ? "negative" : "positive"
        }`}
      >
        {amount}
      </div>
      <div className={`transaction-status ${status.toLowerCase()}`}>
        {status}
      </div>
      <div className="transaction-details">Details</div>
    </div>
  );
};

export default TransactionItem;
