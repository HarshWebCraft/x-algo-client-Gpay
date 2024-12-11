import React from "react";

const TransactionItem = ({ transaction }) => {
  const { name, date, invoiceId, amount, status } = transaction;

  return (
    <tr className="transaction-item">
      <td className="transaction-name">{name}</td>
      <td className="transaction-date">{date}</td>
      <td className="transaction-invoice-id">{invoiceId}</td>
      <td
        className={`transaction-amount ${
          amount.startsWith("-") ? "negative" : "positive"
        }`}
      >
        {amount}
      </td>
      <td className={`transaction-status ${status.toLowerCase()}`}>{status}</td>
      <td className="transaction-details">Details</td>
    </tr>
  );
};

export default TransactionItem;
